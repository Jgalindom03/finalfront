export type Video={
    title:string,
    thumbnail:string,
    description:string,
    duration:string,
    youtubeid:string,
    id:string,
    date:string,
    fav:boolean,
}
export type User={
    id:string,
    name:string,
    password:string,
    favs:string[],
}