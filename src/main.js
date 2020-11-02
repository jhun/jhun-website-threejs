//CSS AND SASS
import cssNormalize from "./css/base/normalize.css";
import "./css/fonts.css";
import cssStyle from "./css/style.scss";

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

//SOUNDS
import stranger from "./sounds/stranger-things-theme-song.ogg";
import LoadSound from "./js/classes/Sound.js";

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

const init = () => {
  //STATUS
  if (showStatus) {
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }

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

  // addPlaneCustomShader();

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
      lowpass = 150;
      Q = 15;
      gain = 1;
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

  composerEffects.render();
  // renderer.render(scene, camera);
  if (showStatus) {
    stats.update();
  }
};

const menuClicked = (id) => {
  console.log(id);
  if (id == "bt-about") {
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
  } else if (id == "bt-works") {
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
  } else if (id == "bt-lab") {
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
  } else if (id == "bt-contact") {
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
  }
};

const randomFloatFromInterval = (min, max) => {
  return Math.random() * (max - min) + min;
};

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
  } else if (e.target.innerHTML === "JHUN KUSANO") {
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
  }
});

init();
animate();
