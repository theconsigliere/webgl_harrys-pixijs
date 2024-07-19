import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { splitTextLines } from "./split-text-lines"

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

function story() {
  const image = document.querySelector(".js-image")
  const path = document.querySelector(".js-path")

  gsap.set(path, {
    drawSVG: "0%",
  })

  gsap.to(path, {
    delay: 1,
    duration: 3.5,
    drawSVG: "100%",
    ease: "power3.out",
  })
}

story()
