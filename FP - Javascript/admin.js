import {http} from './http.js';
import {ui} from './ui.js';

const productsURL = "https://61363d1b8700c50017ef54c7.mockapi.io/products";

document.addEventListener('DOMContentLoaded', getAdminProducts);

function getAdminProducts() {
    http
        .get(productsURL)
        .then((data) => ui.showAdminProduct(data),
        ui.nrCartItems());
}

document.getElementById('click_to_add').addEventListener('click', addProduct);

function addProduct(e) {
    e.preventDefault();
    const newImgProd = document.getElementById('image_product').value;
    const newNameProd = document.getElementById('title_product').value;
    const newPriceProd = document.getElementById('price').value;
    const newStockProd = document.getElementById('stock_number').value;
    const newDescriptionProd = document.getElementById('description').value;

    let product = {
        image: newImgProd,
        name: newNameProd,
        price: newPriceProd,
        stoc: newStockProd,
        description: newDescriptionProd
    };
    
    Swal.fire({
        icon: 'success',
        title: 'Product added !'
    })
    http
        .post(productsURL, product)
        .then((data) => getAdminProducts(data))
        .then(() => location.reload());
}

document.getElementById('products_admin').addEventListener('click', deleteEdit);

function deleteEdit(e) {
    // console.log(e.target.parentElement.parentElement.parentElement);
    if(e.target.parentElement.classList.contains("delete")) {
        const id = e.target.parentElement.id;
        console.log(id);
        e.target.parentElement.parentElement.parentElement.remove(id);
        fetch(`https://61363d1b8700c50017ef54c7.mockapi.io/products/` + id, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    if(e.target.parentElement.classList.contains("edit")) {
        const id = e.target.parentElement.id;
        const parent = e.target.parentElement.parentElement.parentElement;
        // console.log(parent);

        let newImgProd = document.getElementById('image_product');
        let newNameProd = document.getElementById('title_product');
        let newPriceProd = document.getElementById('price');
        let newStockProd = document.getElementById('stock_number');
        let newDescriptionProd = document.getElementById('description');
        const btnSubmitEdit = document.getElementById('click_to_edit');

        const imgAdmin = document.getElementById('idForEdit');
        let imgEdit = imgAdmin.src;
        
        const nameAdmin = parent.querySelector('.tb_name_admin');
        let nameEdit = nameAdmin.textContent;
        
        const descAdmin = parent.querySelector('.tb_description_admin');
        let descEdit = descAdmin.textContent;
        
        const priceAdmin = parent.querySelector('.tb_price_admin');
        let priceEdit = priceAdmin.textContent;
        
        const stocAdmin = parent.querySelector('.tb_stoc_admin');
        let stocEdit = stocAdmin.textContent;
        
        newImgProd.value = imgEdit;
        newNameProd.value = nameEdit;
        newPriceProd.value = priceEdit;
        newStockProd.value = stocEdit;
        newDescriptionProd.value = descEdit;
        
        btnSubmitEdit.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`https://61363d1b8700c50017ef54c7.mockapi.io/products/${id}`, {
                    method:"PUT",
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify({
                        image: newImgProd.value,
                        name: newNameProd.value,
                        price: newPriceProd.value,
                        stoc: newStockProd.value,
                        description: newDescriptionProd.value,
                        completed: false
                    })
                })
                .then( dataResponse =>  dataResponse.json())
                .then(() => location.reload());

        })
    }
}
// function editProduct(e) {

//     const parent = e.target.parentElement.parentElement.parentElement;
//     // console.log(parent);

//     const btnSubmit = document.getElementById('click_to_add');

//     let imgEdit = parent.querySelector('.tb_img_admin').textContent;
//     let nameEdit = parent.querySelector('.tb_name_admin').textContent;
//     let priceEdit = parent.querySelector('.tb_price_admin').textContent;
//     let stocEdit = parent.querySelector('.tb_stoc_admin').textContent;
//     let descriptionEdit = parent.querySelector('.tb_description_admin').textContent;

//     document.getElementById('image_product').value = imgEdit;
//     document.getElementById('title_product').value = nameEdit;
//     document.getElementById('price').value = priceEdit;
//     document.getElementById('stock_number').value = stocEdit;
//     document.getElementById('description').value = descriptionEdit;
//     const id = e.target.parentElement.id;

//     let productEdit = {
//         image: document.getElementById('image_product').value,
//         name: document.getElementById('title_product').value,
//         price: document.getElementById('price').value,
//         stoc: document.getElementById('stock_number').value,
//         description: document.getElementById('description').value
//     };

//     btnSubmit.addEventListener('click', (e) => {
//         e.preventDefault()
//         http
//             .put(`https://61363d1b8700c50017ef54c7.mockapi.io/products/29`, productEdit)
//             .then((data) => console.log(data))
//     });
// }