"use strict";

/* global menu findProduct */

import { menu } from "../js/menu";
import { products } from "../src/products";
import { productDetails } from "./product_details";

var productList = {
    drawProducts: function() {
        products.getAllProducts(productList.renderProducts);
    },

    renderProducts: function() {
        window.mainContainer.innerHTML = "";
        let root = document.getElementById("root");

        let container = document.createElement("main");

        container.className = "pContainer";

        let header = document.createElement("h1");

        header.textContent = "Products";
        header.className = "pTitle";

        products.allProducts.map(function (product) {
            let productElement = document.createElement("p");
            productElement.textContent = product.name;
            productElement.className = "pItem";
            //console.log(product);

            productElement.addEventListener("click", function() {
                productDetails.showProduct(product);
            });

            container.appendChild(productElement);
        });
        window.mainContainer.appendChild(container);
        container.appendChild(header);

        window.rootElement.appendChild(window.mainContainer);
        menu.showMenu("products");
    }
};

export { productList };
