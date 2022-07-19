const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const getAllArticles = async (req, res, next) => {
  let articles;
  try {
    articles = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!articles) {
    return res.status(404).json({ message: "No Articles Found" });
  }
  return res.status(200).json({ articles });
};

const addArticle = async (req, res, next) => {
  const { title, content, thumbnail, user } = req.body;
  const article = new Blog({
    title,
    content,
    thumbnail,
    user,
  });
  try {
    await article.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ article });
};

const updateArticle = async (req, res, next) => {
  const { title, content } = req.body;
  const blogId = req.params.id;
  let article;
  try {
    article = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!article) {
    return res.status(500).json({ message: "Unable To Update The Article" });
  }
  return res.status(200).json({ article });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let article;
  try {
    article = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!article) {
    return res.status(404).json({ message: "No Article Found" });
  }
  return res.status(200).json({ article });
};

const deleteArticle = async (req, res, next) => {
  const id = req.params.id;

  let article;
  try {
    article = await Blog.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!article) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

module.exports = {
  getAllArticles,
  addArticle,
  updateArticle,
  getById,
  deleteArticle,
};
