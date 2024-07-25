import { displayRandomRestaurant } from "./externalServices.mjs";
import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { setPreferences } from "./prefer.mjs";
import { displayAlerts } from "./alert.mjs";

let slider = document.getElementById("myRange");
let output = document.getElementById("range-display");
//let range = 10;
// @ts-ignore
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  // @ts-ignore
  output.innerHTML = this.value;
}

document.getElementById('random-button').addEventListener('click', function(event){
    event.preventDefault();
    // Get Address
    // @ts-ignore
    const address = document.getElementById('address').value;
    // Get Range
    // @ts-ignore
    const range = slider.value;
    // Get Price
    // @ts-ignore
    const price = document.querySelector('input[name="price"]:checked').value;
    // Get Rating
    // @ts-ignore
    const rating = document.querySelector('input[name="rating"]:checked').value;
    // Display
    if (address != null) {
        displayRandomRestaurant(range, address, price, rating);
        const prefer = document.getElementById('smash-pass');
        prefer.style.display = "flex"
    } else {
        displayAlerts("Please enter an address.")
    }
    
    

});

// @ts-ignore
document.getElementById('smash').addEventListener('click', function(event){
    const restaurant = document.getElementById('restaurant-name').textContent;
    setPreferences("like",restaurant);
    displayAlerts("Added to you list of likes.");
});

// @ts-ignore
document.getElementById('pass').addEventListener('click', function(event){
    const restaurant = document.getElementById('restaurant-name').textContent;
    setPreferences("dislike",restaurant);
    displayAlerts("Added to you list of dislikes.");
});

// @ts-ignore
document.getElementById('reset').addEventListener('click', function(event){
    // @ts-ignore
    document.getElementById('address').value = '';
    // @ts-ignore
    slider.value = 10;
    // @ts-ignore
    document.querySelector('input[id="any-price"]:checked').value = "checked";
    // @ts-ignore
    document.querySelector('input[name="any-rating"]:checked').value = "checked";
    setLocalStorage("so-restaurants","");
});

loadHeaderFooter();
/*document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = `
        <button id="random-button">Pick a Random Restaurant</button>
        <div id="restaurant-info"></div>
    `;
});*/

