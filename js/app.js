import {
  Application,
  Container,
  Geometry,
  Mesh,
  RenderTexture,
  Shader,
  Sprite,
  Assets,
} from "pixi.js"
import gsap from "gsap"
import noiseFragment from "./shader/fragment.frag"
import vertex from "./shader/vertex.vert"

import img1 from "../img/1.jpg"
import img2 from "../img/2.jpg"
import img3 from "../img/3.jpg"
import img4 from "../img/4.jpg"
import img5 from "../img/5.jpg"
import img6 from "../img/6.jpg"
import perlinTexture from "../img/perlin.jpg"

import displacementImage from "../img/displacement-image.png"

class Sketch {
  constructor() {
    this.images = [img1, img2, img3, img4, img5, img6]
    this.init()

    //todo make texture full size of canvas,
    // todo load in image texture
    // todo lil gui
    // todo add multiple images

    // this.loadImages(this.images, (images) => {
    //   this.images = images
    //   this.pixiRender()
    // })
  }

  async init() {
    const app = new Application()

    await app.init({ height: 640, resizeTo: window, preference: "webgl" })

    document.body.appendChild(app.view)

    // Build geometry.
    const geometry = new Geometry({
      attributes: {
        aPosition: [
          0,
          0, // x, y
          200,
          0, // x, y
          200,
          200, // x, y,
          0,
          200, // x, y,
        ],
        aUV: [0, 0, 1, 0, 1, 1, 0, 1],
      },
      indexBuffer: [0, 1, 2, 0, 2, 3],
    })

    // Load a perlinnoise texture for one of the shaders.
    const perlinTexture = await Assets.load(
      "https://pixijs.com/assets/perlin.jpg"
    )

    const noiseShader = Shader.from({
      gl: {
        vertex,
        // Second effect. Generates a filtered noise.
        fragment: noiseFragment,
      },
      resources: {
        noiseUniforms: {
          limit: { type: "f32", value: 0.5 },
        },
        noise: perlinTexture.source,
      },
    })

    const noiseTexture = RenderTexture.create({ width: 200, height: 200 })
    const noiseQuad = new Mesh({ geometry, shader: noiseShader })
    const noiseContainer = new Container()

    noiseContainer.addChild(noiseQuad)

    noiseContainer.position.set(10, 220)

    app.stage.addChild(noiseContainer)

    // start the animation..
    let time = 0

    app.ticker.add(() => {
      time += 1 / 60

      noiseQuad.shader.resources.noiseUniforms.uniforms.limit =
        Math.sin(time * 0.5) * 0.35 + 0.5

      // Render the passes to get textures.
      app.renderer.render({
        container: noiseQuad,
        target: noiseTexture,
      })
    })
  }

  // loadImages(paths, whenLoaded) {
  //   const imgs = []
  //   paths.forEach(function (path) {
  //     var img = new Image()
  //     img.onload = function () {
  //       imgs.push(img)
  //       if (imgs.length == paths.length) whenLoaded(imgs)
  //     }
  //     img.src = path
  //   })
  // }
}

const sketch = new Sketch()
