const makeCardList = () => {
  loadJSON((response) => {
    const datum = JSON.parse(response);
    const names = [`Song`, `David`];
    const jobs = [`Developer`, `Bad Engineer`];

    datum.forEach(function (data, index) {
      const img = document.createElement(`img`);
      img.src = data.imageURL;
      img.alt = `Avatar`;
      img.style = `width: 10vw`;
      const h4 = document.createElement(`h4`);
      const b = document.createElement(`b`);
      b.id = `title`;
      const p = document.createElement(`p`);
      p.id = `description`;
      const cartButton = document.createElement(`button`);
      cartButton.className = `button`;
      cartButton.innerHTML = `Add to Cart`;
      const cardDiv = document.createElement(`div`);
      const infoDiv = document.createElement(`div`);
      infoDiv.className = `info`;
      cardDiv.className = `card`;
      b.innerHTML += data.title;
      p.innerHTML += data.description;
      h4.appendChild(b);
      infoDiv.appendChild(h4);
      infoDiv.appendChild(p);
      cardDiv.appendChild(img);
      cardDiv.appendChild(infoDiv);
      cardDiv.appendChild(cartButton);
      document.getElementById(`cards`).appendChild(cardDiv);
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
