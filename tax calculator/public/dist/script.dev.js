"use strict";

var form = document.querySelector("form");
form.addEventListener("submit", get_salary); // get input salary

function get_salary(event) {
  event.preventDefault();
  var getSalary = document.querySelector(".salary");
  var salary = getSalary.value;
  calculateTax(Number(salary));
} // calculate tax for salary


function calculateTax(salary) {
  var tax = 0;
  if (salary <= 6450) tax = salary * 0.1;else if (salary > 6450 && salary <= 9240) tax = 6450 * 0.1 + (salary - 6450) * 0.14;else if (salary > 9240 && salary <= 14840) tax = 6450 * 0.1 + (9240 - 6450) * 0.14 + (salary - 9240) * 0.2;else if (salary > 14840 && salary <= 20620) tax = 6450 * 0.1 + (9240 - 6450) * 0.14 + (14840 - 9240) * 0.2 + (salary - 14840) * 0.31;else if (salary > 20620 && salary <= 42910) tax = 6450 * 0.1 + (9240 - 6450) * 0.14 + (14840 - 9240) * 0.2 + (20620 - 14840) * 0.31 + (salary - 20620) * 0.35;else if (salary > 42910 && salary <= 55270) tax = 6450 * 0.1 + (9240 - 6450) * 0.14 + (14840 - 9240) * 0.2 + (20620 - 14840) * 0.31 + (42910 - 20620) * 0.35 + +((salary - 42910) * 0.47);else if (salary > 55270) tax = 6450 * 0.1 + (9240 - 6450) * 0.14 + (14840 - 9240) * 0.2 + (20620 - 14840) * 0.31 + (42910 - 20620) * 0.35 + +((55270 - 42910) * 0.47) + (salary - 55270) * 0.5;
  addToHtml(salary, tax);
} //display tax and neto 


function addToHtml(salary, tax) {
  var label_tax = document.querySelector(".footer label");
  label_tax.textContent = "סכום המס שלך:" + " " + "".concat(tax) + ' ש"ח';
  var h1_neto = document.querySelector(".footer h1");
  h1_neto.textContent = "סכום הנטו שלך:" + " " + ("".concat(salary - tax) + ' ש"ח');
}