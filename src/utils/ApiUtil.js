const CHAT_SERVICE = "http://localhost:8080";
const AUTH_SERVICE = "http://localhost:8081";

const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem("authTokens")) {
    headers.append(
      "Authorization",
      localStorage.getItem("authTokens").accessToken
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: AUTH_SERVICE + "/users/me",
    method: "GET",
  });
}

export function getUsers() {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: AUTH_SERVICE + "/users/summaries",
    method: "GET",
  });
}

export function countNewMessages(senderId, recipientId) {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId + "/count",
    method: "GET",
  });
}

export function findChatMessages(chatId) {
  if (!localStorage.getItem("authTokens")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + chatId,
    method: "GET",
  });
}

export function findChatMessage(id) {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + id,
    method: "GET",
  });
}
