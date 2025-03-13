// this makes the price slider active and can see the price change for the filter

document.addEventListener("DOMContentLoaded", () => {
  const priceSlider = document.getElementById("maxPrice");
  const priceValue = document.getElementById("priceValue");

  priceValue.textContent = priceSlider.value;

  priceSlider.addEventListener("input", function() {
    priceValue.textContent = priceSlider.value;
  })
});