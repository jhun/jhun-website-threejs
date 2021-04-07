//CSS AND SASS
import cssNormalize from "./css/base/normalize.css";
import "./css/fonts.css";
import cssStyle from "./css/style.scss";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/fontawesome-free-solid";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Add all icons to the library so you can use it in your page
library.add(fab);
dom.watch();

//routers
import { navigation } from "./js/routers.js";

//IMPORTS
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
// prettier-ignore
import { camera, scene, renderer, orbitTarget, posCameraInit, updateEndOrbit} from "./js/cameraSceneRenderer.js";

import ComposerEffects from "./js/classes/Composer.js";

import ParticlesEnvironment from "./js/classes/ParticlesEnvironment.js";
import { updateLights } from "./js/lights.js";
import LoadGLTF from "./js/classes/LoadGLTF.js";
import Floors from "./js/classes/Floors.js";
import Rays from "./js/classes/Rays.js";

// GLTF MODELS
import gltfCavalo from "./models/life_soup/quadruped_horse.gltf";
import gltfFox from "./models/life_soup/quadruped_fox.gltf";
import gltfPanther from "./models/black_soup/quadruped_panther.gltf";
import gltfWolf from "./models/black_soup/quadruped_wolf.gltf";
import gltfBear from "./models/life_soup/quadruped_bear.gltf";
import gltfEagle from "./models/life_soup/birdsA_eagle.gltf";
import gltfVulture from "./models/black_soup/birds_vulture.gltf";
// import gltfFrog from "./models/life_soup/quadruped_frog.gltf";
import gltfAligator from "./models/black_soup/alligator.gltf";
import gltfShark from "./models/shark.gltf";
import gltfWhale from "./models/whale.gltf";
import gltfOctopus from "./models/octopus.gltf";
// import gltfFish from "./models/life_soup/fishA.gltf";

const YTPlayer = require("yt-player");

//SOUNDS
import stranger from "./sounds/Daft-Punk-Recognizer.mp3";
import LoadSound from "./js/classes/Sound.js";

//SHADERS
import { vertexShader, fragmentShader } from "./glsl/photoShader.js";
import foto from "./imagens/jhun.jpg";

//WORKS
import { worksList } from "./js/worksList.js";

//LAB
import { labList } from "./js/labList.js";

const axios = require("axios");

let stats;
let showStatus = false;
let geometry, material, meshRoot;
let horse,
  fox,
  panther,
  wolf,
  bear,
  eagle,
  vulture,
  frog,
  aligator,
  shark,
  whale,
  octopus;
// fish = new Array(1);

let composerEffects;
let particles;
let floor;
let rays;
let btsMenu;
let menuHolder;
let titulo;
let musicHome;
let lowpass = 1000;
let Q = 0;
let gain = 0.5;

// let materialFoto;
// let geometryFoto;
// let meshFoto;
// let boxFoto;
// let posZFoto;
const center = new THREE.Vector3();
// let uniformsFoto;
let clock = new THREE.Clock();

let domElement;
let timerScroll;

let enterSection = false;

let timer;

window.currentSection = "";
let started = false;

window.playerObject;
window.playerLabObject;
let playerPlaying = false;
let playerPlayingLab = false;

