const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const mongoose = require("mongoose");

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
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find the user" });
  }
  const article = new Blog({
    title,
    content,
    thumbnail,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await article.save({ session });

    existingUser.blogs.push(article);
    await existingUser.save({ session });
    await session.commitTransaction();
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
    article = await Blog.findByIdAndRemove(id).populate("user");
    await article.user.blogs.pull(article);
    await article.user.save();
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
