export const InlineSrcSVG = (svgString) => {
	const prefix = `data:image/svg+xml;base64,`;
	if (!svgString) return prefix;
	const buff = Buffer.from(svgString);
	const base64data = buff.toString('base64');
	const source = `${prefix}${base64data}`;
	return source;
};
