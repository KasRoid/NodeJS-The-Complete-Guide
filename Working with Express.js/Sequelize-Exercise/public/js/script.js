const makeCardList = () => {
  loadJSON((response) => {
    const datum = JSON.parse(response);
    datum.forEach(function (data, index) {
      const cardDiv = document.createElement(`div`);
      cardDiv.className = `card`;
      document.getElementById(`cards`).appendChild(cardDiv);
      const image = document.createElement(`img`);
      image.src = data.imageURL;
      image.alt = `Avatar`;
      image.style = `width: 10vw`;
      cardDiv.appendChild(image);
      const infoDiv = document.createElement(`div`);
      infoDiv.className = `info`;
      cardDiv.appendChild(infoDiv);
      const boldTitle = document.createElement(`h4`);
      infoDiv.appendChild(boldTitle);
      const title = document.createElement(`b`);
      title.id = `title`;
      title.innerHTML += data.title;
      boldTitle.appendChild(title);
      const description = document.createElement(`p`);
      description.id = `description`;
      description.innerHTML += data.description;
      infoDiv.appendChild(description);
      const form = document.createElement(`form`);
      form.action = `/cart`;
      form.method = `POST`;
      cardDiv.appendChild(form);
      const cartButton = document.createElement(`button`);
      cartButton.className = `button`;
      cartButton.innerHTML = `Add to Cart`;
      cartButton.type = `submit`;
      form.appendChild(cartButton);
      const cartHiddenInput = document.createElement(`input`);
      cartHiddenInput.type = `hidden`;
      cartHiddenInput.name = `productID`;
      cartHiddenInput.value = data.id;
      form.appendChild(cartHiddenInput);
    });
  });
};

makeCardList();

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "data/products.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Call to function with anonymous callback
// loadJSON(function (response) {
// Do Something with the response e.g.
//jsonresponse = JSON.parse(response);
// Assuming json data is wrapped in square brackets as Drew suggests
//console.log(jsonresponse[0].name);
// });
