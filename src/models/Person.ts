import mongoose, {Schema} from "mongoose";

const PersoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    mobNumber: {
        type: String,
        required: false
    },              
    payment: {
        type: [{status: String,money: Number,sumOfMoney: Number,date: {year: Number,month: Number,day: Number,hour: Number,minute: Number},info: String}],
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{timestamps: true});

export default mongoose.model("Person",PersoSchema);

