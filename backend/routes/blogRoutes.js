const express = require("express");
const {
  getAllArticles,
  addArticle,
  updateArticle,
  getById,
  deleteArticle,
  getByUserId,
} = require("../controller/blogController");
const router = express.Router();

router.get("/", getAllArticles);
router.post("/post", addArticle);
router.put("/update/:id", updateArticle);
router.get("/:id", getById);
router.delete("/:id", deleteArticle);
router.get("/user/:id", getByUserId);

module.exports = router;
