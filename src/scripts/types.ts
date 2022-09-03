// Format of one data object in fetched array
export interface DailySpending {
  day: string,
  amount: number,
}

// The DOM element and numerical amount within used in the 'count up' algorithm
export interface CountUpable {
  element: HTMLElement,
  amount: number,
}