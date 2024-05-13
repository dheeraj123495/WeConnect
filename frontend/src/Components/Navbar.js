import React from 'react'
import logo from "../Assets/Logo.png"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="shadow-md mb-5">
      <div className="flex justify-between w-full max-w-[1000px] py-2 mx-auto">
        <Link to="/home">
          <img src={logo} alt="Logo" width={120} loading="lazy" className="" />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-100 mt-2 font-thin text-[1.5em]">
            <li className="">
              <Link to="/postupload">UploadPost</Link>
            </li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar