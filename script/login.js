/* Start Login page */
import { API_URL, IMG_PATH } from "./config.js";
import { widthWin, randommovie, landing, setUsername } from "./script.js";
const usernameLabel = document.querySelector(".username");
const usernameInput = document.querySelector(".usernameinputt");
const passwordLabel = document.querySelector(".password");
const passwordInput = document.querySelector(".passwordinputt");
const loginBtn = document.querySelector(".loginBtn");
usernameInput.addEventListener("click", function () {
  usernameLabel.classList.add("active");
});
passwordInput.addEventListener("click", function () {
  passwordLabel.classList.add("active");
});

const getMoviess = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  // Landing image
  if (widthWin <= 700) {
    landing.style.backgroundImage = `url('${
      IMG_PATH + data.results[randommovie].poster_path
    }')`;
  } else if (widthWin > 700) {
    landing.style.backgroundImage = `url('${
      IMG_PATH + data.results[randommovie].backdrop_path
    }')`;
  }
};
getMoviess(API_URL);
loginBtn.addEventListener("click", function () {
  let username = usernameInput.value;
  let password = passwordInput.value;
  if (username.value === "" || username.length < 5) {
    window.alert("Username has to be atleast five character");
    return;
  } else if (passwordInput.value === "") {
    window.alert("Password has to be atleast five character");
    return;
  }

  window.location.href = "index.html";
  setUsername(username);
});
