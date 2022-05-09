import React, { useState, useContext, useEffect } from "react";
import Link from "next/link"
import userContext from "../../context/userContext";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import { useRouter } from 'next/router';
import cookie from "js-cookie";
import Axios from "axios";
import useForm from "../../components/hooks/useForm";


export default function Login() {
  let router = useRouter();

  const [userName, setUserName] = useLocalStorage("");
  const [value, handleChange] = useForm({
    userName,
    password: "",
  });

  const [checkBox, setCheckBox] = useLocalStorage(false);

  const { user, setUser } = useContext(userContext);

  const [error, setError] = useState();

  const LOGIN = process.env.LOGIN

  useEffect(() => {
    checkBox ? setUserName(value.userName) : setUserName("");
    if (user.login) router.push("/");
  }, [checkBox, value.userName, user.login]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!value.userName || !value.password) 
        setError("Doldurulmamış Alan var!");
      
      const loginUser = { userName: value.userName, password: value.password };
      const loginRes = await Axios.post(
        process.env.NEXT_PUBLIC_LOGIN,
        loginUser
      );

      setUser({
        user: loginRes.data.user,
      } );
      console.log(cookie.get( "access-token" ),cookie.get( "refresh-token" ),loginRes);
      ;
      router.push("/")
    } catch (err) {
      console.log(err,value)
      err?.response?.data?.msg && setError(err?.response?.data?.msg);
    }
  };

  return (
    <div className="flex justify-center h-full tracking-wide">
      <form className="w-1/2 p-3 w-50" onSubmit={submit}>
        <div className="w-full mb-2">
          <label for="userName" className="label-css">
            Username
          </label>
          <input
            id="userName"
            className="input-css"
            type="text"
            name="userName"
            placeholder="Enter Username"
            value={value.userName}
            onChange={handleChange}
          />
        </div>

        <div className="w-full mb-2">
          <label for="password" className="label-css">
            Password
          </label>
          <input
            className="input-css"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={value.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between px-2 py-4 ">
          <div>
            <input
              className="text-lg "
              type="checkbox"
              checked={checkBox}
              onChange={() => setCheckBox(!checkBox)}
            />
            <span className="text-lg"> Remember Me!</span>
          </div>
          <div>
            <Link
              href="/auth/forget-password"
              className="text-lg underline transition hover:text-blue-700"
            >
              Forget Password
            </Link>
          </div>
        </div>

        <div className="flex justify-between">
          <button type="submit" className="input-button-css">
            Login
          </button>

          <Link href="/auth/register" className="input-button-css">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
