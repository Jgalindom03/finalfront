import {FreshContext, Handlers, RouteConfig, PageProps} from "$fresh/server.ts";
import {setCookie} from "$std/http/cookie.ts";
import { resetPropWarnings } from "preact/debug";
import Login from "../components/Login.tsx";
import {User} from "../types.ts"
import jwt from "jsonwebtoken";

export const config:RouteConfig={skipInheritedLayouts:true,};
export type Data={
    message:string
}
export const handler:Handlers={
    POST:async(req:Request, ctx:FreshContext<unknown, Data>)=>{
        const url= new URL(req.url);
        const form= await req.formData();
        const email= form.get("email")?.toString() || "";
        const password= form.get("password")?.toString() || "";
        const name= form.get("name")?.toString()||""
        
        const JWT_SECRET= Deno.env.get("JWT_SECRET");
        if(!JWT_SECRET){ throw new Error("JWT_SECRET is not set in the environment");}

        const response= await fetch(`${Deno.env.get("API_URL")}/checkuser`,{method:"POST", headers:{"Content-Type":"application/json",},
        body:JSON.stringify({email,password}),},)
        if(response.status===400){return ctx.render({message:"USer already exists or invalidad data provided",});}
        if(response.status==200){
            const data:Omit<User, "password" | "favs">= await response.json();
            const token = jwt.sign({email,id:data.id, name:data.name}, JWT_SECRET,{expiresIN:"24h"},);
            const headers= new Headers();
            
            setCookie(headers,{name:"auth", value:token, sameSite:"Lax", domain:url.hostname, path:"/", secure:true});
            headers.set("location", "/videos");
            return new Response(null, {status:300, headers})
        }else{return ctx.render();}
    }
}
const Page=(props:PageProps<Data>)=>(
    <Login message={props.data?.message}/>
)
export default Page;