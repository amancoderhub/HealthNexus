import httpClient from "./httpClient";

export function getPatientStats(patientId) {
    return httpClient.get(`/patient/stats/${patientId}`);
}
