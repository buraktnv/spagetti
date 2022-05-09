import React, { useContext, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from 'next/router'
import  Link  from "next/link";
import userContext from "../../context/userContext";

const Navbar = () => {
  let router = useRouter();

  const [dropdown, setDropDown] = useState(false);
  const { user, setUser } = useContext(userContext);


  const Logout = async (e) => {
    e.preventDefault();

    setUser({
      login: false,
      accessToken: "",
      refreshToken: "",
      user: "",
    });
    // Remove Cookies

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full p-3 text-gray-600 bg-white border-b-2 border-gray-200">
      <div className="flex items-center justify-around tracking-wider">
        <div>
          <Link
            className="text-2xl font-bold text-blue-900 transition link lg:text-2xl hover:text-blue-600"
            href="/"
          >
            Blog App
          </Link>
        </div>

        <div className="flex items-center justify-center">
          {user.login ? (
            <div className="relative">
              <span
                className="block text-lg text-center cursor-pointer lg:text-2xl"
                onClick={() => setDropDown((pre) => !pre)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block h-6 mx-2 text-gray-900 hover:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              {dropdown && (
                <div className="absolute text-xs bg-gray-100 rounded lg:text-lg ">
                  <Link className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50" href="">
                    Profile
                  </Link>
                  <Link className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50" href="">
                    Settings
                  </Link>
                  <Link className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50" href="">
                    Friends
                  </Link>
                  <Link
                    href="/dashboard/overview"
                    className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50 "
                    onClick={Logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <span>
                <Link
                  className="text-base transition link lg:text-lg hover:bg-gray-100 hover:text-gray-900"
                  href="/auth/login"
                >
                  Log in
                </Link>
              </span>
              <span>
                <Link
                  className="text-base transition link lg:text-lg hover:bg-gray-100 hover:text-gray-900"
                  href="/auth/register"
                >
                  Sign in
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
