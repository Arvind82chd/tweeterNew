/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) { //to check the cross scripting or improve safety in taking inputs from user.
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
  
const createTweetElement = function(data) {
  
  const element = `<article class="old-tweets">
    <header class="topLine">
      <div class="topLineLeft">
      <img alt="avtar" src=${data.user.avatars}>
      <h5>${data.user.name}</h5>
      </div>
      <h4>${data.user.handle}</h4>
    </header>
    <p class="tweetsOutput" name="tweets">${escape(data.content.text)}</p> 
    <footer class="belowTweet">
      <output class="timestamp">${timeago.format(data.created_at)}</output>
        <div id="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
    </footer>
  </article>`;
  return element;
};
  
  
const renderTweets = function(data) {
  const tweetContainer = $("#allTweets");
  for (let tweet of data) {
    const element = createTweetElement(tweet);
    console.log(element);
    tweetContainer.prepend(element);//to send the tweet text to the required place.
  }
};

const loadTweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};


$(document).ready(function() {
    
  loadTweets();//So that all tweets apear before new tweet entry
  $(".limitExceedError").hide(); //to hide the error until condition met
  $(".emptyTextError").hide();

  $(".tweetForm").submit(function(event) {
    event.preventDefault();
    
    const tweetText = $("#tweet-text");
    const counter = tweetText.val().length;
    
    if (counter === 0 || tweetText.val() === null) {
      $(".emptyTextError").text("Enter some valid data!!!").show();
      return;
    }
    $.post("/tweets", { text: tweetText.val() }, function() {
    
      tweetText.val(''); //to clear the textarea
      $("#allTweets").empty(); // empty's data and refreshes it with new one in next step
      $('#count').val("140"); // resets the counter to 140
      loadTweets();//to load the tweets.
    });
  });
});