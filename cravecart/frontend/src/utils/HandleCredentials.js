import React from "react";
function HandleCredentials(value, payload) {
if (value) {
    localStorage.setItem("credentials", JSON.stringify({ payload }));
  } else {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      return JSON.parse(credentials);
    }
    return null; 
  }
};

export default HandleCredentials;
