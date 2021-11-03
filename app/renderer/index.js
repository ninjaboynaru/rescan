import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import InventoryScreen from './InventoryScreen/InventoryScreen';
import EditInventoryScreen from './EditInventoryScreen';
import nsnBarcodeListener from './nsnBarcodeListener';

function App() {
	return (
		<MemoryRouter>
			<Switch>
				<Route exact path="/"><HomeScreen /></Route>
				<Route exact path="/inventory"><InventoryScreen /></Route>
				<Route exact path="/edit/inventory"><EditInventoryScreen /></Route>
			</Switch>
		</MemoryRouter>
	);
}

window.addEventListener('DOMContentLoaded', function() {
	nsnBarcodeListener.init();
	const entryPoint = document.getElementById('root');
	ReactDOM.render(<App />, entryPoint);
});
