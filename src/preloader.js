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
    ).innerHTML = `<div style="margin-top:-15px;">${loaded} / ${this.instancesCount()}<br/><div style="font-size:10px; margin-top:5px;"> OBJECTS LOADED</div></div>`;
    if (loaded == this.instancesCount()) {
      setTimeout(() => {
        document.querySelector(
          "h1"
        ).innerHTML = `<div style="display:inline-block; padding:0 0 3px 10px; border:1px solid white; text-align:center;">START HERE</div>`;
      }, 1000);
    }
  }
}
