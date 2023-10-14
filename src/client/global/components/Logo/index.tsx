import React from 'react';
import * as S from './styles';
import svg from './svg';
import { InlineSrcSVG } from '../../utils/svgHelpers';

export const Logo = ({ variant = 'single', hasTag, ...rest }: any) => {
	const url = window.location.host;
	const urlParams = new URLSearchParams(window.location.search);
	const theme = urlParams.get('theme') || 'atwork';
	const svgString = (svg as any)[theme];
	const enviroment =
		url.includes('dev') || url.includes('local')
			? 'DEV'
			: url.includes('beta')
			? 'BETA'
			: '';
	const Tag = S.Tag as any;
	const Logo = S.Logo as any;
	return (
		<Logo variant={variant} {...rest}>
			<img src={InlineSrcSVG(svgString)} alt="Logo" />
			{hasTag && <Tag variant={enviroment}>{enviroment}</Tag>}
		</Logo>
	);
};