window.checkCurrentSection = () => {
  let bts;
  let bt;
  if (started) {
    switch (window.currentSection) {
      case "home":
        orbitTarget.x = -20;
        orbitTarget.y = 0;
        orbitTarget.z = 0;
        posCameraInit.x = 0;
        posCameraInit.y = 0;
        posCameraInit.z = 10;
        menuHolder[0].classList.remove("in");
        rays.colorR = 1;
        rays.colorG = 1;
        rays.colorB = 1;
        floor.sunColor = new THREE.Color(1, 0.1, 0);
        bts = document.getElementsByClassName("bt-menu");
        for (let i = 0; i < bts.length; i++) {
          bts[i].classList.remove("off");
        }
        domContent("home");
        break;
      case "about":
        orbitTarget.x = -20;
        orbitTarget.y = 0;
        orbitTarget.z = -10;
        posCameraInit.x = -50;
        posCameraInit.y = 20;
        posCameraInit.z = -20;
        rays.colorR = 1;
        rays.colorG = 1;
        rays.colorB = 1;
        menuHolder[0].classList.add("in");
        floor.sunColor = new THREE.Color(0.6, 0.6, 0.8);
        bts = document.getElementsByClassName("bt-menu");
        for (let i = 0; i < bts.length; i++) {
          bts[i].classList.remove("off");
        }
        bt = document.getElementById("bt-about");
        bt.classList.add("off");
        domContent("about");
        break;
      case "works":
        orbitTarget.x = 30;
        orbitTarget.y = 45;
        orbitTarget.z = 0;
        posCameraInit.x = -20;
        posCameraInit.y = 45;
        posCameraInit.z = 10;
        rays.colorR = 0.7;
        rays.colorG = 0.2;
        rays.colorB = 0.1;
        menuHolder[0].classList.add("in");
        floor.sunColor = new THREE.Color(1, 0.1, 0);
        bts = document.getElementsByClassName("bt-menu");
        for (let i = 0; i < bts.length; i++) {
          bts[i].classList.remove("off");
        }
        bt = document.getElementById("bt-works");
        bt.classList.add("off");
        domContent("works");
        // domContent("soon");
        break;
      case "lab":
        orbitTarget.x = -18;
        orbitTarget.y = -50;
        orbitTarget.z = 0;
        posCameraInit.x = 0;
        posCameraInit.y = -50;
        posCameraInit.z = 10;
        rays.colorR = 1;
        rays.colorG = 1;
        rays.colorB = 1;
        menuHolder[0].classList.add("in");
        floor.sunColor = new THREE.Color(1, 0.1, 0);
        bts = document.getElementsByClassName("bt-menu");
        for (let i = 0; i < bts.length; i++) {
          bts[i].classList.remove("off");
        }
        bt = document.getElementById("bt-lab");
        bt.classList.add("off");
        domContent("lab");
        // domContent("soon");
        break;
      case "contact":
        orbitTarget.x = 400;
        orbitTarget.y = 125;
        orbitTarget.z = 0;
        posCameraInit.x = 300;
        posCameraInit.y = 125;
        posCameraInit.z = 0;
        rays.colorR = 1;
        rays.colorG = 1;
        rays.colorB = 1;
        menuHolder[0].classList.add("in");
        floor.sunColor = new THREE.Color(1, 0.1, 0);
        bts = document.getElementsByClassName("bt-menu");
        for (let i = 0; i < bts.length; i++) {
          bts[i].classList.remove("off");
        }
        bt = document.getElementById("bt-contact");
        bt.classList.add("off");
        domContent("contact");
        break;
    }
  }
};

