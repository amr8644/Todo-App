/*jshint esversion: 8 */

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
window.addEventListener("DOMContentLoaded", setUp);

// Add Item
function addItem() {
  const listItem = inputItems.value;
  const id = new Date().getTime().toString();
  if (inputItems.value === "") {
    alert("Please enter something...");
  } else {
    const element = document.createElement("article");
    element.classList.add("list");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class= "text">${listItem}</p>
        <div id="btn-container">
          <button type="submit" class="delete-btn"> <i class="fas fa-trash"></i> </button>
        </div>`;
    // Delete Item
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    // Add Items To Local Storage
    addToLocalStorage(id, listItem);
    listContainer.appendChild(element);
    clearInput();
  }
}

function changeToLightMode() {
  // lightMode.classList.toggle("dark-mode");
  // header.classList.toggle("header-light-mode");
  // inputItems.classList.toggle("items-light-mode");
  body.classList.toggle("body-light-mode");
  // clearContainer.classList.toggle("clear-container-light-mode");
  // const items = document.querySelectorAll(".list");
  // items.forEach((e) => {

  //   e.classList.toggle("list-light-mode");
  // });
}

function clearInput() {
  inputItems.value = "";
}
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  listContainer.removeChild(element);
  removeFromLocalStorage(id);
  clearInput();
}

function clearAll() {
  const items = document.querySelectorAll(".list");
  if (items.length > 0) {
    items.forEach(function (item) {
      listContainer.removeChild(item);
    });
    localStorage.removeItem("itemList");
  }

  localStorage.removeItem("itemList");
}

// function addToLocalStorage() {
//   let itemList = inputItems.value;
//   if (localStorage.getItem("itemList") === null) {
//     itemList = [];
//   } else {
//     itemList = JSON.parse(localStorage.getItem("itemList"));
//   }
//   const listItem = inputItems.value;
//   itemList.push(listItem);
//   localStorage.setItem("itemList", JSON.stringify(itemList));
// }

function addToLocalStorage(id, listItem) {
  const list = { id, listItem };
  let itemList = localStorage.getItem("itemList")
    ? JSON.parse(localStorage.getItem("itemList"))
    : [];
  itemList.push(list);
  localStorage.setItem("itemList", JSON.stringify(itemList));
}

function getLocalStorage() {
  return localStorage.getItem("itemList")
    ? JSON.parse(localStorage.getItem("itemList"))
    : [];
}

function setUp() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createList(item.id, item.listItem);
    });
  }
}
function createList(id, listItem) {
  const element = document.createElement("article");
  element.classList.add("list");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class= "text">${listItem}</p>
      <div id="btn-container">
        <button type="submit" class="delete-btn"> <i class="fas fa-trash"></i> </button>
      </div>`;
  // Delete Item
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  listContainer.appendChild(element);
}

// function getLocalStorage() {
//   let itemList = inputItems.value;
//   if (localStorage.getItem("itemList") === null) {
//     itemList = [];
//   } else {
//     itemList = JSON.parse(localStorage.getItem("itemList"));
//   }
//   itemList.forEach((todo) => {
//     const element = document.createElement("article");
//     element.classList.add("list");
//     element.innerHTML = `<p class= "text">${todo}</p>
//             <div id="btn-container">
//               <button type="submit" class="delete-btn"> <i class="fas fa-trash"></i> </button>
//             </div>`;
//     const deleteBtn = element.querySelector(".delete-btn");
//     deleteBtn.addEventListener("click", deleteItem);
//     // Add Items To Local Storage
//     listContainer.appendChild(element);
//   });
// }

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("itemList", JSON.stringify(items));
}
