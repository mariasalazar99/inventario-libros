const express = require('express');
const router = express.Router();
const { Libro } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los libros (API)
router.get('/', async (req, res) => {
  const libros = await Libro.findAll();
  res.json(libros);
});

// Crear libro (API)
router.post('/', async (req, res) => {
  try {
    const { nombre, cantidad_disponible } = req.body;
    if (!nombre || cantidad_disponible === undefined) return res.status(400).json({ message: 'Faltan datos' });

    const libro = await Libro.create({ nombre, cantidad_disponible });
    res.status(201).json(libro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear libro' });
  }
});

// Comprar libro (protegido)
router.post('/:id/comprar', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    if (!cantidad || cantidad <= 0) return res.status(400).json({ message: 'Cantidad inválida' });

    const libro = await Libro.findByPk(id);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
    if (libro.cantidad_disponible < cantidad) return res.status(400).json({ message: 'Cantidad no disponible' });

    libro.cantidad_disponible -= cantidad;
    await libro.save();
    res.json({ message: `Compra exitosa: ${cantidad} unidades de "${libro.nombre}"`, libro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al comprar libro' });
  }
});

module.exports = router;
