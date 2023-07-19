const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    <url>
        <loc>https://speedclimbing.org/</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>https://speedclimbing.org/competition</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://speedclimbing.org/athlete</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://speedclimbing.org/stats/summary?year=2023</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://speedclimbing.org/about</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://speedclimbing.org/about-us</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://speedclimbing.org/stats/detail</loc>
        <lastmod>2023-07-14T12:37:37+00:00</lastmod>
        <priority>0.80</priority>
    </url>
</urlset>`.trim();

export async function GET() {
	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
