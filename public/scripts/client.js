/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// {/* <img src=${user.avatars}/> */}
function createTweetElement(tweetObject) {
    const {user, content, created_at} = tweetObject
    const tweet = `<article class="posted-tweet">
                    <div class="tweet-header">
                      <div class="tweet-header-left">
                        <img class = "tweet-header-avatar" src="${user.avatars}" alt="user avatar"/>
                        <span>${user.name}</span>
                      </div>              
                      <p><a href="#">${user.handle}</a></p>
                    </div>
                    <h4>${content.text}</h4>
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
  function renderTweets(tweetsData) {
    for (let tweet of tweetsData) {
      const postedTweet = createTweetElement(tweet);
      $("#tweets-container").append(postedTweet);
    }
  }
  
  function tweetValidation(tweetText) {
    if (!tweetText) {
      alert("Please enter tweet message.")
      return false
    } else if (tweetText.length > 140) {
      alert("Tweet message too long. Please shorten.")
      return false
    } else {
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
         console.log(res, "Response is working");location.reload();
      });
    }
  })

  function loadTweets() {
    $.getJSON("/tweets", {}, function(res) {
      renderTweets(res.reverse());
      console.log("GET request successfull!");
    })
  }
  loadTweets();
});

