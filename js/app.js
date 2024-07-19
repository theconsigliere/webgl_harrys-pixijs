import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { splitTextLines } from "./split-text-lines"

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

function story() {
  const items = Array.from(document.querySelectorAll(".js-story-item"))
  const paths = Array.from(document.querySelectorAll(".js-path"))
  const originalTitles = Array.from(document.querySelectorAll(".js-title"))
  const originalDescs = Array.from(document.querySelectorAll(".js-desc"))
  const circles = Array.from(document.querySelectorAll(".js-line-circle"))
  const lines = Array.from(document.querySelectorAll(".js-line"))
  const timelines = {}
  const titles = []
  const descs = []

  //TODO 1: Split the text lines
  // TODO 2: create a timeline
  // TODO 3: animate the image
  // TODO 4: animate the path

  gsap.set(paths, {
    drawSVG: "0%",
  })

  originalTitles.map((title) => titles.push(splitTextLines(title)))

  originalDescs.map((desc) => descs.push(splitTextLines(desc)))

  console.log(titles)

  items.forEach((item, i) => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.25,
        ease: "none",
        ease: "expo.out",
      },
      paused: true,
    })

    ScrollTrigger.create({
      trigger: item,
      start: "top bottom-=10%",
      end: "bottom bottom-=10%",
      // scrub: true,
      // markers: true,
      onEnter: () => {
        tl.play()
        circles[i].classList.add("js-active")
      },
      onLeaveBack: () => {
        circles[i].classList.remove("js-active")
      },
      onEnterBack: () => {
        circles[i].classList.add("js-active")
      },
      onLeave: () => {
        circles[i].classList.remove("js-active")
      },
    })

    tl.to(paths[i], {
      drawSVG: "100%",
      ease: "none",
      // duration: 3.5,
    }).to(
      [titles[i], descs[i]],
      {
        yPercent: 0,
        stagger: 0.1,
      },
      0
    )
  })
}

story()
