import { Component } from 'react';
import { Stack } from '@mui/material';
import { WIP } from '../WIP';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
		this.handleReset = this.handleReset.bind(this);
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}
	handleReset() {
		this.setState({ error: null, errorInfo: null });
	}
	render() {
		if (this.state.errorInfo) {
			// Error path
			return (
				<Stack alignItems="center" justifyContent="center">
					<WIP wip={false} handleReset={this.handleReset} />
				</Stack>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
