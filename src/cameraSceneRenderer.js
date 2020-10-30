import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import stranger from "./sounds/stranger-things-theme-song.ogg";
import LoadSound from "./sound.js";

export var camera, scene, renderer, controls, musicHome;

let orbitEnded = true;
let posCameraInit = new THREE.Vector3(0.0, 0.0, 10.0);
let rotCameraInit = new THREE.Vector3(0.0, 0.0, 0.0);

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);
camera.position.z = 10;

scene = new THREE.Scene();
{
  const near = 1;
  const far = 70;
  const color = "#000020";
  scene.fog = new THREE.Fog(color, near, far);
  scene.background = new THREE.Color(color);
}

renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.autoClear = false; // important!
// renderer.autoClearColor = false; // important!
// renderer.autoClearDepth = false; // important!
// renderer.setClearColor(0x000000, 0.1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "stage";

document.body.appendChild(renderer.domElement);

const initOrbit = (pos, rot) => {
  orbitEnded = false;
  if (typeof musicHome == "undefined") {
    musicHome = new LoadSound(scene, camera, stranger);
    document.querySelector("h1").innerHTML = "JHUN KUSANO";
    document.querySelector("canvas").classList.add("on");
    document.getElementsByClassName("menu-home")[0].classList.add("on");
  }
};

const endOrbit = (pos, rot) => {
  orbitEnded = true;
};

const updateEndOrbit = () => {
  if (orbitEnded) {
    camera.position.x = lerp(camera.position.x, posCameraInit.x, 0.1);
    camera.position.y = lerp(camera.position.y, posCameraInit.y, 0.1);
    camera.position.z = lerp(camera.position.z, posCameraInit.z, 0.1);
    camera.rotation.x = lerp(camera.rotation.x, rotCameraInit.x, 0.1);
    camera.rotation.y = lerp(camera.rotation.y, rotCameraInit.y, 0.1);
    camera.rotation.z = lerp(camera.rotation.z, rotCameraInit.z, 0.1);
  }
};

setInterval(updateEndOrbit, 1000 / 60);

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = 1.77;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.17;
controls.addEventListener("start", initOrbit, false);
controls.addEventListener("end", endOrbit, false);
