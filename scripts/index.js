let bagItems;
onload();

function onload() {
  let bagItemsStr = localStorage.getItem("bagItems");
  if (bagItemsStr) {
    bagItems = JSON.parse(bagItemsStr);
  } else {
    bagItems = [];
  }
  displayItemsOnHomePage();
  displayBagIcon();
}

function addtobag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.innerHTML = bagItems.length;
    bagItemCountElement.style.visibility = "visible";
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function displayItemsOnHomePage() {
  itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += `<div class="item-container">
                  <img src="${item.image}" alt="item image" class="item-image">
                  <div class="rating">
                      ${item.rating.stars} ⭐ | ${item.rating.count}
                  </div>
                  <div class="company-name">${item.company}</div>
                  <div class="item-name">${item.item_name}</div>
                  <div class="prive">
                      <span class="current-price">${item.current_price}</span>
                      <span class="original-price">${item.original_price}</span>
                      <span class="discount">(${item.discount_perentage}% off)</span>
                      <div>
                          <button class="btn-add-bag" onclick = "addtobag(${item.id}) ">Add to Bag</button>
                      </div>
                  </div>
              </div>`;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
