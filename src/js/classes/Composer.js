import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/Glitchpass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

export default class ComposerEffects {
  constructor(scene, camera, renderer) {
    this.pixelRatio = renderer.getPixelRatio();
    this.renderPass = new RenderPass(scene, camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0.31;
    this.bloomPass.strength = 1.2;
    this.bloomPass.radius = 0.55;
    this.bloomPass.renderToScreen = true;

    this.afterimagePass = new AfterimagePass(0.6);

    this.glitchPass = new GlitchPass();
    this.glitchPass.curF = 0;
    this.glitchPass.renderToScreen = true;

    this.fxaaPass = new ShaderPass(FXAAShader);

    this.fxaaPass.material.uniforms["resolution"].value.x =
      1 / (window.innerWidth * this.pixelRatio);
    this.fxaaPass.material.uniforms["resolution"].value.y =
      1 / (window.innerHeight * this.pixelRatio);

    this.composer = new EffectComposer(renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.fxaaPass);

    // composer.addPass(this.afterimagePass);
    this.composer.addPass(this.glitchPass);
    this.composer.addPass(this.bloomPass);
  }
  render() {
    this.composer.render();
  }
}
