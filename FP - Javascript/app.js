import {http} from './http.js';
import {ui} from './ui.js';

const productsURL = "https://61363d1b8700c50017ef54c7.mockapi.io/products";

document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    http
        .get(productsURL)
        .then((data) => 
        ui.showProducts(data),
        ui.nrCartItems()    
    );
}