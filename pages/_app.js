import { useState, useEffect } from "react";
import "../styles/globals.css";
import UserContext from "../context/userContext";
import Axios from "axios";
import cookie from "js-cookie";
import { isTokenExpired } from "../components/functions/JWTFunctions";
import { Fragment } from "react";
import Navbar from "../components/layout/Navbar";

function MyApp({ Component, pageProps }) {

  const accessToken = cookie.get("access-token");
  const [isLoading, setLoading] = useState(true);

  const [user, setUser] = useState({
    user: {
      id: undefined,
      userName: undefined,
    },
  });

  useEffect(() => {
    const auth = async () => {
      try {

        // Check token if its expired try to get a new one
        if (isTokenExpired(accessToken))
          await Axios.post("http://localhost:3005/users/get-acces-token");
        // Check user is logged in 
        const loggedInResponse = await Axios.post(
          "http://localhost:3005/users/is-logged-in",
          null
        );
        // Use user data if user is logged in
        setUser({
          user: loggedInResponse.data.user,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    auth();
  }, []);

  return (
    <Fragment>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default MyApp;
