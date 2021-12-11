export const finTopList = (
  year: number,
  month: number,
  top: number
): string => `
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
`;

export const updateFinItem = data => {
  return `
    updateFullFinItem(finInput: {
      id: "${data.id}"
      category: "${data.category}"
      subcategory: "${data.subcategory}"
      comment: "${data.comment}"
      date: "${data.date}"
      amount: ${data.amount}
      "whether this fin item is set as scheduled, using [0, 1, 2, 3, 4]"
      isScheduled: Int
      scheduleId: String
      place: String
      "city where this fin item happened, default as 'Shanghai'"
      city: String
      tags: String
    })
  `;
};
