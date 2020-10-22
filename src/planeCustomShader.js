import * as THREE from "three";
import { vertexshader, fragmentshader } from "./glsl/shadernoise.js";
import { scene } from "./cameraSceneRenderer.js";
import ocean from "./imagens/jhun.jpg";

let sceneObjects = [];
let mesh;
let material;
let clock;
let uniforms;

export const addPlaneCustomShader = () => {
  clock = new THREE.Clock();
  let geometry = new THREE.PlaneGeometry(4, 6, 10, 10);
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
  material.uniforms.uTime.value = clock.getElapsedTime();
};

window.addEventListener(
  "mousemove",
  function (event) {
    uniforms.uMouse.value.x = event.clientX;
    uniforms.uMouse.value.y = window.innerHeight - event.clientY;
    uniforms.uMouse.value.z = 1;
    console.log(uniforms.uMouse.value.x, uniforms.uMouse.value.y);
  },
  false
);
window.addEventListener(
  "touchmove",
  function (event) {
    if (Math.abs(window.orientation) === 90) {
      // Landscape
      uniforms.uResolution = {
        value: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      };
      uniforms.uMouse.value.x = event.touches[0].pageX;
      uniforms.uMouse.value.y = window.innerHeight - event.touches[0].pageY;
      uniforms.uMouse.value.z = 1.0;
    } else {
      // Portrait
      uniforms.uResolution = {
        value: {
          x: window.innerHeight,
          y: window.innerWidth,
        },
      };
      uniforms.uMouse.value.x = event.touches[0].pageX * 2;
      uniforms.uMouse.value.y =
        (window.innerHeight - event.touches[0].pageY) / 2;
      uniforms.uMouse.value.z = 1.0;
    }
    console.log(uniforms.uMouse.value.x, uniforms.uMouse.value.y);
  },
  false
);
