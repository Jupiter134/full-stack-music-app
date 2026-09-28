const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

//GET all artists
router.get('/', artistController.getAllArtists);

//GET one artist by ID
router.get('/:id', artistController.getArtistById);

//CREATE artist
router.post('/', artistController.createArtist);

//UPDATE artist
router.put('/:id', artistController.updateArtist);

//DELETE artist
router.delete('/:id', artistController.deleteArtist);

module.exports = router;