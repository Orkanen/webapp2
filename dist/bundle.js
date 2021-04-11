/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/home.js":
/*!********************!*\
  !*** ./js/home.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "home": () => (/* binding */ home)
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./js/menu.js");

/* global menu */



var home = {
    showHome: function () {
        window.mainContainer.innerHTML = "";
        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Stock 365";

        var greeting = document.createElement("p");

        greeting.className = "greeting";

        var information = document.createElement("p");

        information.className = "greeting";

        let textGreeting = "Welcome to Stock 365";
        let textInfo = "We have wide assortment of "
        +" bolts, nails and screws.";

        greeting.textContent = textGreeting;
        information.textContent = textInfo;

        //var image = document.createElement("img");

        //image.src = "small2.jpg";
        //image.alt = "Filip Antonsson";

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(greeting);
        window.mainContainer.appendChild(information);
        //window.mainContainer.appendChild(image);
        window.rootElement.appendChild(window.mainContainer);
        _menu_js__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("home");  
    }
};




/***/ }),

/***/ "./js/menu.js":
/*!********************!*\
  !*** ./js/menu.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": () => (/* binding */ menu)
/* harmony export */ });
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/home.js");
/* harmony import */ var _views_products_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/products_view.js */ "./views/products_view.js");
/* harmony import */ var _views_order_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/order_view.js */ "./views/order_view.js");

/* global home products */





var menu = {
    showMenu: function (selected) {
        window.navigation.innerHTML = "";

        var navElements = [{name: "Home", class: "home", nav: _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome},
            {name: "Products", class: "products", nav: _views_products_view_js__WEBPACK_IMPORTED_MODULE_1__.productList.drawProducts},
          {name: "Orders", class: "orders", nav: _views_order_view_js__WEBPACK_IMPORTED_MODULE_2__.orderList.show}];


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




/***/ }),

/***/ "./src/orders.js":
/*!***********************!*\
  !*** ./src/orders.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orders": () => (/* binding */ orders)
/* harmony export */ });
/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars.js */ "./src/vars.js");

/* global menu */



var orders = {
    allOrders: [],

    getAllOrders: function(callback) {
        if (orders.allOrders.length > 0) {
            return callback();
        }
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/orders?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_0__.apiKey}`)
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
            api_key: _vars_js__WEBPACK_IMPORTED_MODULE_0__.apiKey
        };
        console.log(order);

        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/orders`, {
            body: JSON.stringify(order),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });
    }
};




/***/ }),

/***/ "./src/products.js":
/*!*************************!*\
  !*** ./src/products.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "products": () => (/* binding */ products)
/* harmony export */ });
/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars.js */ "./src/vars.js");

/* global menu */



var products = {
    allProducts: [],

    getAllProducts: function(callback){
        if (products.allProducts.length > 0) {
            return callback();
        }
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/products?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_0__.apiKey}`)
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

    putProduct: function(element){
        //console.log(element);
        if(element.stock < element.amount){
            console.log("error");
        } else {
            let product = {
                id: element.product_id,
                name: element.name,
                stock: (element.stock - element.amount),
                api_key: _vars_js__WEBPACK_IMPORTED_MODULE_0__.apiKey
            };
            console.log(product);

            fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/products`, {
                body: JSON.stringify(product),
                headers: {
                    "content-type": "application/json"
                },
                method: "PUT"
            });
        }
    }
};




/***/ }),

/***/ "./src/vars.js":
/*!*********************!*\
  !*** ./src/vars.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseUrl": () => (/* binding */ baseUrl),
/* harmony export */   "apiKey": () => (/* binding */ apiKey)
/* harmony export */ });


const baseUrl = "https://lager.emilfolino.se/v2";
const apiKey = "79ec5a01a507b1090a62166a71ee2ea1";




/***/ }),

/***/ "./views/order_view.js":
/*!*****************************!*\
  !*** ./views/order_view.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orderList": () => (/* binding */ orderList)
/* harmony export */ });
/* harmony import */ var _js_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/menu */ "./js/menu.js");
/* harmony import */ var _src_orders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/orders */ "./src/orders.js");
/* harmony import */ var _src_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/products */ "./src/products.js");






