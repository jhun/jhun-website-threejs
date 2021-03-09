import * as THREE from "three";
import { vertexshader, fragmentshader } from "../glsl/shadernoise.js";
import { scene, camera, renderer } from "./cameraSceneRenderer.js";
import foto from "../imagens/jhun.jpg";

let sceneObjects = [];
let mesh;
let material;
let clock;
let uniforms;
let initialPos = new THREE.Vector2(0.0, 0.0);
let mousePos = initialPos.clone();
let mousePosDown = initialPos.clone();
export const mousePosNew = new THREE.Vector2(0.0, 0.0);

const canvas = document.body;

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
      x: window.innerWidth,
      y: window.innerHeight,
    },
  };
  uniforms.uMouse = { value: new THREE.Vector4() };
  uniforms.uTime = { value: 0.0 };
  uniforms.uTexture = { value: new THREE.TextureLoader().load(foto) };
  material = new THREE.ShaderMaterial({
    vertexShader: vertexshader,
    fragmentShader: fragmentshader,
    uniforms: uniforms,
    wireframe: false,
    side: THREE.DoubleSide,
    lights: true,
  });
  const material2 = new THREE.MeshPhongMaterial({
    color: 0xff0000, // red (can also use a CSS color string here)
    flatShading: true,
  });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 0;
  scene.add(mesh);
  // sceneObjects.push(mesh);
};

export const updatePlaneCustomShader = () => {
  mousePosNew.lerp(mousePos, 0.1);
  uniforms.uTime.value = clock.getElapsedTime();
  uniforms.uMouse.value.x = mousePosNew.x;
  uniforms.uMouse.value.y = mousePosNew.y;
};

const mouseMoving = (event) => {
  mousePos.x = (initialPos.x + event.clientX - mousePosDown.x) / 2;
  mousePos.y = (initialPos.y + event.clientY - mousePosDown.y) / 2.5;
};

const touchMoving = (event) => {
  if (Math.abs(window.orientation) === 90) {
    // Landscape
    mousePos.x = (initialPos.x + event.touches[0].pageX - mousePosDown.x) / 2;
    mousePos.y = (initialPos.y + event.touches[0].pageY - mousePosDown.y) / 3;
  } else {
    // Portrait
    mousePos.x = initialPos.x + event.touches[0].pageX - mousePosDown.x;
    mousePos.y = (initialPos.y + event.touches[0].pageY - mousePosDown.y) / 6;
  }
};
canvas.addEventListener(
  "mousedown",
  function (event) {
    canvas.addEventListener("mousemove", mouseMoving, false);
    console.log("touch");

    mousePosDown.x = event.clientX;
    mousePosDown.y = event.clientY;
    mousePos.x = (initialPos.x + event.clientX - mousePosDown.x) / 2;
    mousePos.y = (initialPos.y + event.clientY - mousePosDown.y) / 2.5;
  },
  false
);
canvas.addEventListener(
  "mouseup",
  function (event) {
    canvas.removeEventListener("mousemove", mouseMoving, false);
    mousePos = initialPos.clone();
  },
  false
);
canvas.addEventListener(
  "touchstart",
  function (event) {
    event.stopImmediatePropagation();
    canvas.addEventListener("touchmove", touchMoving, false);
    if (Math.abs(window.orientation) === 90) {
      // Landscape

      mousePosDown.x = event.touches[0].pageX;
      mousePosDown.y = event.touches[0].pageY;
      mousePos.x = (initialPos.x + event.touches[0].pageX - mousePosDown.x) / 4;
      mousePos.y = (initialPos.y + event.touches[0].pageY - mousePosDown.y) / 6;
    } else {
      // Portrait
      mousePosDown.x = event.touches[0].pageX;
      mousePosDown.y = event.touches[0].pageY;
      mousePos.x = initialPos.x + event.touches[0].pageX - mousePosDown.x;
      mousePos.y = (initialPos.y + event.touches[0].pageY - mousePosDown.y) / 6;
    }
  },
  false
);

canvas.addEventListener(
  "touchend",
  function (event) {
    canvas.removeEventListener("touchmove", touchMoving, false);
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
