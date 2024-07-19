import { gsap, SplitText } from "gsap/all"
gsap.registerPlugin(SplitText)

export function splitTextLines(text) {
  let newText = new SplitText(text, {
    type: "lines, words",
    linesClass: "lineChild",
  })
  let innerText = new SplitText(text, {
    type: "lines",
    linesClass: "lineParent",
  })

  gsap.set(newText.lines, { yPercent: 100 })

  return newText.lines
}
