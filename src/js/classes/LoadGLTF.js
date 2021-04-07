import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import { Mesh } from "three";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils.js";
import Preloader from "./Preloader.js";

export default class LoadGLTF {
  constructor(
    gltfAnimal,
    scene,
    camera,
    scale,
    velocity,
    velocityMoviment,
    initialPosition,
    verticalPos,
    limitPositionAnimals,
    distortion,
    zPos,
    yRotationInverted,
    inverted,
    oceanCreature = false
  ) {
    Preloader.instanceAdded();
    this.scene = scene;
    this.camera = camera;
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
    this.modelTrail = new Array(8);
    this.mixerTrail = new Array(8);
    this.pointsMaterialTrail = new Array(8);
    this.newMaterialTrail = new Array(8);
    this.indice = [0, 0, 0, 0, 0, 0, 0, 0];
    this.durationTrail;
    this.childPoints;
    this.distortion = distortion;
    this.yRotationInverted = yRotationInverted;
    this.inverted = inverted;
    this.oceanCreature = oceanCreature;
    this.mesh;
    this.pointsMaterial;
    this.disabled = false;
    this.points2;
    this.loaderAnimal.load(
      gltfAnimal,
      (gltf) => {
        this.durationTrail = this.randomIntFromInterval(60, 90);
        this.model = gltf;
        for (let i = 0; i < this.modelTrail.length; i++) {
          this.modelTrail[i] = SkeletonUtils.clone(this.model.scene);
        }

        var newMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xaa00ff),
          skinning: true,
          morphTargets: true,
          wireframeLinewidth: 1,
          wireframe: true,
          transparent: true,
          opacity: 1,
          // side: THREE.FrontSide,
        });
        for (let i = 0; i < this.newMaterialTrail.length; i++) {
          this.newMaterialTrail[i] = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xff7700),
            skinning: true,
            morphTargets: true,
            wireframeLinewidth: 1,
            wireframe: true,
            transparent: true,
            opacity: 1,
            // side: THREE.FrontSide,
          });
        }
        this.pointsMaterial = new THREE.PointsMaterial({
          color: new THREE.Color(20, 50, 80),
          size: 0.099,
          sizeAttenuation: true,
          morphTargets: true,
          transparent: true,
        });
        for (let i = 0; i < this.pointsMaterialTrail.length; i++) {
          this.pointsMaterialTrail[i] = new THREE.PointsMaterial({
            color: new THREE.Color(20, 50, 80),
            size: 0.099,
            sizeAttenuation: true,
            morphTargets: true,
            transparent: true,
          });
        }
        this.model.scene.traverse((child) => {
          // if (child.material) child.material.metalness = 0;
          if (child.isMesh) {
            var points = new THREE.Points(child.geometry, this.pointsMaterial);
            points.morphTargetInfluences = child.morphTargetInfluences;
            points.morphTargetDictionary = child.morphTargetDictionary;

            child.material = newMaterial;

            child.add(points);
          }
        });

        this.model.scene.scale.multiplyScalar(scale); // adjust scalar factor to match your scene scale
        this.model.scene.position.x = initialPosition; // once rescaled, position the model where needed
        this.model.scene.position.y = -0.2 - this.zPos / 5 + verticalPos;
        this.model.scene.position.z = 2 + this.zPos;
        this.model.scene.rotation.y = yRotationInverted ? 1.5 : -1.5;

        for (let i = 0; i < this.modelTrail.length; i++) {
          this.modelTrail[i].traverse((child) => {
            // if (child.material) child.material.metalness = 0;
            if (child.isMesh) {
              var points = new THREE.Points(
                child.geometry,
                this.pointsMaterialTrail[i]
              );
              points.morphTargetInfluences = child.morphTargetInfluences;
              points.morphTargetDictionary = child.morphTargetDictionary;

              child.material = this.newMaterialTrail[i];

              child.add(points);
            }
          });
          this.modelTrail[i].scale.multiplyScalar(scale); // adjust scalar factor to match your scene scale
          this.modelTrail[i].position.x = initialPosition - 100; // once rescaled, position the model where needed
          this.modelTrail[i].position.y = -0.2 - this.zPos / 5 + verticalPos;
          this.modelTrail[i].position.z = 2 + this.zPos;
          this.modelTrail[i].rotation.y = yRotationInverted ? 1.5 : -1.5;
          this.container.add(this.model.scene);
          this.container.add(this.modelTrail[i]);
        }
        this.scene.add(this.container);

        // Play a specific animation
        this.mixer = new THREE.AnimationMixer(this.model.scene);
        for (let i = 0; i < this.mixerTrail.length; i++) {
          this.mixerTrail[i] = new THREE.AnimationMixer(this.modelTrail[i]);
        }
        for (let i = 0; i < this.model.animations.length; i++) {
          // console.log(this.model.animations[0]);
          this.mixer.clipAction(this.model.animations[0]).play();
          for (let i = 0; i < this.mixerTrail.length; i++) {
            this.mixerTrail[i].clipAction(this.model.animations[0]).play();
          }
        }
        Preloader.instanceLoaded(); //add
        Preloader.instancesLoaded(); //check
      },
      (xhr) => {
        // called while loading is progressing
        let percentage = Math.floor((xhr.loaded / xhr.total) * 100);
        // if (percentage === 100) {
        //   Preloader.instanceLoaded(); //add
        //   Preloader.instancesLoaded(); //check
        // }
        // console.log(`${percentage}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );
  }

  updateAnimal() {
    this.delta = this.clock.getDelta() * this.velocityMoviment;
    if (typeof this.mixer === "undefined") {
    } else {
      for (let i = 0; i < this.mixerTrail.length; i++) {
        if (
          this.indice[this.mixerTrail.length - 1] >
          this.durationTrail * this.mixerTrail.length - 1
        ) {
          for (let i = 0; i < this.indice.length; i++) {
            this.indice[i] = 0;
          }
          this.durationTrail = this.randomIntFromInterval(60, 90);
        } else if (
          this.indice[i] > 21 * i &&
          this.indice[i] <= this.durationTrail * i
        ) {
          this.indice[i] += 0.5;
          this.mixerTrail[i].setTime(this.mixerTrail[i].time + 0.002);
          this.modelTrail[i].traverse((child) => {
            if (child.isMesh) {
              child.children[0].material.opacity -= 0.0025;
              child.material.opacity -= 0.0025;
              if (child.children[0].material.opacity <= 0) {
                child.visible = false;
                this.modelTrail[i].position.x = this.model.scene.position.x;
              } else {
                this.modelTrail[i].position.x =
                  this.modelTrail[i].position.x +
                  (this.delta * this.velocity) / 15;
              }
            }

            // i * (1 - this.velocityMoviment) * 0.003;
          });
        } else if (this.indice[i] > 20 * i && this.indice[i] <= 21 * i) {
          this.indice[i] += 0.5;
          this.mixerTrail[i].setTime(this.mixer.time);
          this.modelTrail[i].position.x = this.model.scene.position.x;
          this.modelTrail[i].traverse((child) => {
            if (child.isMesh) {
              child.visible = true;
              child.children[0].material.opacity = 1;
              child.material.opacity = 1;
            }
          });
        } else {
          this.indice[i] += 0.5;
          this.modelTrail[i].traverse((child) => {
            if (child.isMesh) {
              child.visible = false;
              child.children[0].material.opacity = 0;
              child.material.opacity = 0;
            }
          });
        }
      }
      this.mixer.update(this.delta);
      if (this.model.scene.position.x < this.limitPositionAnimals) {
        this.model.scene.position.x += this.delta * this.velocity;
      } else {
        this.model.scene.position.x = -this.limitPositionAnimals;

        if (this.oceanCreature) {
          let randomZ = this.randomIntFromInterval(-40, 10);
          this.model.scene.position.z = randomZ;
          let randomY = this.randomIntFromInterval(-80, -20);
          this.model.scene.position.y = randomY;
          for (let i = 0; i < this.modelTrail.length; i++) {
            this.modelTrail[i].position.y = randomY;
            this.modelTrail[i].position.z = randomZ;
          }
        } else {
          let randomZ = this.randomIntFromInterval(-21, 0);
          this.model.scene.position.z = randomZ;
          for (let i = 0; i < this.modelTrail.length; i++) {
            this.modelTrail[i].position.z = randomZ;
          }
        }
      }
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

THREE.Vector2.prototype.roundToZero = function (digits) {
  var e = Math.pow(10, digits || 0);

  this.x = this.x < 0 ? Math.ceil(this.x * e) / e : Math.floor(this.x * e) / e;
  this.y = this.y < 0 ? Math.ceil(this.y * e) / e : Math.floor(this.y * e) / e;

  return this;
};
