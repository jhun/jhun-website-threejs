import * as THREE from "three";
import { vertexshader, fragmentshader } from "./glsl/shadernoise.js";
import { scene, camera } from "./cameraSceneRenderer.js";
import ocean from "./imagens/jhun.jpg";

let sceneObjects = [];
let mesh;
let material;
let clock;
let uniforms;
let mousePos = new THREE.Vector3(0.0, 0.0, 0.0);
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
  mousePosNew.lerp(mousePos, 0.08);
  material.uniforms.uTime.value = clock.getElapsedTime();
  material.uniforms.uMouse.value.x = mousePosNew.x;
  material.uniforms.uMouse.value.y = mousePosNew.y;
  material.uniforms.uMouse.value.z = mousePosNew.z;
};

window.addEventListener(
  "mousemove",
  function (event) {
    mousePos.x = event.clientX;
    mousePos.y = window.innerHeight - event.clientY;
    mousePos.z = 1;
    // console.log(uniforms.uMouse.value.x, uniforms.uMouse.value.y);
  },
  false
);
window.addEventListener(
  "touchmove",
  function (event) {
    if (Math.abs(window.orientation) === 90) {
      // Landscape
      mousePos.x = event.touches[0].pageX;
      mousePos.y = window.innerHeight - event.touches[0].pageY;
      mousePos.z = 1;
    } else {
      // Portrait
      mousePos.x = event.touches[0].pageX * 2;
      mousePos.y = (window.innerHeight - event.touches[0].pageY) / 2;
      mousePos.z = 1;
    }
    // console.log(uniforms.uMouse.value.x, uniforms.uMouse.value.y);
  },
  false
);
