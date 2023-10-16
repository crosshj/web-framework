import { StateManager } from '../../state/state';
import { handleSubscriber } from '../components/Subscribe';

export const parseProps = (component) => {
	return component.properties
		.split(',')
		.map((x) => x.trim().split(':'))
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
};

const STATEFUL_COMPONENTS = [
	// 'Data',
	// 'Flow',
	'Subscribe',
];
const EVENT_BASED_COMPONENTS = ['Trigger'];

export const isStatefulComponent = ({ type }) =>
	STATEFUL_COMPONENTS.includes(type) || EVENT_BASED_COMPONENTS.includes(type);

const subscribedKeys = [];

const componentTypeToHandler = {
	Subscribe: handleSubscriber,
};

const handleEventBasedComponents = (eventBasedComponents) => {
	const flowsToTriggerNow = [];
	const flowsToTriggerOnClose = [];

	eventBasedComponents.forEach((c) => {
		const props = parseProps(c);

		// we are only supporting triggers for now
		// lets just early return instead of using nested ifs
		if (c.type !== 'Trigger') {
			return;
		}

		if (props.onClose) {
			flowsToTriggerOnClose.push({ key: props.handler });
			return;
		}

		flowsToTriggerNow.push({ key: props.handler });
	});

	StateManager.update('flowQueue', flowsToTriggerNow);
	StateManager.update('flowQueue:triggerOnClose', flowsToTriggerOnClose);
};

export const handleStatefulComponents = (allStatefulComponents) => {
	const eventBasedComponents = [];
	const statefulComponents = [];

	allStatefulComponents.forEach((c) => {
		if (EVENT_BASED_COMPONENTS.includes(c.type)) {
			eventBasedComponents.push(c);
		}

		if (STATEFUL_COMPONENTS.includes(c.type)) {
			statefulComponents.push(c);
		}
	});

	handleEventBasedComponents(eventBasedComponents);

	for (const component of statefulComponents) {
		const props = parseProps(component);

		const subKey = props.path || props.match;
		const componentSubscriptionKey = `${subKey}-${props.handler}`;
		if (subscribedKeys.includes(componentSubscriptionKey)) {
			continue;
		}

		const handler = componentTypeToHandler[component.type];

		if (!handler) {
			console.error(
				`Stateful component ${component.type} doesn't have a handler.`,
			);
			continue;
		}
		handler(props);
	}
};
