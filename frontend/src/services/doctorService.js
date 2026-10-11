import httpClient from "./httpClient";

export const getDoctors = () => httpClient.get("/doctor");
