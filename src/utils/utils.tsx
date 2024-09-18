import axios  from "axios";
const url = "https://swapi.dev/api/";


export const axiosInstance = axios.create({
    baseURL: url
  })
