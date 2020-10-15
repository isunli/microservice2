import axios from "axios";
export default (req, path) => {
  if (typeof window === "undefined") {
    // on server
    // request to http:ingres...

    return axios.create({
      baseURL: `http://${path}`,
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // requests can be made with a base url of
    return axios.create({ baseURL: "/" });
  }
};
