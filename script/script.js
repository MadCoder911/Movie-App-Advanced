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
   <div class="bookmarkinitial bii"><i class="fa-regular fa-bookmark"></i></div>
   
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
    if (loginstatus === "false" || !loginstatus) {
      window.location.href = "login.html";
    } else if (loginstatus === "true") {
      window.location.href = "profile.html";
    }
  });
};
profilePage();
// Bookmarking

const checkBookmarkStatus = function (bookmark) {
  if (bookmark.firstChild.classList.contains("fa-regular")) {
    bookmark.firstChild.classList.add("fa-solid");
    bookmark.firstChild.classList.remove("fa-regular");
  } else if (bookmark.firstChild.classList.contains("fa-solid")) {
    bookmark.firstChild.classList.remove("fa-solid");
    bookmark.firstChild.classList.add("fa-regular");
  }
};
setTimeout(function () {
  const bookmarkIcon = document.querySelectorAll(".bii");
  const err = document.querySelector(".err");
  const checkBookmark = function () {
    if (loginstatus === "false" || !loginstatus) {
      bookmarkIcon.forEach((bookmark) => {
        bookmark.addEventListener("click", (e) => {
          err.classList.add("show");
          setTimeout(function () {
            err.classList.remove("show");
          }, 3000);
        });
      });
    } else if (loginstatus === "true") {
      bookmarkIcon.forEach((bookmark) => {
        bookmark.addEventListener("click", (e) => {
          checkBookmarkStatus(bookmark);
          let box = e.target.closest(".box");
          let imgg = box.children[0].src;
          let genre = box.children[1].innerHTML;
          let rating = box.children[3].children[0].innerHTML;
          let name = box.children[3].children[1].innerHTML;
          const movieData = {
            genre: genre,
            rating: rating,
            bookmarkedMovie: name,
            title: name,
            image: imgg,
          };
          let currentAcc = JSON.parse(localStorage.getItem("loggedAcc"));
          currentAcc.bookmarks.push(movieData);
          localStorage.setItem("loggedAcc", JSON.stringify(currentAcc));
          loadBookmarks();
          checkBookmarksLength();
        });
      });
    }
  };
  checkBookmark();
}, 1000);
const emptyBookTitle = document.querySelector(".h2");
const bookmarkedContainer = document.querySelector(".bookmarkedBoxes");

const checkBookmarksLength = function () {
  if (bookmarkedContainer.children.length > 0) {
    emptyBookTitle.classList.add("hide");
  }
};
// remove
////////////////////
const removeBookmark = function (bookmark) {
  bookmark.forEach((b) => {
    b.addEventListener("click", () => {
      let currentAcc = JSON.parse(localStorage.getItem("loggedAcc"));
      let moviename = b.children[3].children[1].innerHTML;
      let index = currentAcc.bookmark.findIndex();
      console.log(index);
    });
  });
};

//load
const loadBookmarks = function () {
  bookmarkedContainer.innerHTML = "";
  let currentAcc = JSON.parse(localStorage.getItem("loggedAcc"));
  console.log(currentAcc.bookmarks);
  currentAcc.bookmarks.forEach((bm) => {
    let html = `
    <div class="box bookmarked">
    <img src="${bm.image}" alt="" />
    <div class="genre">${bm.genre}</div>
   <div class="bookmarkinitial ed"><i class="fa-solid fa-bookmark"></i></div>
    <div class="bottom-content">
      <div class="rating">Rating: ${bm.rating}</div>
      <div class="title">${bm.title}</div>
      <svg xmlns="http://www.w3.org/2000/svg" class="small-circle" width="50" height="50" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
</svg>
    </div>
  </div>
    `;
    bookmarkedContainer.innerHTML += html;
  });
  const bookmarkeddd = document.querySelectorAll(".bookmarked");
  removeBookmark(bookmarkeddd);
};
loadBookmarks();
checkBookmarksLength();
