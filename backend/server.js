const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/article", blogRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/article/:name", async (req, res) => {
  connectDB(async (db) => {
    const articleName = req.params.name;

    const articleDetails = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleDetails);
  }, res);
});

app.post("/api/article/:name/post-comments", (req, res) => {
  connectDB(async (db) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    const articleDetails = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleDetails.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleDetails = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleDetails);
  }, res);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port :http://localhost:${PORT}`)
);
