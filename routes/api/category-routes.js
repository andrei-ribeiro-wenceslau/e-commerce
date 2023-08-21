const express = require("express");
const router = express.Router();
const { Category, Product } = require("../../models");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching categories" });
  }
});

// GET a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(singleCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the category" });
  }
});

// CREATE a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while creating the category" });
  }
});

// UPDATE a category by ID
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while updating the category" });
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the category" });
  }
});

module.exports = router;
