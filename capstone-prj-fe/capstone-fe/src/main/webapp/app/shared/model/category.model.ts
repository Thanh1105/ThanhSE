import { ILendingCategory } from 'app/shared/model/lending-category.model';

export interface ICategory {
  id?: number;
  label?: string | null;
  description?: string | null;
  lendingCategories?: ILendingCategory[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