var orderList = {
    show: function() {
        _src_orders__WEBPACK_IMPORTED_MODULE_1__.orders.getAllOrders(orderList.drawOrders);
    },

    drawOrders: function() {
        window.mainContainer.innerHTML = "";
        let container = document.createElement("main");
        container.className = "pContainer";
        //console.log(orders.allOrders);
        let fetch = _src_orders__WEBPACK_IMPORTED_MODULE_1__.orders.allOrders;
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
                    _src_orders__WEBPACK_IMPORTED_MODULE_1__.orders.putOrder(element);
                    element.order_items.forEach(element => {
                        //console.log(element);
                        _src_products__WEBPACK_IMPORTED_MODULE_2__.products.putProduct(element);
                    });
                    _src_orders__WEBPACK_IMPORTED_MODULE_1__.orders.allOrders = [];
                });
                productElement.appendChild(orderButton);
            }
        });
        container.appendChild(header);
        container.appendChild(productElement);
        window.mainContainer.appendChild(container);
        _js_menu__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("orders");
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
        _js_menu__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("orders");
    }
};




/***/ }),

/***/ "./views/product_details.js":
/*!**********************************!*\
  !*** ./views/product_details.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productDetails": () => (/* binding */ productDetails)
/* harmony export */ });
/* harmony import */ var _js_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/menu */ "./js/menu.js");
/* harmony import */ var _src_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/products */ "./src/products.js");
/* harmony import */ var _products_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./products_view */ "./views/products_view.js");






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
        _js_menu__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("findProduct");
    }
};




/***/ }),

/***/ "./views/products_view.js":
/*!********************************!*\
  !*** ./views/products_view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productList": () => (/* binding */ productList)
/* harmony export */ });
/* harmony import */ var _js_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/menu */ "./js/menu.js");
/* harmony import */ var _src_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/products */ "./src/products.js");
/* harmony import */ var _product_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product_details */ "./views/product_details.js");


/* global menu findProduct */





