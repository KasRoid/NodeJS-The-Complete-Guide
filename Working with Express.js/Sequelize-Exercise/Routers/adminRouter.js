const express = require(`express`);

const router = express.Router();

const controller = require(`../controllers/adminController`);

// GET
router.get(`/`, controller.getAddProduct);
router.get(`/edit`, controller.getEditProduct);

// POST
router.post(`/`, controller.postAddProduct);
router.post(`/delete`, controller.postDeleteProduct);
router.post(`/edit/item`, controller.postEditProduct);

module.exports = router;
