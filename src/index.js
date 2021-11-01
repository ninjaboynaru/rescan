import React from 'react';
import ReactDOM from 'react-dom';

function App() {
	return <div>Hello World</div>;
}

window.addEventListener('DOMContentLoaded', function() {
	const entryPoint = document.getElementById('root');
	ReactDOM.render(<App />, entryPoint);
});
