import React, { useState, useContext, useEffect } from "react";
import userContext from "../../context/userContext";
import Axios from "axios";
import { useRouter } from 'next/router';
import useForm from "../../components/hooks/useForm";

export default function Register() {

  let history = useRouter();

  const [value, handleChange] = useForm({
    email: "",
    password: "",
    passwordCheck: "",
    userName: "",
  });
  const [error, setError] = useState();

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    if (user.login) history.push("/");
  }, [user.login]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = value;
      const registerRes = await Axios.post(
        "http://localhost:3005/users/register",
        newUser
      );

      setUser({
        user: registerRes.data.user,
      });
    } catch (err) {
      err?.response?.data?.msg && setError(err?.response?.data?.msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-full tracking-wide">
      <form className="w-1/2 p-3 w-50" onSubmit={submit}>
        <div className="w-full mb-2">
          <label for="userName" className="label-css">
            Username
          </label>
          <input
            className="input-css"
            type="text"
            name="userName"
            placeholder="Enter username"
            value={value.userName}
            onChange={handleChange}
          />
        </div>

        <div className="w-full mb-2">
          <label for="email" className="label-css">
            Email
          </label>
          <input
            className="input-css"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={value.email}
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

        <div className="w-full mb-2">
          <label for="passwordCheck" className="label-css">
            Password check
          </label>
          <input
            className="input-css"
            type="password"
            name="passwordCheck"
            id="passwordCheck"
            placeholder="Enter Password"
            value={value.passwordCheck}
            onChange={handleChange}
          />
        </div>

        <button variant="primary" type="submit" className="input-button-css">
          Register
        </button>
      </form>
    </div>
  );
}
