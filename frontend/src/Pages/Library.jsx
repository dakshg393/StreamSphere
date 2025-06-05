import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import VerticalCard from "../Components/Card/VerticalCard.jsx";
import { categoryItems, libraryItems } from "../Utils/MainUtils.jsx";
import LibraryMain from "../Components/OtherComponents/LibraryMain.jsx";


const Library = () => {
    return (
        <section className="h-screen bg-white flex flex-col pb-18">
            {/* Sidebar / Header Section */}
            <div className="w-full gap-4 pl-10 m-4 font-bold flex-col flex justify-center items-start">
                <h1 className="w-full">Your Library</h1>
                <div className="w-full h-18 flex gap-6 items-center">
                    {libraryItems.map((item, index) => (
                        <div key={index} className="flex h-4 flex-col">
                            <NavLink  to={item.path}   className={({ isActive }) =>
    `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
  }> 
                            
                                    {item.icon} 
                                    <br/>
                                    {item.name}
                              
                                
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content - Make this Scrollable */}
       
                <Outlet/>
             
           
        </section>

    );
};

export default Library;
