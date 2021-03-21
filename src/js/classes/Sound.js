import * as THREE from "three";
import Preloader from "./Preloader.js";

export default class LoadSound {
  constructor(camera, scene, music) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();
    // console.log(this.sound.context);
    this.biquadFilter = this.sound.context.createBiquadFilter();
    this.convolver = this.sound.context.createConvolver();
    this.biquadFilter.connect(this.convolver);
    this.convolver.connect(this.sound.context.destination);
    this.biquadFilter.type = "lowpass";
    this.lowpass = 2000;
    this.Q = 0;
    this.biquadFilter.frequency.value = this.lowpass;
    this.biquadFilter.Q.value = 0;
    this.sound.filters.push(this.biquadFilter);
    this.sound.setFilter(this.sound.filters[0]);
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
  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
  changeVolume(gain) {
    if (this.sound.getVolume() < gain) {
      this.sound.setVolume(this.sound.getVolume() + 0.004);
    } else {
      this.sound.setVolume(this.sound.getVolume() - 0.004);
    }
  }
  changeLowpass(lowpass, Q, gain) {
    if (
      Math.round(Number(this.biquadFilter.frequency.value.toFixed(1))) !=
      Math.round(lowpass)
    ) {
      this.biquadFilter.frequency.value = this.lerp(
        this.biquadFilter.frequency.value,
        lowpass,
        0.01
      );
      this.biquadFilter.Q.value = this.lerp(this.biquadFilter.Q.value, Q, 0.01);
      this.sound.setVolume(this.lerp(this.sound.getVolume(), gain, 0.01));
    }
  }
}
