import './style.scss'
import { countUp } from './scripts/count-up'
import { renderGraph } from './scripts/graph'

(async () => {
  await renderGraph()
  requestAnimationFrame(countUp) // TODO make this fire after fetch finished
})()