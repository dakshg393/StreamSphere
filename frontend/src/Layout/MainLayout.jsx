// import {React,  useState } from "react";
// import {  NavBar, SideNavBtn } from "../Components/index.js";
// import { Outlet, useNavigate } from "react-router-dom";
// import { navItems } from "../Utils/MainUtils.jsx";

// import useNavStore from "../Store/Nav.Store.js";
// import { LogOut, UserCircle } from "lucide-react";
// import useUserStore from "../Store/user.Store.js";
// import axios from "axios";

// const MainLayout = () => {
// const navigate = useNavigate()
//     const aside =useNavStore((state)=>state.aside)
//     const logout = useUserStore((state)=>state.logout)
//     const user =useUserStore((state)=>state.user)
//     const [isOpen, setIsOpen] = useState(true)

//     const path = import.meta.env.VITE_SERVER
//  const logoutUser = async () => {
//     console.log("clicked logout")
//   try {
//      logout(); 
//     // Ensure path is correct
//     const response = await axios.post(`${path}users/logout`, {},{ 
//       withCredentials: true, // Sends cookies with the request if needed (like session cookie)
//     });
//     console.log(response.data); // Check the response from the server

//     // Perform logout action
//    // Call your store's logout method to clear user data from the state
//     navigate("/login"); // Navigate to the login page after successful logout
//   } catch (error) {
//     console.error("Error during logout:", error);
//   }
// };
// // const logoutUser = async () => {
// //   try {
// //     await axios.post(`${path}/users/logout`, {}, { withCredentials: true });
// //     logout(); // <- likely updates global auth state
// //     navigate("/login"); // <- causes navigation
// //   } catch (error) {
// //     console.error("Logout error", error);
// //   }
// // };


//     return (
//         <>
//             <div key={"main"} className=" fixed top-0 left-0 w-full h-full min-h-screen flex-1 ">
//                 {/* Header */}
//                 <header className="h-14  border-b-1">
//                     <NavBar />
//                 </header>

//                 <div className="flex flex-1 ">
//                     {/* Sidebar */}
//                     <aside className={`h-[100vh]      relative overflow-y-auto  pt-3 flex-col  gap-2 border-r-1 rounded-r-2xl bg-white 
//                   ${aside ? "w-64 flex  " : "hidden md:flex  md:w-14"}`}>

//                        {
//                         navItems.map((navItem)=> <SideNavBtn path={navItem.path} icon={navItem.icon} name={navItem.name} isSmall={!aside} />)
//                        }

//                        <SideNavBtn path={`/account/${user?._id}`} icon={<UserCircle/>} name={"Account"} isSmall={!aside} custom={""}/>
//                        <span onClick={logoutUser}> <SideNavBtn onClick={logoutUser} icon={<LogOut />} name={"Logout"} isSmall={!aside} custom={"bottom-0 fixed"} /></span>
//                     </aside>

//                     {/* Main Content */}
//                     <main className="flex-1 items-center justify-center bg-gray-200 text-left transform transition-transform duration-500 pb-20 min-h-screen ">


//                         <Outlet/>



//                     </main>

//                 </div>

//                 {/* Footer */}

//             </div>
//         </>
//     )
// }

// export default MainLayout

import { Outlet } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import { NavBar, SideNavBtn } from "../Components/index.js";
import { navItems } from "../Utils/MainUtils";
import useNavStore from "../Store/Nav.Store";
import useUserStore from "../Store/user.Store";

const MainLayout = () => {
  const aside = useNavStore((state) => state.aside);
  const user = useUserStore((state) => state.user);
  const logoutUser = useUserStore((state) => state.logout);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Fixed Top Navbar */}
      <header className="fixed top-0 left-0 w-full h-14 bg-white shadow z-40">
        <NavBar />
      </header>

      {/* Sidebar Overlay */}
      {aside && (
        <aside className="fixed top-14 left-0 z-50 w-64 h-[calc(100vh-3.5rem)] bg-white shadow-lg border-r overflow-y-auto rounded-r-2xl p-2 flex flex-col gap-2">
          {navItems.map((navItem) => (
            <SideNavBtn
              key={navItem.name}
              path={navItem.path}
              icon={navItem.icon}
              name={navItem.name}
              isSmall={false}
            />
          ))}

          <SideNavBtn
            path={`/account/${user?._id}`}
            icon={<UserCircle />}
            name={"Account"}
            isSmall={false}
          />

          <span className="w-full " onClick={logoutUser}>
             <SideNavBtn path="/logout" onClick={logoutUser} icon={<LogOut />} name={"Logout"} isSmall={!aside} custom={"bottom-0 fixed   relative "} />
          </span>

        </aside>
      )}

      {/* Main Content Scrollable */}
      <main className="pt-14  h-[calc(100vh-3.5rem)] z-10 relative ">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

