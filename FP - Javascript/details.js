import {http} from './http.js';
import {ui} from './ui.js';

window.onload = () => {
	let searchParamString = window.location.search;

	const searchParam = new URLSearchParams(searchParamString);

	// console.log(searchParam.get('id'));
	const id = searchParam.get('id');
    
    http
        .get("https://61363d1b8700c50017ef54c7.mockapi.io/products?id=" + id)
        .then((data) => ui.showDetails(data),
						ui.nrCartItems())

};

