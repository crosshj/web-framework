import amharic from './amharic';
import arabic from './arabic';
import english from './english';
import german from './german';
import russian from './russian';
import spanish from './spanish';
import uzbek from './uzbek';

const lanugages = {
	EN: english,
	'en-US': english,

	DE: german,
	'de-DE': german,

	'ru-RU': russian,
	RU: russian,

	'es-MX': spanish,
	'es-ES': spanish,
	ES: spanish,

	'uz-UZ': uzbek,
	UZ: uzbek,

	'ar-LB': arabic,
	AR: arabic,

	'am-ET': amharic,
	AM: amharic,
};
export default lanugages;
