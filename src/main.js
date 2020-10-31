//CSS AND SASS
import cssNormalize from "./css/base/normalize.css";
import "./css/fonts.css";
import cssStyle from "./css/style.scss";

//IMPORTS
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
// prettier-ignore
import { camera, scene, renderer, controls, musicHome} from "./cameraSceneRenderer.js";

import ComposerEffects from "./composer.js";

import ParticlesEnvironment from "./ParticlesEnvironment.js";
import { updateLights } from "./lights.js";
import LoadGLTF from "./animals.js";
import Floors from "./Floors.js";
import Rays from "./rays.js";

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
import { LogLuvEncoding, Ray } from "three";

let status, stats;
let geometry, material, meshRoot;
let horse, fox, panther, wolf, bear, eagle, vulture, frog, aligator;
let composerEffects;
let particles;
let floor;
let rays;
let visivel = true;

init();
animate();

function init() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  status = document.createElement("div");

  // document.body.appendChild(status);
  // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  // var material = new THREE.MeshBasicMaterial({
  //   color: 0x44ffff,
  //   side: THREE.DoubleSide,
  //   wireframe: true,
  // });

  /* ANIMALS VALUES LIST
    gltfAnimal,
    scale,
    velocity,
    velocityMoviment,
    initialPosition,
    verticalPos,
    limitPositionAnimals,
    distortion,
    zPos,
    yRotationInverted,
    inverted
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
  aligator = new LoadGLTF(gltfAligator, scene, camera, 0.0318, 9, 0.5, -26, -6.0, 150, 600, -21, true, true);
  // prettier-ignore-end

  // meshRoot = new THREE.Mesh(geometry, material);
  // scene.add(meshRoot);
  // addPlaneCustomShader();

  //PARTICLES
  particles = new ParticlesEnvironment(5000, scene);

  //FLOOR
  floor = new Floors(scene, camera);

  //BOX MENU

  var geometryBoxLine = new THREE.BoxGeometry(2.8, 1, 0.2, 1, 1);
  const materialLine = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 0.1,
    linecap: "round", //ignored by WebGLRenderer
    linejoin: "round", //ignored by WebGLRenderer
  });
  var geoEdge = new THREE.EdgesGeometry(geometryBoxLine);
  var wireframeBox = new THREE.LineSegments(geoEdge, materialLine);
  wireframeBox.position.y = 0.55;
  // scene.add(wireframeBox);

  //RAYS

  rays = new Rays(25, scene, camera);

  //COMPOSER
  composerEffects = new ComposerEffects(scene, camera, renderer);

  //STATUS
  status.appendChild(stats.dom);
}

function animate() {
  requestAnimationFrame(animate);
  if (visivel) {
    // if (typeof musicHome != "undefined") {
    //   musicHome.playSound();
    // }
    renderer.clear();
    horse.updateAnimal();
    fox.updateAnimal();
    wolf.updateAnimal();
    panther.updateAnimal();
    bear.updateAnimal();
    eagle.updateAnimal();
    vulture.updateAnimal();
    // frog.updateAnimal();
    aligator.updateAnimal();
    // meshRoot.rotation.x += 0.01;
    // meshRoot.rotation.y += 0.02;
    particles.updateParticles();
    floor.update();
    rays.update();
    // updateLights();
    controls.update();
    composerEffects.render();
    stats.update();
    // renderer.render(scene, camera);
  }
}

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
      visivel = false;
      if (typeof musicHome != "undefined") {
        musicHome.pauseSound();
      }
    } else {
      visivel = true;
      if (typeof musicHome != "undefined") {
        musicHome.playSound();
      }
    }
    // console.log(visivel);
    // console.log(document.hidden);
  },
  false
);
