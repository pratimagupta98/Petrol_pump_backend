const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dsmclosingsheet = new Schema(
  {
    date:{type: String},
    dealer_name1:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    name_of_dsm:{type: mongoose.Schema.Types.ObjectId,ref:"dsmform"},
   // ms_sales: { type: mongoose.Schema.Types.ObjectId,ref:"bm" },
    ms_sales:{ type: Number},
    ms_testing: { type: Number },
    ms_own_use: { type: Number },
   // hsd_sales: {type: mongoose.Schema.Types.ObjectId,ref:"bm"  },
    hsd_sales:{type: Number},
    hsd_testing:{type: Number},
    hsd_own_use:{type: Number},
   // lubricant_sales: {type: mongoose.Schema.Types.ObjectId,ref:"lubricantsales"},
   lubricant_sales:{ype: Number},
    net_cash: { type: Number }
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("dsmclosingsheet", dsmclosingsheet);
