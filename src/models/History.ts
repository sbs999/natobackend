import mongoose, {Schema} from "mongoose";

const HistorySchema = new Schema({
    totalMoney: {
        type: Number,
        required: true
    },
    people: {
        type: [{name: String,surname: String,info: String,mobNumber: String,lastPaymentHistory: [{status: String,money: Number,sumOfMoney: Number,date: {year: Number,month: Number,day: Number,hour: Number,minute: Number},info: String}]}],
        required: true
    },
    secPas: {
        type: Number,
        required: true
    }
},{timestamps: true});

export default mongoose.model("History",HistorySchema);

