import httpClient from "./httpClient";

export function getFeedbackForUser(userId) {
    return httpClient.get(`/feed/u/${userId}`);
}

export function createFeedback(feedback) {
    return httpClient.post("/feed", feedback);
}

export function deleteFeedback(feedbackId) {
    return httpClient.delete(`/feed/${feedbackId}`);
}
