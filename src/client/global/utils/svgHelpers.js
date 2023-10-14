export const InlineSrcSVG = (svgString) => {
	const buff = Buffer.from(svgString);
	const base64data = buff.toString('base64');
	const source = `data:image/svg+xml;base64,${base64data}`;
	return source;
};
