var express = require('express');
var router = express.Router();
const Tag = require("../models").Tag

/* GET tags listing. */
router.get('/', function(req, res, next) {
  Tag.findAll()
  .then((tags) => {
    res.json({tags})
  })
  .catch((error) => res.status(500).json({message: error}))
});

/* GET tag by id. */
router.get('/:id', function(req, res, next) {
  Tag.findByPk(req.params.id)
  .then((tag) => {
    if(tag){
      res.json({tag})
    } else {
      res.status(404).json({message: `Tag does not exist with id: ${req.params.id}`})
    }
  })
  .catch((error) => res.status(500).json({message: error}))
});

/* POST new tag. */
router.post('/create', function(req, res, next) {
  if(req.body.name){
    Tag.create({
      name: req.body.name
    })
    .then((newTag) => {
      res.json({tag: newTag})
    })
    .catch((error) => res.status(500).json({message: error}))
  } else {
    res.status(500).json({message: "name cannot be blank"})
  }
});

/* PUT edit tag. */
router.put('/edit/:id', function(req, res, next) {
  Tag.findByPk(req.params.id)
  .then((tag) => {
    if(tag){
      if(req.body.name){
        tag.name = req.body.name;
        tag.save()
        .then((updatedTag) => {
          res.json({tag: updatedTag})
        })
        .catch((error) => res.status(500).json({message: error}))
      } else {
        res.status(500).json({message: "name cannot be blank"})
      }
    } else {
      res.status(404).json({message: `Tag does not exist with id: ${req.params.id}` })
    }
  })
  .catch((error) => res.status(500).json({message: error}))
});

/* DELETE existing tag. */
router.delete('/:id', function(req, res, next) {
  Tag.findByPk(req.params.id)
  .then((tag) => {
    if(tag){
      tag.destroy()
      .then((tag) => res.json({message: 'Tag has been deleted'}))
      .catch((error) => res.status(500).json({message: error}))
    } else {
      res.status(404).json({message: `Tag does not exist with id: ${req.params.id}`})
    }
  })
  .catch((error) => res.status(500).json({message: error}))
});



module.exports = router;
