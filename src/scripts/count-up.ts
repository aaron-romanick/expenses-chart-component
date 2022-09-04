import type { CountUpable } from './types'

// Variables used for timing in the 'count up' algorithm
let startTime: DOMHighResTimeStamp, prevTime: DOMHighResTimeStamp
const DURATION = 400

// CountUpables used in 'count up' algorithm
const COUNT_UPABLES: CountUpable[] = [
  {
    element: document.querySelector('.balance__total span')!,
    amount: 921.48,
  },
  {
    element: document.querySelector('.spending__total span')!,
    amount: 478.33,
  },
  {
    element: document.querySelector('.spending__percent span')!,
    amount: 2.4,
  },
]

export const displayFinalAmounts = () => {
  COUNT_UPABLES.forEach(countUpable => {
    countUpable.element.innerText = countUpable.amount.toString()
  })
}

// Counts up each CountUpable within DURATION until it reaches
// each respective CountUpables 'amount' value
export const countUp = (time: DOMHighResTimeStamp) => {
  if(startTime === undefined) {
    startTime = time
  }
  const elapsed = time - startTime

  if(prevTime !== time) {
    COUNT_UPABLES.forEach(COUNT_UPABLES => {
      COUNT_UPABLES.element.innerText = (elapsed / DURATION * COUNT_UPABLES.amount).toFixed(2)
    })
  }

  if(elapsed < DURATION) {
    prevTime = time
    requestAnimationFrame(countUp)
  } else {
    displayFinalAmounts()
  }
}