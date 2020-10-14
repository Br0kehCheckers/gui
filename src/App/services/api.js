import axios from "axios";
import jwt from "jsonwebtoken";

export const siteKey = "6LcL8tQZAAAAAM-qfi2CSVmZz5ZRbOSMTqsCB8R-";

export const api = axios.create({
  baseURL: process.env.REACT_APP_PROD_API || "http://localhost:3030",
});

export const getUsers = async () => {
  let token = localStorage.getItem("token");
  try {
    let res = await api.get("/users", { headers: { token: token } });
    if (res.data.error) return false;
    return res.data;
  } catch {
    return false;
  }
};

export const getCheckers = async () => {
  try {
    let response = await api.get("/checkers");
    return response.data;
  } catch {
    return false;
  }
};
export const getChecker = async (nome) => {
  try {
    let response = await api.get("/checkers/" + nome);
    return response.data;
  } catch {
    return false;
  }
};

export const getUser = async () => {
  let token = localStorage.getItem("token");
  try {
    let res = await api.get("/sessions", { headers: { token: token } });
    if (typeof res.data.creditos === "undefined") {
      return false;
    }
    return res.data;
  } catch {
    return false;
  }
};

export const isAuthenticated = () => {
  let token = localStorage.getItem("token");

  if (!token) return false;
  try {
    let verify = jwt.verify(token, process.env.REACT_APP_JWT);
    if (!verify) return false;
  } catch (error) {
    return false;
  }

  return true;
};

export const isAdmin = async () => {
  if (!isAuthenticated()) return false;

  let token = localStorage.getItem("token");

  let response = await api.get("/sessions", { headers: { token } });

  if (!response.data.admin === true) return false;

  return true;
};
