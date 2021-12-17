/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) { //to check the cross scripting or improve safety in taking inputs from user.
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
    const tweetContainer = $("#allTweets")//to send the element to html
    //const reverseData = data.reverse();//to reverse the direction of tweet sequence
    for (let tweet of data) {
      const element = createTweetElement(tweet);
      console.log(element);
      tweetContainer.prepend(element)//to send the tweet text to the required place.
    }
  }

  const loadTweets = function() { //picked it from my previous code
   $.get("/tweets", function (data) { //uses ajax-jquery get method to connect with the data on tweets page.
     renderTweets(data);
   })
  };


  $(document).ready(function () {
    
    loadTweets();//So that all tweets apear before new tweet entry
   $(".limitExceedError").hide() //to hide the error until condition met
    
   $(".emptyTextError").hide()
   //onClick();

   $(".tweetForm").submit(function(event) {
    event.preventDefault();//to cancel the submit action initially until it is submitted manually.
    const tweetText = $("#tweet-text");
    const counter = tweetText.val().length;
    if (counter === 0 || tweetText.val() === null) {//condition to check data entered or not
      $(".emptyTextError").text("Enter some valid data!!!").show();
      return
    }
   $.post("/tweets", { text: tweetText.val() }, function () { //assigns the value captured from texarea to text in database.
    tweetText.val(''); //to clear the textarea
    $("#allTweets").empty(); // empty's data and refreshes it with new one in next step
    $('#count').val("140"); // resets the counter to 140 
    loadTweets();//to load the tweets.
  })
 })
});