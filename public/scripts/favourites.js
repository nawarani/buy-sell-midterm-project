$(document).ready(function() {
  $('.favourites-form').on("submit", function(event) {
    event.preventDefault();
    const game_id = $(event.target).data().favourite;
    console.log('fav jquery:', game_id);
    $.post(`/favourites?game_id=${game_id}`)
    .then((res) => {
      // be more specific in targetting
      $(event.target).find('.fa-heart').addClass('fa-heart-clicked');
    });
  });
});