import React from 'react';

interface AppProps {
	components?: React.ComponentType[];
	theme?: object;
}

export default function App(props: AppProps = {}) {
	const { components = [], theme = {} } = props;
	console.log({ components, theme });
	return (
		<div>
			<h3>components</h3>
			{components.map((component, i) => {
				return (
					<div key={component.displayName + '-' + i}>
						{component.displayName || 'Anonymous Component'}
					</div>
				);
			})}
			<h3>theme</h3>
			<pre>{JSON.stringify(theme, null, 2)}</pre>
		</div>
	);
}

// testing change from web