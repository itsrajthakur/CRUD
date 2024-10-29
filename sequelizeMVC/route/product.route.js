import express from "express";
import { add, list, remove, update } from "../controller/product.controller.js";

const router = express.Router();

// Add a new vehicle
router.post("/add", add);

// Update vehicle details
router.put("/update", update);

// List all vehicles
router.get("/list", list);

// Remove a vehicle
router.delete("/remove", remove);

export default router;