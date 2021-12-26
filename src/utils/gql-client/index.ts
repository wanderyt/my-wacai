import { IFinItem, IRating } from './props';

export const DEFAULT_CITY = '上海';

export const createFinItem = (data: Partial<IFinItem>) => {
  return `
    ${
      data.isScheduled > 0 ? 'createScheduledFullFinItem' : 'createFullFinItem'
    }(finInput: {
      category: "${data.category}"
      subcategory: "${data.subcategory}"
      comment: "${data.comment}"
      date: "${data.date}"
      amount: ${data.amount}
      isScheduled: ${data.isScheduled || 0}
      place: "${data.place || ''}"
      city: "${data.city || DEFAULT_CITY}"
      tags: "${data.tags}"
    }, ratingInput: {
      rating: ${data.rating.rating || 1}
      positiveComment: "${data.rating.positiveComment || ''}"
      negativeComment: "${data.rating.negativeComment || ''}"
    }) {
      id
    }
  `;
};

export const updateFinItem = (data: Partial<IFinItem>) => {
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

export * from './initialLoad';
