import * as THREE from "three";

export default class Rays {
  constructor(amount, scene, camera) {
    this.clockRays = new THREE.Clock();
    this.amount = amount;
    this.scene = scene;
    this.camera = camera;
    this.geometryBox = new Array(this.amount);
    this.materialBox = new Array(this.amount);
    this.geometryBox = new Array(this.amount);
    this.velocityBox = new Array(this.amount);
    this.borderSizeBox = new Array(this.amount);
    this.meshBox = new Array(this.amount);

    for (let i = 0; i < amount; i++) {
      this.velocityBox[i] = this.randomIntFromInterval(50, 200);
      this.borderSizeBox = this.randomFloatFromInterval(10, 30);
      this.geometryBox[i] = new THREE.BoxGeometry(
        this.randomIntFromInterval(80, 100),
        0.1,
        this.borderSizeBox,
        1,
        1
      );
      this.materialBox[i] = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.FrontSide,
      });
      this.meshBox[i] = new THREE.Mesh(
        this.geometryBox[i],
        this.materialBox[i]
      );
      this.meshBox[i].position.x = this.randomIntFromInterval(-190, 190);
      this.meshBox[i].position.y = this.randomIntFromInterval(20, 60);
      this.meshBox[i].position.z = this.randomIntFromInterval(-70, 70);
      this.scene.add(this.meshBox[i]);
    }
  }

  update() {
    let delta = this.clockRays.getDelta();
    for (let i = 0; i < this.amount; i++) {
      this.meshBox[i].position.x -= delta * this.velocityBox[i];

      if (this.meshBox[i].position.x <= -190) {
        this.meshBox[i].position.x = 190;
      }
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  randomFloatFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }
}
