// // BMI Calculator
function sliderchange(x) {
  let labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (x.id === "weight" && labels[i].control == x) {
      labels[i].innerHTML = `Weigth (kg): ${x.value}`;
    }
    if (x.id === "height" && labels[i].control == x) {
      labels[i].innerHTML = `Height (cm): ${x.value}`;
    }
  }

  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let bmiValue = (weight / (height / 100) ** 2).toFixed(1);
  let bmiStatus = document.getElementById("bmistatus").querySelector("span");

  document.getElementById("bmivalue").innerHTML = `BMI: ${bmiValue}`;

  if (bmiValue < 16) {
    bmiStatus.innerHTML = "Severely underweight";
    bmiStatus.style.color = "#ee9900ee";
  } else if (16 < bmiValue && bmiValue < 18.5) {
    bmiStatus.innerHTML = "Underweight";
    bmiStatus.style.color = "#cccc00ee";
  } else if (18.5 < bmiValue && bmiValue < 24.9) {
    bmiStatus.innerHTML = "Normal weight";
    bmiStatus.style.color = "#119900ee";
  } else if (25 < bmiValue && bmiValue < 29.9) {
    bmiStatus.innerHTML = "Overweight";
    bmiStatus.style.color = "#cccc00ee";
  } else if (30 < bmiValue && bmiValue < 34.9) {
    bmiStatus.innerHTML = "Obesity Class I";
    bmiStatus.style.color = "#ee9900ee";
  } else {
    bmiStatus.innerHTML = "Obesity Class II & III";
    bmiStatus.style.color = "#dd3311dd";
  }
}

// first load page
const bmiInputs = document.getElementsByClassName("bmislider");

for (let i = 0; i < bmiInputs.length; i++) {
  sliderchange(bmiInputs[i]);
}

// // music palyer

const playlist = [
  {
    id: 0,
    title: "01 Hearts Entwined",
    imgSrc:
      "https://alinabizadeh1913.github.io/Javascript_Exercise/src/image/img1.jpg",
    audioSrc:
      "https://alinabizadeh1913.github.io/Javascript_Exercise/src/media/01 Hearts Entwined.mp3",
  },
  {
    id: 1,
    title: "02 Peace",
    imgSrc:
      "https://alinabizadeh1913.github.io/Javascript_Exercise/src/image/img2.jpg",
    audioSrc:
      "https://alinabizadeh1913.github.io/Javascript_Exercise/src/media/02 Peace.mp3",
  },
  {
    id: 2,
    title: "03 Darkness to Light",
    imgSrc:
      "https://alinabizadeh1913.github.io/Javascript_Exercise/src/image/img3.jpg",
    audioSrc:
      "https://alinabizadeh1913.github.io/Javascript_Exercise/src/media/03 Darkness to Light.mp3",
  },
];

let audio = document.getElementById("audio");
let time = document.querySelector(".time");
let audioTrack = document.querySelector(".audio-track");
let btnPlay = document.querySelector("#play");
let btnPrev = document.querySelector("#prev");
let btnNext = document.querySelector("#next");
let btnShuffle = document.querySelector("#shuffle");
let btnRepeat = document.querySelector("#repeat");
let tumbnail = document.getElementById("tumbnail");
let trackName = document.getElementById("title");

let playStaus = false;
let repeatStatus = false;
let shuffleStatus = false;

let track = 0;

function switchTrack(numtrack) {
  let n;
  if (shuffleStatus) {
    n = Math.floor(Math.random() * 2);
  } else {
    n = numtrack;
  }
  audio.src = playlist[n].audioSrc;
  tumbnail.src = playlist[n].imgSrc;
  trackName.innerHTML = playlist[n].title;
  audio.currentTime = 0;
  audio.play();
}

