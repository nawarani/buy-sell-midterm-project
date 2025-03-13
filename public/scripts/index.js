// this makes the price slider active and can see the price change for the filter
document.addEventListener("DOMContentLoaded", () => {
  const priceSlider = document.getElementById("maxPrice");
  const priceValue = document.getElementById("priceValue");
  const filterform = document.querySelector('.filter-form'); 

  priceValue.textContent = priceSlider.value;
  console.log(priceValue.textContent)
  priceSlider.addEventListener("input", function() {
    priceValue.textContent = priceSlider.value;
  })

  filterform.addEventListener("submit", function(e) {
    e.preventDefault();

    // updates the query parameter via form action
    const currentValue = priceSlider.value;
    filterform.action = `/games?maxPrice=${currentValue}`;


      filterform.submit();
  })

//-------------------------------------------------------------------------------------
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const gameId = this.dataset.id;
      const gameElement = document.getElementById(`game-${gameId}`).parentNode; // Get the list item element
      // Remove the game from the DOM (removes the <li> item from the list)
      if (gameElement) {
        gameElement.remove();
      }
    });
  });
});


