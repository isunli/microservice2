import axios from "axios";

const LandingPage = ({ currentUser }) => {
  return <h1>Landing Page </h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    // on server
    // request to http:ingres...
    const { data } = await axios.get(
      "http://auth-srv:3000/api/users/currentuser"
    );
    // {currentUser: null||data}
    return data;
  } else {
    // we are on the browser
    // requests can be made with a base url of
    const { data } = await axios.get("/api/users/currentuser");
    // {currentUser: null||data}
    return data;
  }
};
export default LandingPage;
