"use strict";
import { API_URL, SEARCH_API, IMG_PATH } from "./config.js";
export const landing = document.querySelector(".landing");
const landingTitle = document.querySelector(".landingtitle");
const landingP = document.querySelector(".landingP");
const ratings = document.querySelector(".ratings");
const content = document.querySelector(".content");
const rightContent = document.querySelector(".right-content");
const playIcon = document.querySelector(".circle");
const nav = document.querySelector(".nav");
(function () {
  playIcon.addEventListener("mouseover", (e) => {
    rightContent.style.filter = "blur(3px)";
    nav.style.filter = "blur(3px)";
  });
  playIcon.addEventListener("mouseout", (e) => {
    rightContent.style.filter = "blur(0px)";
    nav.style.filter = "blur(0px)";
  });
});

export let widthWin = window.innerWidth;

export let randommovie = Math.trunc(Math.random() * 20);

const getMovies = async function (url) {
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
  //   H1 title
  landingTitle.innerHTML = `${data.results[randommovie].title}`;
  // Overview
  landingP.innerHTML = `${data.results[randommovie].overview}`;
  //   Ratings
  ratings.innerHTML = `Ratings: ${data.results[randommovie].vote_average}`;
};
getMovies(API_URL);

/////////////////////////////////////////////////
// Mobile menu full functionality
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
/////////////////////////////////////////////////
// Top movies Data
const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: " Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science fiction",
  10770: "TVMovie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
//Get Movies Genre
let genresArr = Object.entries(genres);
const checkGenre = function (missing) {
  for (let i = 0; i < genresArr.length; i++) {
    if (genresArr[i][0] === String(missing)) {
      return genresArr[i][1];
    }
  }
};

const moviesContainer = document.querySelector(".boxes");
const loadingSpinner = document.querySelector(".loader");

//API CALL
const topMovies = async function (url) {
  loadingSpinner.classList.remove("hide");
  const res = await fetch(url);
  const data = await res.json();

  data.results.forEach((data) => {
    let html = `
    <div class="box">
    
    <img src="${IMG_PATH + data.poster_path}" alt="" />
    <div class="genre">${checkGenre(data.genre_ids[0])}</div>
    <div class="bottom-content">
      <div class="rating">Rating: ${data.vote_average}</div>
      <div class="title">${data.title}</div>
      <svg xmlns="http://www.w3.org/2000/svg" class="small-circle" width="50" height="50" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
</svg>
    </div>
  </div>
    `;
    moviesContainer.innerHTML += html;
  });
  loadingSpinner.classList.add("hide");
};
topMovies(API_URL);
//
const search = document.querySelector(".searchfield");
const searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  console.log(searchTerm);
  if (searchTerm && searchTerm !== "") {
    moviesContainer.innerHTML = "";
    topMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

/* Logging in */
const loginName = document.querySelector(".Username");

const setUsername = function (username) {
  loginName.innerHTML = `Welcome, ${
    username.charAt(0).toUpperCase() + username.slice(1)
  }`;
};
let data = JSON.parse(localStorage.getItem("userInfo"));
const checkUser = function () {
  if (!data) {
    return;
  } else {
    setUsername(data[0].user);
  }
};
checkUser();
