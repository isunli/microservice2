import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async ({ req }) => {
  const { data } = await buildClient(req, "auth-srv:3000").get(
    "/api/users/currentuser"
  );
  return data;
};
export default LandingPage;
