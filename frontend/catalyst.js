const cheerio = require('cheerio');

const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`;

	const $ = cheerio.load(markup);

	const mango = $(".fruits__mango");
	const ala = $('ul').find('li').html();
	console.log(ala); // Mango