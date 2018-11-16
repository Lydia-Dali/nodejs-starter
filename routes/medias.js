var express = require('express');
var router = express.Router();
const Media = require("../models").Media
const Tag = require("../models").Tag

/* GET medias listing. */
router.get('/', function(req, res, next) {
  Media.findAll()
  .then((medias) => {
    res.json({medias})
  })
  .catch((error) => res.status(500).json({message: error}))
});

/* GET media by id. */
router.get('/:id', function(req, res, next) {
  Media.findByPk(req.params.id, {include: [ Tag ]})
  .then((media) => {
    if(media){
      res.json({media})
    } else {
      res.status(404).json({message: `Media does not exist with id: ${req.params.id}`})
    }
  })
  .catch((error) => res.status(500).json({message: error}))
});

/* POST new media. */
router.post('/create', function(req, res, next) {
  if(req.body.name && req.body.type && req.body.url){
    Media.create({
      name: req.body.name,
      type: req.body.type,
      url: req.body.url
    })
    .then((newMedia) => {
      if(req.body.tagIds){
        let tagIds = req.body.tagIds.split(",")
        Tag.findAll({where: {id: tagIds}})
        .then(tags => newMedia.addTags(tags))
        .catch(err => res.send(err))
      }
      res.json({media: newMedia});
    })
    .catch((error) => res.status(500).json({error}))
  } else {
    res.status(500).json({message: "name or type or url cannot be blank"})
  }
});

/* PUT edit media. */
router.put('/edit/:id', function(req, res, next) {
  Media.findByPk(req.params.id)
  .then((media) => {
    if(media){
      if(req.body.name && req.body.type && req.body.url){
        media.name = req.body.name;
        media.type = req.body.type;
        media.url = req.body.url;
        media.save()
        .then((updatedMedia) => {
          if(req.body.tagIds){
            let tagIds = req.body.tagIds.split(",")
            Tag.findAll({where: {id: tagIds}})
            .then(tags => updatedMedia.addTags(tags))
            .catch(err => res.send(err))
          }
          res.json({media: updatedMedia})
        })
        .catch((error) => res.status(500).json({message: error}))
      } else {
        res.status(500).json({message: "name or type or url cannot be blank"})
      }
    } else {
      res.status(404).json({message: `Media does not exist with id: ${req.params.id}` })
    }
  })
  .catch((error) => res.status(500).json({message: error}))
});

/* DELETE existing media. */
router.delete('/:id', function(req, res, next) {
  Media.findByPk(req.params.id)
  .then((media) => {
    if(media){
      media.destroy()
      .then((media) => res.json({message: 'Media has been deleted'}))
      .catch((error) => res.status(500).json({message: error}))
    } else {
      res.status(404).json({message: `Media does not exist with id: ${req.params.id}`})
    }
  })
  .catch((error) => res.status(500).json({message: error}))
});



module.exports = router;
