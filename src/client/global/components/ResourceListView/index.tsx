import {
	Table as MuiTable,
	TableContainer,
	TablePagination,
	Stack,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { TableToolbar } from '..';

import { searchRows, sortRows } from '../Table/helpers';
import { TableBody, CellContent } from '../Table/components';

import { TableHead } from './TableHead';
import { StateManager } from '../../../state/state';

export const ResourceListView = ({
	label,
	actions,
	targetQuery,
	pagination = true,
	tableBody,
	filterOn = '',
	source,
	children,
	...props
}) => {
	const [state] = StateManager.useListener();
	let { search, searchRowKey } = state || {};
	const [loading, setLoading] = useState(false);
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);
	const isLoading = loading;
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState(columns ? columns[0]?.key : null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	if (filterOn && state[filterOn]) {
		search = state[filterOn];
	}
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const sortedRows = sortRows({ rows, order, orderBy, columns });
	const searchedRows = search
		? sortedRows?.filter(searchRows({ columns, search, searchRowKey }))
		: sortedRows;

	const columnsToBeShown = columns?.filter((c) => !c.hidden);

	const parsedRows =
		searchedRows?.map((row, rowIndex) => {
			const dataToBeShown = row?.filter(
				(column, columnIndex) => !columns[columnIndex]?.hidden,
			);
			return dataToBeShown.map((cell, columnIndex) => {
				const column = columnsToBeShown[columnIndex];
				return (
					<CellContent
						cell={cell}
						column={column}
						columns={columns}
						row={row}
					/>
				);
			});
		}) || [];

	const paginatedRows =
		(rows &&
			rows?.length > 0 &&
			parsedRows?.slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage,
			)) ||
		[];

	useEffect(() => {
		const { rows = [] } = state[source] || {};

		setRows(rows);
		const parsedColumns = children.map(({ props: columnProps, key }) => {
			return { ...columnProps, key, ...columnProps?.props };
		});
		setColumns(parsedColumns);

		setLoading(false);
	}, [source, state, children]);

	useEffect(() => {
		if (!columns || columns.length === 0) return;

		setOrderBy(columns[0]?.key);
	}, [columns]);
	return (
		<Stack spacing={0} sx={{ width: '100%' }} border="none">
			<TableToolbar title={label} actions={actions} loading={isLoading} />

			<TableContainer sx={{ backgroundColor: 'background.contrast' }}>
				<MuiTable sx={{ width: '100%' }} aria-label="simple table">
					{/* {columns && columns?.length > 0 && ( */}
					<TableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						rowCount={rows?.length}
						loading={isLoading}
					>
						{columns}
					</TableHead>
					{/* )} */}
					{tableBody || (
						<TableBody
							rows={paginatedRows}
							columnsLength={columns?.length}
							label={label}
							isLoading={isLoading}
						/>
					)}
				</MuiTable>
			</TableContainer>
			{pagination === true && rows && rows?.length > 0 && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={parsedRows?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</Stack>
	);
};
