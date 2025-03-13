$(document).ready(function() {
  $('.favourites-form').on("submit", function(event) {
    event.preventDefault();
    const game_id = $(".favourites-form").data().favourite;
    console.log('fav jquery:', game_id);
    $.post(`/favourites?game_id=${game_id}`) 
    .then((res) => {
      console.log('hello');
    });
  });
});