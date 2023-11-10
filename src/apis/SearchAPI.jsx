import axios from "axios";
const envObj = import.meta.env;

export const SearchAPI = {
  search: async (params, creds = envObj) => {
    if (!valid(params, creds).true)
      params.field =
        params.q && params.q.split(":").length > 1
          ? params.q.input.split(":")[0]
          : "";
    const {
      VITE_CENSYS_API_URL: apiUrl,
      VITE_CENSYS_SEARCH_ENDPOINT: endpoint,
      VITE_CENSYS_API_ID: apiID,
      VITE_CENSYS_API_SECRET: apiSecret,
    } = creds;

    const response = await axios.get(apiUrl + endpoint, {
      headers: {
        Authorization: "Basic " + btoa(apiID + ":" + apiSecret),
        "Content-Type": "application/json",
      },
      params,
    });

    return response.data.result;
  },
};

const valid = (params, creds) => {
  if (!validateParams(params))
    return { valid: false, message: "No params given" };
  if (!validateCreds(creds)) return { valid: false, message: "No creds given" };
  return { valid: true };
};

const validateParams = (params) => {
  return Object.keys(params).length < 1;
};

const validateCreds = (creds) => {
  return Object.keys(creds).length < 1;
};
