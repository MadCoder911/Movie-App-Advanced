/* Start Login page */
import { API_URL, IMG_PATH } from "./config.js";
export let accounts = [];

const usernameLabel = document.querySelector(".username");
const usernameInput = document.querySelector(".usernameinputt");
const passwordLabel = document.querySelector(".password");
const passwordInput = document.querySelector(".passwordinputt");
const loginBtn = document.querySelector(".loginBtn");
const registerBtn = document.querySelector(".register");
const paragraph = document.querySelector(".paragraph");
const topParagraph = document.querySelector(".toph1");
const registerbtn = document.querySelector(".registerUser");
const landing = document.querySelector(".landing");
const wrongPassText = document.querySelector(".wrong-pass");
const correctPassText = document.querySelector(".correct-pass");
const warningText = document.querySelector(".login-warning");
let login = false;
/////
/////
/////
const burgerIcon = document.getElementById("menuu");
const mobileMenu = document.querySelector(".mobile_menu");

const closemenu = document.querySelector(".close-menu");
burgerIcon.addEventListener("click", function (e) {
  e.preventDefault();

  if (mobileMenu.classList.contains("menu_hidden")) {
    mobileMenu.classList.toggle("menu_hidden");
    burgerIcon.style.display = "none";
    closemenu.style.display = "block";
  } else if (!mobileMenu.classList.contains("menu_hidden")) {
    mobileMenu.classList.toggle("menu_hidden");
    burgerIcon.style.display = "block";
    closemenu.style.display = "none";
  }
});
closemenu.addEventListener("click", function () {
  mobileMenu.classList.toggle("menu_hidden");
  burgerIcon.style.display = "block";
  closemenu.style.display = "none";
});
/////
/////
///

usernameInput.addEventListener("click", function () {
  usernameLabel.classList.add("active");
});
passwordInput.addEventListener("click", function () {
  passwordLabel.classList.add("active");
});
//Background image
let widthWin = window.innerWidth;

let randommovie = Math.trunc(Math.random() * 20);

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
window.onload = () => {
  let data = JSON.parse(localStorage.getItem("Accounts"));
  if (!data) return;
  data.forEach((d) => {
    accounts.push(d);
  });
};
////////////////
//Logging in
loginBtn.addEventListener("click", function () {
  let username = usernameInput.value;
  let password = passwordInput.value;
  let targetAcc;

  accounts.find((acc) => {
    if (acc.user === username) {
      targetAcc = acc;
    }
  });

  if (targetAcc && targetAcc.pass === password) {
    localStorage.setItem("logStatus", JSON.stringify("true"));
    localStorage.setItem("loggedAcc", JSON.stringify(targetAcc));
    window.location.href = "index.html";
  } else {
    wrongPassText.classList.remove("hidden");
    setTimeout(function () {
      wrongPassText.classList.add("hidden");
    }, 4000);
  }
});
////////////////////
/* Registeration */
registerBtn.addEventListener("click", () => {
  paragraph.innerHTML = `Existing user? <span class="loginn">Login</span>`;
  topParagraph.innerHTML = `Please Register`;
  loginBtn.classList.add("hidden");
  registerbtn.classList.remove("hidden");
  registerFunctionality();
  usernameInput.value = "";
  passwordInput.value = "";
});

const registerFunctionality = function () {
  const loginText = document.querySelector(".loginn");
  const registerbtn = document.querySelector(".registerUser");
  loginText.addEventListener("click", () => {
    window.location.reload();
  });
  registerbtn.addEventListener("click", () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    if (username.length < 5) {
      warningText.classList.remove("hidden");
      return;
    } else if (password.length < 5) {
      warningText.classList.remove("hidden");
      return;
    } else {
      correctPassText.classList.remove("hidden");
    }
    let user = { user: username, pass: password, bookmarks: [] };
    accounts.push(user);
    localStorage.setItem("Accounts", JSON.stringify(accounts));
    usernameInput.value = "";
    passwordInput.value = "";
  });
};