const makeCard = (
  cardId,
  cardType,
  cardTitle,
  cardClient,
  cardBackgroundImage
) => {
  switch (cardType) {
    case "normal":
      let card = document.createElement("div");
      card.classList.add("card");
      card.dataset.cardId = cardId;
      let bg = document.createElement("div");
      bg.classList.add("bg");
      card.style.backgroundImage = `url(${cardBackgroundImage})`;
      if (currentSection == "works") {
        bg.style.backgroundImage = `linear-gradient(
        rgba(255, 120, 0, 1), 
        rgba(255, 120, 0, 1)
      ), url(${cardBackgroundImage})`;
      } else {
        bg.style.backgroundImage = `linear-gradient(
          rgba(120, 00, 255, 1), 
          rgba(120, 00, 255, 1)
        ), url(${cardBackgroundImage})`;
      }
      card.appendChild(bg);
      let titleCard = document.createElement("div");
      titleCard.classList.add("title");
      titleCard.innerHTML = cardTitle;
      card.appendChild(titleCard);

      return card;
      break;
    case "tall":
      let cardTall = document.createElement("div");
      cardTall.classList.add("card", "card-tall");
      cardTall.dataset.cardId = cardId;
      let bgTall = document.createElement("div");
      bgTall.classList.add("bg");
      cardTall.style.backgroundImage = `url(${cardBackgroundImage})`;
      if (currentSection == "works") {
        bgTall.style.backgroundImage = `linear-gradient(
        rgba(255, 120, 0, 1), 
        rgba(255, 120, 0, 1)
      ), url(${cardBackgroundImage})`;
      } else {
        bgTall.style.backgroundImage = `linear-gradient(
          rgba(120, 00, 255, 1), 
          rgba(120, 00, 255, 1)
        ), url(${cardBackgroundImage})`;
      }
      cardTall.appendChild(bgTall);
      let titleCardTall = document.createElement("div");
      titleCardTall.classList.add("title");
      titleCardTall.innerHTML = cardTitle;
      cardTall.appendChild(titleCardTall);
      // cardTall.style.backgroundImage = `url(${cardBackgroundImage})`;
      return cardTall;
      break;
    case "wide":
      let cardWide = document.createElement("div");
      cardWide.classList.add("card", "card-wide");
      cardWide.dataset.cardId = cardId;
      let bgWide = document.createElement("div");
      bgWide.classList.add("bg");
      bgWide.classList.add("bg-wide");
      cardWide.style.backgroundImage = `url(${cardBackgroundImage})`;
      if (currentSection == "works") {
        bgWide.style.backgroundImage = `linear-gradient(
        rgba(255, 120, 0, 1), 
        rgba(255, 120, 0, 1)
      ), url(${cardBackgroundImage})`;
      } else {
        bgWide.style.backgroundImage = `linear-gradient(
          rgba(120, 00, 255, 1), 
          rgba(120, 00, 255, 1)
        ), url(${cardBackgroundImage})`;
      }
      cardWide.appendChild(bgWide);
      let titleCardWide = document.createElement("div");
      titleCardWide.classList.add("title");
      titleCardWide.innerHTML = cardTitle;
      cardWide.appendChild(titleCardWide);
      // cardWide.style.backgroundImage = `url(${cardBackgroundImage})`;
      return cardWide;
      break;
    case "tallWide":
      let cardTallWide = document.createElement("div");
      cardTallWide.classList.add("card", "card-tall", "card-wide");
      cardTallWide.dataset.cardId = cardId;
      let bgTallWide = document.createElement("div");
      bgTallWide.classList.add("bg");
      cardTallWide.style.backgroundImage = `url(${cardBackgroundImage})`;
      if (currentSection == "works") {
        bgTallWide.style.backgroundImage = `linear-gradient(
        rgba(255, 120, 0, 1), 
        rgba(255, 120, 0, 1)
      ), url(${cardBackgroundImage})`;
      } else {
        bgTallWide.style.backgroundImage = `linear-gradient(
          rgba(120, 00, 255, 1), 
          rgba(120, 00, 255, 1)
        ), url(${cardBackgroundImage})`;
      }
      cardTallWide.appendChild(bgTallWide);
      let titleCardTallWide = document.createElement("div");
      titleCardTallWide.classList.add("title");
      titleCardTallWide.innerHTML = cardTitle;
      cardTallWide.appendChild(titleCardTallWide);
      // cardTallWide.style.backgroundImage = `url(${cardBackgroundImage})`;
      return cardTallWide;
      break;
  }
};
const cardOver = (e) => {
  e.target.classList.add("on");
  e.target.querySelector(".bg").classList.add("on");
  e.target.querySelector(".title").classList.add("on");
  if (currentSection == "lab") {
    e.target.querySelector(".title").classList.add("deep");
  }
};
const cardOut = (e) => {
  e.target.classList.remove("on");
  e.target.querySelector(".bg").classList.remove("on");
  e.target.querySelector(".title").classList.remove("on");
  if (currentSection == "lab") {
    e.target.querySelector(".title").classList.remove("deep");
  }
};
const cardOpen = (e, cardId) => {
  e.target.classList.remove("on");
  e.target.querySelector(".title").classList.remove("on");
  document.getElementById("content-works").classList.remove("on");
  let cardInside = document.getElementById("card-inside");
  window.playerObject.load(worksList[cardId].content.videoID);
  window.playerObject.setVolume(100);

  window.playerObject.on("playing", () => {
    console.log("playing");
    playerPlaying = true;
  });
  window.playerObject.on("paused", () => {
    playerPlaying = false;
  });

  let cardInsideTitle = document.getElementById("card-inside-title");
  cardInsideTitle.innerHTML = worksList[cardId].title;

  let cardInsideSubtitle = document.getElementById("card-inside-subtitle");
  cardInsideSubtitle.innerHTML = `<span>Client:</span> ${worksList[cardId].client} <span>Category:</span> ${worksList[cardId].category} <span>Tech:</span> ${worksList[cardId].technology} `;

  let cardInsideDescription = document.getElementById(
    "card-inside-description"
  );
  cardInsideDescription.innerHTML = worksList[cardId].description;

  timer = setTimeout(() => {
    clearTimeout(timer);
    let btFechar = document.getElementById("bt-fechar");
    btFechar.addEventListener("click", cardClose);
    cardInside.classList.add("on");
  }, 1000);
};
const cardClose = (e) => {
  document.getElementById("content-works").classList.add("on");
  document.getElementById("card-inside").classList.remove("on");
  try {
    playerPlaying = false;
    window.playerObject.pause();
  } catch (err) {}
};

const cardOpenLab = (e, cardId) => {
  e.target.classList.remove("on");
  e.target.querySelector(".title").classList.remove("on");
  document.getElementById("content-lab").classList.remove("on");
  let cardInsideLab = document.getElementById("card-inside-lab");
  window.playerLabObject.load(labList[cardId].content.videoID);
  window.playerLabObject.setVolume(100);

  window.playerLabObject.on("playing", () => {
    playerPlayingLab = true;
  });
  window.playerLabObject.on("paused", () => {
    playerPlayingLab = false;
  });

  let cardInsideLabTitle = document.getElementById("card-inside-lab-title");
  cardInsideLabTitle.innerHTML = labList[cardId].title;

  let cardInsideLabSubtitle = document.getElementById(
    "card-inside-lab-subtitle"
  );
  cardInsideLabSubtitle.innerHTML = `<span>Client:</span> ${labList[cardId].client} <span>Category:</span> ${labList[cardId].category} <span>Tech:</span> ${labList[cardId].technology} `;

  let cardInsideLabDescription = document.getElementById(
    "card-inside-lab-description"
  );
  cardInsideLabDescription.innerHTML = labList[cardId].description;
  timer = setTimeout(() => {
    clearTimeout(timer);
    let btFecharLab = document.getElementById("bt-fechar-lab");
    btFecharLab.addEventListener("click", cardCloseLab);
    cardInsideLab.classList.add("on");
  }, 1000);
};
const cardCloseLab = (e) => {
  document.getElementById("content-lab").classList.add("on");
  document.getElementById("card-inside-lab").classList.remove("on");
  try {
    playerPlayingLab = false;
    window.playerLabObject.pause();
  } catch (err) {}
};

