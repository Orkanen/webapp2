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
            console.log(product);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vc3JjL29yZGVycy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9zcmMvcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vc3JjL3ZhcnMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vdmlld3Mvb3JkZXJfdmlldy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi92aWV3cy9wcm9kdWN0X2RldGFpbHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vdmlld3MvcHJvZHVjdHNfdmlldy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2I7O0FBRWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWEsUztBQUNyQjtBQUNBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNIO0FBQ2I7O0FBRWlDO0FBQ3VCO0FBQ0w7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsa0NBQWtDLG1EQUFhLENBQUM7QUFDNUUsYUFBYSwwQ0FBMEMs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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOYTtBQUNiOztBQUVpQzs7QUFFakM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxtREFBYTtBQUNqQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLyogZ2xvYmFsIG1lbnUgKi9cblxuaW1wb3J0IHsgbWVudSB9IGZyb20gXCIuL21lbnUuanNcIjtcblxudmFyIGhvbWUgPSB7XG4gICAgc2hvd0hvbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdmFyIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlN0b2NrIDM2NVwiO1xuXG4gICAgICAgIHZhciBncmVldGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gICAgICAgIGdyZWV0aW5nLmNsYXNzTmFtZSA9IFwiZ3JlZXRpbmdcIjtcblxuICAgICAgICB2YXIgaW5mb3JtYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICAgICAgICBpbmZvcm1hdGlvbi5jbGFzc05hbWUgPSBcImdyZWV0aW5nXCI7XG5cbiAgICAgICAgbGV0IHRleHRHcmVldGluZyA9IFwiV2VsY29tZSB0byBTdG9jayAzNjVcIjtcbiAgICAgICAgbGV0IHRleHRJbmZvID0gXCJXZSBoYXZlIHdpZGUgYXNzb3J0bWVudCBvZiBcIlxuICAgICAgICArXCIgYm9sdHMsIG5haWxzIGFuZCBzY3Jld3MuXCI7XG5cbiAgICAgICAgZ3JlZXRpbmcudGV4dENvbnRlbnQgPSB0ZXh0R3JlZXRpbmc7XG4gICAgICAgIGluZm9ybWF0aW9uLnRleHRDb250ZW50ID0gdGV4dEluZm87XG5cbiAgICAgICAgLy92YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXG4gICAgICAgIC8vaW1hZ2Uuc3JjID0gXCJzbWFsbDIuanBnXCI7XG4gICAgICAgIC8vaW1hZ2UuYWx0ID0gXCJGaWxpcCBBbnRvbnNzb25cIjtcblxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGdyZWV0aW5nKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb3JtYXRpb24pO1xuICAgICAgICAvL3dpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcbiAgICAgICAgbWVudS5zaG93TWVudShcImhvbWVcIik7ICBcbiAgICB9XG59O1xuXG5leHBvcnQgeyBob21lIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIGdsb2JhbCBob21lIHByb2R1Y3RzICovXG5cbmltcG9ydCB7IGhvbWUgfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5pbXBvcnQgeyBwcm9kdWN0TGlzdCB9IGZyb20gXCIuLi92aWV3cy9wcm9kdWN0c192aWV3LmpzXCI7XG5pbXBvcnQgeyBvcmRlckxpc3QgfSBmcm9tIFwiLi4vdmlld3Mvb3JkZXJfdmlldy5qc1wiO1xuXG52YXIgbWVudSA9IHtcbiAgICBzaG93TWVudTogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgdmFyIG5hdkVsZW1lbnRzID0gW3tuYW1lOiBcIkhvbWVcIiwgY2xhc3M6IFwiaG9tZVwiLCBuYXY6IGhvbWUuc2hvd0hvbWV9LFxuICAgICAgICAgICAge25hbWU6IFwiUHJvZHVjdHNcIiwgY2xhc3M6IFwicHJvZHVjdHNcIiwgbmF2OiBwcm9kdWN0TGlzdC5kcmF3UHJvZHVjdHN9LFxuICAgICAgICAgIHtuYW1lOiBcIk9yZGVyc1wiLCBjbGFzczogXCJvcmRlcnNcIiwgbmF2OiBvcmRlckxpc3Quc2hvd31dO1xuXG5cbiAgICAgICAgbmF2RWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkID09PSBlbGVtZW50LmNsYXNzKSB7XG4gICAgICAgICAgICAgICAgbmF2RWxlbWVudC5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuYXZFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbGVtZW50Lm5hdik7XG5cbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gXCJpY29uLXRleHRcIjtcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBlbGVtZW50Lm5hbWU7XG4gICAgICAgICAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5hcHBlbmRDaGlsZChuYXZFbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5uYXZpZ2F0aW9uKTtcbiAgICB9XG59O1xuXG5leHBvcnQgeyBtZW51IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIGdsb2JhbCBtZW51ICovXG5cbmltcG9ydCB7IGJhc2VVcmwsIGFwaUtleSB9IGZyb20gXCIuL3ZhcnMuanNcIjtcblxudmFyIG9yZGVycyA9IHtcbiAgICBhbGxPcmRlcnM6IFtdLFxuXG4gICAgZ2V0QWxsT3JkZXJzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBpZiAob3JkZXJzLmFsbE9yZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBmZXRjaChgJHtiYXNlVXJsfS9vcmRlcnM/YXBpX2tleT0ke2FwaUtleX1gKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0ID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgdGVzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnN0YXR1cyA9PSBcIk55XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVycy5hbGxPcmRlcnMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbn07XG5cbmV4cG9ydCB7IG9yZGVycyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBnbG9iYWwgbWVudSAqL1xuXG5pbXBvcnQgeyBiYXNlVXJsLCBhcGlLZXkgfSBmcm9tIFwiLi92YXJzLmpzXCI7XG5cbnZhciBwcm9kdWN0cyA9IHtcbiAgICBhbGxQcm9kdWN0czogW10sXG5cbiAgICBnZXRBbGxQcm9kdWN0czogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICBpZiAocHJvZHVjdHMuYWxsUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vcHJvZHVjdHM/YXBpX2tleT0ke2FwaUtleX1gKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcHJvZHVjdHMuYWxsUHJvZHVjdHMgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXRQcm9kdWN0OiBmdW5jdGlvbihwcm9kdWN0SWQpIHtcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RzLmFsbFByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdC5pZCA9PSBwcm9kdWN0SWQ7XG4gICAgICAgIH0pWzBdO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7IHByb2R1Y3RzIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmNvbnN0IGJhc2VVcmwgPSBcImh0dHBzOi8vbGFnZXIuZW1pbGZvbGluby5zZS92MlwiO1xyXG5jb25zdCBhcGlLZXkgPSBcIjc5ZWM1YTAxYTUwN2IxMDkwYTYyMTY2YTcxZWUyZWExXCI7XHJcblxyXG5leHBvcnQgeyBiYXNlVXJsLCBhcGlLZXkgfTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi4vanMvbWVudVwiO1xuaW1wb3J0IHsgb3JkZXJzIH0gZnJvbSBcIi4uL3NyYy9vcmRlcnNcIjtcblxudmFyIG9yZGVyTGlzdCA9IHtcbiAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgb3JkZXJzLmdldEFsbE9yZGVycyhvcmRlckxpc3QuZHJhd09yZGVycyk7XG4gICAgfSxcblxuICAgIGRyYXdPcmRlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInBDb250YWluZXJcIjtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhvcmRlcnMuYWxsT3JkZXJzKTtcbiAgICAgICAgbGV0IGZldGNoID0gb3JkZXJzLmFsbE9yZGVycztcbiAgICAgICAgbGV0IHByb2R1Y3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJPcmRlcnNcIjtcblxuICAgICAgICBmZXRjaC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbGV0IG9yZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmNsYXNzTmFtZSA9IFwib3JkZXJlclwiO1xuICAgICAgICAgICAgZm9yKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGlmKGtleSA9PSBcInN0YXR1c19pZFwiIHx8IGtleSA9PSBcIm9yZGVyX2l0ZW1zXCIpe1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBvcmRlckVsZW1lbnQuaW5uZXJIVE1MICs9IGA8bGk+ICR7a2V5fTogJHt2YWx1ZX0gPC9saT5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9yZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb3JkZXJMaXN0LnRlc3RPcmRlcihlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvZHVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3JkZXJFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZHVjdEVsZW1lbnQpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICBtZW51LnNob3dNZW51KFwib3JkZXJzXCIpOyAgICAgICAgXG4gICAgfSxcblxuICAgIHRlc3RPcmRlcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJwQ29udGFpbmVyXCI7XG5cbiAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gdmFsdWUubmFtZSArIFwiJ3MgT3JkZXJzXCI7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlLm9yZGVyX2l0ZW1zKTtcbiAgICAgICAgdmFsdWUub3JkZXJfaXRlbXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IG9yZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmNsYXNzTmFtZSA9IFwib3JkZXJlclwiO1xuXG4gICAgICAgICAgICBmb3IoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGVsZW1lbnQpKXtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwic3BlY2lmaWVyc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2NleSwgZ2FsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRlc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckVsZW1lbnQuaW5uZXJIVE1MICs9IChgICR7Y2V5fTogJHtnYWx1ZX0sYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3JkZXJFbGVtZW50LmlubmVySFRNTCA9IG9yZGVyRWxlbWVudC5pbm5lckhUTUwuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyRWxlbWVudC5pbm5lckhUTUwgKz0gYDxsaT4gJHtrZXl9OiAke3ZhbHVlfSA8L2xpPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9yZGVyRWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIG1lbnUuc2hvd01lbnUoXCJvcmRlcnNcIik7XG4gICAgfVxufTtcblxuZXhwb3J0IHsgb3JkZXJMaXN0IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbWVudSB9IGZyb20gXCIuLi9qcy9tZW51XCI7XG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9zcmMvcHJvZHVjdHNcIjtcbmltcG9ydCB7IHByb2R1Y3RMaXN0IH0gZnJvbSBcIi4vcHJvZHVjdHNfdmlld1wiO1xuXG52YXIgcHJvZHVjdERldGFpbHMgPSB7XG4gICAgc2hvd1Byb2R1Y3Q6IGZ1bmN0aW9uKGZldGNoX3Byb2R1Y3QpIHtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgLy9sZXQgZmluUHJvZHVjdCA9IE9iamVjdC52YWx1ZXMoZmV0Y2hfcHJvZHVjdCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coZmluUHJvZHVjdCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcblxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJjb250YWluZXJcIjtcblxuICAgICAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiUHJvZHVjdFwiO1xuXG4gICAgICAgIGxldCBwcm9kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gICAgICAgIGxldCBtZW51QmxvY2sgPSBcIjx1bD5cIjtcbiAgICAgICAgLypmaW5Qcm9kdWN0LmZvckVhY2goZWxlbWVudCA9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgICB9KTsqL1xuXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGZldGNoX3Byb2R1Y3QpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJzcGVjaWZpZXJzXCIpIHtcbiAgICAgICAgICAgICAgICBwcm9kRWxlbWVudC5pbm5lclRleHQgKz0gKGAke2tleX06YCk7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3QgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbY2V5LCBnYWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGVzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSAoYCAke2NleX06ICR7Z2FsdWV9LGApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkVGVtcCA9IHRlbXAuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIC8vcHJvZEVsZW1lbnQuaW5uZXJIVE1MID0gZWRpdGVkVGVtcCArIFwiXFxyXFxuXCI7XG4gICAgICAgICAgICAgICAgbWVudUJsb2NrICs9IChgPGxpPiR7ZWRpdGVkVGVtcH08L2xpPmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3Byb2RFbGVtZW50LmlubmVySFRNTCA9IChgJHtrZXl9OiAke3ZhbHVlfSBgICsgXCJcXHJcXG5cIik7XG4gICAgICAgICAgICAgICAgbWVudUJsb2NrICs9IChgPGxpPiR7a2V5fTogJHt2YWx1ZX08L2xpPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb2RFbGVtZW50LmlubmVySFRNTCA9IG1lbnVCbG9jaztcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZEVsZW1lbnQpO1xuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuICAgICAgICBtZW51LnNob3dNZW51KFwiZmluZFByb2R1Y3RcIik7XG4gICAgfVxufTtcblxuZXhwb3J0IHsgcHJvZHVjdERldGFpbHMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBnbG9iYWwgbWVudSBmaW5kUHJvZHVjdCAqL1xuXG5pbXBvcnQgeyBtZW51IH0gZnJvbSBcIi4uL2pzL21lbnVcIjtcbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL3NyYy9wcm9kdWN0c1wiO1xuaW1wb3J0IHsgcHJvZHVjdERldGFpbHMgfSBmcm9tIFwiLi9wcm9kdWN0X2RldGFpbHNcIjtcblxudmFyIHByb2R1Y3RMaXN0ID0ge1xuICAgIGRyYXdQcm9kdWN0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2R1Y3RzLmdldEFsbFByb2R1Y3RzKHByb2R1Y3RMaXN0LnJlbmRlclByb2R1Y3RzKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyUHJvZHVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBsZXQgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcblxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG5cbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwicENvbnRhaW5lclwiO1xuXG4gICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJQcm9kdWN0c1wiO1xuICAgICAgICBoZWFkZXIuY2xhc3NOYW1lID0gXCJwVGl0bGVcIjtcblxuICAgICAgICBwcm9kdWN0cy5hbGxQcm9kdWN0cy5tYXAoZnVuY3Rpb24gKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgcHJvZHVjdEVsZW1lbnQudGV4dENvbnRlbnQgPSBwcm9kdWN0Lm5hbWU7XG4gICAgICAgICAgICBwcm9kdWN0RWxlbWVudC5jbGFzc05hbWUgPSBcInBJdGVtXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KTtcblxuICAgICAgICAgICAgcHJvZHVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3REZXRhaWxzLnNob3dQcm9kdWN0KHByb2R1Y3QpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kdWN0RWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuICAgICAgICBtZW51LnNob3dNZW51KFwicHJvZHVjdHNcIik7XG4gICAgfVxufTtcblxuZXhwb3J0IHsgcHJvZHVjdExpc3QgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBnbG9iYWwgaG9tZSAqL1xuXG5pbXBvcnQgeyBob21lIH0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5yb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcblxuICAgIHdpbmRvdy5tYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gICAgd2luZG93Lm1haW5Db250YWluZXIuY2xhc3NOYW1lID0gXCJjb250YWluZXJcIjtcblxuICAgIHdpbmRvdy5uYXZpZ2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgICB3aW5kb3cubmF2aWdhdGlvbi5jbGFzc05hbWUgPSBcImJvdHRvbS1uYXZcIjtcblxuICAgIGhvbWUuc2hvd0hvbWUoKTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9