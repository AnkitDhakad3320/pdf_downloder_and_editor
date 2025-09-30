const exphbs = require('express-handlebars');
const path = require('path');

const hbs = exphbs.create({
  extname: '.hbs',
  layoutsDir: false,
  defaultLayout: false,
});

function renderHTML(view, data) {
  return new Promise((resolve, reject) => {
    hbs.renderView(path.join(__dirname, '..', 'views', `${view}.hbs`), data, (err, html) => {
      if (err) reject(err);
      else resolve(html);
    });
  });
}

module.exports = renderHTML;
