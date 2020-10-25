import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export var camera, cameraShader, scene, sceneShader, renderer, controls;

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);
camera.position.z = 10;

cameraShader = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);
cameraShader.position.z = 10;

scene = new THREE.Scene();
{
  // const near = 0.001;
  // const far = 5;
  // const color = "#AAFFFF";
  // scene.fog = new THREE.Fog(color, near, far);
  // scene.background = new THREE.Color(color);
}

sceneShader = new THREE.Scene();
{
  // const near = 0.1;
  // const far = 200;
  // const color = "lightblue";
  // sceneShader.fog = new THREE.Fog(color, near, far);
}

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.autoClear = false; // important!
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// controls = new OrbitControls(camera, renderer.domElement);
