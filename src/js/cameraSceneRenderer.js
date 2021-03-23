import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export let camera,
  scene,
  renderer,
  controls,
  posCameraInit,
  orbitTarget,
  lerpVal;

let orbitEnded = true;
orbitTarget = new THREE.Vector3(-20.0, 0.0, 0.0);
posCameraInit = new THREE.Vector3(0.0, 0.0, 10.0);
lerpVal = new THREE.Vector2(0.1, 0.0);

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);

scene = new THREE.Scene();
{
  const near = 1;
  const far = 140;
  const color = "#000015";
  scene.fog = new THREE.Fog(color, near, far);
  scene.background = new THREE.Color(color);
}
scene.add(camera);

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

let canvas = document.querySelector("canvas");

const initOrbit = (pos, rot) => {
  canvas.style.cursor = "move";
  orbitEnded = false;
};

const endOrbit = (pos, rot) => {
  canvas.style.cursor = "grab";
  orbitEnded = true;
};

export const updateEndOrbit = () => {
  if (orbitEnded) {
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    camera.position.x = lerp(camera.position.x, posCameraInit.x, 0.01);
    camera.position.y = lerp(camera.position.y, posCameraInit.y, 0.01);
    camera.position.z = lerp(camera.position.z, posCameraInit.z, 0.01);
    controls.target.x = lerp(controls.target.x, orbitTarget.x, 0.01);
    controls.target.y = lerp(controls.target.y, orbitTarget.y, 0.01);
    controls.target.z = lerp(controls.target.z, orbitTarget.z, 0.01);
  }
  controls.update();
};

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = 1.65;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.17;
controls.addEventListener("start", initOrbit, false);
controls.addEventListener("end", endOrbit, false);
