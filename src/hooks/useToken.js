import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {}, [user]);
  const getToken = async () => {
    const email = user?.user?.email;
    // const email = "";
    if (email) {
      const result = await axios.post(`http://localhost:5000/token`, {
        email,
      });
      localStorage.setItem("accessToken", result.data.token);
      setToken(result.data.token);
    }
  };
  getToken();
  return [token];
};
export default useToken;
