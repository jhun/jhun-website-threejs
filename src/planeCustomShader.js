import * as THREE from "three";
import { vertexshader, fragmentshader } from "./glsl/shadernoise.js";
import { scene, camera } from "./cameraSceneRenderer.js";
import ocean from "./imagens/jhun.jpg";

let sceneObjects = [];
let mesh;
let material;
let clock;
let uniforms;
let initialPos = new THREE.Vector3(0.0, 0.0, 0.0);
let mousePos = initialPos.clone();
let mousePosDown = initialPos.clone();
let mousePosNew = new THREE.Vector3(0.0, 0.0, 0.0);

export const addPlaneCustomShader = () => {
  clock = new THREE.Clock();
  let vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians
  let height = 2 * Math.tan(vFOV / 2) * 1000; // visible height
  let width = height * camera.aspect;
  let geometry = new THREE.PlaneGeometry(width, height, 10, 10);
  uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib["lights"],
    { diffuse: { type: "c", value: new THREE.Color(0x404040) } },
  ]);
  uniforms.uResolution = {
    value: {
      x: window.innerHeight,
      y: window.innerWidth,
    },
  };
  uniforms.uMouse = { value: new THREE.Vector4() };
  uniforms.uTime = { value: 0.0 };
  uniforms.uTexture = { value: new THREE.TextureLoader().load(ocean) };
  material = new THREE.ShaderMaterial({
    vertexShader: vertexshader,
    fragmentShader: fragmentshader,
    uniforms: uniforms,
    wireframe: false,
    side: THREE.DoubleSide,
    lights: true,
  });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 0;
  scene.add(mesh);
  sceneObjects.push(mesh);
};

export const updatePlaneCustomShader = () => {
  mousePosNew.lerp(mousePos, 0.1);
  material.uniforms.uTime.value = clock.getElapsedTime();
  material.uniforms.uMouse.value.x = mousePosNew.x;
  material.uniforms.uMouse.value.y = mousePosNew.y;
  material.uniforms.uMouse.value.z = mousePosNew.z;
};

const mouseMoving = (event) => {
  mousePos.x = initialPos.x + event.clientX - mousePosDown.x;
  mousePos.y = initialPos.y + event.clientY - mousePosDown.y;
  //   console.log(uniforms.uMouse.value.x, uniforms.uMouse.value.y);
};

const touchMoving = (event) => {
  if (Math.abs(window.orientation) === 90) {
    // Landscape
    mousePos.x = (initialPos.x + event.touches[0].pageX - mousePosDown.x) / 4;
    mousePos.y = initialPos.y + event.touches[0].pageY - mousePosDown.y;
  } else {
    // Portrait
    mousePos.x = (initialPos.x + event.touches[0].pageX - mousePosDown.x) * 3;
    mousePos.y = (initialPos.y + event.touches[0].pageY - mousePosDown.y) / 4;
  }
};

window.addEventListener(
  "mousedown",
  function (event) {
    window.addEventListener("mousemove", mouseMoving, false);
    mousePosDown.x = event.clientX;
    mousePosDown.y = event.clientY;
    mousePos.x = initialPos.x + event.clientX - mousePosDown.x;
    mousePos.y = initialPos.y + event.clientY - mousePosDown.y;
  },
  false
);
window.addEventListener(
  "mouseup",
  function (event) {
    window.removeEventListener("mousemove", mouseMoving, false);
    mousePos = initialPos.clone();
  },
  false
);
window.addEventListener(
  "touchstart",
  function (event) {
    event.stopImmediatePropagation();
    window.addEventListener("touchmove", touchMoving, false);
    if (Math.abs(window.orientation) === 90) {
      // Landscape
      mousePosDown.x = event.touches[0].pageX;
      mousePosDown.y = event.touches[0].pageY;
      mousePos.x = (initialPos.x + event.touches[0].pageX - mousePosDown.x) / 4;
      mousePos.y = initialPos.y + event.touches[0].pageY - mousePosDown.y;
    } else {
      // Portrait
      mousePosDown.x = event.touches[0].pageX;
      mousePosDown.y = event.touches[0].pageY;
      mousePos.x = (initialPos.x + event.touches[0].pageX - mousePosDown.x) * 3;
      mousePos.y = (initialPos.y + event.touches[0].pageY - mousePosDown.y) / 4;
    }
  },
  false
);

window.addEventListener(
  "touchend",
  function (event) {
    window.removeEventListener("touchmove", touchMoving, false);
    mousePos = initialPos.clone();
  },
  false
);

document.querySelector("body").oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation(); // not necessary in my case, could leave in case stopImmediateProp isn't available?
  event.stopImmediatePropagation();
  return false;
};
