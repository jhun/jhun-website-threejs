import cssNormalize from "./css/base/normalize.css";
import cssStyle from "./css/style.scss";
import * as THREE from "three";
import { camera, scene, renderer, controls } from "./cameraSceneRenderer.js";
import { updateLights } from "./lights.js";
// prettier-ignore
import { addPlaneCustomShader, updatePlaneCustomShader } from "./planeCustomShader.js";
// import * as Ambiente from "./ambiente.js";

// var geometry, material, mesh;

init();
animate();

function init() {
  // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  // material = new THREE.MeshNormalMaterial();
  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);
  addPlaneCustomShader();
}

function animate() {
  requestAnimationFrame(animate);

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;
  updateLights();
  updatePlaneCustomShader();
  // controls.update();
  renderer.render(scene, camera);
}
