let bagItemObjects;
onload();

function onload() {
  loadBagItemObjects();
  displayBagItems();
  displaybagsummary();
}

function displaybagsummary() {
  let bagsummaryelement = document.querySelector(".bag-summary");
  let totalitems = bagItemObjects.length;
  let totalmrp = 0;
  let totaldiscount = 0;
  let finalpayment = 0;
  bagItemObjects.forEach((bagItem) => {
    totalmrp += bagItem.original_price;
    totaldiscount += bagItem.original_price - bagItem.current_price;
  });
  finalpayment = totalmrp - totaldiscount;
  bagsummaryelement.innerHTML = `<div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalitems} Items) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">Rs${totalmrp}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-Rs${totaldiscount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs 99</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs ${finalpayment}</span>
          </div>
        </div>
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>`;
}

function loadBagItemObjects() {
  // console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItems() {
  // console.log(bagItems);
  let containerElement = document.querySelector(".bag-items-container");
  let innerHtml = "";
  bagItemObjects.forEach((bagItem) => {
    innerHtml += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHtml;
}

function removefrombag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displaybagsummary();
}

function generateItemHTML(item) {
  return ` <div class="bag-item-container">
  <div class="item-left-part">
    <img class="bag-item-img" src="../${item.image}">
  </div>
  <div class="item-right-part">
    <div class="company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price-container">
      <span class="current-price">${item.current_price}</span>
      <span class="original-price">${item.original_price}</span>
      <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period} days</span> return available
    </div>
    <div class="delivery-details">
      Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
  </div>
  <div class="remove-from-cart" onclick="removefrombag(${item.id})">x</div>
</div>`;
}
