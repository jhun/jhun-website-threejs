//CSS AND SASS
import cssNormalize from "./css/base/normalize.css";
import "./css/fonts.css";
import cssStyle from "./css/style.scss";

//IMPORTS
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
// prettier-ignore
import { camera, scene, renderer, controls} from "./cameraSceneRenderer.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/Glitchpass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import ParticlesEnvironment from "./ParticlesEnvironment.js";
import { updateLights } from "./lights.js";
import LoadGLTF from "./animals.js";
import Floors from "./Floors.js";

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

let status, stats;
let geometry, material, meshRoot;
let horse, fox, panther, wolf, bear, eagle, vulture, frog, aligator;
let composer;
let pixelRatio = renderer.getPixelRatio();
let particles;
let floor;

init();
animate();

function init() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  status = document.createElement("div");

  document.body.appendChild(status);
  // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  // var material = new THREE.MeshBasicMaterial({
  //   color: 0x44ffff,
  //   side: THREE.DoubleSide,
  //   wireframe: true,
  // });

  /* ANIMALS ATTRIBUTES LIST
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
  horse = new LoadGLTF(gltfCavalo, 0.0318, 18, 1, -7, -5.1, 70, 600, -11,false, false);
  // prettier-ignore
  fox = new LoadGLTF(gltfFox, 0.0348, 15, 1, -30, -2.7, 70, 600, -5,false, true);
  // prettier-ignore
  wolf = new LoadGLTF(gltfWolf, 0.0348, 19, 1, 0, -5.8, 70, 600, -21,false, true);
  // prettier-ignore
  panther = new LoadGLTF(gltfPanther, 0.0348, 30, 1, 90, -3.9, 150, 600, -13,false, true);
  // prettier-ignore
  bear = new LoadGLTF(gltfBear, 0.0278, 15, 0.7, -30, -2.2, 70, 600, -2,false, true);
  // prettier-ignore
  eagle = new LoadGLTF(gltfEagle, 0.0318, 14, 1, -6, 5.0, 70, 600, -17,false, true);
  // prettier-ignore
  vulture = new LoadGLTF(gltfVulture, 0.0318, 12, .7, -4, 3.0, 70, 600, -20,false, true);
  // prettier-ignore
  // frog = new LoadGLTF(gltfFrog, 0.0318, 12, 0.5, -13, -1.2, 70, 600, 2,false, true);
  // prettier-ignore
  aligator = new LoadGLTF(gltfAligator, 0.0318, 9, 0.5, -26, -6.0, 70, 600, -21, true, true);
  // prettier-ignore-end

  // meshRoot = new THREE.Mesh(geometry, material);
  // scene.add(meshRoot);
  // addPlaneCustomShader();

  //PARTICLES
  particles = new ParticlesEnvironment(5000, scene);

  //FLOOR
  floor = new Floors(scene, camera);

  var renderPass = new RenderPass(scene, camera);

  var bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = 0.31;
  bloomPass.strength = 1.2;
  bloomPass.radius = 0.55;
  bloomPass.renderToScreen = true;

  var afterimagePass = new AfterimagePass(0.6);

  var glitchPass = new GlitchPass();
  glitchPass.curF = 0;
  glitchPass.renderToScreen = true;

  var fxaaPass = new ShaderPass(FXAAShader);

  fxaaPass.uniforms["resolution"].value.x =
    1 / (window.innerWidth * pixelRatio);
  fxaaPass.uniforms["resolution"].value.y =
    1 / (window.innerHeight * pixelRatio);

  composer = new EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);

  composer.addPass(renderPass);
  composer.addPass(fxaaPass);

  composer.addPass(afterimagePass);
  composer.addPass(glitchPass);
  composer.addPass(bloomPass);

  status.appendChild(stats.dom);
}

function animate() {
  renderer.clear();
  requestAnimationFrame(animate);
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
  updateLights();
  controls.update();
  composer.render();
  stats.update();
  // renderer.render(scene, camera);
}

window.onload = function () {
  console.log("DOM loaded");
  document.querySelector("body").classList.remove("initial-hide");
};

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  pixelRatio = renderer.getPixelRatio();
  fxaaPass.uniforms["resolution"].value.x =
    1 / (window.innerWidth * pixelRatio);
  fxaaPass.uniforms["resolution"].value.y =
    1 / (window.innerHeight * pixelRatio);
}
