import './style.scss'
import { countUp, displayFinalAmounts } from './scripts/count-up'
import { renderGraph } from './scripts/graph'

(async () => {
  await renderGraph()

  // Don't count up amouns if prefers-reduced-motion is set
  const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)')
  if (!mediaQuery || mediaQuery.matches) {
    displayFinalAmounts()
  } else {
    requestAnimationFrame(countUp)
  }
})()