const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditcustomers = new Schema(
  {
    dealer_name1:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    name_of_customer: { type: String, require: true },
    mobile: { type: Number, require: true },
    credit_limit: { type: Number },
    credit_term_lube: { type: String },
    addres: { type: String },
    local_id: { type: Number },
    document_upload: { type: Array },
    vehicle_no: { type: Number },
    local_guarantor_name: { type: String },
    local_guarantor_no: { type: Number }
  },
  { timestamps: true }
);
module.exports = mongoose.model("creditcustomers", creditcustomers);
