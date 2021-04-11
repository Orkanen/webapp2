"use strict";

import { menu } from "../js/menu";
import { orders } from "../src/orders";

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
            for(const [key, value] of Object.entries(element)) {
                if(key == "status_id" || key == "order_items"){
                    continue;
                } else {
                    //console.log(key, value);
                    orderElement.innerHTML += `<li> ${key}: ${value} </li>`;
                }
            }
            orderElement.addEventListener("click", function() {
                orderList.testOrder(element);
            });
            productElement.appendChild(orderElement);
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
