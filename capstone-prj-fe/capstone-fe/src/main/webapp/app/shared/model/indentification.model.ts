export interface IIndentification {
  id?: number;
  indentifyCard1?: string | null;
  indentifyCard2?: string | null;
  drivingLicense1?: string | null;
  drivingLicense2?: string | null;
  status?: number | null;
}

export const defaultValue: Readonly<IIndentification> = {};
