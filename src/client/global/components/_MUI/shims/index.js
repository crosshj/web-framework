import { Button, Chip, IconButton, Link } from './Actions';
import { TextField } from './TextField';
import { Stepper } from './Stepper';
import { Checkbox } from './Checkbox';
import { Switch } from './Switch';
import { Radio } from './Radio';

const shims = {
	IconButton,
	Button,
	Link,
	Chip,

	TextField,

	Checkbox,
	Stepper,
	Switch,
	Radio,
};

export const getShim = (componentName, propsIntact, propsFilled) => {
	if (!(componentName in shims)) {
		return { propsShimmed: {} };
	}

	const { propsShimmed, childrenShimmed } = shims[componentName]({
		propsFilled,
		propsIntact,
	});

	return { propsShimmed, childrenShimmed };
};

export * from './Actions';
export * from './TextField';
export * from './Stepper';
export * from './Switch';
export * from './Checkbox';
export * from './Stepper';
export * from './Radio';
