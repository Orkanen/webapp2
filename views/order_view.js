"use strict";

import { menu } from "../js/menu";
import { orders } from "../src/orders";
import { products } from "../src/products";

var orderList = {
    show: function() {
        orders.getAllOrders(orderList.drawOrders);
    },

    drawOrders: function() {
        window.mainContainer.innerHTML = "";
        let container = document.createElement("main");
        container.className = "pContainer";
        //console.log(orders.allOrders);
        let fetch = orders.allOrders;
        let productElement = document.createElement("p");
        let header = document.createElement("h1");

        header.textContent = "Orders";

        fetch.forEach(element => {
            let orderElement = document.createElement("p");
            orderElement.className = "orderer";
            var orderButton = document.createElement("button");
            orderButton.textContent = "Complete";

            for(const [key, value] of Object.entries(element)) {
                if(key == "status_id"){
                    continue;
                } else if (key == "order_items"){
                    let amount = 0;
                    let stock = 0;
                    var stockAmount = [];
                    value.forEach(element => {
                        //console.log(element);
                        for(const [cey, galue] of Object.entries(element)){
                            //console.log(cey, galue);
                            if (cey == "amount") {
                                amount = galue;
                            } else if (cey == "stock"){
                                stock = galue;
                            }
                        }
                        stockAmount.push(stock >= amount);
                    });
                    //console.log(stockAmount);
                } else {
                    //console.log(key, value);
                    orderElement.innerHTML += `<li> ${key}: ${value} </li>`;
                }

            }
            orderElement.addEventListener("click", function() {
                orderList.testOrder(element);
            });
            //console.log(element.order_items);
            //console.log(stock);
            productElement.appendChild(orderElement);
            if(stockAmount.every(Boolean)) {
                orderButton.addEventListener("click", function(){
                    orders.putOrder(element);
                    element.order_items.forEach(element => {
                        //console.log(element);
                        products.putProduct(element);
                    });
                    orders.allOrders = [];
                });
                productElement.appendChild(orderButton);
            }
        });
        container.appendChild(header);
        container.appendChild(productElement);
        window.mainContainer.appendChild(container);
        menu.showMenu("orders");
    },

    testOrder: function(value) {
        window.mainContainer.innerHTML = "";
        let container = document.createElement("main");
        container.className = "pContainer";

        let header = document.createElement("h1");
        header.textContent = value.name + "'s Orders";
        container.appendChild(header);
        //console.log(value.order_items);
        value.order_items.forEach(element => {
            console.log(element);
            let orderElement = document.createElement("p");
            orderElement.className = "orderer";

            for(const [key, value] of Object.entries(element)){
                if (key == "specifiers") {
                    let test = JSON.parse(value);
                    for (const [cey, galue] of Object.entries(test)) {
                        orderElement.innerHTML += (` ${cey}: ${galue},`);
                    }
                    orderElement.innerHTML = orderElement.innerHTML.slice(0, -1);
                } else {
                    orderElement.innerHTML += `<li> ${key}: ${value} </li>`;
                }
            }
            container.appendChild(orderElement);
        });

        window.mainContainer.appendChild(container);
        menu.showMenu("orders");
    }
};

export { orderList };
