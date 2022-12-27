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
////////////////
///////////////
/* Logging in */
const loginName = document.querySelector(".Username");

const setUsername = function (username) {
  loginName.innerHTML = `Welcome, ${
    username.charAt(0).toUpperCase() + username.slice(1)
  }`;
};
let data = JSON.parse(localStorage.getItem("loggedAcc"));
let loginstatus = JSON.parse(localStorage.getItem("logStatus"));
const checkUser = function () {
  if (!data || loginstatus === "false") {
    return;
  } else {
    setUsername(data.user);
  }
};
checkUser();

const profilePage = function () {
  loginName.addEventListener("click", () => {
    if (loginstatus === "false") {
      window.location.href = "login.html";
    } else if (loginstatus === "true" || !loginstatus) {
      window.location.href = "profile.html";
    }
  });
};
profilePage();
/////
/////
////
const logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("logStatus", JSON.stringify("false"));
  localStorage.removeItem("loggedAcc");
  window.location.href = "index.html";
});
