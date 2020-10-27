import * as THREE from "three";
import snow from "./imagens/particle.png";

export default class ParticlesEnvironment {
  constructor(particlesLength, scene) {
    this.scene = scene;
    this.materials = [];
    this.particlesLength = particlesLength;
    this.geometry = new THREE.BufferGeometry();
    this.vertices = [];

    this.sprite1 = new THREE.TextureLoader().load(snow);

    for (var i = 0; i < this.particlesLength; i++) {
      var x = Math.random() * -20 + 10;
      var y = Math.random() * -20 + 10;
      var z = Math.random() * -20 + 10;

      this.vertices.push(x, y, z);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.vertices, 3)
    );

    this.parameters = [
      [[22, 0.1, 0.3], this.sprite1, 0.1],
      [[22, 0.1, 0.3], this.sprite1, 0.08],
      [[22, 0.1, 0.3], this.sprite1, 0.06],
      [[22, 0.1, 0.3], this.sprite1, 0.04],
      [[22, 0.1, 0.3], this.sprite1, 0.02],
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
      });
      this.materials[i].color.setHSL(color[0], color[1], color[2]);

      var particles = new THREE.Points(this.geometry, this.materials[i]);

      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      this.scene.add(particles);
    }
  }

  updateParticles() {
    var time = Date.now() * 0.00005;
    for (var i = 0; i < this.scene.children.length; i++) {
      var object = this.scene.children[i];

      if (object instanceof THREE.Points) {
        object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      }
    }
  }
}
