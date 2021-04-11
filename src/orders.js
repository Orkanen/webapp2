"use strict";
/* global menu */

import { baseUrl, apiKey } from "./vars.js";

var orders = {
    allOrders: [],

    getAllOrders: function(callback) {
        if (orders.allOrders.length > 0) {
            return callback();
        }
        fetch(`${baseUrl}/orders?api_key=${apiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                let test = result.data;
                test.forEach(element => {
                    if(element.status == "Ny") {
                        orders.allOrders.push(element);
                    }
                });

                return callback();
            });
      },
    putOrder: function(element){
        //console.log(element);
        var order = {
            id: element.id,
            name: element.name,
            status_id: 200,
            api_key: apiKey
        };
        console.log(order);

        fetch(`${baseUrl}/orders`, {
            body: JSON.stringify(order),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });
    }
};

export { orders };
