const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const allCategories = await Category.findAll({
    // be sure to include its associated Products
    include: [{ model: Product }],
  })
  res.status(200).json(allCategories);
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  const singleCategory = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
  include: [{ model: Product }],
  })
  res.status(200).json(singleCategory);
  
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory)
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
