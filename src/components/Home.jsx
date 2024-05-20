import { UserContext } from "./auth/UserContext";
import { useContext } from "react";

const Home = () => {
  const { userData } = useContext(UserContext);

  if(!userData.token) return <h1 className="my-5">Welcome! Please Sign in!</h1>;
  return <h1 className="my-5">Welcome!</h1>
};

export default Home;
