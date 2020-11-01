import * as THREE from "three";
import Preloader from "./Preloader.js";

export default class LoadSound {
  constructor(camera, scene, music) {
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
        if (!this.sound.isPlaying) {
          this.sound.play();
        }
      }, // onProgress callback
      (xhr) => {
        let loaded = Math.floor((xhr.loaded / xhr.total) * 100);
        if (loaded === 100) {
          // this.sound.play();
        }
      },
      (err) => {
        console.log("An error happened");
      }
    );
  }
  playSound() {
    if (!this.sound.isPlaying) {
      this.sound.play();
    }
  }
  pauseSound() {
    if (this.sound.isPlaying) {
      this.sound.pause();
    }
  }
}
