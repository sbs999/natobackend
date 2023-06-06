import {
  AddPersonType,
  DateType,
  UpdatePersonType,
} from "../interfaces/persons";
import Person from "../models/Person";
import History from "../models/History";
import { getDate } from "../helper";

type AddPersonLogicType = AddPersonType & { date: DateType };

export const addPersonLogic = async (values: AddPersonLogicType) => {
  const payment = {
    status: "add",
    money: +values.money,
    date: values.date,
    info: values.debtInfo || "",
    sumOfMoney: values.money,
  };

  const allDatas = {
    name: values.name,
    surname: values.surname,
    info: values.personInfo,
    money: values.money,
    mobNumber: values.mobNumber,
    payment: [payment],
    status: "NotInHistory",
  };

  // თუ ისტორიიდან ვამატებ ტიპს, მაშინ ვშლი ისტორიიდან.
  if (values.histroyStatus.status === "history") {
    await removePersonFromHistoryLogic(values.histroyStatus.id);
  }

  const newPerson = new Person(allDatas);
  await newPerson.save();

  return newPerson;
};

export const getPersonLogic = async () => {
  const persons = await Person.find();

  return persons;
};

export const getPersonsFromHistoryLogic = async () => {
  const history = await History.findById("63add4fe312a99c884ab7971");

  return history?.people;
};

export const updatePersonLogic = async (values: UpdatePersonType) => {
  const person = await Person.findById(values.id);
  if (!person) {
    throw new Error("შეცდომაა! ასეთი ადამიანი სიაში ვერ ვიპოვე!");
  }

  person.name = values.name;
  person.surname = values.surname;
  person.info = values.personInfo;
  person.mobNumber = values.mobNumber;

  // თუ თანხა იცვლება მხოლოდ მაშინ ხდება იუზერის ფეიმენთებში დამატება როგორც თანხის ედით სტატუსი.
  if (values.money !== person.money) {
    person.money = values.money;
    const date = getDate();

    const payment = {
      status: "edit",
      money: +values.money,
      date: date,
      info: values.updateInfo,
      sumOfMoney: +values.money,
    };
    person.payment.push(payment);
  }

  await person.save();
};

export const removePersonFromHistoryLogic = async (id: string) => {
  const history = await History.findById("63add4fe312a99c884ab7971");
  if (!history) {
    throw new Error("eror in totalMonyInHistory!");
  }

  const people = history.people.filter((p) =>
    "_id" in p ? p._id?.toString() !== id.toString() : true
  );

  if (people.length === history.people.length) {
    throw new Error("არ არის ასეთი ადამიანი!");
  }

  history.people = people;
  await history.save();
};
