export interface IFinItem {
  amount: number;
  category: string;
  city: string;
  comment: string;
  date: string;
  id: string;
  isScheduled: number;
  place: string;
  rating: IRating;
  scheduleId: string;
  subcategory: string;
  userId: number;
}

export interface IRating {
  id: string;
  rating: number;
  positiveComment: string;
  negativeComment: string;
  finId: string;
  userId: number;
}
