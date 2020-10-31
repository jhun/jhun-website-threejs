import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "threejs-meshline";

export default class Floors {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.geometry = new THREE.PlaneGeometry(150, 300, 150, 150);
    this.line = new MeshLine();
    // line.setGeometry( geometry );
    this.line.setGeometry(this.geometry, function (p) {
      return p;
    });
    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.0,
      color: new THREE.Color(0.1, 0.1, 0.1),
      transparent: true,
    });

    this.materialLine = new MeshLineMaterial({
      color: new THREE.Color(0.3, 0.6, 0.8),
      opacity: 1,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      sizeAttenuation: false,
      side: THREE.BackSide,
      lineWidth: 7,
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

    this.horizontalMirror = new Reflector(this.geometry, {
      clipBias: 0.003,
      textureWidth: 1024 * window.devicePixelRatio,
      textureHeight: 1024 * window.devicePixelRatio,
      color: new THREE.Color(0, 0, 0.3, 0),
      transparent: true,
      recursion: 1,
    });
    this.horizontalMirror.position.z = -20;
    this.horizontalMirror.position.y = -2.02;
    this.horizontalMirror.rotation.x = -Math.PI / 2;
    this.scene.add(this.horizontalMirror);
  }
  update() {
    let delta = this.clockPlane.getDelta();
    this.plane.rotation.z += delta * Math.PI * 0.05;
  }
}
