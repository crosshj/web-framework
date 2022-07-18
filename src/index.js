import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './State';

//https://xtreemsolution.com/blog/how-to-create-react-app-authentication-with-auth0

ReactDOM.render(
	<StateProvider>
		<App />
	</StateProvider>,
	document.querySelector('#root')
);
