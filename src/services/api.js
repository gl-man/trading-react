import Axios from "axios";

const apiKey = process.env.REACT_APP_FMP_API_KEY || "demo";

const api = new Axios.create({
  baseURL: "https://financialmodelingprep.com/api/v3/",
});

api.interceptors.request.use(
  config => {
    config.params = {...(config.params || {}), apikey: apiKey};

    return config;
  },
);

api.interceptors.response.use(
  response => {
    let resData = response.data;
    if (resData && resData["Error Message"]) {
      throw new Error(resData["Error Message"]);
    }
    return resData;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default api;