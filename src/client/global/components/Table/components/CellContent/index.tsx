import { Icon, Button } from '../../../../components';
import { getddmmyyDate, iCompare } from '../../../../utils';
import { statusMap, iconMap } from '../../../../components/utils';

export const CellContent = ({ column, cell, columns, row }: any) => {
	if (!cell) return '';
	if (column?.key.toLowerCase() === 'status') {
		return (
			<Icon color={(statusMap as any)[cell]}>
				{(iconMap as any)[cell]}
			</Icon>
		);
	}
	if (column?.key === 'timecardPeriod') {
		const dates = cell.split(' - ').map((d: any) => new Date(d.trim()));
		return `${getddmmyyDate(dates[0])} - ${getddmmyyDate(dates[1])}`;
	}
	if (column?.target) {
		const paramName = column.props?.param;
		const index = columns.findIndex(
			(c: any) =>
				iCompare(c.key, paramName) || iCompare(c.label, paramName),
		);
		const paramValue = row[index];

		return (
			<Button
				target={column.target}
				type="navigate"
				param={paramValue}
				variant={column?.props.variant || 'text'}
			>
				{cell}
			</Button>
		);
	}

	const isDate = /.*-.*-.*T.*:.*:.*..*Z/.test(cell);
	if (isDate) {
		const dateObj = new Date(cell);
		return getddmmyyDate(dateObj);
	}

	return cell;
};
