const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("API is running");
});

const connectDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
};

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

app.listen(5000, console.log("Server started on PORT 5000"));
