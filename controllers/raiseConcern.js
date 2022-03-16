const raiseConcern = require("../models/raiseConcern");
const resp = require("../helpers/apiresponse");
exports.addraiseConcern= async (req, res) => {
    const {
        
        concern,
        remark
     
    } = req.body;
  
    const newraiseConcern = new raiseConcern({
   
        concern:concern,
        remark:remark
      
      
    });
    const findexist = await raiseConcern.findOne({ concern: concern });
  if (findexist) {
    resp.alreadyr(res,'concern');
  } else {
    newraiseConcern
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
    }
}


exports.allraiseConcern = async (req, res) => {
    await raiseConcern
      .find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.getoneraiseConcern = async (req, res) => {
    await raiseConcern
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deleteraiseConcern= async (req, res) => {
    await raiseConcern.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updateraiseConcern = async (req, res) => {
    console.log(req.params.id);
  await raiseConcern
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
        //  console.log(req.params._id);
      },
        {
          $set: req.body,
        },
        { new: true }
      )
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  
