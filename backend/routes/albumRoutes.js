const express = require('express');
const router = express.Router();

const albumController = require('../controllers/albumController');

//GET all albums
router.get('/', albumController.getAllAlbums);
//GET one album by ID
router.get('/:id', albumController.getAlbumById);
//CREATE album
router.post('/', albumController.createAlbum);
//UPDATE album
router.put('/:id', albumController.updateAlbum);
//DELETE album
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;