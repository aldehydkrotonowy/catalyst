import got from 'got';
import cheerio from 'cheerio';
import pretty  from 'pretty';
import fs from 'fs';
import jsdom from 'jsdom';
import { gotScraping } from 'got-scraping';

const { JSDOM } = jsdom;
const catalystUrl= 'https://gpwcatalyst.pl/notowania-obligacji-obligacje-korporacyjne';

(async () => {
	const response = await gotScraping({
    url: catalystUrl,
    headerGeneratorOptions:{
			browsers: [
					{	name: 'chrome'}
			],
			devices: ['desktop'],
			locales: ['pl-PL'],
			operatingSystems: ['windows']
	}
	});

	const $ = cheerio.load(response.body);

	const table = $('h3').filter(function() {
		return $(this).text().trim() === 'Obligacje przedsiębiorstw (PLN)';
	}).next();

	const headers = table.find('thead');
	const body = table.find('tbody');

	// fs.writeFile('cheerio.html', table.html().replace(/\s+/g, ' ') || "nic", () => {});
	fs.writeFile('head.html', headers.html() || 'nic', () => {});
	fs.writeFile('body.html', body.html() || 'nic', () => {})
})()