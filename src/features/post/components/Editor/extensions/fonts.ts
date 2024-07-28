import { cn } from '@/lib'
import {
	Lato,
	Merriweather,
	Montserrat,
	Nunito,
	Open_Sans,
	Oswald,
	PT_Serif,
	Raleway,
	Roboto,
	Source_Code_Pro,
} from 'next/font/google'

export const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	weight: ['400', '700'],
})
export const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
	weight: ['400', '700'],
})
export const lato = Lato({
	subsets: ['latin'],
	variable: '--font-lato',
	weight: ['400', '700'],
})
export const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['400', '700'],
})
export const oswald = Oswald({
	subsets: ['latin'],
	variable: '--font-oswald',
	weight: ['400', '700'],
})
export const sourceCodePro = Source_Code_Pro({
	subsets: ['latin'],
	variable: '--font-source-sans-pro',
	weight: ['400', '700'],
})
export const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-raleway',
	weight: ['400', '700'],
})
export const ptSerif = PT_Serif({
	subsets: ['latin'],
	variable: '--font-pt-serif',
	weight: ['400', '700'],
})
export const merriweather = Merriweather({
	subsets: ['latin'],
	variable: '--font-merriweather',
	weight: ['400', '700'],
})
export const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
	weight: ['400', '700'],
})

export const fontsClassName = cn(
	roboto.variable,
	openSans.variable,
	lato.variable,
	montserrat.variable,
	oswald.variable,
	sourceCodePro.variable,
	raleway.variable,
	ptSerif.variable,
	merriweather.variable,
	nunito.variable
)

export const fonts: { label: string; value: string }[] = [
	{
		label: 'Arial',
		value: 'Arial, sans-serif',
	},
	{
		label: 'Times New Roman',
		value: 'Times New Roman',
	},
	{
		label: 'Helvetica',
		value: 'Helvetica, sans-serif',
	},
	{
		label: 'Calibri',
		value: 'Calibri, sans-serif',
	},
	{
		label: 'Verdana',
		value: 'Verdana, sans-serif',
	},
	{
		label: 'Georgia',
		value: 'Georgia, serif',
	},
	{
		label: 'Inter',
		value: 'var(--font-inter)',
	},
	{
		label: 'Roboto',
		value: 'var(--font-roboto)',
	},
	{
		label: 'Open Sans',
		value: 'var(--font-open-sans)',
	},
	{
		label: 'Lato',
		value: 'var(--font-lato)',
	},
	{
		label: 'Montserrat',
		value: 'var(--font-montserrat)',
	},
	{
		label: 'Oswald',
		value: 'var(--font-oswald)',
	},
	{
		label: 'Source Code Pro',
		value: 'var(--font-source-sans-pro)',
	},
	{
		label: 'Raleway',
		value: 'var(--font-raleway)',
	},
	{
		label: 'PT Serif',
		value: 'var(--font-pt-serif)',
	},
	{
		label: 'Merriweather',
		value: 'var(--font-merriweather)',
	},
	{
		label: 'Nunito',
		value: 'var(--font-nunito)',
	},
]
