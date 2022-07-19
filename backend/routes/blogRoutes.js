const express = require("express");
const {
  getAllArticles,
  addArticle,
  updateArticle,
  getById,
  deleteArticle,
} = require("../controller/blogController");
const router = express.Router();

router.get("/", getAllArticles);
router.post("/post", addArticle);
router.put("/update/:id", updateArticle);
router.get("/:id", getById);
router.delete("/:id", deleteArticle);

module.exports = router;
