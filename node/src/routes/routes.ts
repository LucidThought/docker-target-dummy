import express from "express";
import { ApiController } from "../controllers/api";

const router = express.Router();
const api = new ApiController();

router.post("/listener", api.listener);
router.post("/pephio", api.pephio);
router.get("/success", api.success);

// // Test endpoint
router.get("/ping", api.ping);

// // Catch all unset paths
router.all("*", api.notFound);

export default router;
