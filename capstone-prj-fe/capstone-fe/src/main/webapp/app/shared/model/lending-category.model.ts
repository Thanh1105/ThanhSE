import { ILendingRequest } from 'app/shared/model/lending-request.model';
import { ICategory } from 'app/shared/model/category.model';

export interface ILendingCategory {
  id?: number;
  lendingRequest?: ILendingRequest | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<ILendingCategory> = {};
