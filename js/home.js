"use strict";

import { menu } from "./menu.js";

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
        menu.showMenu("home");
    }
};

export { home };
