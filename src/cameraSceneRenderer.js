import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export var camera, scene, renderer, controls;

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);
camera.position.z = 10;

scene = new THREE.Scene();
{
  // const near = 0.0;
  // const far = 200;
  // const color = "sandybrown";
  // scene.fog = new THREE.Fog(color, near, far);
  // scene.background = new THREE.Color(color);
}

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// controls = new OrbitControls(camera, renderer.domElement);
