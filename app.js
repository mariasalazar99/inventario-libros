const express = require('express');
const app = express();
const path = require('path');

// Models
const db = require('./models');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/api/libros', require('./routes/libros'));
app.use('/', require('./routes/views'));

// Levantar servidor
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
