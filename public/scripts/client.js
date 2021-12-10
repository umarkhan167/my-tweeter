/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

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
                      <span>${created_at}</span>
                      <div class="tweet-icons">              
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </article>`
    return tweet
  }

const $tweetElement = createTweetElement(tweetData)
console.log($tweetElement); // to see what it looks like
  
$(document).ready(function() {
  // $("tag-name")-this targets all the tag names
  // $("#tweet")-this targets the singular tag element that has the same id name- <div id="tweet">
  // $(".name")-this targets all the tag elements that have the class name- <div class="name">
  $("#tweets-container").append($tweetElement);
});

