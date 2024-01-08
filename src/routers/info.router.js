import { Router } from "express";
const router = Router();
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

import {
  addInfo,
  getAllInfo,
  updateInfo,
  getInfo
} from "../controllers/info.controller.js";

// router.post("/addInfo", upload.single("pdf"), addInfo);
router.post("/addInfo", addInfo);
router.get("/getInfo", getAllInfo);
router.get("/getInfo/:id", getInfo);
router.put("/updateInfo/:id", updateInfo);

export default router;
