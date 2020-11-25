import axios from "axios";
const buildTmp = (path, req) => {
  if (typeof window === "undefined") {
    // on server
    // request to http:ingres...

    return axios.create({
      baseURL: `http://${path}/`,
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // requests can be made with a base url of
    return axios.create({ baseURL: "/" });
  }
};
export default (req) => {
  return {
    auth: buildTmp("auth-srv:3000", req),
    tickets: buildTmp("tickets-srv:3000", req),
    orders: buildTmp("orders-srv:3000", req),
  };
};
