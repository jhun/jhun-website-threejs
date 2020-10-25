import * as THREE from "three";
import { scene } from "./cameraSceneRenderer.js";

const color = "lightblue";
const intensity = 0.1;
export const directionalLight = new THREE.DirectionalLight(color, intensity);
directionalLight.position.set(-1, 20, 4);
scene.add(directionalLight);

export const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(ambientLight);

THREE.PointLight.prototype.addSphere = function () {
  this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 16, 16),
    new THREE.MeshBasicMaterial({ color: this.color })
  );
  this.add(this.sphere);
};

// Add lights
export const light1 = new THREE.PointLight(0xff0000, 0.4, 3, 2);
light1.addSphere();
light1.position.set(1, 0, 1);
// scene.add(light1);

export const light2 = new THREE.PointLight(0x00ff00, 0.4, 3, 2);
light2.addSphere();
light2.position.set(0, 1, 1);
// scene.add(light2);

export const updateLights = () => {
  var timer = Date.now() * 0.0005;
  light1.position.x = Math.cos(timer) * 2.5;
  light1.position.z = Math.sin(timer) * 2.5;
  light2.position.y = Math.cos(timer * 1.25) * 3;
  light2.position.z = Math.sin(timer * 1.25) * 2.5;
};
