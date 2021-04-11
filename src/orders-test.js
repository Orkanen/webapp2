"use strict";
/* global menu */

import { baseUrl, apiKey } from "./vars.js";

var orders = {
    allOrders: [],

    getAllOrders: function(callback){
        if (orders.allOrders.length > 0) {
            return callback();
        }
        fetch(`${baseUrl}/orders/?api_key=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function (result) {
            orders.allOrders = result.data;

            return callback();
        });
    },

    getOrder: function(orderId) {
        return orders.allOrders.filter(function(order) {
            return order.id == orderId;
        })[0];
    }
};

export { orders };
