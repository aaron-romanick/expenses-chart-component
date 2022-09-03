import type { DailySpending } from './types'

// Fetch data from server
const fetchData = async (url: string): Promise<DailySpending[]> => {
  const reponse = await fetch(url)
  return await reponse.json()
}

// Makes elements based on server data and places them in the DOM
export const renderGraph = async () => {
  const urlPrefix = import.meta.env.PROD
    ? '/expenses-chart-component'
    : ''
  const data = await fetchData(`${urlPrefix}/data/data.json`)

  const barEls: HTMLElement[] = []
  const weekdayEls: HTMLElement[] = []
  const today = todayWeekday()
  const maxSpending = findMaxSpending(data.map(daySpending => daySpending.amount))

  data.forEach((daySpending: DailySpending) => {

    const barEl = makeBarEl(daySpending, today, maxSpending)
    barEls.push(barEl)

    const weekdayEl = makeWeekdayEl(daySpending.day)
    weekdayEls.push(weekdayEl)
  })
  const graphEl = document.querySelector(`.${'spending__graph'}`)
  graphEl!.append(...barEls, ...weekdayEls)
}

// Makes a bar element, adds appropriate attributes,
// and adds event listeners
const makeBarEl = (daySpending: DailySpending, today: string, maxSpending: number) => {
  const barEl = document.createElement('a')
  // https://stackoverflow.com/questions/22559756/changing-hover-to-touch-click-for-mobile-devices
  // @indapublic
  // Makes hover effect work on touchscreens too
  barEl.addEventListener('touchstart', () => {}, true)
  barEl.classList.add('spending__bar')

  if(today === daySpending.day) {
    barEl.dataset.type = 'today'
  }
  const dailyEl = makeDailyEl(daySpending.amount)
  barEl.appendChild(dailyEl)
  barEl.dataset.state = 'is-entering'
  barEl.style.height = calcHeight(daySpending.amount, maxSpending)
  animationEndListener(barEl)
  return barEl
}

// Makes a daily element and adds appropriate attributes
const makeDailyEl = (amount: number) => {
  const dailyEl = document.createElement('div')
  dailyEl.classList.add('spending__daily')
  dailyEl.innerText = `$${amount}`
  return dailyEl
}

// Add 'animationend' listener to bar element
const animationEndListener = (el: HTMLElement) => {
  el.addEventListener(
    'animationend',
    (evt: AnimationEvent) => {
      const target = evt.target as HTMLElement
      delete target.dataset.state
    },
    { once: true }
  )
}

// Makes a weekday element and adds appropriate attributes
const makeWeekdayEl = (day: string) => {
  const weekdayEl = document.createElement('div')
  weekdayEl.innerText = day
  weekdayEl.classList.add('spending__weekday')
  return weekdayEl
}

// Finds the day with the max spending within all data
const findMaxSpending = (data: number[]) => {
  return Math.max(...data)
}

// Calculation of the height of a bar element
const calcHeight = (amount: number, maxAmount: number) => {
  return `${amount / maxAmount * 100}%`;
}

// Get today's formatted weekday (eg: 'wed')d
const todayWeekday = () => {
  const date = new Date()
  return date.toLocaleDateString('en-US', { weekday: 'short'})
    .toLowerCase()
}