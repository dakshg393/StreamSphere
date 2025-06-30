import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import VerticalCard from "../Components/Card/VerticalCard.jsx";
import { categoryItems, libraryItems } from "../Utils/MainUtils.jsx";
import LibraryMain from "../Components/OtherComponents/LibraryMain.jsx";


const Library = () => {



    return (
       

        <section className="w-full h-full flex flex-col">
            {/* Heading */}
            <div className="h-12 w-full  shadow flex items-center px-4">
                <h1 className="text-3xl font-semibold ">Library</h1>
            </div>
            <div className="flex items-center justify-center flex-row gap-2 ">
                {libraryItems.map((item, index) => (
                    <div key={index} className="flex  flex-col text-center">
                        <NavLink to={item.path} className={({ isActive }) =>
                            `p-2 rounded  ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                        }>

                            {item.icon}
                            <br />
                            {item.name}


                        </NavLink>
                    </div>
                ))}
            </div>

            {/* Scrollable Video List */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center gap-4">
             
                <Outlet/>
             
            </div>
        </section>


    );
};

export default Library;
