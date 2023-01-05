import {RequestHandler} from "express";
import Person from "../models/Person";
import History from "../models/History";
import jsonWebToken from "jsonwebtoken";
export const addPerson: RequestHandler = async (req,res,next) => {
    const {name,surname,personInfo,debtInfo,money,mobNumber,histroyStatus} = req.body;
    
     const date = {year: new Date().getFullYear(),month: new Date().getMonth(),day: new Date().getDate(),hour: new Date().getHours() + 4,minute: new Date().getMinutes()};
     const payment = [{status: "add",money: +money,date: date,info: debtInfo || "",sumOfMoney: money}];
     const allDatas = {name: name,surname: surname,info: personInfo,money: money,mobNumber: mobNumber,payment: payment,status: "NotInHistory"};
     
     try {
      const history = await History.findById('63add4fe312a99c884ab7971');
      if(!history) {
        throw new Error("eror in totalMonyInHistory!");
      }
      if(histroyStatus.status === "history") {
        history.people =  history.people.filter(p => "_id" in p ? p._id?.toString() !== histroyStatus.id.toString() : true);
      }
       const newPerson =  new Person(allDatas);
        const add = await newPerson.save();
        // 
        history.totalMoney +=  money; 
        history.totalMoney = +history.totalMoney.toFixed(2);
         await history.save();
        //  
        res.json({result: add})
     }catch(error) {
        console.log(error);
       next(error);
     }
}

export const getPersons: RequestHandler = async (req,res,next) => {
    try {
      const api = await Person.find();
      res.json({persons: api})
    }catch(error) {
      next(error);
    }
}

export const addMoney: RequestHandler = async (req,res,next) => {
  const money = (req.body as {money: number,info: string,id: string}).money;
  const date = {year: new Date().getFullYear(),month: new Date().getMonth(),day: new Date().getDate(),hour: new Date().getHours(),minute: new Date().getMinutes()};
  try {
    const person = await Person.findById(req.body.id);
    if(!person) {
      throw new Error("ასეთი ადამიანი არ არსებობს!");
    }
    person.money += money; 
    person.money = +person.money.toFixed(2);
   const payment = {status: "add",money: +money,date: date,info: req.body.info || "",sumOfMoney: person.money};
    person.payment.push(payment);
    const result = await person.save();
    // 
    const totalMonyInHistory = await History.findById('63add4fe312a99c884ab7971');
    if(!totalMonyInHistory) {
      throw new Error("eror in totalMonyInHistory!");
    }
    totalMonyInHistory.totalMoney +=  money; 
    totalMonyInHistory.totalMoney = +totalMonyInHistory.totalMoney.toFixed(2);
     await totalMonyInHistory.save();
    //  
    res.json({result: result})
  }catch(error) {
    next(error);
  }
}

export const payMoney: RequestHandler = async (req,res,next) => {
  const money = (req.body as {money: number,info: string,id: string}).money;
  const date = {year: new Date().getFullYear(),month: new Date().getMonth(),day: new Date().getDate(),hour: new Date().getHours(),minute: new Date().getMinutes()};
  try {
    const history = await History.findById('63add4fe312a99c884ab7971');
    if(!history) {
      throw new Error("eror in totalMonyInHistory!");
    }
    const person = await Person.findById(req.body.id);
    if(!person) {
      throw new Error("ასეთი ადამიანი არ არსებობს!");
    }
    if(money > person.money) {
      throw new Error("არასწორად შეყვანილი თანხა, სცადეთ თავიდან!");
      // ვჩეკავ ფული მეტი ხო არ ჩარიცხა რაც ვალია
    }
    if(money === person.money) {
      // ვჩეკავ ვალს სრულად იხდის თუ არა და თუ სრულად იხდის ვშლი ვალების სიიდან და ვამატებ ისტორიების სიაში.
      // 
        history.people.push({name: person.name,surname: person.surname,info: person.info,mobNumber: person.mobNumber,lastPaymentHistory: person.payment});
        history.totalMoney -=  person.money;
        history.totalMoney = +history.totalMoney.toFixed(2);
        await history.save();
      // 
      await Person.findByIdAndDelete(person._id);
      res.json({result: "succesfully add!"})
      return;
    }
  //  და ბოლოს თუ უბრალოდ ვალის რაღაც ნაწილს იხდის ვაკლებ ვალს ისტრიაშიც და ადამინთან
    person.money -= money; 
    person.money = +person.money.toFixed(2);
    const payment = {status: "pay",money: +money,date: date,info: req.body.info || "",sumOfMoney: person.money};
    person.payment.push(payment);
    const result = await person.save();
    // 
    history.totalMoney -=  money;
    history.totalMoney = +history.totalMoney.toFixed(2);
    await history.save();
    // 
    res.json({result: result})
  }catch(error) {
    next(error);
  }
}

export const getPersonsFromHistory: RequestHandler = async (req,res,next) => {
  try {
    const history = await History.findById('63add4fe312a99c884ab7971');
    res.json({persons: history?.people});
  }catch(error) {
    next(error);
  }
}

export const updatePerson: RequestHandler = async (req,res,next) => {
   const {name,surname,money,updateInfo,personInfo,mobNumber,id} = req.body;
   try {
     const person = await Person.findById(id);
     if(!person) {
      throw new Error("შეცდომაა! ასეთი ადამიანი სიაში ვერ ვიპოვე!");
     }
     person.name = name;
     person.surname = surname;
     person.info = personInfo;
     person.mobNumber = mobNumber;
     if(money !== person.money) {
      const history = await History.findById('63add4fe312a99c884ab7971');
      if(!history) {
        throw new Error("eror in totalMonyInHistory!");
      }
      history.totalMoney -= person.money;
      history.totalMoney = +history.totalMoney.toFixed(2);
      history.totalMoney += money;
      history.totalMoney = +history.totalMoney.toFixed(2);
      await history.save();
      // 
      person.money = money;
      const date = {year: new Date().getFullYear(),month: new Date().getMonth(),day: new Date().getDate(),hour: new Date().getHours(),minute: new Date().getMinutes()};
      const payment = {status: "edit",money: +money,date: date,info: updateInfo,sumOfMoney: +money};
      person.payment.push(payment);
     }
     await person.save();
     res.json({result: "წარმატებულია!"})
   }catch(error) {
    next(error);
   }
}


export const SignIn: RequestHandler = async (req,res,next) => {
    const password = req.body.password;
    try {
      const history = await History.findById('63add4fe312a99c884ab7971');
      if(!history) {
        throw new Error("eror in totalMonyInHistory!");
      }
      if(history.secPas.toString() === password.toString()) {
        const token = jsonWebToken.sign({},"MyTokenIsVerySafeDontTrySomthingBoolshitBySbsMaster!");
        res.json({message: "წარმატებულია!",token: token})
      }else{
      throw new Error("არასწორია პაროლი!");
      }
    }catch(error) {
      next(error);
    }
}


export const getTotalMoney: RequestHandler = async (req,res,next) => {
  try {
    const history = await History.findById('63add4fe312a99c884ab7971');
    res.json({totalMoney: history?.totalMoney});
  }catch(error) {
    next(error);
  }
}
