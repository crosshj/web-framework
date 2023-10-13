import {
	KeyboardArrowDownRounded,
	KeyboardArrowUpRounded,
	SaveAs,
	FileDownload,
	CircleRounded,
	CreditCardOff,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import * as S from './styles';

export const CollapsibleTable = ({
	type,
	columns,
	values,
	children,
	openActions = [],
}) => {
	const [open, setOpen] = useState(true);
	//const nonTotals = columns.filter((c) => c.total !== 'true');
	//const totals = columns.filter((c) => c.total === 'true');
	// const headers = totals.map((col) => {
	// 	const value = values[col.field];
	// 	return <S.TableCell>{value}</S.TableCell>;
	// });
	const getTotal = (col) => (all, child) => {
		if (child.children)
			return all + child.children.reduce(getTotal(col), 0);
		if (Number.isNaN(Number(child[col.field]))) return all;
		all += Number(child[col.field]);
		return all;
	};
	const RowColumn =
		(rowType = '') =>
		(col, i) => {
			let value;
			if (col.total) {
				value = values.children.reduce(getTotal(col), 0);
			}
			return (
				<S.TableCell
					type={type}
					style={{
						borderBottomLeftRadius:
							rowType === 'footer' && i === 0
								? '10px'
								: undefined,
						borderBottom: 0,
					}}
				>
					{value && Number(value).toFixed(2)}
				</S.TableCell>
			);
		};

	const FirstColumn = () => {
		const isNester = ['branch', 'client'].includes(type);
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<CircleRounded style={{ color: 'orange' }} />
					<div
						style={{
							marginLeft: '0.75em',
							marginRight: '0.75em',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<span style={{ marginRight: '0.75em' }}>
							{values.name}
						</span>
						<CreditCardOff />
					</div>
				</div>
				{isNester && (
					<span style={{ flexShrink: 0 }}>
						{type.charAt(0).toUpperCase() +
							type.slice(1) +
							' Totals'}
					</span>
				)}
			</div>
		);
	};

	const HeaderRow = () => {
		let showHeaderTotal = type !== 'talent';
		if (type === 'talent' && !open) showHeaderTotal = true;
		const firstColumnSpan = showHeaderTotal
			? 4 //TODO: calculate this by counting columns until the first total="true" column
			: columns.length;
		const OpenActionButtons = () => (
			<>
				{open &&
					openActions &&
					openActions.map((action) => (
						<IconButton color="inherit">
							<SaveAs />
						</IconButton>
					))}
			</>
		);
		// const OpenActionButtons = <div>hello</div>;

		return (
			<S.TableRow
				type={type}
				onClick={handleToggleOpen}
				style={{ padding: 0 }}
			>
				<S.TableCell
					colspan={firstColumnSpan}
					type={type}
					style={{
						borderTopLeftRadius: '10px',
						borderBottomLeftRadius: open ? '' : '10px',
						borderBottom: 0,
					}}
				>
					<FirstColumn />
				</S.TableCell>
				{showHeaderTotal &&
					columns.slice(firstColumnSpan).map(RowColumn())}
				<S.TableCell
					type={type}
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						position: 'sticky',
						right: '0',
						borderTopRightRadius: '10px',
						borderBottomRightRadius: open ? '' : '10px',
						borderBottom: 0,
					}}
				>
					<OpenActionButtons />
					<IconButton color="inherit">
						<FileDownload />
					</IconButton>
					<IconButton color="inherit">
						{open ? (
							<KeyboardArrowUpRounded />
						) : (
							<KeyboardArrowDownRounded />
						)}
					</IconButton>
				</S.TableCell>
			</S.TableRow>
		);
	};

	const AdderRow = () => {
		return (
			<S.TableRow>
				<S.TableCell
					colspan={columns.length + 1}
					style={{ textAlign: 'center' }}
				>
					<a href="#">Add Some+</a>
				</S.TableCell>
			</S.TableRow>
		);
	};

	const FooterRow = () => {
		return (
			<S.TableRow type={type}>
				{columns.map(RowColumn('footer'))}
				<S.TableCell
					type={type}
					sx={{
						position: 'sticky',
						right: '0',
						borderBottomRightRadius: '10px',
						borderBottom: 0,
					}}
				></S.TableCell>
			</S.TableRow>
		);
	};

	const handleToggleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<HeaderRow />
			{open && (
				<>
					{children}
					{type === 'talent' && <AdderRow />}
					<FooterRow />
				</>
			)}
		</>
	);
};
