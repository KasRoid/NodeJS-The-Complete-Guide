const makeCardList = () => {
  loadJSON(`cart`, (cartJson) => {
    loadJSON(`products`, (productJson) => {
      const cart = JSON.parse(cartJson);
      const products = JSON.parse(productJson);
      cart.forEach((item, index) => {
        const cardDiv = document.createElement(`div`);
        cardDiv.className = `card`;
        document.getElementById(`cards`).appendChild(cardDiv);
        const image = document.createElement(`img`);
        image.src = products[index].imageURL;
        image.alt = `Product Image`;
        image.style = `width: 10vw`;
        cardDiv.appendChild(image);
      });
    });
  });
};

makeCardList();

function loadJSON(fileName, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", `data/${fileName}.json`, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
