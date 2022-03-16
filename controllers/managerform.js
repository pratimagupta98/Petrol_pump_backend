const Manegeraddfrom = require("../models/managerform");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addmenegerform = async (req, res) => {
  const {
    maneger_name,
    addres,
    mobile,
    joining_date,
    adhar_number,
    pan_number,
    panImg,
    photograh,
    date_of_brith,
    salary_decieded,
    salary_date,
    any_other_facility,
    apprpved_leave,
    status,
  } = req.body;

  const newManegeraddfrom = new Manegeraddfrom({
    maneger_name: maneger_name,
    addres: addres,
    mobile: mobile,
    joining_date: joining_date,
    adhar_number: adhar_number,
    pan_number: pan_number,
    panImg: panImg,
    photograh: photograh,
    date_of_brith: date_of_brith,
    salary_decieded: salary_decieded,
    salary_date: salary_date,
    any_other_facility: any_other_facility,
    apprpved_leave: apprpved_leave,
    status: status,
  });

  const findexist = await Manegeraddfrom.findOne({ mobile: mobile });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else if (req.files) {
    if (req.files.panImg[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.panImg.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.panImg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.panImg[i].path);
        alluploads.push(resp.secure_url);
      }
      newManegeraddfrom.panImg = alluploads;
    }

    // console.log("req.files.photograh", req.files.photograh)

    if (req.files.photograh[0].path) {
      photograph_arry = [];
      for (let i = 0; i < req.files.photograh.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.photograh[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) { }
        );
        fs.unlinkSync(req.files.photograh[i].path);
        photograph_arry.push(resp.secure_url);
      }
      newManegeraddfrom.photograh = photograph_arry;
    }

    if (req.files.adharimg[0].path) {
      adharimg_Array = [];
      for (let i = 0; i < req.files.adharimg.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.adharimg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adharimg[i].path);
        adharimg_Array.push(resp.secure_url);
      }
      newManegeraddfrom.adharimg = adharimg_Array;
    }


    newManegeraddfrom
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
  } else {
    res.status(200).json({
      status: false,
      msg: "img not uploaded",
    });
  }
};

exports.allmanager = async (req, res) => {
  await Manegeraddfrom.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonemanager = async (req, res) => {
  await Manegeraddfrom.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.deletemanager = async (req, res) => {
  await Manegeraddfrom.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateonemanager = async (req, res) => {
  const {
    maneger_name,
    addres,
    mobile,
    joining_date,
    adhar_number,
    pan_number,
    panImg,
    photograh,
    date_of_brith,
    salary_decieded,
    salary_date,
    any_other_facility,
    apprpved_leave,
    status,

  } = req.body;
  data = {};
  if (maneger_name) {
    data.maneger_name = maneger_name;
  }
  if (addres) {
    data.addres = addres;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (joining_date) {
    data.joining_date = joining_date;
  }
  if (adhar_number) {
    data.adhar_number = adhar_number;
  }

  if (pan_number) {
    data.pan_number = pan_number;
  }
  if (date_of_brith) {
    data.date_of_brith = date_of_brith;
  }
  if (salary_decieded) {
    data.salary_decieded = salary_decieded;
  }

  if (salary_date) {
    data.salary_date = salary_date;
  }
  if (status) {
    data.status = status;
  }
  if (apprpved_leave) {
    data.apprpved_leave = apprpved_leave;
  }
  if (any_other_facility) {
    data.any_other_facility = any_other_facility;
  }
  if (req.files) {
    if (req.files.panImg) {
      alluploads = [];
      for (let i = 0; i < req.files.panImg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.panImg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.panImg[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.panImg = alluploads;
    }
    if (req.files) {
      if (req.files.photograh) {
        alluploads = [];
        for (let i = 0; i < req.files.photograh.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(
            req.files.photograh[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.photograh[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.photograh = alluploads;
      }
      if (req.files) {
        if (req.files.adharimg) {
          alluploads = [];
          for (let i = 0; i < req.files.adharimg.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(
              req.files.adharimg[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.adharimg[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.adharimg = alluploads;
        }
      }
      if (data) {
        const findandUpdateEntry = await Manegeraddfrom.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          { $set: data },
          { new: true }
        );

        if (findandUpdateEntry) {
          res.status(200).json({
            status: true,
            msg: "success",
            data: findandUpdateEntry,
          });
        } else {
          res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
          });
        }
      }
    }
  }
}
