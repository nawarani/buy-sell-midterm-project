$(document).ready(function() {
  $('.new-message-form').on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/messages',
      data: $('.new-message-form').serialize(),
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        loadMessages();
        $('.new-message-form input').val('');
      },
      error: function(xhr, status, error) {
        console.log('error inside ajax request:', error);
      }
    });
  });

  const loadMessages = function() {
    $.ajax({
      type: 'GET',
      url: '/messages/load',
      success: function(res) {
        $('.message-container').empty();
        for(let message of res.messages) {
          $('.message-container').append(`<div> ${message.text} </div>`);
        }
      },
      error: function(xhr, status, error) {
        console.log('error inside load message ajax request:', error);
      }
    })
  };

  loadMessages();
});

