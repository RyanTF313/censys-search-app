import axios from "axios";
const envObj = import.meta.env;

export const SearchAPIService = {
  search: async (params, creds = envObj) => {
    const isValidData = validate(params, creds);

    if (!isValidData.valid) return isValidData;

    params.field = getFields(params.q);

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
    if (response.status !== 200 || response.code >= 400) {
      return response;
    }
    return response.data.result;
  },
};

export const validate = (params, creds) => {
  if (isObjectEmpty(params))
    return { valid: false, message: "No params given" };
  if (isObjectEmpty(creds)) return { valid: false, message: "No creds given" };
  return { valid: true };
};

export const isObjectEmpty = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length < 1;
};

export const getFields = (str) => {
  if (!str) return "";
  return str.split("and").map((field) => {
    const keyValPair = field.split(":");
    const key = keyValPair[0];
    return key;
  });
};
