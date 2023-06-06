export interface AddPersonType {
  name: string;
  surname: string;
  money: string;
  personInfo: string;
  debtInfo: string;
  mobNumber: string;
  histroyStatus: { status: string; id: string };
}

export interface DateType {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface UpdatePersonType {
  name: string;
  surname: string;
  money: number;
  updateInfo: string;
  personInfo: string;
  mobNumber: string;
  id: string;
}
