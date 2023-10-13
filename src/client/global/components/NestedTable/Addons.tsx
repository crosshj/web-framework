import * as React from 'react';
import { getColor } from '../../utils';
import { extensible } from '../utils';
import { getColumns } from './styles';

export const AddonItem = (args: any, _debug: boolean) => {
	const {
		className: classNameSrc,
		row,
		leftSpacers,
		//rightSpacers,
		columns: columnsSrc,
		color: colorSrc,
		background: backgroundSrc,
		borderRadius: borderRadiusSrc,
		display,
		justifyContent,
		alignItems,
		padding,
	} = args;

	const color = colorSrc ? getColor(colorSrc) : undefined;
	const background = backgroundSrc ? getColor(backgroundSrc) : undefined;
	const borderRadius = borderRadiusSrc ? borderRadiusSrc : undefined;

	//TODO: use rightSpacers, columns to troubleshoot?

	let columns = [];
	let currentIndex = leftSpacers.length + 1;
	const colSpans = args.children.reduce((a: number, o: any) => {
		if (o?.props?.span === 'auto') return a + 1;
		if (typeof o?.props?.span === 'undefined') return a + 1;
		return a + Number(o?.props?.span);
	}, 0);

	for (const child of args.children) {
		let thisSpan = child.props?.span || 1;
		if (thisSpan === 'auto') {
			const otherCellsSpan = colSpans - 1;
			const availableSpan = columnsSrc.length + 1;
			thisSpan = availableSpan - otherCellsSpan;
		}
		const className =
			typeof classNameSrc === 'undefined' || !classNameSrc
				? 'nest-level-1 nest-cell nest-header no-underline'.split(' ')
				: classNameSrc.split(' ');
		if (child?.props?.align === 'right') className.push('justifyEnd');
		if (child?.props?.align === 'left') className.push('justifyStart');
		if (child?.props?.align === 'center') className.push('justifyCenter');

		columns.push({
			child,
			className: className.join(' '),
			gridColumn: [currentIndex, `span ${thisSpan}`].join(' / '),
		});
		currentIndex += thisSpan;
	}

	const style = {
		background,
		color,
		borderRadius,
		display: undefined,
		padding: undefined,
		justifyContent: undefined,
		alignItems: undefined,
	};
	if (typeof display !== 'undefined') style.display = display;
	if (typeof padding !== 'undefined') style.padding = padding;
	if (typeof justifyContent !== 'undefined')
		style.justifyContent = justifyContent;
	if (typeof alignItems !== 'undefined') style.alignItems = alignItems;

	return (
		<>
			{columns.map((col) => (
				<div
					className={col.className}
					style={{
						gridColumn: col.gridColumn,
						...style,
					}}
				>
					{extensible({ ...col.child, row })}
				</div>
			))}
		</>
	);
};

export const Addons = (args: any) => {
	const { _src } = args;
	const addons = _src.children.filter((x: any) => x.type === 'Addon');
	if (!addons.length) return;
	const { leftSpacers, rightSpacers, columns } = getColumns(args);

	for (const addon of addons) {
		if (addon.children.length === 1) {
			addon.children[0].props.span = [
				...leftSpacers,
				...rightSpacers,
				...columns,
			].length;
		}
	}

	return (
		<>
			{addons.map((addon: any) => {
				return (
					<AddonItem
						key={addon.key}
						children={addon.children}
						padding="16px"
						row={addon}
						{...addon.props}
						{...{ leftSpacers: [], columns, rightSpacers: [] }}
					/>
				);
			})}
		</>
	);
};
