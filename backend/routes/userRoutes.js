import express from "express";
import { User } from "../database.js";

const router = express.Router();

// GET - /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
});

// GET - /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Nem található felhasználó" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - /api/users
router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.create({ name, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Nem található felhasználó!" });
    }
    await user.destroy();
    res.status(200).json({ message: "Sikeres törlés!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;