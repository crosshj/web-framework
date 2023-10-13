import { Grid, MenuItem, TextField } from '@mui/material';
import { gridVariantMap } from '../utils/grid';
import { StateManager } from '../../../state/state';

const fieldContentChildren = ({ name, select, renderedOptions, ...rest }) => (
	<TextField
		select={select}
		name={name}
		SelectProps={{
			MenuProps: {
				sx: { maxHeight: 400 },
			},
		}}
		{...rest}
		inputProps={{ 'data-testid': `input-${name}` }}
	>
		{renderedOptions}
	</TextField>
);

const FieldContent = (fieldProps) => {
	const {
		select,
		options,
		grid = false,
		name,
		gridProps,
		...rest
	} = fieldProps;

	const renderedOptions =
		select && options?.length > 0 ? (
			options?.map((option) => (
				<MenuItem key={option?.value} value={option?.value}>
					{option?.label}
				</MenuItem>
			))
		) : (
			<MenuItem key={0} value={null} disabled={true}>
				No Options
			</MenuItem>
		);

	return grid ? (
		<Grid key={name} item {...gridProps}>
			{fieldContentChildren({ name, select, renderedOptions, ...rest })}
		</Grid>
	) : (
		fieldContentChildren({ name, select, renderedOptions, ...rest })
	);
};

export const Input = ({
	gridVariant,
	select,
	hidden,
	setValue,
	parentForm,
	context,
	schema,
	fieldName,
	fullWidth = true,
	...props
}) => {
	const [thisValue, thisSetter] = StateManager.useListener(
		props?._src?.useData,
	);
	//console.log({ props, thisValue });
	const wrappedOnChange = (event) => {
		thisSetter(event.target.value);
	};

	const gridProps = gridVariantMap[gridVariant];

	if (hidden) return null;

	const textFieldProps = {
		...props,
		select,
		fullWidth,
		gridProps,
		inputProps: { 'data-testid': 'input-component' },
		onChange: wrappedOnChange,
		value: thisValue,
	};

	return <FieldContent {...textFieldProps} />;
};
