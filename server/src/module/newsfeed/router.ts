import express  from "express";
const NewsFeed = express.Router();

NewsFeed.get("/", (req, res) => {
    res.send('Done loading');
})

export default NewsFeed;