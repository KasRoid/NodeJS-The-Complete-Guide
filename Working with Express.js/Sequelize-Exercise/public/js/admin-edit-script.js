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
      form.action = `/admin/delete`;
      form.method = `POST`;
      cardDiv.appendChild(form);
      const deleteButton = document.createElement(`button`);
      deleteButton.className = `button`;
      deleteButton.innerHTML = `Delete Item`;
      deleteButton.type = `submit`;
      form.appendChild(deleteButton);
      const deleteHiddenInput = document.createElement(`input`);
      deleteHiddenInput.type = `hidden`;
      deleteHiddenInput.name = `productID`;
      deleteHiddenInput.value = data.id;
      form.appendChild(deleteHiddenInput);
    });
  });
};

makeCardList();

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "/data/products.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
