import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { splitTextLines } from "./split-text-lines"

import Lenis from "lenis"

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

function story() {
  const items = Array.from(document.querySelectorAll(".js-story-item"))
  const paths = Array.from(document.querySelectorAll(".js-path"))
  const originalTitles = Array.from(document.querySelectorAll(".js-title"))
  const originalDescs = Array.from(document.querySelectorAll(".js-desc"))
  const circles = Array.from(document.querySelectorAll(".js-line-circle"))
  const lineTitles = Array.from(document.querySelectorAll(".js-line-title"))
  const lines = Array.from(document.querySelectorAll(".js-line"))
  const timelines = {}
  const titles = []
  const descs = []

  //LENIS

  const lenis = new Lenis()

  lenis.on("scroll", ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  gsap.set(paths, {
    drawSVG: "0%",
  })

  gsap.set(lines, {
    yPercent: -100,
  })

  //map through line titles if odd set yPercent to 100 else -100
  lineTitles.map((lineTitle, i) => {
    if (i % 2 === 0) {
      gsap.set(lineTitle, {
        xPercent: 100,
      })
    } else {
      gsap.set(lineTitle, {
        xPercent: -100,
      })
    }
  })

  originalTitles.map((title) => titles.push(splitTextLines(title)))
  originalDescs.map((desc) => descs.push(splitTextLines(desc)))

  items.forEach((item, i) => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.25,
        ease: "none",
        ease: "expo.out",
      },
      paused: true,
      scrollTrigger: {
        trigger: items[i],
        start: "top center+=25%",
        end: "bottom center+=25%",
        // markers: true,
      },
      onStart: () => {
        circles[i].classList.add("js-active")
      },
      onComplete: () => {
        circles[i].classList.remove("js-active")
      },
    })

    tl.to(
      [titles[i], descs[i]],
      {
        yPercent: 0,
        stagger: 0.1,
      },
      0
    )

    tl.to(
      paths[i],
      {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: items[i],
          start: "top center+=25%",
          end: "bottom center+=25%",
          scrub: 1,
          // once: true,
        },
      },
      0
    )

    tl.to(
      lineTitles[i],
      {
        xPercent: 0,
        duration: 0.75,
        ease: "expo.out",
      },
      0
    )

    tl.to(lines[i], {
      yPercent: 0,
      scrollTrigger: {
        trigger: items[i],
        start: "top center+=25%",
        end: "bottom center+=25%",
        scrub: true,

        // once: true,
      },
    })
  })
}

story()
