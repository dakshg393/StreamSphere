import {React,  useState } from "react";
import {  NavBar, SideNavBtn } from "../Components/index.js";
import { Outlet, useNavigate } from "react-router-dom";
import { navItems } from "../Utils/MainUtils.jsx";

import useNavStore from "../Store/Nav.Store.js";
import { LogOut, UserCircle } from "lucide-react";
import useUserStore from "../Store/user.Store.js";
import axios from "axios";

const MainLayout = () => {
const navigate = useNavigate()
    const aside =useNavStore((state)=>state.aside)
    const logout = useUserStore((state)=>state.logout)

    const [isOpen, setIsOpen] = useState(true)

    const path = import.meta.env.VITE_SERVER
 const logoutUser = async () => {
    
    console.log("clicked logout")
  try {
    
    // Ensure path is correct
    const response = await axios.post(`${path}users/logout`, {},{ 
      withCredentials: true, // Sends cookies with the request if needed (like session cookie)
    });
    console.log(response.data); // Check the response from the server

    // Perform logout action
    logout(); // Call your store's logout method to clear user data from the state
    navigate("/login"); // Navigate to the login page after successful logout
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
// const logoutUser = async () => {
//   try {
//     await axios.post(`${path}/users/logout`, {}, { withCredentials: true });
//     logout(); // <- likely updates global auth state
//     navigate("/login"); // <- causes navigation
//   } catch (error) {
//     console.error("Logout error", error);
//   }
// };


    return (
        <>
            <div key={"main"} className=" fixed top-0 left-0 w-full h-full min-h-screen flex-1 ">
                {/* Header */}
                <header className="h-14  border-b-1">
                    <NavBar />
                </header>

                <div className="flex flex-1 ">
                    {/* Sidebar */}
                    <aside className={`h-[100vh]  fixed  sm:relative overflow-y-auto pt-3 flex-col  gap-2 border-r-1 rounded-r-2xl bg-white 
                  ${aside ? "w-64 flex" : "hidden md:flex  md:w-14"}`}>
                       
                       {
                        navItems.map((navItem)=> <SideNavBtn path={navItem.path} icon={navItem.icon} name={navItem.name} isSmall={!aside} />)
                       }
                       
                       <SideNavBtn path={"/acount"} icon={<UserCircle/>} name={"Account"} isSmall={!aside} custom={""}/>
                       <span onClick={logoutUser}> <SideNavBtn onClick={logoutUser} icon={<LogOut />} name={"Logout"} isSmall={!aside} custom={"bottom-0 fixed"} /></span>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 items-center justify-center bg-gray-200 text-left transform transition-transform duration-500 pb-20 min-h-screen ">

                        
                        <Outlet/>



                    </main>

                </div>

                {/* Footer */}

            </div>
        </>
    )
}

export default MainLayout