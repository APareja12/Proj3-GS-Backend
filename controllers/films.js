const express = require('express');
const router = express.Router();
const Film = require('../models/film');
const filmSeed = require('../models/filmSeed')



router.get("/", async (req, res) => {
  console.log('hello')
    try {
      res.json(await Film.find({}));
    } catch (error) {
      res.status(400).json(error);
    }
  });


  
  router.get('/seed', async (req,res) => {
    try {
     Film.deleteMany({});
      const films = await Film.create(filmSeed);
      res.json(films);
    } catch (error) {
      console.log(error);
      res.json({error: 'something went wrong'});
    }
  })
  

  router.delete("/:id", async (req, res) => {
    try {
      res.json(await Film.findByIdAndDelete(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      res.json(
        await Film.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      res.status(400).json(error);
    }
  });


  router.post("/", async (req, res) => {
    try {
      res.json(await Film.create(req.body));
      console.log(req.body)
    } catch (error) {
      res.status(400).json(error);
    }
  });


module.exports = router;