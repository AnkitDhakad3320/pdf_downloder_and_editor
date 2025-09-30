const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const pdfRoutes = require('./routes/pdfRoutes');

const app = express();
const PORT = 3000;

// Handlebars setup
const hbs = exphbs.create({
  extname: '.hbs',
  layoutsDir: false,
  defaultLayout: false,
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', pdfRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
