const express = require('express');
const router = express.Router();
const Film = require('../models/film');



router.get("/films", async (req, res) => {
    try {
      // send all people
      res.json(await Film.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  router.delete("/films/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Film.findByIdAndDelete(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  router.put("/films/:id", async (req, res) => {
    try {
      res.json(
        await Film.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      res.status(400).json(error);
    }
  });

router.get("/films", async (req, res) => {
    try {
      res.json(await People.find({}));
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.post("/films", async (req, res) => {
    try {
      res.json(await Film.create(req.body));
    } catch (error) {
      res.status(400).json(error);
    }
  });


module.exports = router;