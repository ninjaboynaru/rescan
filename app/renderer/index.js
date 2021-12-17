import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import nsnBarcodeListener from './nsnBarcodeListener';
import ErrorBoundary from './Components/ErrorBoundary';
import HomeScreen from './HomeScreen/HomeScreen';
import InventoryScreen from './InventoryScreen/InventoryScreen';
import LocationScreen from './LocationsScreen/LocationsScreen';
import EditInventoryScreen from './EditInventoryScreen';

function App() {
	return (
		<ErrorBoundary>
			<MemoryRouter>
				<Switch>
					<Route exact path="/">
						<HomeScreen />
					</Route>
					<Route exact path="/inventory">
						<InventoryScreen />
					</Route>
					<Route exact path="/edit/inventory">
						<EditInventoryScreen />
					</Route>
					<Route exact path="/locations">
						<LocationScreen />
					</Route>
				</Switch>
			</MemoryRouter>
		</ErrorBoundary>
	);
}

window.addEventListener('DOMContentLoaded', function() {
	nsnBarcodeListener.init();
	const entryPoint = document.getElementById('root');
	ReactDOM.render(<App />, entryPoint);
});
