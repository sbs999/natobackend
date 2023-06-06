import { RequestHandler } from "express";
import { getDate } from "../helper";
import * as Types from "../interfaces/persons";
import * as service from "../services/person";

export const addPerson: RequestHandler = async (req, res, next) => {
  const body: Types.AddPersonType = req.body;
  const date: Types.DateType = getDate();

  try {
    const newPerson = await service.addPersonLogic({ ...body, date });

    res.json({ result: newPerson });
  } catch (eror) {
    next(eror);
  }
};

export const getPersons: RequestHandler = async (req, res, next) => {
  try {
    const persons = await service.getPersonLogic();

    res.json({ persons });
  } catch (error) {
    next(error);
  }
};

export const getPersonsFromHistory: RequestHandler = async (req, res, next) => {
  try {
    const persons = await service.getPersonsFromHistoryLogic();

    res.json({ persons });
  } catch (error) {
    next(error);
  }
};

export const updatePerson: RequestHandler = async (req, res, next) => {
  const body: Types.UpdatePersonType = req.body;

  try {
    await service.updatePersonLogic(body);

    res.json({ result: "წარმატებულია!" });
  } catch (error) {
    next(error);
  }
};

export const removePersonFromHistory: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.params.id;

  try {
    await service.removePersonFromHistoryLogic(id);

    res.json({ message: "delete successfuly!" });
  } catch (error) {
    next(error);
  }
};
