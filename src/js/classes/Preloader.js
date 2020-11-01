import { camera, renderer, controls } from "../cameraSceneRenderer.js";

let instances = 0;
let loaded = 0;

export default class Preloader {
  constructor() {}

  static instanceAdded() {
    instances++;
  }

  static instancesCount() {
    return instances;
  }

  static instanceLoaded() {
    loaded++;
  }

  static instancesLoaded() {
    document.querySelector(
      "h1"
    ).innerHTML = `${loaded} / ${this.instancesCount()}<br/><div style="font-size:10px; margin-top:5px;"> OBJECTS LOADED</div>`;
    if (loaded == this.instancesCount()) {
      document.querySelector("body").style.pointerEvents = "all";
      document.getElementById("title").style.pointerEvents = "all";
      document.getElementById("title").innerHTML = `START HERE`;
    }
  }
}