const domContent = (section) => {
  while (domElement === undefined) {
    domElement = document.getElementById("dom-elements");
  }
  enterSection = false;
  try {
    clearTimeout(timer);
  } catch (err) {}

  // try {
  //   camera.remove(meshFoto);
  // } catch (err) {}

  if (domElement !== undefined) {
    while (domElement.firstChild) {
      domElement.removeChild(domElement.firstChild);
    }
    domElement.classList.remove("on");
    const element = document.createElement("div");
    element.classList.add("div-null");
    domElement.appendChild(element);
    let content;
    try {
      content.classList.remove("on");
    } catch (err) {}
    switch (section) {
      case "home":
        playerPlaying = false;
        playerPlayingLab = false;
        break;
      case "about":
        playerPlaying = false;
        playerPlayingLab = false;
        content = document.createElement("div");
        content.id = "content-about";
        const aboutPhoto = document.createElement("img");
        aboutPhoto.id = "about-photo";
        aboutPhoto.src = "https://jhun.com.br/imagens/jhun.jpg";

        const aboutText = document.createElement("div");
        aboutText.id = "about-text";
        const aboutSpan = document.createElement("p");
        aboutSpan.innerHTML = `Hi! I am Jhun, a Brazilian passionate about technology who lives his days in search of purposes in his work, hoping to improve the world in some way.
        <br />
        <br />
        I'm graduated in Graphic Design and post-graduated (MBA) in Software Engineering. This sums up my multidisciplinary profile, always immersed in design and technology, mainly in interactive computer graphics, software engineering and electronics focused on the maker culture.
        <br />
        <br />
        I currently work at Umantech as Tech Lead, but I am always open to talk about possible projects.
        <br />
        <br />
        Feel free to <span class="send-message">send me a message</span>!
        <br />
        <br />
        My Curriculum Vitae: <a href="https://jhun.com.br/cv-jhun.pdf" target="_blank">click here</a>
        <br />
        <br />
        e-mail: <a href="mailto:jhun@jhun.com.br">jhun@jhun.com.br</a>
        <br />
        linkedin: <a href="https://www.linkedin.com/in/denisjhunkusano" target="_blank">denisjhunkusano</a>
        <br />
        instagram: <a href="https://www.instagram.com/jhunkusano" target="_blank">jhunkusano</a>
        <br />
        github: <a href="https://github.com/jhun" target="_blank">jhun</a>`;

        aboutText.appendChild(aboutSpan);
        content.appendChild(aboutPhoto);
        content.appendChild(aboutText);
        element.appendChild(content);

        timer = setTimeout(() => {
          clearTimeout(timer);
          let sendMessage = document.getElementsByClassName("send-message");
          sendMessage[0].addEventListener("click", (e) => {
            menuClicked("bt-contact");
          });
          // camera.add(meshFoto);
          // if (window.innerWidth >= window.innerHeight) {
          //   meshFoto.scale.set(1.1, 1.1, 1.1);
          //   meshFoto.position.set(
          //     positionObjectAt(posZFoto, 0, 0.0).x - 0.33,
          //     positionObjectAt(posZFoto, 0, 0.0).y + 0.02,
          //     posZFoto
          //   );
          // } else {
          //   meshFoto.scale.set(0.9, 0.9, 0.9);
          //   meshFoto.position.set(
          //     positionObjectAt(posZFoto, 0.0, 0).x,
          //     positionObjectAt(posZFoto, 0.0, 0).y +
          //       boxFoto.getSize(center).y / 3,
          //     posZFoto
          //   );
          // }
          enterSection = true;
          domElement.classList.add("on");
          content.classList.add("on");
        }, 3000);

        break;
      case "works":
        playerPlaying = false;
        playerPlayingLab = false;
        window.playerObject = undefined;
        content = document.createElement("div");
        content.id = "content-works";
        content.classList.add("image-mosaic");
        worksList.map((work) => {
          let newCard = makeCard(
            work.id,
            work.cardType,
            work.title,
            work.client,
            work.backgroundImage
          );
          content.appendChild(newCard);
        });
        const cardInside = document.createElement("div");
        cardInside.id = "card-inside";

        let btFechar = document.createElement("div");
        btFechar.id = "bt-fechar";
        cardInside.appendChild(btFechar);

        let cardInsideTitle = document.createElement("h1");
        cardInsideTitle.id = "card-inside-title";
        cardInside.appendChild(cardInsideTitle);

        let cardInsideSubtitle = document.createElement("h2");
        cardInsideSubtitle.id = "card-inside-subtitle";
        cardInside.appendChild(cardInsideSubtitle);

        let cardInsidePlayer = document.createElement("div");
        cardInsidePlayer.id = "player";
        cardInside.appendChild(cardInsidePlayer);

        let cardInsideDescription = document.createElement("p");
        cardInsideDescription.id = "card-inside-description";
        cardInside.appendChild(cardInsideDescription);

        domElement.appendChild(cardInside);
        element.appendChild(content);
        timer = setTimeout(() => {
          clearTimeout(timer);
          domElement.classList.add("on");
          content.classList.add("on");
          if (window.playerObject === undefined) {
            window.playerObject = new YTPlayer("#player");
          }
          var cardsClass = document.getElementsByClassName("card");
          for (var i = 0; i < cardsClass.length; i++) {
            let id = cardsClass[i].dataset.cardId;
            cardsClass[i].addEventListener("mouseover", cardOver);
            cardsClass[i].addEventListener("mouseout", cardOut);
            cardsClass[i].addEventListener("click", (e) => {
              cardOpen(e, id);
            });
          }
        }, 3000);
        break;
      case "lab":
        playerPlaying = false;
        playerPlayingLab = false;
        window.playerLabObject = undefined;
        content = document.createElement("div");
        content.id = "content-lab";
        content.classList.add("image-mosaic");
        labList.map((lab) => {
          let newCard = makeCard(
            lab.id,
            lab.cardType,
            lab.title,
            lab.client,
            lab.backgroundImage
          );
          content.appendChild(newCard);
        });
        const cardInsideLab = document.createElement("div");
        cardInsideLab.id = "card-inside-lab";

        let btFecharLab = document.createElement("div");
        btFecharLab.id = "bt-fechar-lab";
        cardInsideLab.appendChild(btFecharLab);

        let cardInsideLabTitle = document.createElement("h1");
        cardInsideLabTitle.id = "card-inside-lab-title";
        cardInsideLab.appendChild(cardInsideLabTitle);

        let cardInsideLabSubtitle = document.createElement("h2");
        cardInsideLabSubtitle.id = "card-inside-lab-subtitle";
        cardInsideLab.appendChild(cardInsideLabSubtitle);

        let cardInsideLabPlayer = document.createElement("div");
        cardInsideLabPlayer.id = "player-lab";
        cardInsideLab.appendChild(cardInsideLabPlayer);

        let cardInsideLabDescription = document.createElement("p");
        cardInsideLabDescription.id = "card-inside-lab-description";
        cardInsideLab.appendChild(cardInsideLabDescription);

        domElement.appendChild(cardInsideLab);
        element.appendChild(content);
        timer = setTimeout(() => {
          clearTimeout(timer);
          domElement.classList.add("on");
          content.classList.add("on");
          if (window.playerLabObject === undefined) {
            window.playerLabObject = new YTPlayer("#player-lab");
          }
          var cardsClass = document.getElementsByClassName("card");
          for (var i = 0; i < cardsClass.length; i++) {
            let id = cardsClass[i].dataset.cardId;
            cardsClass[i].addEventListener("mouseover", cardOver);
            cardsClass[i].addEventListener("mouseout", cardOut);
            cardsClass[i].addEventListener("click", (e) => {
              cardOpenLab(e, id);
            });
          }
        }, 3000);
        break;
      case "contact":
        playerPlaying = false;
        playerPlayingLab = false;
        const form = document.createElement("form");

        const br = document.createElement("br");

        const inputName = document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("name", "name");
        inputName.id = "name";
        inputName.setAttribute("required", "true");
        inputName.setAttribute("placeholder", "Name");

        const inputEmail = document.createElement("input");
        inputEmail.setAttribute("type", "email");
        inputEmail.setAttribute("name", "email");
        inputEmail.id = "email";
        inputEmail.setAttribute("required", "true");
        inputEmail.setAttribute("placeholder", "E-mail");

        const inputMessage = document.createElement("textarea");
        inputMessage.setAttribute("name", "message");
        inputMessage.id = "message";
        inputMessage.setAttribute("rows", "5");
        inputMessage.setAttribute("cols", "50");
        inputMessage.setAttribute("required", "true");
        inputMessage.setAttribute("placeholder", "Message");

        const btSubmit = document.createElement("input");
        btSubmit.setAttribute("type", "submit");
        btSubmit.setAttribute("value", "Submit");

        form.appendChild(inputName);
        form.appendChild(br.cloneNode());
        form.appendChild(inputEmail);
        form.appendChild(br.cloneNode());
        form.appendChild(inputMessage);
        form.appendChild(br.cloneNode());
        form.appendChild(btSubmit);

        const infos = document.createElement("div");
        infos.id = "infos";
        infos.innerHTML = `<p><i class="fas fa-envelope"></i> <a href="mailto:jhun@jhun.com.br">jhun@jhun.com.br</a>&nbsp;&nbsp;|&nbsp;&nbsp;<i class="fab fa-instagram-square"></i> <a href="https://www.instagram.com/jhunkusano/"  target="_blank">@jhunkusano</a>&nbsp;&nbsp;|&nbsp;&nbsp;<i class="fab fa-linkedin" aria-hidden="true"></i> <a href="https://www.linkedin.com/in/denisjhunkusano"  target="_blank">denisjhunkusano</a></p><br />`;

        let feedback = document.createElement("div");
        feedback.id = "feedback";

        feedback.addEventListener("click", (e) => {
          e.stopPropagation();
          e.target.classList.remove("on");
          let form = document.querySelector("form");
          form.classList.remove("off");
        });
        form.appendChild(infos);

        element.appendChild(form);
        element.appendChild(feedback);

        form.addEventListener("submit", (e) => {
          //to prevent reload
          e.preventDefault();
          //creates a multipart/form-data object
          var body = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
          };
          axios
            .post("/send", body)
            .then((res) => {
              // console.log(res);
              if (res.status == 200) {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                let form = document.querySelector("form");
                form.classList.add("off");
                let feedback = document.getElementById("feedback");
                feedback.classList.add("on");
                feedback.innerHTML = `Awesome! I'll answer you<br />as soon as possible!`;
              }
            })
            .catch((err) => {
              throw err;
              let form = document.querySelector("form");
              form.classList.add("off");
              let feedback = document.getElementById("feedback");
              feedback.classList.add("on");
              feedback.innerHTML =
                "Oops! Something went wrong!<br />Please try again!";
            });
        });
        domElement.classList.add("on");
        setTimeout(() => {
          inputName.classList.add("on");
        }, 3000);
        setTimeout(() => {
          inputEmail.classList.add("on");
        }, 3200);
        setTimeout(() => {
          inputMessage.classList.add("on");
        }, 3400);
        setTimeout(() => {
          btSubmit.classList.add("on");
        }, 3600);
        setTimeout(() => {
          infos.classList.add("on");
        }, 3800);
        break;
      case "soon":
        content = document.createElement("div");
        content.id = "content-soon";
        content.innerHTML = `I'm sorry!<br />I'm still working on it.<br />Very soon...<br />Maybe tomorrow.`;
        element.appendChild(content);
        timer = setTimeout(() => {
          clearTimeout(timer);
          domElement.classList.add("on");
          content.classList.add("on");
        }, 3000);
        break;
    }
  }
};

