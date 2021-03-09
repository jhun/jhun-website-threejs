import * as THREE from "three";
import snow from "../../imagens/particle.png";
import { DoubleSide, FrontSide } from "three";

export default class ParticlesEnvironment {
  constructor(particlesLength, scene) {
    this.scene = scene;
    this.materials = [];
    this.particlesLength = particlesLength;
    this.geometry = new THREE.BufferGeometry();
    this.vertices = [];

    this.sprite1 = new THREE.TextureLoader().load(snow);

    for (var i = 0; i < this.particlesLength; i++) {
      var x = this.randomFloatFromInterval(-50, 50);
      var y = this.randomFloatFromInterval(0, 35);
      var z = this.randomFloatFromInterval(-40, 10);

      this.vertices.push(x, y, z);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.vertices, 3)
    );

    this.parameters = [
      [[22, 0.1, 0.3], this.sprite1, 0.34],
      [[22, 0.1, 0.3], this.sprite1, 0.308],
      [[22, 0.1, 0.3], this.sprite1, 0.266],
      [[22, 0.1, 0.3], this.sprite1, 0.244],
      [[22, 0.1, 0.3], this.sprite1, 0.202],
    ];

    for (var i = 0; i < this.parameters.length; i++) {
      var color = this.parameters[i][0];
      var sprite = this.parameters[i][1];
      var size = this.parameters[i][2];

      this.materials[i] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        side: FrontSide,
      });
      this.materials[i].color.setHSL(color[0], color[1], color[2]);

      var particles = new THREE.Points(this.geometry, this.materials[i]);

      particles.rotation.x = Math.random() * Math.PI;
      particles.rotation.y = Math.random() * Math.PI;
      particles.rotation.z = Math.random() * Math.PI;

      this.scene.add(particles);
    }
  }

  updateParticles() {
    var time = Date.now() * 0.00005;
    for (var i = 0; i < this.scene.children.length; i++) {
      var object = this.scene.children[i];
      if (object instanceof THREE.Points) {
        object.rotation.y = 2 * time * (i < 4 ? i + 1 : -(i + 1));
        object.rotation.x = 1 * (time * (i < 4 ? i + 1 : -(i + 1)));
      }
    }
  }

  randomFloatFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }
}
