const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/productController");

router.use(auth);

router.get("/", productController.getAll);
router.post("/", productController.create);
router.get("/:id", productController.getById);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

module.exports = router;
