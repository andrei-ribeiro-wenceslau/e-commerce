const express = require("express");
const router = express.Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// GET all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching products" });
  }
});

// GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!singleProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(singleProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the product" });
  }
});

// CREATE a new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArray = req.body.tagIds.map((tagId) => ({
        product_id: product.id,
        tag_id: tagId,
      }));

      await ProductTag.bulkCreate(productTagIdArray);
    }

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while creating the product" });
  }
});

// UPDATE a product by ID
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds.filter((tagId) => !productTagIds.includes(tagId))
        .map((tagId) => ({
          product_id: req.params.id,
          tag_id: tagId,
        }));

      const tagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: tagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while updating the product" });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the product" });
  }
});

module.exports = router;
