const express = require('express');
const router = express.Router();

const songController = require('../controllers/songController');

//GET all songs
router.get('/', songController.getAllSongs);
//GET one song by ID
router.get('/:id', songController.getSongById);
//CREATE song
router.post('/', songController.createSong);
//UPDATE song
router.put('/:id', songController.updateSong);
//DELETE song
router.delete('/:id', songController.deleteSong);

module.exports = router;