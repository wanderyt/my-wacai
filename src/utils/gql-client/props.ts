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
  tags: string;
  userId: number;
}

export interface ICategoryGroup {
  category: string;
  subcategory: string;
}

export const RATING_STATUS_MAPPING = {
  0: 'ANGRY',
  1: 'OK',
  2: 'HAPPY',
};

export type IRatingStatus = keyof typeof RATING_STATUS_MAPPING;

export interface IRating {
  id: string;
  rating: IRatingStatus;
  positiveComment?: string;
  negativeComment?: string;
  finId: string;
  userId: number;
}
