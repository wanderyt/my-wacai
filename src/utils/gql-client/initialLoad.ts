export const initialLoadQuery: (
  year: number,
  month: number,
  day: number,
  dayOfWeek: number,
  top?: number
) => string = (year, month, day, dayOfWeek, top = 15) => `
  finTopList(
    year: ${year}
    month: ${month}
    top: ${top}
  ) {
    id
    category
    subcategory
    comment
    date
    amount
    isScheduled
    scheduleId
    place
    city
    userId
    rating {
      id
      rating
      positiveComment
      negativeComment
    }
  }
  sumByYearMonth(
    year: ${year}
    month: ${month}
  )
  sumByWeek(
    year: ${year}
    month: ${month}
    day: ${day}
    dayOfWeek: ${dayOfWeek}
  )
  sumByDay(
    year: ${year}
    month: ${month}
    day: ${day}
  )
`;
