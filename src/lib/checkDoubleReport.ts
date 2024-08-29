export const checkDoubleReport = async (
  measureDateTime1: string,
  measureDateTime2: string,
  measureType1: string,
  measureType2: string
) => {
  const measureMonthYear1 = new Date(measureDateTime1).getMonth() + new Date(measureDateTime1).getFullYear()
  const measureMonthYear2 = new Date(measureDateTime2).getMonth() + new Date(measureDateTime2).getFullYear()
  if (measureMonthYear1 === measureMonthYear2 && measureType1 === measureType2) {
    return true
  }
}
