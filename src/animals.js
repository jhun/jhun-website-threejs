import * as THREE from "three";
import { scene } from "./cameraSceneRenderer.js";
import GLTFLoader from "three-gltf-loader";
import * as PlaneCustomShader from "./planeCustomShader.js";

export default class LoadGLTF {
  constructor(
    gltfAnimal,
    scale,
    velocity,
    velocityMoviment,
    initialPosition,
    verticalPos,
    limitPositionAnimals,
    distortion,
    zPos,
    yRotationInverted,
    inverted
  ) {
    this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.limitPositionAnimals = limitPositionAnimals;
    this.clock = new THREE.Clock();
    this.loaderAnimal = new GLTFLoader();
    this.mixer;
    this.scale = scale;
    this.velocity = velocity;
    this.zPos = zPos;
    this.velocityMoviment = velocityMoviment;
    this.initialPosition = initialPosition;
    this.verticalPos = verticalPos;
    this.container = new THREE.Object3D();
    this.mouse = new THREE.Vector2(0.0, 0.0);
    this.model;
    this.distortion = distortion;
    this.yRotationInverted = yRotationInverted;
    this.inverted = inverted;
    this.loaderAnimal.load(
      gltfAnimal,
      (gltf) => {
        this.model = gltf;
        var newMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x6622ff),
          skinning: true,
          morphTargets: true,
          wireframeLinewidth: 1,
          wireframe: true,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
        });
        this.model.scene.traverse((child) => {
          // if (child.material) child.material.metalness = 0;
          if (child.isMesh) {
            child.material = newMaterial;
          }
        });
        this.model.scene.scale.multiplyScalar(scale); // adjust scalar factor to match your scene scale
        this.model.scene.position.x = initialPosition; // once rescaled, position the model where needed
        this.model.scene.position.y = -0.2 - this.zPos / 5 + verticalPos;
        this.model.scene.position.z = 2 + this.zPos;
        this.model.scene.rotation.y = yRotationInverted ? 1.5 : -1.5;
        this.container.add(this.model.scene);
        scene.add(this.container);

        // Play a specific animation
        this.mixer = new THREE.AnimationMixer(this.model.scene);
        this.model.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );
  }

  updateAnimal() {
    this.delta = this.clock.getDelta() * this.velocityMoviment;
    this.mouse.copy(PlaneCustomShader.mousePosNew);
    if (typeof this.mixer === "undefined") {
    } else {
      this.mixer.update(this.delta);
      if (this.model.scene.position.x < this.limitPositionAnimals) {
        this.model.scene.position.x += this.delta * this.velocity;
      } else {
        this.model.scene.position.x = -this.limitPositionAnimals;
      }

      this.container.position.x = -this.mouse.x / 400;
      let valor = this.inverted ? -this.mouse.y : this.mouse.y;
      if (this.model.scene.position.x < 0) {
        this.container.position.y =
          this.mouse.y / 300 +
          (this.mouse.y / 300) *
            4 *
            -(-(10 + this.model.scene.position.x) / 45 / this.resolution.y) *
            this.distortion;
      } else {
        this.container.position.y =
          this.mouse.y / 300 +
          (this.mouse.y / 300) *
            4 *
            -(-(10 - this.model.scene.position.x) / 45 / this.resolution.y) *
            this.distortion;
      }
    }
  }
}

var geometry = new THREE.PlaneGeometry(300, 600, 10, 10);
var material = new THREE.MeshBasicMaterial({
  color: 0x44ffff,
  side: THREE.DoubleSide,
  wireframe: true,
});

var plane = new THREE.Mesh(geometry, material);
plane.position.z = -300;
plane.position.y = -30;
plane.rotation.x = Math.PI / 2;
scene.add(plane);

THREE.Vector2.prototype.roundToZero = function (digits) {
  var e = Math.pow(10, digits || 0);

  this.x = this.x < 0 ? Math.ceil(this.x * e) / e : Math.floor(this.x * e) / e;
  this.y = this.y < 0 ? Math.ceil(this.y * e) / e : Math.floor(this.y * e) / e;

  return this;
};