const visibleHeightAtZDepth = (depth, camera) => {
  // compensate for cameras not positioned at z=0
  let cameraOffset = camera.position.z;
  // console.log(depth, cameraOffset);
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  let vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

const visibleWidthAtZDepth = (depth, camera) => {
  let height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
};

const positionObjectAt = (posZ, xNormal, yNormal) => {
  let posX =
    (visibleWidthAtZDepth(posZ + posCameraInit.z, camera) * xNormal) / 2;
  let posY =
    (visibleHeightAtZDepth(posZ + posCameraInit.z, camera) * yNormal) / 2;
  return { x: posX, y: posY };
};

const init = () => {
  //STATUS
  if (showStatus) {
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }

  //PHOTOS SHADER
  // geometryFoto = new THREE.PlaneGeometry(0.2, 0.3, 16, 16);
  // uniformsFoto = {
  //   uTime: { value: 0.0 },
  //   uMouse: { value: { x: null, y: null } },
  //   uTexture: { value: null },
  //   uOpacity: { value: 0.0 },
  // };
  // uniformsFoto.uMouse = { value: new THREE.Vector4() };
  // uniformsFoto.uTime = { value: 0.0 };
  // uniformsFoto.uTexture = { value: new THREE.TextureLoader().load(foto) };
  // materialFoto = new THREE.ShaderMaterial({
  //   vertexShader: vertexShader,
  //   fragmentShader: fragmentShader,
  //   uniforms: uniformsFoto,
  //   wireframe: false,
  //   side: THREE.DoubleSide,
  //   transparent: true,
  // });
  // meshFoto = new THREE.Mesh(geometryFoto, materialFoto);
  // camera.add(meshFoto);
  // boxFoto = new THREE.Box3().setFromObject(meshFoto);
  // posZFoto = -1;
  // if (window.innerWidth >= window.innerHeight) {
  //   meshFoto.position.set(
  //     positionObjectAt(posZFoto, 0, 0.0).x - 0.15,
  //     positionObjectAt(posZFoto, 0, 0.0).y,
  //     posZFoto
  //   );
  // } else {
  //   meshFoto.position.set(
  //     positionObjectAt(posZFoto, 0.0, 0.7).x,
  //     positionObjectAt(posZFoto, 0.0, 0.7).y - boxFoto.getSize(center).y / 2,
  //     posZFoto
  //   );
  // }

  //MENU
  menuHolder = document.getElementsByClassName("menu-holder");

  //BUTTONS
  btsMenu = document.getElementsByClassName("bt-menu");

  /* ANIMALS VALUES LIST
    gltfAnimal,
    scene,
    camera,
    scale,
    velocity,
    velocityMoviment,
    initialPosition,
    verticalPos,
    limitPositionAnimals,
    distortion,
    zPos,
    yRotationInverted,
    inverted,
    oceanCreature
  */

  // prettier-ignore
  horse = new LoadGLTF(gltfCavalo, scene, camera,  0.0318, 18, 1, -7, -4.1, 150, 600, -11,false, false);
  // prettier-ignore
  fox = new LoadGLTF(gltfFox, scene, camera, 0.0348, 15, 1, -30, -2.7, 150, 600, -5,false, true);
  // prettier-ignore
  wolf = new LoadGLTF(gltfWolf, scene, camera, 0.0348, 19, 1, 0, -3.8, 150, 600, -8,false, true);
  // prettier-ignore
  panther = new LoadGLTF(gltfPanther, scene, camera, 0.0348, 30, 1, 90, -4.9, 150, 600, -13,false, true);
  // prettier-ignore
  bear = new LoadGLTF(gltfBear, scene, camera, 0.0278, 15, 0.7, -30, -2.2, 150, 600, -2,false, true);
  // prettier-ignore
  eagle = new LoadGLTF(gltfEagle, scene, camera, 0.0318, 14, 1, -6, 5.0, 150, 600, -17,false, true);
  // prettier-ignore
  vulture = new LoadGLTF(gltfVulture, scene, camera, 0.0318, 12, .7, -4, 3.0, 150, 600, -20,false, true);
  // prettier-ignore
  // frog = new LoadGLTF(gltfFrog, scene, camera, 0.0318, 12, 0.5, -13, -1.2, 150, 600, 2,false, true);
  // prettier-ignore
  aligator = new LoadGLTF(gltfAligator, scene, camera, 0.0318, 11, 0.6, -26, -6.0, 150, 600, -21, true, true);
  // prettier-ignore
  shark = new LoadGLTF(gltfShark, scene, camera, 0.0518, 18, 1.5, -10, -32.0, 200, 600, -21, true, true, true);
  // prettier-ignore
  whale = new LoadGLTF(gltfWhale, scene, camera, 0.0518, 13, 1, -100, -48.0, 200, 600, -21, true, true, true);
  // prettier-ignore
  octopus = new LoadGLTF(gltfOctopus, scene, camera, 0.0518, 14, 1.5, 100, -32.0, 250, 600, -21, true, true, true);
  // prettier-ignore
  // for (let i=0; i< fish.length;i++){
  //   fish[i] = new LoadGLTF(gltfFish, scene, camera, randomFloatFromInterval(0.0018,0.0178 ),randomFloatFromInterval(5, 12),randomFloatFromInterval(0.2, 1.0), randomFloatFromInterval(-150, 145), randomFloatFromInterval(-80, -20), 150, 600, randomFloatFromInterval(-40, 10), false, true, true);
  // }

  //PARTICLES
  particles = new ParticlesEnvironment(2000, scene);

  //FLOOR
  floor = new Floors(scene, camera);

  //BOX MENU
  // var geometryBoxLine = new THREE.BoxGeometry(2.8, 1, 0.2, 1, 1);
  // const materialLine = new THREE.LineBasicMaterial({
  //   color: 0xffffff,
  //   linewidth: 0.1,
  //   linecap: "round", //ignored by WebGLRenderer
  //   linejoin: "round", //ignored by WebGLRenderer
  // });
  // var geoEdge = new THREE.EdgesGeometry(geometryBoxLine);
  // var wireframeBox = new THREE.LineSegments(geoEdge, materialLine);
  // wireframeBox.position.y = 0.55;
  // scene.add(wireframeBox);

  //RAYS
  rays = new Rays(25, scene, camera);

  //COMPOSER
  composerEffects = new ComposerEffects(scene, camera, renderer);

  //ROUTER
  // navigation(window.location.pathname);
};

const animate = () => {
  requestAnimationFrame(animate);

  renderer.clear();

  particles.updateParticles();

  floor.update();

  // updateLights();

  updateEndOrbit();

  horse.updateAnimal();
  fox.updateAnimal();
  wolf.updateAnimal();
  panther.updateAnimal();
  bear.updateAnimal();
  eagle.updateAnimal();
  vulture.updateAnimal();
  // frog.updateAnimal();
  aligator.updateAnimal();

  if (typeof musicHome != "undefined") {
    if (camera.position.y < -2) {
      lowpass = 130;
      Q = 15;
      gain = 0.3;
      shark.updateAnimal();
      whale.updateAnimal();
      octopus.updateAnimal();
      // for (let i = 0; i < fish.length; i++) {
      //   fish[i].updateAnimal();
      // }
    } else {
      lowpass = 2000;
      Q = 0;
      gain = 0.5;
      rays.update();
    }
    musicHome.changeLowpass(lowpass, Q, gain);
  }

  if (musicHome && musicHome.sound.isPlaying) {
    if (playerPlaying || playerPlayingLab) {
      if (musicHome.sound.getVolume() > 0.0) {
        musicHome.changeVolume(0.0);
      }
    } else {
      if (musicHome.sound.getVolume() < 1) {
        musicHome.changeVolume(1);
      }
    }
  }

  // materialFoto.uniforms.uTime.value = clock.getElapsedTime();

  // if (
  //   window.currentSection == "about" &&
  //   enterSection &&
  //   materialFoto.uniforms.uOpacity.value < 0.8
  // ) {
  //   materialFoto.uniforms.uOpacity.value += 0.02;
  // } else if (
  //   window.currentSection != "about" &&
  //   materialFoto.uniforms.uOpacity.value > 0.0
  // ) {
  //   materialFoto.uniforms.uOpacity.value = 0.0;
  // }

  composerEffects.render();
  // renderer.render(scene, camera);
  if (showStatus) {
    stats.update();
  }
};

const menuClicked = (id) => {
  if (id == "bt-about") {
    navigation("/about");
  } else if (id == "bt-works") {
    navigation("/works");
  } else if (id == "bt-lab") {
    navigation("/lab");
  } else if (id == "bt-contact") {
    navigation("/contact");
  }
};

const randomFloatFromInterval = (min, max) => {
  return Math.random() * (max - min) + min;
};

const SmoothScroll = (target, speed, smooth) => {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
};

document.addEventListener("DOMContentLoaded", () => {
  domElement = document.getElementById("dom-elements");
  SmoothScroll(domElement, 120, 12);
});

window.onload = function () {
  document.querySelector("body").classList.remove("initial-hide");
  document.querySelector("h1").innerHTML = "";
};

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composerEffects.composer.setSize(window.innerWidth, window.innerHeight);

  // if (window.innerWidth >= window.innerHeight) {
  //   meshFoto.scale.set(1.1, 1.1, 1.1);
  //   meshFoto.position.set(
  //     positionObjectAt(posZFoto, 0, 0.0).x - 0.33,
  //     positionObjectAt(posZFoto, 0, 0.0).y + 0.02,
  //     posZFoto
  //   );
  // } else {
  //   meshFoto.scale.set(0.9, 0.9, 0.9);
  //   meshFoto.position.set(
  //     positionObjectAt(posZFoto, 0.0, 0).x,
  //     positionObjectAt(posZFoto, 0.0, 0).y + boxFoto.getSize(center).y / 3,
  //     posZFoto
  //   );
  // }
}

document.addEventListener(
  "visibilitychange",
  (event) => {
    if (document.hidden) {
      if (typeof musicHome != "undefined") {
        musicHome.pauseSound();
      }
    } else {
      if (typeof musicHome != "undefined") {
        musicHome.playSound();
      }
    }
  },
  false
);

titulo = document.getElementById("title");
titulo.addEventListener("click", (e) => {
  if (e.target.innerHTML === "START HERE") {
    started = true;
    navigation(window.location.pathname);
    if (typeof musicHome == "undefined") {
      musicHome = new LoadSound(scene, camera, stranger);
    }

    e.target.innerHTML = `JHUN KUSANO`;

    document.querySelector("canvas").classList.add("on");
    document.getElementsByClassName("menu-home")[0].classList.add("on");
    btsMenu = document.getElementsByClassName("bt-menu");

    for (let i = 0; i < btsMenu.length; i++) {
      btsMenu[i].addEventListener(
        "click",
        (e) => {
          menuClicked(e.target.id);
        },
        false
      );
    }
  } else {
    navigation("/");
  }
});

init();
animate();
