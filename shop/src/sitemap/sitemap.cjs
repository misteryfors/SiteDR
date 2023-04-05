require('babel-register');

const Routs = require('../Routs.js');
const Sitemap = require('../').default;

(
    new Sitemap(Routs)
        .build('https://master43.ru')
        .save('./sitemap.xml')
);