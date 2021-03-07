const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
        include: [
            {
                model: Product,
                through: ProductTag
            }
        ]
    })
    .then(dbTagData => res.status(200).json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Product,
                through: ProductTag
            }
        ]
    })
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // create a new tag
    /* req.body should look like this...
      {
        tag_name: "yellow",
        productIds: [1, 2, 4]
      }
    */
   Tag.create(req.body)
        .then((tag) => {
            // if there's a list of products the tag is associated with, 
            // then create pairings to bulk create in the ProductTag model
            if (req.body.productIds.length) {
                const productTagIdArr = req.body.productIds.map((product_id) => {
                    return {
                        product_id,
                        tag_id: tag.id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product list, just respond
            res.status(200).json(tag);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((tag) => {
        // find all associated proucts from ProductTag
        return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((productTags) => {
        // get list of current product_ids
        const productTagIds = productTags.map(({ product_id }) => product_id);
        // create filtered list of new product_ids
        const newProductTags = req.body.productIds
            .filter((product_id) => !productTagIds.includes(product_id))
            .map((product_id) => {
                return {
                    product_id,
                    tag_id: req.params.id,
                };
            });
        // figure out which ones to remove
        const productTagsToRemove = productTags
            .filter(({ product_id }) => !req.body.productIds.includes(product_id))
            .map(({ id }) => id);

        // run both actions as Promises
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {
          id: req.params.id
        }
    })
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
