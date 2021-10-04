import {http} from './http.js';
import {ui} from './ui.js';
// import Swal from '../node_modules/sweetalert2';

const productsURL = "https://61363d1b8700c50017ef54c7.mockapi.io/products";


// window.onload = () => {
//     http
//         .get(productsURL)
//         .then((data) => {
//             ui.nrCartItems();
//             ui.showCartItems(data);
//             updateCartTotal();
//         });
// }

document.addEventListener('DOMContentLoaded', () => {
    http
        .get(productsURL)
        .then((data) => {
            ui.nrCartItems();
            ui.showCartItems(data);
            updateCartTotal();
        });
})

document.addEventListener('click', deleteItmFromCart);
function deleteItmFromCart(e) {
    // console.log(e.target.parentElement);
    const id = e.target.parentElement.id;

    if(e.target.parentElement.classList.contains("del")) {
        // const id = e.target.parentElement.id;
        console.log(id);
        e.target.parentElement.parentElement.parentElement.remove(id);      
    }

    let cart = localStorage.getItem('cart');
    let cartArr = JSON.parse(cart);

    for(let i = 0; i < cartArr.length; i++){         
        if (cartArr[i].id == id){           
            cartArr.splice(i, 1);           
            localStorage.setItem('cart', JSON.stringify(cartArr));         
        }       
    }
    updateCartTotal();
}

function updateCartTotal() {
    let tableCartItems = document.getElementsByClassName('cartItems')[0];
    let cartRowsItem = tableCartItems.getElementsByClassName('cartItem');
    let total = 0;
    let subTotal = 0;

    for (let i = 0; i < cartRowsItem.length; i++) {
        let cartRowItem = cartRowsItem[i];

        let stock = cartRowItem.getElementsByClassName('stockItm')[0];
        let stockValue = parseFloat(stock.innerText.replace("Stock:", ""));

        let priceItem = cartRowItem.getElementsByClassName('itmPrice')[0];
        let qtyItem = cartRowItem.getElementsByClassName('cardQty')[0];
        let price = parseFloat(priceItem.innerText.replace("$", ""));
        let qty = qtyItem.value;
        if(qty > stockValue || qty < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'Something went wrong with the inputs!'
            })
            qtyItem.value = 1;
            return;
        }
        subTotal = price * qty;
        total = total + (price * qty);
        priceItem.getElementsByClassName('subT')[0].innerText = "sub-total:" + subTotal + "$";
    }
    document.getElementById('cartTotal').innerText = total + " " + "$";
}