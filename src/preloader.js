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
    ).innerHTML = `${loaded} / ${this.instancesCount()} OBJECTS LOADED`;
    if (loaded == this.instancesCount()) {
      setTimeout(() => {
        document.querySelector("h1").innerHTML = "START HERE";
      }, 1000);
    }
  }
}
