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
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        $('.message-container').empty();
        for (let message of res.messages) {
          $('.message-container').append(`<div class='message sender-${message.sender_id}'> ${message.text} </div>`);
        }
        $(`.sender-${res.userId}`).addClass('sender-messages');
      },
      error: function(xhr, status, error) {
        console.log('error inside load message ajax request:', error);
      }
    });
  };


  loadMessages();
});

