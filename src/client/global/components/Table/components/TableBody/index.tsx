import {
	LinearProgress,
	Skeleton,
	TableRow,
	TableCell,
	TableBody as MuiTableBody,
} from '@mui/material';

export const TableBody = ({ rows, columnsLength, label, isLoading }) => {
	return (
		<>
			{isLoading && (
				<MuiTableBody>
					<TableRow>
						<TableCell
							colSpan={columnsLength}
							sx={{
								width: '100%',
							}}
						>
							<LinearProgress
								sx={{
									lineHeight: 'unset',
								}}
							/>
						</TableCell>
					</TableRow>
				</MuiTableBody>
			)}

			<MuiTableBody>
				{rows?.map(
					(row, rowIndex) =>
						row && (
							<TableRow key={`${label}-${rowIndex}`}>
								{row?.map((value, columnIndex) => {
									/*
									if cell is a button type and last of the row, make it sticky
									position: sticky;
									right: 0;
									background: white;
									*/
									return (
										<TableCell
											key={`${label}-${rowIndex}-${columnIndex}`}
											sx={{
												width: 'fit-content',
											}}
										>
											{isLoading ? (
												<Skeleton
													variant="text"
													width={100}
													sx={{
														fontSize: '1rem',
													}}
												/>
											) : (
												value
											)}
										</TableCell>
									);
								})}
							</TableRow>
						)
				)}
			</MuiTableBody>
		</>
	);
};
