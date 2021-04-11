"use strict";

import { menu } from "../js/menu";
import { products } from "../src/products";
import { productList } from "./products_view";

var productDetails = {
    showProduct: function(fetch_product) {
        window.mainContainer.innerHTML = "";
        //let finProduct = Object.values(fetch_product);
        //console.log(finProduct);
        let container = document.createElement("main");

        container.className = "container";

        let header = document.createElement("h1");

        header.textContent = "Product";

        let prodElement = document.createElement("p");

        let menuBlock = "<ul>";
        /*finProduct.forEach(element =>{
            console.log(element);
        });*/

        for (const [key, value] of Object.entries(fetch_product)) {
            console.log(key, value);
            if (key == "specifiers") {
                prodElement.innerText += (`${key}:`);
                let test = JSON.parse(value);
                let temp = "";
                for (const [cey, galue] of Object.entries(test)) {
                    temp += (` ${cey}: ${galue},`);
                }
                let editedTemp = temp.slice(0, -1);
                //prodElement.innerHTML = editedTemp + "\r\n";
                menuBlock += (`<li>${editedTemp}</li>`);
            } else {
                //prodElement.innerHTML = (`${key}: ${value} ` + "\r\n");
                menuBlock += (`<li>${key}: ${value}</li>`);
            }
        }
        prodElement.innerHTML = menuBlock;
        window.mainContainer.appendChild(header);
        window.mainContainer.appendChild(prodElement);
        window.rootElement.appendChild(window.mainContainer);
        menu.showMenu("findProduct");
    }
};

export { productDetails };
