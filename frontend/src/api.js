export const SERVER_URL = "http://127.0.0.1:5000";

export function getListing(rid) {
  return fetch(`${SERVER_URL}/listing/${rid}`).then((response) =>
    response.json()
  );
}

export function getAllListings() {
  return fetch(`${SERVER_URL}/listing`).then((response) => response.json());
}

export function getMyListings(uid) {
  return fetch(`${SERVER_URL}/listing?uid=${uid}`).then((response) =>
    response.json()
  );
}

export function getMyBooking() {
  return fetch(`${SERVER_URL}/bookings`).then((response) => response.json());
}

export function getUserInfo() {
  return fetch(`${SERVER_URL}/user`).then((response) => response.json());
}
