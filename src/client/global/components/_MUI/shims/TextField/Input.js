import * as _ from 'lodash';
import { format } from 'date-fns';

import { StateManager } from '../../../../../state/state';
import { applyInputProps, StringFormatters } from '../../../../../global/utils';
import { getUseDataProp } from '../getUseDataProp';
import { DateTime } from '../../../../../global/utils/parseDates';

const inputUsesDateTimeConverter = ['datetime-local', 'date', 'month'];
const inputDefaults = ['datetime-local', 'date', 'month', 'week', 'time'];
const inputConvert = (type, value) =>
	({
		'datetime-local': format(new Date(value), "yyyy-MM-dd'T'HH:mm"),
		date: format(new Date(value), 'yyyy-MM-dd'),
		month: format(new Date(value), 'yyyy-MM'),
		week: format(new Date(value), "yyyy-'W'I"),
		time: '00:00',
	})[type];
const inputDefault = (type) => inputConvert(type, undefined);

const getAndFormatInputValue = ({
	useDataProp,
	propsFilled,
	inputType,
	formatter,
}) => {
	let value;

	if (_.isString(useDataProp) && !_.isEmpty(useDataProp)) {
		value = StateManager.get(useDataProp);
	}
	if (_.isUndefined(value) && !_.isUndefined(propsFilled.value)) {
		value = propsFilled.value;
	}
	const isUndefinedOrEmpty = _.isUndefined(value) || _.isEmpty(value);
	if (isUndefinedOrEmpty && inputType in inputDefaults) {
		value = inputDefault(inputType);
	}
	if (_.isObject(value)) {
		value = JSON.stringify(value, null, 2);
	}
	if (_.isUndefined(value)) {
		value = '';
	}
	if (!isUndefinedOrEmpty && inputUsesDateTimeConverter.includes(inputType)) {
		value = inputConvert(inputType, new DateTime(value).toLocal());
	}

	const _formatter = (formatter || '').toLowerCase();
	if (_formatter in StringFormatters) {
		const formattedVal = StringFormatters[_formatter](value);
		value = formattedVal;
	}
	return value;
};

export const Input = ({ propsIntact, propsFilled, ...rest }) => {
	const useDataPropWithFormatter = getUseDataProp(propsIntact);
	const [useDataProp, formatter] = (useDataPropWithFormatter || '').split(
		':',
	);
	const inputType = _.get(propsIntact, '_src.type', '');

	if (propsIntact.debug) {
		console.log({
			_: 'TextField Debug',
			propsIntact,
			propsFilled,
			...rest,
		});
	}
	const value = getAndFormatInputValue({
		useDataProp,
		propsFilled,
		formatter,
		inputType,
	});
	const propsShimmed = {
		fullWidth: _.get(propsIntact, 'fullWidth', true),
		value: value,
	};
	applyInputProps(propsIntact, propsShimmed);

	propsShimmed.onChange = (e) => {
		const newValue = e.target['value'];

		if (_.isUndefined(useDataProp) || _.isEmpty(useDataProp)) {
			console.warn('undefined/empty "useDataProp" on Input:', {
				useDataProp,
				propsFilled,
				propsIntact,
			});
			return;
		}
		if (inputUsesDateTimeConverter.includes(inputType)) {
			StateManager.update(useDataProp, new DateTime(newValue).toGlobal());
			return;
		}
		StateManager.update(useDataProp, newValue);
	};

	return { propsShimmed };
};
