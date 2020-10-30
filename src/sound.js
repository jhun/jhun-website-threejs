import * as THREE from "three";
import Preloader from "./preloader.js";

export default class LoadSound {
  constructor(camera, scene, music) {
    Preloader.instanceAdded();
    this.canPlay = false;
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();
    camera.add(this.listener);

    this.audioLoader.load(
      music,
      (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(true);
        this.sound.setVolume(0.5);
        scene.add(this.sound);
      }, // onProgress callback
      (xhr) => {
        let loaded = Math.floor((xhr.loaded / xhr.total) * 100);
        if (loaded === 100) {
          this.canPlay = true;
          Preloader.instanceLoaded(); //add
          Preloader.instancesLoaded(); //check
        }
      },
      (err) => {
        console.log("An error happened");
      }
    );
  }
}
