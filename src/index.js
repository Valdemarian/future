import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App  from './App';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import ErrorBoundry from './components/error-boundry';



ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
				<App />
		</ErrorBoundry>
	</Provider>, 
document.getElementById('root'));


