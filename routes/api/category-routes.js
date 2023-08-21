const router = require("express").Router();
const { Model } = require("sequelize");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const allCategories = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(allCategories);
});

router.get("/:id", async (req, res) => {
  const singleCategory = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).json(singleCategory);
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
});

router.put("/:id", async (req, res) => {
  const updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (updatedCategory[0] === 0) {
    res.status(404).json({ message: 'Category not found' });
    return;
  }
  res.status(200).json({ message: 'Category updated successfully' });
});

router.delete("/:id", async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!deletedCategory) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.status(200).json({ message: "Category deleted successfully" });
});

module.exports = router;
