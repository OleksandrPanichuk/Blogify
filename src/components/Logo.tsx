import Image from 'next/image'

interface ILogoProps {
	width?: number
	height?: number
}

export const Logo = ({ width, height }: ILogoProps) => {
	return (
		<Image
			src='/logo.svg'
			alt='logo'
			width={width ?? 32}
			height={height ?? 32}
		/>
	)
}
