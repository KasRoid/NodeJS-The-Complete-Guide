const fillOriginalInputs = () => {
  const titleInput = document.getElementById(`title`);
  const descriptionInput = document.getElementById(`description`);
  const imageInput = document.getElementById(`image`);
  titleInput.value = ``;
  descriptionInput.value = ``;
  imageInput.value = ``;
};

fillOriginalInputs();
