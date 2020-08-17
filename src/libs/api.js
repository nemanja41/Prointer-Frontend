const SERVER_URI = "http://localhost:3322";

export const apiRequest = async (route, method, data) => {
  const response = await fetch(`${SERVER_URI}${route}`, {
    method: method,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // if HTTP-status is 200-299
  // get the response body (the method explained below)
  return await response.json();
};

export const apiGetRequest = async (route) => apiRequest(route, "GET");

export const apiDeleteRequest = async (route) => apiRequest(route, "DELETE");

export const apiPostRequest = async (route, data) =>
  apiRequest(route, "POST", data);
