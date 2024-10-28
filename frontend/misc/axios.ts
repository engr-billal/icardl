import axios from "axios";
import { SERVERURL } from "./constants";


const server = axios.create({
  baseURL: SERVERURL,
  withCredentials: true,
});

export default server;
