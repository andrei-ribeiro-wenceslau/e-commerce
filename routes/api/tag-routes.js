const express = require("express");
const router = express.Router();
const { Tag, Product, ProductTag } = require("../../models");

// GET all tags
router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching tags" });
  }
});

// GET a single tag by ID
router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleTag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(singleTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the tag" });
  }
});

// CREATE a new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);

    if (req.body.productIds && req.body.productIds.length) {
      const productIdArray = req.body.productIds.map((productId) => ({
        tag_id: tag.id,
        product_id: productId,
      }));

      await ProductTag.bulkCreate(productIdArray);
    }

    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while creating the tag" });
  }
});

// UPDATE a tag by ID
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedRows === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json({ message: "Tag updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while updating the tag" });
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the tag" });
  }
});

module.exports = router;
