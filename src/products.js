"use strict";

import { baseUrl, apiKey } from "./vars.js";

var products = {
    allProducts: [],

    getAllProducts: function(callback) {
        if (products.allProducts.length > 0) {
            return callback();
        }
        fetch(`${baseUrl}/products?api_key=${apiKey}`)
            .then(function (result) {
                return result.json();
            })
            .then(function (result) {
                products.allProducts = result.data;

                return callback();
            });
    },

    getProduct: function(productId) {
        return products.allProducts.filter(function(product) {
            return product.id == productId;
        })[0];
    },

    putProduct: function(element) {
        //console.log(element);
        if (element.stock < element.amount) {
            console.log("error");
        } else {
            let product = {
                id: element.product_id,
                name: element.name,
                stock: (element.stock - element.amount),
                api_key: apiKey
            };

            console.log(product);

            fetch(`${baseUrl}/products`, {
                body: JSON.stringify(product),
                headers: {
                    "content-type": "application/json"
                },
                method: "PUT"
            });
        }
    }
};

export { products };
