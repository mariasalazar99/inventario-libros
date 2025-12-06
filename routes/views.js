const express = require('express');
const router = express.Router();
const { Libro } = require('../models');

// Páginas de registro y login
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Página de libros
router.get('/libros', async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.render('libros', { libros });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar libros');
  }
});

module.exports = router;
