const form = document.getElementById('weight-entry');
const date = form.elements['date'];
const pounds = form.elements['pounds'];
const ounces = form.elements['ounces'];

// getting the element's value
let fullDate = date.value;
let fullPounds = pounds.value;
let fullOunces = ounces.value;

console.log(fullDate);