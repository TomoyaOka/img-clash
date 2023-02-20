//reference:https://www.youtube.com/watch?v=k7CnKHRp4mY&list=LL&index=3&t=1775s
import * as PIXI from "pixi.js";
import Paticle from "./particle";

class PaticleImg {
  constructor() {
    this.app = new PIXI.Application({
      width: 1200,
      height: 1200,
      autoresize: true,
      backgroundAlpha: true,
      backgroundColor: 0xe5e5e5,
      // backgroundColor: 0x000000,
    });
    const el = document.querySelector(".stage");
    el.appendChild(this.app.view);
    this.particleSize = 10; //パーティクルのサイズ
    this.particles = []; //パーティクル格納用

    this.mouse;

    this.addObjects();
  }

  async addObjects() {
    this.texture = await PIXI.Assets.load("./img.png"); //画像読み込み

    console.log(this.texture);

    //画像を分割したパーティクル作成
    for (let i = 0; i < 120; i++) {
      for (let j = 0; j < 120; j++) {
        let p = new Paticle(i * this.particleSize, j * this.particleSize, this.texture, this.particleSize);
        this.particles.push(p); //指定したサイズのパーティクルを格納
        this.app.stage.addChild(p.sprite); //ステージに追加
      }
    }

    this.animate();
  }

  animate() {
    // Listen for frame updates
    this.app.ticker.add(() => {
      this.mouse = this.app.renderer.plugins.interaction.rootPointerEvent.global;
      this.particles.forEach((p) => {
        p.update(this.mouse);
      });
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new PaticleImg();
});

export {};
