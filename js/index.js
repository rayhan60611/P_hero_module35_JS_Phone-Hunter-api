// get element function
function getElement(value) {
  return document.getElementById(value);
}
// funny things in search

const btnSearch = getElement("btn-search");
const inputSearch = getElement("input-search");

// spinner function
const btnSpinner = getElement("btn-spinner");
function spinner(Value) {
  if (Value) {
    btnSpinner.classList.remove("d-none");
  } else {
    btnSpinner.classList.add("d-none");
  }
}

function getPhoneName() {
  loadData(inputSearch.value);
  spinner(true);
}

//
async function loadData(searchText = "iphone") {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  /*   fetch(url)
        .then((res) => res.json())
        .then((data) => display(data.meals));
        */
  // Async awit style
  const res = await fetch(url);
  const phonedata = await res.json();
  display(phonedata.data);
  //   console.log(phonedata.data);
}

loadData();

const nothingFoundH1 = getElement("nothing-found-h1");
// display data in html
function display(data) {
  const parentDiv = getElement("parent-div");
  parentDiv.innerHTML = "";

  //   showing warning of Nothing found
  if (data.length === 0) {
    nothingFoundH1.classList.remove("d-none");
  } else {
    nothingFoundH1.classList.add("d-none");
  }
  data.forEach((element) => {
    // console.log(data.phone_name);
    // console.log(element.strMealThumb);
    const div = document.createElement("div");
    div.innerHTML = `  
    <div class="card mycard mb-5">
    <img class="p-5" src="${element.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${element.phone_name}</h5>
      <p class="card-text">
        This is acard with supporting text below as a natural
        lead-in to additional content.
      </p>
      <button type="button" onclick="phoneDetails('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="${element.slug}" >Show More...</button>
    </div>
  </div>`;

    parentDiv.appendChild(div);
  });

  spinner(false);
}

async function phoneDetails(slug) {
  console.log(slug);
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  const res = await fetch(url);
  const details = res.json();
  display2(details.data);
  //   console.log(details.data.name);
}

function display2(data) {
  const modalContainerParent = getElement("modal-container");

  const div = document.createElement("div");
  console.log(element.name);
  div.innerHTML = `<div
    class="modal fade modal-centered"
    id="${element.slug}"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${element.name}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;

  modalContainerParent.appendChild(div);
}