btnPlay.addEventListener("click", function () {
  if (playStaus === false) {
    btnPlay.className = "fa-solid fa-pause";
    playStaus = true;
    audio.play();
  } else {
    btnPlay.className = "fa-solid fa-play";
    playStaus = false;
    audio.pause();
  }

  // interval check
  audioPlay = setInterval(function () {
    let audioTime = Math.round(audio.currentTime);
    let audioLength = Math.round(audio.duration);
    // Assign a width to an element at time
    time.style.width = (audioTime * 100) / audioLength + "%";

    if (repeatStatus) {
      audio.loop = true;
      return 0;
    } else {
      audio.loop = false;
    }
    if (audioTime == audioLength && track < 2) {
      track++;
      switchTrack(track);
    } else if (audioTime == audioLength && track >= 2) {
      track = 0;
      switchTrack(track);
    }

    audioTrack.addEventListener("click", function (e) {
      const precent = e.clientX - e.target.getBoundingClientRect().left;
      audio.currentTime = audio.duration * (precent / e.target.offsetWidth);
    });
  }, 10);
});

btnPrev.addEventListener("click", function () {
  if (track > 0) {
    track--;
    switchTrack(track);
  } else {
    track = 2;
    switchTrack(track);
    console.log(switchTrack(track));
  }
});

btnNext.addEventListener("click", function () {
  if (track < 2) {
    track++;
    switchTrack(track);
  } else {
    track = 0;
    switchTrack(track);
  }
});

btnShuffle.addEventListener("click", function () {
  shuffleStatus = !shuffleStatus;

  if (shuffleStatus) {
    btnShuffle.style.color = "#d45695";
  } else {
    btnShuffle.style.color = "#d3cd96";
  }
});

btnRepeat.addEventListener("click", function () {
  repeatStatus = !repeatStatus;

  if (repeatStatus) {
    btnRepeat.style.color = "#d45695";
  } else {
    btnRepeat.style.color = "#d3cd96";
  }
});

function seeckControl(e) {
  const { currentTarget } = e;
  const pageX = e.pageX;
  const point = pageX - currentTarget.getBoundingClientRect().left;
  this.audio.currentTime =
    (point / currentTarget.offsetWidth) * this.audio.duration;
  this.audio.play();
}

// // timer

function countdown(seconds) {
  seconds = parseInt(sessionStorage.getItem("seconds")) || seconds;

  function tick() {
    seconds--;
    sessionStorage.setItem("seconds", seconds);
    var current_days = parseInt(seconds / 86400);
    var current_hours = parseInt(seconds / 3600 - current_days * 24);
    var current_minutes = parseInt(
      seconds / 60 - (current_hours + current_days * 24) * 60
    );
    var current_seconds = seconds % 60;
    document.getElementById("day").innerHTML = current_days;
    document.getElementById("hour").innerHTML = current_hours;
    document.getElementById("minute").innerHTML = current_minutes;
    document.getElementById("second").innerHTML = current_seconds;
    if (seconds > 0) {
      setTimeout(tick, 1000);
    }
  }
  tick();
}

countdown(432000);

// // login form
const form = document.getElementById("signUp");
const username = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const rePassword = document.getElementById("repass");

const userTip = document.getElementById("userErr");
const emailTip = document.getElementById("emailErr");
const passTip = document.getElementById("passErr");
const rePassTip = document.getElementById("repassErr");

let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passRegEx = /[A-Za-z\d]{8,}$/;

username.addEventListener("input", function (e) {
  if (e.target.value.length < 6) {
    userTip.innerText = "You need at least 6 characters";
  } else {
    userTip.innerText = "";
  }
});

email.addEventListener("input", function (e) {
  if (!emailRegEx.test(e.target.value)) {
    emailTip.innerText = "Email ist not valid";
  } else {
    emailTip.innerText = "";
  }
});

password.addEventListener("input", function (e) {
  if (!passRegEx.test(e.target.value)) {
    passTip.innerText = "Must be longer than 8";
  } else {
    passTip.innerText = "";
  }
});

rePassword.addEventListener("input", function (e) {
  if (e.target.value !== password.value) {
    rePassTip.innerText = "Dosen't match Password";
  } else {
    rePassTip.innerText = "";
  }
});

let errCheck = 0;
const errors = document.getElementsByClassName("error");
for (let i = 0; i < errors.length; i++) {
  if (errors[i] !== "") {
    errCheck += 1;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Focus on empty fields
  if (username.value.length === 0) {
    username.focus();
    return;
  }
  if (email.value.length === 0) {
    email.focus();
    return;
  }
  if (password.value.length === 0) {
    password.focus();
    return;
  }
  if (rePassword.value.length === 0) {
    rePassword.focus();
    return;
  }
});
