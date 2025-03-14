// this makes the price slider active and can see the price change for the filter
document.addEventListener("DOMContentLoaded", () => {
  const priceSlider = document.getElementById("maxPrice");
  const priceValue = document.getElementById("priceValue");
  const filterform = document.querySelector('.filter-form');

  priceValue.textContent = priceSlider.value;
  console.log(priceValue.textContent);
  priceSlider.addEventListener("input", function() {
    priceValue.textContent = priceSlider.value;
  });

  filterform.addEventListener("submit", function(e) {
    e.preventDefault();

    const currentValue = priceSlider.value;
    filterform.action = `/games?maxPrice=${currentValue}`;

    filterform.submit();
  });
});


