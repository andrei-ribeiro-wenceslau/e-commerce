const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll({
    // be sure to include its associated Product data
    include: [{ model: Product }],
  });
  res.status(200).json(allTags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const singleTag = await Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include: [{ model: Product }],
  });
  res.status(200).json(singleTag);
});

router.post("/", (req, res) => {
  // create a new tag
  router.post('/', async (req, res) => {
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

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
