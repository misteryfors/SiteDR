import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from './App';

const hostname = 'https://example.com';

const routes = [
    { url: '/', changefreq: 'weekly', priority: 1 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
];

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname });
    const pipeline = sitemap.pipe(createGzip());

    routes.forEach((route) => {
        pipeline.write({
            url: route.url,
            changefreq: route.changefreq,
            priority: route.priority,
        });
    });

    pipeline.end();

    const sitemapString = await streamToPromise(pipeline).then((data) =>
        data.toString()
    );

    return sitemapString;
}

export default generateSitemap;