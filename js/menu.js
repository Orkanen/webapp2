"use strict";
/* global home products */

import { home } from "./home.js";
import { productList } from "../views/products_view.js";
import { orderList } from "../views/order_view.js";

var menu = {
    showMenu: function (selected) {
        window.navigation.innerHTML = "";

        var navElements = [{name: "Home", class: "home", nav: home.showHome},
            {name: "Products", class: "products", nav: productList.drawProducts},
          {name: "Orders", class: "orders", nav: orderList.show}];


        navElements.forEach(function (element) {
            var navElement = document.createElement("a");

            if (selected === element.class) {
                navElement.className = "active";
            }

            navElement.addEventListener("click", element.nav);

            var text = document.createElement("span");

            text.className = "icon-text";
            text.textContent = element.name;
            navElement.appendChild(text);

            window.navigation.appendChild(navElement);
        });

        window.rootElement.appendChild(window.navigation);
    }
};

export { menu };
