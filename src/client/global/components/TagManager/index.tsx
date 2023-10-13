import { TextField, Typography, Autocomplete, Grid } from '@mui/material';

const FieldContent = (props) => {
	const {
		label,
		readOnly,
		variant,
		tags,
		selectedTags,
		search,
		setSearch,
		handleChange,
		...rest
	} = props;
	return (
		<Grid container item xs={12}>
			<Grid item xs={12}>
				{label && (
					<Typography variant="h3" my={2}>
						{label}
					</Typography>
				)}

				<Autocomplete
					{...rest}
					disabled={readOnly}
					multiple
					onChange={(e, v) => handleChange(v)}
					inputValue={search}
					value={selectedTags || []}
					onInputChange={(e, v) => setSearch(v)}
					options={tags || []}
					renderInput={(params) => {
						return (
							<TextField
								{...params}
								sx={{ width: '100%' }}
								variant={variant}
							/>
						);
					}}
					sx={{ width: '100%' }}
				/>
			</Grid>
		</Grid>
	);
};

export const TagManager = ({ name, context, ...props }) => {
	return <FieldContent {...props} />;
};
