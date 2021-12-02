/*jshint esversion: 6 */

const saveBtn = document.querySelector("#save-btn");
const listContainer = document.querySelector(".list-container");
const clearItems = document.querySelector(".clear-items");
const lightMode = document.querySelector(".light-mode");
const header = document.querySelector(".header");
const inputItems = document.querySelector(".items");
const body = document.querySelector(".body");
const clearContainer = document.querySelector(".clear-container");

lightMode.addEventListener("click", changeToLightMode);
saveBtn.addEventListener("click", addItem);
clearItems.addEventListener("click", clearAll);
window.addEventListener("DOMContentLoaded", getLocalStorage);

// Add Item
function addItem() {
  if (inputItems.value === "") {
    alert("Please enter something...");
  } else {
    const listItem = inputItems.value;
    const element = document.createElement("article");
    element.classList.add("list");
    element.innerHTML = `<p class= "text">${listItem}</p>
        <div id="btn-container">
          <button type="submit" class="delete-btn"> <i class="fas fa-trash"></i> </button>
        </div>`;
    // Delete Item
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    // Add Items To Local Storage
    addToLocalStorage();
    listContainer.appendChild(element);
    clearInput();
  }
}

function changeToLightMode() {
  const items = document.querySelectorAll(".list");
  lightMode.classList.toggle("dark-mode");
  header.classList.toggle("header-light-mode");
  inputItems.classList.toggle("items-light-mode");
  body.classList.toggle("body-light-mode");
  clearContainer.classList.toggle("clear-container-light-mode");
  items.forEach((e) => {
    e.classList.toggle("list-light-mode");
  });
}

function clearInput() {
  inputItems.value = "";
}
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  listContainer.removeChild(element);

  clearInput();
}

function clearAll() {
  const items = document.querySelectorAll(".list");
  if (items.length > 0) {
    items.forEach(function (item) {
      listContainer.removeChild(item);
    });
  }

  localStorage.removeItem("itemList");
}

function addToLocalStorage() {
  let itemList = inputItems.value;
  if (localStorage.getItem("itemList") === null) {
    itemList = [];
  } else {
    itemList = JSON.parse(localStorage.getItem("itemList"));
  }
  const listItem = inputItems.value;
  itemList.push(listItem);
  localStorage.setItem("itemList", JSON.stringify(itemList));
}

function getLocalStorage() {
  let itemList = inputItems.value;
  if (localStorage.getItem("itemList") === null) {
    itemList = [];
  } else {
    itemList = JSON.parse(localStorage.getItem("itemList"));
  }
  itemList.forEach((todo) => {
    const element = document.createElement("article");
    element.classList.add("list");
    element.innerHTML = `<p class= "text">${todo}</p>
            <div id="btn-container">
              <button type="submit" class="delete-btn"> <i class="fas fa-trash"></i> </button>
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    // Add Items To Local Storage
    listContainer.appendChild(element);
  });
}
