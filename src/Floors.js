import * as THREE from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";

export default class Floors {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.geometry = new THREE.PlaneGeometry(80, 80, 80, 80);
    this.line = new MeshLine();
    // line.setGeometry( geometry );
    this.line.setGeometry(this.geometry, function (p) {
      return p;
    });
    this.material = new THREE.MeshStandardMaterial({
      color: 0x44ffff,
      side: THREE.BackSide,
      wireframe: true,
      wireframeLinewidth: 1,
    });

    this.materialLine = new MeshLineMaterial({
      color: new THREE.Color(0.3, 0.6, 0.8),
      opacity: 1,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      sizeAttenuation: false,
      side: THREE.BackSide,
      autoRotate: true,
      lineWidth: 8,
      near: this.camera.near,
      far: this.camera.far,
      depthWrite: true,
      depthTest: true,
      transparent: true,
    });

    this.clockPlane = new THREE.Clock();
    this.plane = new THREE.Mesh(this.line.geometry, this.materialLine);
    this.plane.position.z = -20;
    this.plane.position.y = -2.0;
    this.plane.rotation.x = Math.PI / 2;

    this.scene.add(this.plane);
  }
  update() {
    let delta = this.clockPlane.getDelta();
    this.plane.rotation.z += delta * Math.PI * 0.05;
  }
}
