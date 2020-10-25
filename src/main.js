import cssNormalize from "./css/base/normalize.css";
import "./css/fonts.css";
import cssStyle from "./css/style.scss";
import * as THREE from "three";
import {
  camera,
  cameraShader,
  scene,
  sceneShader,
  renderer,
  controls,
} from "./cameraSceneRenderer.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/Glitchpass";
import { updateLights } from "./lights.js";
// prettier-ignore
import { addPlaneCustomShader, updatePlaneCustomShader } from "./planeCustomShader.js";
// import * as Ambiente from "./ambiente.js";
import gltfCavalo from "./models/life_soup/quadruped_horse.gltf";
import gltfFox from "./models/life_soup/quadruped_fox.gltf";
import gltfBear from "./models/life_soup/quadruped_bear.gltf";
import gltfEagle from "./models/life_soup/birdsA_eagle.gltf";
import gltfVulture from "./models/black_soup/birds_vulture.gltf";
import gltfFrog from "./models/life_soup/quadruped_frog.gltf";
import gltfAligator from "./models/black_soup/alligator.gltf";
import LoadGLTF from "./animals.js";

var geometry, material, meshRoot;
let horse, fox, bear, eagle, vulture, frog, aligator;

let composer, composer2;

init();
animate();

function init() {
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  var material = new THREE.MeshBasicMaterial({
    color: 0x44ffff,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  // prettier-ignore
  horse = new LoadGLTF(gltfCavalo, 0.0118, 8, 1, -7, -0.3, 13, 600, 0,false, false);
  // prettier-ignore
  fox = new LoadGLTF(gltfFox, 0.0118, 6, 1, 0, 0, 13, 600, 1,false, true);
  // prettier-ignore
  bear = new LoadGLTF(gltfBear, 0.0118, 7, 0.7, 10, 0, 13, 600, 2,false, true);
  // prettier-ignore
  eagle = new LoadGLTF(gltfEagle, 0.0048, 3, 1, -6, 2.5, 13, 600, .5,false, true);
  // prettier-ignore
  vulture = new LoadGLTF(gltfVulture, 0.0025, 2, .7, -4, 2.0, 13, 600, 0,false, true);
  // prettier-ignore
  frog = new LoadGLTF(gltfFrog, 0.0098, 5, 0.5, -13, 0, 13, 600, 3,false, true);
  // prettier-ignore
  aligator = new LoadGLTF(gltfAligator, 0.0118, 3, 0.5, 12, 0, 13, 600, 4, true, true);
  // prettier-ignore-end

  // meshRoot = new THREE.Mesh(geometry, material);
  // scene.add(meshRoot);
  addPlaneCustomShader();
  var renderPass = new RenderPass(scene, camera);
  renderPass.clear = false;
  var renderPass2 = new RenderPass(sceneShader, cameraShader);
  renderPass2.clear = true;

  var bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = 0.21;
  bloomPass.strength = 1.2;
  bloomPass.radius = 0.55;
  bloomPass.renderToScreen = true;

  var glitchPass = new GlitchPass();
  glitchPass.renderToScreen = true;

  composer = new EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);

  composer.addPass(renderPass2);
  composer.addPass(renderPass);
  // composer.addPass(glitchPass);
  composer.addPass(bloomPass);
}

function animate() {
  requestAnimationFrame(animate);
  horse.updateAnimal();
  fox.updateAnimal();
  bear.updateAnimal();
  eagle.updateAnimal();
  vulture.updateAnimal();
  frog.updateAnimal();
  aligator.updateAnimal();
  // meshRoot.rotation.x += 0.01;
  // meshRoot.rotation.y += 0.02;
  updateLights();
  updatePlaneCustomShader();
  // controls.update();
  renderer.render(sceneShader, cameraShader);
  renderer.render(scene, camera);
  // composer.render();
}
