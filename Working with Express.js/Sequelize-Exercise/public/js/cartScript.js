const makeCardList = () => {
  loadJSON(`cart`, (cartJson) => {
    if (cartJson) {
      loadJSON(`products`, (productJson) => {
        const cart = JSON.parse(cartJson);
        const products = JSON.parse(productJson);
        cart.forEach((item, index) => {
          const product = products[index];
          const cardDiv = document.createElement(`div`);
          cardDiv.className = `card`;
          document.getElementById(`cards`).appendChild(cardDiv);
          const image = document.createElement(`img`);
          image.src = product.imageURL;
          image.alt = `Product Image`;
          image.style = `width: 10vw`;
          cardDiv.appendChild(image);
          const infoDiv = document.createElement(`div`);
          infoDiv.className = `info`;
          cardDiv.appendChild(infoDiv);
          const boldTitle = document.createElement(`h4`);
          infoDiv.appendChild(boldTitle);
          const title = document.createElement(`b`);
          title.innerHTML = product.title;
          boldTitle.appendChild(title);
          const quantity = document.createElement(`p`);
          quantity.innerHTML = item.quantity;
          infoDiv.appendChild(quantity);
          const removeForm = document.createElement(`form`);
          removeForm.action = `/delete`;
          removeForm.method = `POST`;
          cardDiv.appendChild(removeForm);
          const removeButton = document.createElement(`button`);
          removeButton.className = `button`;
          removeButton.innerHTML = `Remove Item`;
          removeButton.type = `submit`;
          removeForm.appendChild(removeButton);
          const removeHiddenInput = document.createElement(`input`);
          removeHiddenInput.type = `hidden`;
          removeHiddenInput.name = `productID`;
          removeHiddenInput.value = item.id;
          removeForm.appendChild(removeHiddenInput);
        });
      });
    } else {
      const title = document.createElement(`h1`);
      title.innerHTML = `No Product in Cart`;
      document.getElementById(`cards`).appendChild(title);
    }
  });
};

makeCardList();

function loadJSON(fileName, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", `data/${fileName}.json`, true);
  xobj.send(null);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    } else if (xobj.readyState == 4 && xobj.status == "404") {
      callback(null);
    }
  };
}
