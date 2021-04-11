"use strict";
/* global menu */

import { baseUrl, apiKey } from "./vars.js";

var products = {
    allProducts: [],

    getAllProducts: function(callback){
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
    }
};

export { products };
