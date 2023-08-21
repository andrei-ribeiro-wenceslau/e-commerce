const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const allTags = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(allTags);
});

router.get("/:id", async (req, res) => {
  const singleTag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).json(singleTag);
});

router.post("/", (req, res) => {
  router.post("/", async (req, res) => {
    try {
      const tag = await Tag.create(req.body);

      if (req.body.productIds.length) {
        const productIdArray = req.body.productIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          };
        });

        await ProductTag.bulkCreate(productIdArray);
      }

      res.status(200).json(tag);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });
});

router.put("/:id", async (req, res) => {
  const updatedTag = await Tag.update(
    { tag_name: req.body.tag_name },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (updatedTag[0] === 0) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  res.status(200).json({ message: "Tag updated successfully" });
});

router.delete("/:id", async (req, res) => {
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!deletedTag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  res.status(200).json({ message: "Tag deleted successfully" });
});

module.exports = router;
