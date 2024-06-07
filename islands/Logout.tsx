const Logout=()=>{
    const onLogOut =()=>{document.cookie= "auth; path=/; Expires=Thu , 01 Jan 1970 00:00:01 GMT;",window.location.href="/login";};
    return <a onClick={onLogOut} className="logout-button">Logout</a>
}
export default Logout;