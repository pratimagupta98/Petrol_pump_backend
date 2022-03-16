const express = require("express");
const router = express.Router();
const {
    addattendence,
    allatendence,
    getoneatendence,
    deleteatendence,
    updateatendence,
  } = require("../controllers/staffattendence");
 router.post("/dealer/addattendence",addattendence);
router.get("/dealer/allatendence", allatendence);
router.post("/dealer/updateatendence/:id", updateatendence);

router.get("/dealer/getoneatendence/:id", getoneatendence);

router.get("/dealer/deleteatendence/:id", deleteatendence);

module.exports = router;