const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/article/:name", async (req, res) => {
  try {
    const articleName = req.params.name;
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blog");
    const articleDetails = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleDetails);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.post("/api/article/:name/post-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articleDetails[articleName].comments.push({ username, text });
  res.status(200).send(articleDetails[articleName]);
});
app.listen(5000, console.log("Server started on PORT 5000"));
