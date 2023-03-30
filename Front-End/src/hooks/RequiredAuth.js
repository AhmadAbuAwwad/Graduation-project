import {  Navigate , Outlet } from "react-router-dom";


const RequireAuth = () => {
    
return (
    localStorage.getItem('role') === '0' ? 
    <Outlet /> :
    <Navigate to="/" />
)


}
export default RequireAuth;