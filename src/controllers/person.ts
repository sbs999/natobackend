import { RequestHandler } from "express";
import Person from "../models/Person";
import History from "../models/History";
import { getDate } from "../helper";

export const addPerson: RequestHandler = async (req, res, next) => {
  const body = req.body;

  const date = getDate();

  const payment = [
    {
      status: "add",
      money: +body.money,
      date: date,
      info: body.debtInfo || "",
      sumOfMoney: body.money,
    },
  ];

  const allDatas = {
    name: body.name,
    surname: body.surname,
    info: body.personInfo,
    money: body.money,
    mobNumber: body.mobNumber,
    payment: payment,
    status: "NotInHistory",
  };

  try {
    const history = await History.findById("63add4fe312a99c884ab7971");
    if (!history) {
      throw new Error("eror in totalMonyInHistory!");
    }

    // აქ ის ლოგიკაა რო თუ ისტორიიდან ვამატებ ტიპს, მაშინ ვშლი ისტორიიდან./
    if (body.histroyStatus.status === "history") {
      history.people = history.people.filter((p) =>
        "_id" in p
          ? p._id?.toString() !== body.histroyStatus.id.toString()
          : true
      );
    }

    const newPerson = new Person(allDatas);
    const add = await newPerson.save();

    history.totalMoney += body.money;
    history.totalMoney = +history.totalMoney.toFixed(2);
    await history.save();

    res.json({ result: add });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPersons: RequestHandler = async (req, res, next) => {
  try {
    const api = await Person.find();

    res.json({ persons: api });
  } catch (error) {
    next(error);
  }
};

export const getPersonsFromHistory: RequestHandler = async (req, res, next) => {
  try {
    const history = await History.findById("63add4fe312a99c884ab7971");

    res.json({ persons: history?.people });
  } catch (error) {
    next(error);
  }
};

export const updatePerson: RequestHandler = async (req, res, next) => {
  const { name, surname, money, updateInfo, personInfo, mobNumber, id } =
    req.body;

  try {
    const person = await Person.findById(id);
    if (!person) {
      throw new Error("შეცდომაა! ასეთი ადამიანი სიაში ვერ ვიპოვე!");
    }

    person.name = name;
    person.surname = surname;
    person.info = personInfo;
    person.mobNumber = mobNumber;

    // თუ თანხა იცვლება მხოლოდ მაშინ ხდება მთლიანი თანხის შეცვლა და იუზერის ფეიმენთებში დამატება როგორც თანხის ედით სტატუსი.
    if (money !== person.money) {
      const history = await History.findById("63add4fe312a99c884ab7971");
      if (!history) {
        throw new Error("eror in totalMonyInHistory!");
      }

      history.totalMoney -= person.money;
      history.totalMoney = +history.totalMoney.toFixed(2);
      history.totalMoney += money;
      history.totalMoney = +history.totalMoney.toFixed(2);
      await history.save();

      person.money = money;

      const date = getDate();

      const payment = {
        status: "edit",
        money: +money,
        date: date,
        info: updateInfo,
        sumOfMoney: +money,
      };
      person.payment.push(payment);
    }

    await person.save();
    res.json({ result: "წარმატებულია!" });
  } catch (error) {
    next(error);
  }
};
