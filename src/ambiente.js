import * as THREE from "three";
import { scene } from "./cameraSceneRenderer.js";
import GLTFLoader from "three-gltf-loader";
import gltfCenario from "./models/mars2/scene.gltf";

export const loaderCenario = new GLTFLoader();
// all files referenced in the gltf file have now also been resolved by your loaders.
loaderCenario.load(
  gltfCenario,
  (gltf) => {
    gltf.scene.traverse((child) => {
      if (child.material) child.material.metalness = 0;
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    gltf.scene.scale.multiplyScalar(1 / 10); // adjust scalar factor to match your scene scale
    gltf.scene.position.x = 0; // once rescaled, position the model where needed
    gltf.scene.position.y = -8.5;
    gltf.scene.position.z = 0;
    scene.add(gltf.scene);
  },
  (xhr) => {
    // called while loading is progressing
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  (error) => {
    // called when loading has errors
    console.error("An error happened", error);
  }
);
