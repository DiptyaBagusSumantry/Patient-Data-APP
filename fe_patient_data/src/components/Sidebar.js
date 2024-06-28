import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { MdPeopleOutline, MdPayment, MdOutlineFeaturedPlayList } from "react-icons/md";
import { CiMedicalClipboard } from "react-icons/ci";
import Api from '../Api';

const Sidebar = () => {
    const [display, setDisplay] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const [role, setRole] = useState()

    const getFetch = async () => {
        try {
            const response = await Api.Fetch(localStorage.getItem('token'))
            localStorage.setItem('role', response.data.role)
        } catch (error) {
            navigate('/')
        }
    }

    const Logout = async() => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        getFetch()
    }, [])

    return (
      <>
        <div
          className={`block lg:block  py-[55px] h-screen bg-white sticky ${
            display ? "w-[240px] px-[29px]" : "w-[240px] px-[45px]"
          } transition-all duration-1000 ease-in-out`}
        >
          <h1 className="text-blue-800 text-2xl font-medium mb-[64px]">
            Patient Data Application
          </h1>
          <div className="space-y-[10px] mb-20">
            <Link
              to={"/dashboard"}
              className={`${
                location.pathname === "/dashboard" &&
                "border-blue-600 border-l-4 text-blue-600"
              } flex gap-2 justify-start items-center font-[450] text-[16px] text-start px-4 py-2 w-full`}
            >
              <IoHomeOutline />
              <h1 className={`text-base  hover:text-b lue-600`}>Dashboard</h1>
            </Link>

            <Link
              to={"/pasien"}
              className={`${
                location.pathname === "/pasien" &&
                "border-blue-600 border-l-4 text-blue-600"
              } flex gap-2 items-center justify-start font-[450] text-[16px] text-start px-4 py-2 w-full`}
            >
              <MdPeopleOutline />
              <h1 className={`hover:text-blue-600 text-base`}>Patient</h1>
            </Link>
            {localStorage.getItem("role") === "admin" && (
              <Link
                to={"/rekam-medis"}
                className={`${
                  location.pathname === "/rekam-medis" &&
                  "border-blue-600 border-l-4 text-blue-600"
                } flex gap-2 items-center justify-start font-[450] text-[16px] text-start px-4 py-2 w-full`}
              >
                <CiMedicalClipboard />
                <h1 className={`hover:text-blue-600 text-base`}>
                  Medical Records
                </h1>
              </Link>
            )}
          </div>

          <button onClick={Logout} className="text-red-600 px-4 font-bold">
            Logout
          </button>
        </div>
      </>
    );
}

export default Sidebar