var productList = {
    drawProducts: function() {
        _src_products__WEBPACK_IMPORTED_MODULE_1__.products.getAllProducts(productList.renderProducts);
    },

    renderProducts: function() {
        window.mainContainer.innerHTML = "";
        let root = document.getElementById("root");

        let container = document.createElement("main");

        container.className = "pContainer";

        let header = document.createElement("h1");

        header.textContent = "Products";
        header.className = "pTitle";

        _src_products__WEBPACK_IMPORTED_MODULE_1__.products.allProducts.map(function (product) {
            let productElement = document.createElement("p");
            productElement.textContent = product.name;
            productElement.className = "pItem";
            //console.log(product);

            productElement.addEventListener("click", function() {
                _product_details__WEBPACK_IMPORTED_MODULE_2__.productDetails.showProduct(product);
            });

            container.appendChild(productElement);
        });
        window.mainContainer.appendChild(container);
        container.appendChild(header);

        window.rootElement.appendChild(window.mainContainer);
        _js_menu__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("products");
    }
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/home.js");

/* global home */



(function () {
    window.rootElement = document.getElementById("root");

    window.mainContainer = document.createElement("main");
    window.mainContainer.className = "container";

    window.navigation = document.createElement("nav");
    window.navigation.className = "bottom-nav";

    _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vc3JjL29yZGVycy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9zcmMvcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vc3JjL3ZhcnMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vdmlld3Mvb3JkZXJfdmlldy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi92aWV3cy9wcm9kdWN0X2RldGFpbHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vdmlld3MvcHJvZHVjdHNfdmlldy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2I7O0FBRWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWEsUztBQUNyQjtBQUNBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNIO0FBQ2I7O0FBRWlDO0FBQ3VCO0FBQ0w7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsa0NBQWtDLG1EQUFhLENBQUM7QUFDNUUsYUFBYSwwQ0FBMEMs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bi8qIGdsb2JhbCBtZW51ICovXG5cbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi9tZW51LmpzXCI7XG5cbnZhciBob21lID0ge1xuICAgIHNob3dIb21lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJTdG9jayAzNjVcIjtcblxuICAgICAgICB2YXIgZ3JlZXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICAgICAgICBncmVldGluZy5jbGFzc05hbWUgPSBcImdyZWV0aW5nXCI7XG5cbiAgICAgICAgdmFyIGluZm9ybWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgaW5mb3JtYXRpb24uY2xhc3NOYW1lID0gXCJncmVldGluZ1wiO1xuXG4gICAgICAgIGxldCB0ZXh0R3JlZXRpbmcgPSBcIldlbGNvbWUgdG8gU3RvY2sgMzY1XCI7XG4gICAgICAgIGxldCB0ZXh0SW5mbyA9IFwiV2UgaGF2ZSB3aWRlIGFzc29ydG1lbnQgb2YgXCJcbiAgICAgICAgK1wiIGJvbHRzLCBuYWlscyBhbmQgc2NyZXdzLlwiO1xuXG4gICAgICAgIGdyZWV0aW5nLnRleHRDb250ZW50ID0gdGV4dEdyZWV0aW5nO1xuICAgICAgICBpbmZvcm1hdGlvbi50ZXh0Q29udGVudCA9IHRleHRJbmZvO1xuXG4gICAgICAgIC8vdmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblxuICAgICAgICAvL2ltYWdlLnNyYyA9IFwic21hbGwyLmpwZ1wiO1xuICAgICAgICAvL2ltYWdlLmFsdCA9IFwiRmlsaXAgQW50b25zc29uXCI7XG5cbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChncmVldGluZyk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9ybWF0aW9uKTtcbiAgICAgICAgLy93aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG4gICAgICAgIG1lbnUuc2hvd01lbnUoXCJob21lXCIpOyAgXG4gICAgfVxufTtcblxuZXhwb3J0IHsgaG9tZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBnbG9iYWwgaG9tZSBwcm9kdWN0cyAqL1xuXG5pbXBvcnQgeyBob21lIH0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuaW1wb3J0IHsgcHJvZHVjdExpc3QgfSBmcm9tIFwiLi4vdmlld3MvcHJvZHVjdHNfdmlldy5qc1wiO1xuaW1wb3J0IHsgb3JkZXJMaXN0IH0gZnJvbSBcIi4uL3ZpZXdzL29yZGVyX3ZpZXcuanNcIjtcblxudmFyIG1lbnUgPSB7XG4gICAgc2hvd01lbnU6IGZ1bmN0aW9uIChzZWxlY3RlZCkge1xuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIHZhciBuYXZFbGVtZW50cyA9IFt7bmFtZTogXCJIb21lXCIsIGNsYXNzOiBcImhvbWVcIiwgbmF2OiBob21lLnNob3dIb21lfSxcbiAgICAgICAgICAgIHtuYW1lOiBcIlByb2R1Y3RzXCIsIGNsYXNzOiBcInByb2R1Y3RzXCIsIG5hdjogcHJvZHVjdExpc3QuZHJhd1Byb2R1Y3RzfSxcbiAgICAgICAgICB7bmFtZTogXCJPcmRlcnNcIiwgY2xhc3M6IFwib3JkZXJzXCIsIG5hdjogb3JkZXJMaXN0LnNob3d9XTtcblxuXG4gICAgICAgIG5hdkVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCA9PT0gZWxlbWVudC5jbGFzcykge1xuICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmF2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWxlbWVudC5uYXYpO1xuXG4gICAgICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IFwiaWNvbi10ZXh0XCI7XG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZWxlbWVudC5uYW1lO1xuICAgICAgICAgICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubmF2aWdhdGlvbik7XG4gICAgfVxufTtcblxuZXhwb3J0IHsgbWVudSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBnbG9iYWwgbWVudSAqL1xuXG5pbXBvcnQgeyBiYXNlVXJsLCBhcGlLZXkgfSBmcm9tIFwiLi92YXJzLmpzXCI7XG5cbnZhciBvcmRlcnMgPSB7XG4gICAgYWxsT3JkZXJzOiBbXSxcblxuICAgIGdldEFsbE9yZGVyczogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG9yZGVycy5hbGxPcmRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vb3JkZXJzP2FwaV9rZXk9JHthcGlLZXl9YClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIHRlc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zdGF0dXMgPT0gXCJOeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcnMuYWxsT3JkZXJzLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIHB1dE9yZGVyOiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICAgICAgdmFyIG9yZGVyID0ge1xuICAgICAgICAgICAgaWQ6IGVsZW1lbnQuaWQsXG4gICAgICAgICAgICBuYW1lOiBlbGVtZW50Lm5hbWUsXG4gICAgICAgICAgICBzdGF0dXNfaWQ6IDIwMCxcbiAgICAgICAgICAgIGFwaV9rZXk6IGFwaUtleVxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhvcmRlcik7XG5cbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vb3JkZXJzYCwge1xuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3JkZXIpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7IG9yZGVycyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBnbG9iYWwgbWVudSAqL1xuXG5pbXBvcnQgeyBiYXNlVXJsLCBhcGlLZXkgfSBmcm9tIFwiLi92YXJzLmpzXCI7XG5cbnZhciBwcm9kdWN0cyA9IHtcbiAgICBhbGxQcm9kdWN0czogW10sXG5cbiAgICBnZXRBbGxQcm9kdWN0czogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICBpZiAocHJvZHVjdHMuYWxsUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vcHJvZHVjdHM/YXBpX2tleT0ke2FwaUtleX1gKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcHJvZHVjdHMuYWxsUHJvZHVjdHMgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXRQcm9kdWN0OiBmdW5jdGlvbihwcm9kdWN0SWQpIHtcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RzLmFsbFByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdC5pZCA9PSBwcm9kdWN0SWQ7XG4gICAgICAgIH0pWzBdO1xuICAgIH0sXG5cbiAgICBwdXRQcm9kdWN0OiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICAgICAgaWYoZWxlbWVudC5zdG9jayA8IGVsZW1lbnQuYW1vdW50KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcHJvZHVjdCA9IHtcbiAgICAgICAgICAgICAgICBpZDogZWxlbWVudC5wcm9kdWN0X2lkLFxuICAgICAgICAgICAgICAgIG5hbWU6IGVsZW1lbnQubmFtZSxcbiAgICAgICAgICAgICAgICBzdG9jazogKGVsZW1lbnQuc3RvY2sgLSBlbGVtZW50LmFtb3VudCksXG4gICAgICAgICAgICAgICAgYXBpX2tleTogYXBpS2V5XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdCk7XG5cbiAgICAgICAgICAgIGZldGNoKGAke2Jhc2VVcmx9L3Byb2R1Y3RzYCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHByb2R1Y3QpLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgeyBwcm9kdWN0cyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5jb25zdCBiYXNlVXJsID0gXCJodHRwczovL2xhZ2VyLmVtaWxmb2xpbm8uc2UvdjJcIjtcclxuY29uc3QgYXBpS2V5ID0gXCI3OWVjNWEwMWE1MDdiMTA5MGE2MjE2NmE3MWVlMmVhMVwiO1xyXG5cclxuZXhwb3J0IHsgYmFzZVVybCwgYXBpS2V5IH07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBtZW51IH0gZnJvbSBcIi4uL2pzL21lbnVcIjtcbmltcG9ydCB7IG9yZGVycyB9IGZyb20gXCIuLi9zcmMvb3JkZXJzXCI7XG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9zcmMvcHJvZHVjdHNcIjtcblxudmFyIG9yZGVyTGlzdCA9IHtcbiAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgb3JkZXJzLmdldEFsbE9yZGVycyhvcmRlckxpc3QuZHJhd09yZGVycyk7XG4gICAgfSxcblxuICAgIGRyYXdPcmRlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInBDb250YWluZXJcIjtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhvcmRlcnMuYWxsT3JkZXJzKTtcbiAgICAgICAgbGV0IGZldGNoID0gb3JkZXJzLmFsbE9yZGVycztcbiAgICAgICAgbGV0IHByb2R1Y3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJPcmRlcnNcIjtcblxuICAgICAgICBmZXRjaC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbGV0IG9yZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmNsYXNzTmFtZSA9IFwib3JkZXJlclwiO1xuICAgICAgICAgICAgdmFyIG9yZGVyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIG9yZGVyQnV0dG9uLnRleHRDb250ZW50ID0gXCJDb21wbGV0ZVwiO1xuXG4gICAgICAgICAgICBmb3IoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgaWYoa2V5ID09IFwic3RhdHVzX2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PSBcIm9yZGVyX2l0ZW1zXCIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW1vdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0b2NrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b2NrQW1vdW50ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGNvbnN0IFtjZXksIGdhbHVlXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50KSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjZXksIGdhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2V5ID09IFwiYW1vdW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50ID0gZ2FsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZXkgPT0gXCJzdG9ja1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvY2sgPSBnYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9ja0Ftb3VudC5wdXNoKHN0b2NrID49IGFtb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0b2NrQW1vdW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBvcmRlckVsZW1lbnQuaW5uZXJIVE1MICs9IGA8bGk+ICR7a2V5fTogJHt2YWx1ZX0gPC9saT5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvcmRlckxpc3QudGVzdE9yZGVyKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVsZW1lbnQub3JkZXJfaXRlbXMpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdG9jayk7XG4gICAgICAgICAgICBwcm9kdWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcmRlckVsZW1lbnQpO1xuICAgICAgICAgICAgaWYoc3RvY2tBbW91bnQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICBvcmRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJzLnB1dE9yZGVyKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm9yZGVyX2l0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMucHV0UHJvZHVjdChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVycy5hbGxPcmRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwcm9kdWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcmRlckJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2R1Y3RFbGVtZW50KTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgbWVudS5zaG93TWVudShcIm9yZGVyc1wiKTtcbiAgICB9LFxuXG4gICAgdGVzdE9yZGVyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInBDb250YWluZXJcIjtcblxuICAgICAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSB2YWx1ZS5uYW1lICsgXCIncyBPcmRlcnNcIjtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIC8vY29uc29sZS5sb2codmFsdWUub3JkZXJfaXRlbXMpO1xuICAgICAgICB2YWx1ZS5vcmRlcl9pdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgb3JkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBvcmRlckVsZW1lbnQuY2xhc3NOYW1lID0gXCJvcmRlcmVyXCI7XG5cbiAgICAgICAgICAgIGZvcihjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZWxlbWVudCkpe1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJzcGVjaWZpZXJzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3QgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBbY2V5LCBnYWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGVzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyRWxlbWVudC5pbm5lckhUTUwgKz0gKGAgJHtjZXl9OiAke2dhbHVlfSxgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcmRlckVsZW1lbnQuaW5uZXJIVE1MID0gb3JkZXJFbGVtZW50LmlubmVySFRNTC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJFbGVtZW50LmlubmVySFRNTCArPSBgPGxpPiAke2tleX06ICR7dmFsdWV9IDwvbGk+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQob3JkZXJFbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgbWVudS5zaG93TWVudShcIm9yZGVyc1wiKTtcbiAgICB9XG59O1xuXG5leHBvcnQgeyBvcmRlckxpc3QgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBtZW51IH0gZnJvbSBcIi4uL2pzL21lbnVcIjtcbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL3NyYy9wcm9kdWN0c1wiO1xuaW1wb3J0IHsgcHJvZHVjdExpc3QgfSBmcm9tIFwiLi9wcm9kdWN0c192aWV3XCI7XG5cbnZhciBwcm9kdWN0RGV0YWlscyA9IHtcbiAgICBzaG93UHJvZHVjdDogZnVuY3Rpb24oZmV0Y2hfcHJvZHVjdCkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAvL2xldCBmaW5Qcm9kdWN0ID0gT2JqZWN0LnZhbHVlcyhmZXRjaF9wcm9kdWN0KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhmaW5Qcm9kdWN0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiO1xuXG4gICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJQcm9kdWN0XCI7XG5cbiAgICAgICAgbGV0IHByb2RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgbGV0IG1lbnVCbG9jayA9IFwiPHVsPlwiO1xuICAgICAgICAvKmZpblByb2R1Y3QuZm9yRWFjaChlbGVtZW50ID0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgIH0pOyovXG5cbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZmV0Y2hfcHJvZHVjdCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGtleSA9PSBcInNwZWNpZmllcnNcIikge1xuICAgICAgICAgICAgICAgIHByb2RFbGVtZW50LmlubmVyVGV4dCArPSAoYCR7a2V5fTpgKTtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gXCJcIjtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtjZXksIGdhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0ZXN0KSkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wICs9IChgICR7Y2V5fTogJHtnYWx1ZX0sYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRUZW1wID0gdGVtcC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgLy9wcm9kRWxlbWVudC5pbm5lckhUTUwgPSBlZGl0ZWRUZW1wICsgXCJcXHJcXG5cIjtcbiAgICAgICAgICAgICAgICBtZW51QmxvY2sgKz0gKGA8bGk+JHtlZGl0ZWRUZW1wfTwvbGk+YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vcHJvZEVsZW1lbnQuaW5uZXJIVE1MID0gKGAke2tleX06ICR7dmFsdWV9IGAgKyBcIlxcclxcblwiKTtcbiAgICAgICAgICAgICAgICBtZW51QmxvY2sgKz0gKGA8bGk+JHtrZXl9OiAke3ZhbHVlfTwvbGk+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvZEVsZW1lbnQuaW5uZXJIVE1MID0gbWVudUJsb2NrO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kRWxlbWVudCk7XG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG4gICAgICAgIG1lbnUuc2hvd01lbnUoXCJmaW5kUHJvZHVjdFwiKTtcbiAgICB9XG59O1xuXG5leHBvcnQgeyBwcm9kdWN0RGV0YWlscyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGdsb2JhbCBtZW51IGZpbmRQcm9kdWN0ICovXG5cbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi4vanMvbWVudVwiO1xuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vc3JjL3Byb2R1Y3RzXCI7XG5pbXBvcnQgeyBwcm9kdWN0RGV0YWlscyB9IGZyb20gXCIuL3Byb2R1Y3RfZGV0YWlsc1wiO1xuXG52YXIgcHJvZHVjdExpc3QgPSB7XG4gICAgZHJhd1Byb2R1Y3RzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvZHVjdHMuZ2V0QWxsUHJvZHVjdHMocHJvZHVjdExpc3QucmVuZGVyUHJvZHVjdHMpO1xuICAgIH0sXG5cbiAgICByZW5kZXJQcm9kdWN0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGxldCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcblxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJwQ29udGFpbmVyXCI7XG5cbiAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlByb2R1Y3RzXCI7XG4gICAgICAgIGhlYWRlci5jbGFzc05hbWUgPSBcInBUaXRsZVwiO1xuXG4gICAgICAgIHByb2R1Y3RzLmFsbFByb2R1Y3RzLm1hcChmdW5jdGlvbiAocHJvZHVjdCkge1xuICAgICAgICAgICAgbGV0IHByb2R1Y3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBwcm9kdWN0RWxlbWVudC50ZXh0Q29udGVudCA9IHByb2R1Y3QubmFtZTtcbiAgICAgICAgICAgIHByb2R1Y3RFbGVtZW50LmNsYXNzTmFtZSA9IFwicEl0ZW1cIjtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocHJvZHVjdCk7XG5cbiAgICAgICAgICAgIHByb2R1Y3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0RGV0YWlscy5zaG93UHJvZHVjdChwcm9kdWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZHVjdEVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcbiAgICAgICAgbWVudS5zaG93TWVudShcInByb2R1Y3RzXCIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7IHByb2R1Y3RMaXN0IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuLyogZ2xvYmFsIGhvbWUgKi9cblxuaW1wb3J0IHsgaG9tZSB9IGZyb20gXCIuL2hvbWUuanNcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG5cbiAgICB3aW5kb3cubWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY29udGFpbmVyXCI7XG5cbiAgICB3aW5kb3cubmF2aWdhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG4gICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJib3R0b20tbmF2XCI7XG5cbiAgICBob21lLnNob3dIb21lKCk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==