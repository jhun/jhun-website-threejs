import * as THREE from "three";

export default class LoadSound {
  constructor(camera, scene, music) {
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
        if ((xhr.loaded / xhr.total) * 100 == 100) {
          setTimeout(() => {
            this.canPlay = true;
            document.querySelector("h1").innerHTML = "START HERE";
          }, 1000);
        }
        document.querySelector("h1").innerHTML =
          Math.floor((xhr.loaded / xhr.total) * 100) + "% loaded";
      },
      (err) => {
        console.log("An error happened");
      }
    );
  }
}
