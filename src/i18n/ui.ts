import SpainFlag from '@/components/flags/Spain.astro';
import AndorraFlag from '@/components/flags/Andorra.astro';

// Add missing imports
export const LANGUAGES: Record<
	string,
	{ code: string; name: string; flag: typeof SpainFlag }
> = {
	ca: {
		code: 'ca',
		name: 'Català',
		flag: AndorraFlag,
	},
	es: {
		code: 'es',
		name: 'Español',
		flag: SpainFlag,
	},
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {
	es: {
		'nav.inicio': 'Inicio',
		'nav.vota': 'Vota',
		'nav.info': 'Información',
		'nav.archivo': 'Archivo',
		'nav.legal': 'Aviso Legal',
		'nav.privacidad': 'Privacidad',
		'nav.cookies': 'Cookies',
	},
	ca: {
		'nav.inicio': 'Inici',
		'nav.vota': 'Vota',
		'nav.info': 'Informació',
		'nav.archivo': 'Arxiu',
		'nav.legal': 'Avís Legal',
		'nav.privacidad': 'Privacitat',
		'nav.cookies': 'Cookies',
	},
} as const;

export const routes = {
	es: {
		vota: 'vota',
		info: 'info',
		archivo: 'archivo',
		'aviso-legal': 'aviso-legal',
		privacidad: 'privacidad',
		cookies: 'cookies',
	},
	ca: {
		vota: 'vota',
		info: 'informacio',
		archivo: 'arxiu',
		'aviso-legal': 'avis-legal',
		privacidad: 'privacitat',
		cookies: 'cookies',
	},
};