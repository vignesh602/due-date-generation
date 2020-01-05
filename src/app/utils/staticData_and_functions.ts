const week = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
export const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthData = [
  { label: 'Jan', value: 'January' },
  { label: 'Feb', value: 'February' },
  { label: 'Mar', value: 'March' },
  { label: 'Apr', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'Jun', value: 'June' },
  { label: 'Jul', value: 'July' },
  { label: 'Aug', value: 'August' },
  { label: 'Sep', value: 'September' },
  { label: 'Oct', value: 'October' },
  { label: 'Nov', value: 'November' },
  { label: 'Dec', value: 'December' },
]

export const weekData = [
  { label: 'Mon', value: 'Monday' },
  { label: 'Tues', value: 'Tuesday' },
  { label: 'Wed', value: 'Wednesday' },
  { label: 'Thu', value: 'Thursday' },
  { label: 'Fri', value: 'Friday' },
  { label: 'Sat', value: 'Saturday' },
  { label: 'Sun', value: 'Sunday' },
]

export function getDay(number) {
  return week[number];
}

export function getMonth(number) {
  return month[number];
}

export function getMonthNumber(name) {
  return month.findIndex(el => el === name);
}