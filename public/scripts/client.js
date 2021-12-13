/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(tweetObject) {
    const {user, content, created_at} = tweetObject;
    const contentText = escape(content.text)

    const tweet = `<article class="posted-tweet">
                    <div class="tweet-header">
                      <div class="tweet-header-left">
                        <img class = "tweet-header-avatar" src="${user.avatars}" alt="user avatar"/>
                        <span>${user.name}</span>
                      </div>              
                      <p><a href="#">${user.handle}</a></p>
                    </div>
                    <h4>${contentText}</h4>
                    <div class="tweet-footer">
                      <span>${timeago.format(new Date())}</span>
                      <div class="tweet-icons">              
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </article>`
    return tweet
}

$(document).ready(function() {
  $(".error-msg").hide();
  function renderTweets(tweetsData) {
    for (let tweet of tweetsData) {
      const postedTweet = createTweetElement(tweet);
      $("#tweets-container").append(postedTweet);
    }
  }
  
  function tweetValidation(tweetText) {
    if (!tweetText) {
      $(".error-msg").slideDown();
    } else if (tweetText.length > 140) {
      $(".error-msg").slideDown();
    } else {
      $(".error-msg").hide();
      return true
    }
  }

  $("form").submit(function(event) {
    event.preventDefault();
    const tweet = $("#tweet-area").val();
    const isValid = tweetValidation(tweet);
    if (isValid) {
      const query = $(this).serialize();
      $.post("/tweets", query).then(function(res){
         console.log(res, "Response is working");
         loadTweets();
      });
    }
  })

  function loadTweets() {
    $.getJSON("/tweets", {}, function(res) {
      $(".posted-tweet").remove();
      renderTweets(res.reverse());
      $("#tweet-area").val("");
      console.log("GET request successfull!");
    })
  }
  loadTweets();
});

