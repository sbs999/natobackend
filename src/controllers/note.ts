import { RequestHandler } from "express";
import Note from "../models/Note";
import { getDate } from "../helper";

export const postText: RequestHandler = async (req, res, next) => {
  try {
    if (!("text" in req.body && typeof req.body.text === "string")) {
      throw new Error("ტექსტი აუცილებელია.");
    }

    const note = await Note.findById("647c987c365b2d2da9d5735d");
    if (!note) {
      throw new Error("არ არის ასეთი ჩანაწერი.");
    }

    note.text = " " + req.body.text;
    await note.save();

    res.json({ message: "ჩანაწერი წარმატებით შეიქმნა!", text: req.body.text });
  } catch (error) {
    next(error);
  }
};

export const getText: RequestHandler = async (req, res, next) => {
  try {
    const note = await Note.findById("647c987c365b2d2da9d5735d");
    if (!note) {
      throw new Error("ჩანაწერი ვერ მოიძებნა.");
    }

    res.json({
      text: note.text.trim(),
      date: getDate(note.updatedAt),
    });
  } catch (error) {
    next(error);
  }
};
