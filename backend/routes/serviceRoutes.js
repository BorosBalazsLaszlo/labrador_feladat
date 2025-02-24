import express from "express";
import { Service } from "../database.js";

const router = express.Router();

// GET - /api/service/:id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const service = await Service.findAll({ where: { userId } });
    if (!service.length) {
      return res.status(404).json({ error: "Nincs szervíz infó." });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - /api/service
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      breed,
      monthlyFee,
      weeklyTreatments,
      monthlyTreatments,
      unlimitedTreatments,
      messages,
    } = req.body;
    const service = await Service.create({
      userId,
      breed,
      monthlyFee,
      weeklyTreatments,
      monthlyTreatments,
      unlimitedTreatments,
      messages,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - api/service/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      breed,
      monthlyFee,
      weeklyTreatments,
      monthlyTreatments,
      unlimitedTreatments,
      messages,
    } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Dog service not found" });
    }

    service.breed = breed || service.breed;
    service.monthlyFee = monthlyFee || service.monthlyFee;
    service.weeklyTreatments =
      weeklyTreatments || service.weeklyTreatments;
      service.monthlyTreatments =
      monthlyTreatments || service.monthlyTreatments;
      service.unlimitedTreatments =
      unlimitedTreatments || service.unlimitedTreatments;
      service.messages = messages || service.messages;

    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - /api/service/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Szervíz nem található." });
    }
    await service.destroy();
    res.status(200).json({ message: "Szervíz létrehozva!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;