

class UI {
    constructor() {
        this.containerIndex = document.getElementById('middle_container_indexHTML');
        this.containerDetails = document.getElementById('middle_container_details');
        this.containerAdmin = document.getElementById('products_admin');
        this.image = document.getElementById('image_product'); 
        this.title = document.getElementById('title_product');
        this.price = document.getElementById('price');
        this.stock = document.getElementById('stock_number');
        this.description = document.getElementById('description');
        this.tableBody = document.getElementById('table_body');
        this.cart = document.getElementById('cart');
        this.cartBody = document.getElementById('table_cart_body');
        this.dltProductAdmin = document.getElementsByClassName('id');

        this.nrCartIcon = document.getElementById('item_cart_nr');
    }

    showProducts(products)  {
        let output = ``;
        products.forEach((product) => {
            output += 
            `
            <div id="card_product">
                    <div id="card_img">
                        <img id= "imgOfCard" src="${product.image}">
                    </div>
                    <div>
                        <h4>${product.name}</h4>
                        <p>${product.price} $</p>
                        <a href="details.html?id=${product.id}" id="btn_show_details">Details</a>
                    </div>
                </div>
            </div>
            `;
            this.containerIndex.innerHTML = output;
        });
    }

    showDetails(product) {
        let output = "";
        output += 
        `
        <div id="product_details">
                    <div id="details_photo">
                        <img src="${product[0].image}" id="img_details" class="images">
                    </div>
                    <div id="details_general">
                        <h2 id="details_title">${product[0].name}</h2>
                        <div id="details_description">
                            <div id="descr">${product[0].description}</div>
                        </div>
                        <p id="details_stock">Stock: ${product[0].stoc}</p>
                        <p id="details_price">${product[0].price} $</p>
                        <button id="buy_product_details">Add to cart !</button>
                    </div>
                </div>
        `;
        this.containerDetails.innerHTML = output;

        const addToCart = document.getElementById('buy_product_details');

        addToCart.addEventListener('click', addProductToLocalStorage);
        
        function addProductToLocalStorage() {
            let cart = [];
            let cartArr = JSON.parse(localStorage.getItem('cart'));
            if(cartArr) {
                for(let i = 0; i < cartArr.length; i++){         
                    if (cartArr[i].id == product[0].id){           
                        Swal.fire({
                            icon: 'error',
                            title: 'The product is already in the cart!',
                            text: 'Check the cart!',
                            footer: '<a href="finalproject-website/cart.html"><i class="fas fa-shopping-cart fa-3x"></a>'
                        })
                        return;         
                    }       
                }   
            }
            // let cart = [] ;
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
                product[0].qt = 1;
                cart.push(product[0]);
                localStorage.setItem('cart', JSON.stringify(cart));
                Swal.fire({
                    icon: 'info',
                    title: 'Product Added !',
                    text: 'Check the cart!',
                    footer: `<a href="finalproject-website/cart.html"><i class="fas fa-shopping-cart fa-3x"></a>`
                })
            
        }
    }    

    showAdminProduct(products) {
        let output = ``;
        products.forEach((product) => {
            output +=
            `
            <tr>
                <td class="tb_img_admin"><img id="idForEdit" src="${product.image}"></td>
                <td class="tb_name_admin">${product.name}</td>
                <td class="tb_description_admin">${product.description}</td>
                <td class="tb_price_admin">${product.price} $</td>
                <td class="tb_stoc_admin">${product.stoc}</td>
                <td><button class="btn_edit edit" id="${product.id}"><i class="fas fa-edit fa-2x"></i></button></td>
                <td><button class="btn_delete delete" id="${product.id}"><i class="fas fa-trash fa-2x"></i></button></td>
            </tr>
            `
            this.tableBody.innerHTML = output;
        });
    }

    showCartItems() {
        let cart =  localStorage.getItem('cart');
        if (cart) {
            const cartItem = JSON.parse(cart);
            let output = 
            `
            ${cartItem
			    .map(
				    (product) =>
			    `
                <tr class="cartItem">
                    <td class="tb_img_cart"><img src="${product.image}"></td>
                    <td><a href="details.html?id=${product.id}">${product.name}</a></td>
                    <td class="itmPrice">${product.price} $ <p id="subT" class="subT"></p> </td>
                    <td class="qt"><input type="number" value="${product.qt}" class="cardQty" min="1" max="${product.stoc}" id="qty"><p id="stock" class="stockItm">Stock: ${product.stoc}</p></td>
                    <td><button id="${product.id}" class="btn_delete del"><i class="fas fa-trash fa-2x"></i></button></td>
                </tr>
                `
					)
					.join('')}
                `;
            // console.log(output);
            this.cartBody.innerHTML = output;
        }
    }

    nrCartItems() {
        let cart = localStorage.getItem("cart");
        let cartArr = JSON.parse(cart);
        let counter = 0;
        if(cartArr) {
            for (let i = 0; i < cartArr.length + 1; i++) {
                this.nrCartIcon.innerHTML = counter++;
        }
        }
    }
}


export const ui = new UI();