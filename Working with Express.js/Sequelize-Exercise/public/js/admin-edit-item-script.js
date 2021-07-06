const fillOriginalInputs = () => {
  const titleInput = document.getElementById(`title`);
  const descriptionInput = document.getElementById(`description`);
  const imageInput = document.getElementById(`image`);

  fetch("http://localhost:3000/version")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // document.getElementById("title").innerHTML = myJson;\
      titleInput.value = myJson;
      descriptionInput.value = ``;
      imageInput.value = ``;
    });
};

fillOriginalInputs();
