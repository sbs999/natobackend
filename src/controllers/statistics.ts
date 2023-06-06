import { RequestHandler } from "express";
import Person from "../models/Person";
import History from "../models/History";

export const fetchStatistics: RequestHandler = async (req, res, next) => {
  try {
    const persons = await Person.find();
    const history = await History.findById("63add4fe312a99c884ab7971");
    if (!history) {
      throw new Error("error in History!");
    }

    const totalDebt = persons.reduce(
      (acumulator, current) => acumulator + current.money,
      0
    );
    const peopleWithDebt = persons.length;
    const peopleWithoutDebt = history.people.length;

    res.json({
      peopleWithDebt,
      totalDebt: totalDebt.toFixed(2),
      allPeople: peopleWithoutDebt + persons.length,
    });
  } catch (error) {
    next(error);
  }
};
