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
        <h3>${data.user.name}</h3>
        </div>
        <h3>${data.user.handle}</h3>
      </header>
      <p class="tweetsOutput" name="tweets">${escape(data.content.text)}</p> 
      <footer class="belowTweet">
        <output class="timestamp">${timeago.format(data.created_at)}</output>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
      </footer>
    </article>`;
    return $(element);
  };
  
  //console.log(createTweetElement(data));
  
  const renderTweets = function(data) {
    const tweetContainer = $("#allTweets")//to send the element to html
    const reverseData = data.reverse();//to reverse the direction of tweet sequence
    for (let tweet of reverseData) {
      const element = createTweetElement(tweet);
      console.log(element);
      tweetContainer.append(element)//to send the tweet text to the required place.
    }
  }

  const loadTweets = function(data) {//to load the tweets
   $.get("/tweets", function (data, status) {
     renderTweets(data);
   })
  };



  $(document).ready(function () {
    loadTweets();//So that all tweets apear before new tweet entry
    $.ajax({ //for connecting with the database
      url: 'http://localhost:3000/tweets', 
      method: 'GET',
    })
    $(".tweetForm").submit(function(event) {
      event.preventDefault();//to cancel the submit action initially until it is submitted manually.
      const tweetText = $("#tweet-text");//picks up values from texarea
      if (tweetText.val().length > 140) { //checks if value is greater than 140
        alert("You have extended your alphabet limit of 140");
        return;
      }
      $.post("/tweets", { text: tweetText.val() }, function (data) { //assigns the value captured from texarea to text in database.
        tweetText.val(''); //to clear the textarea
       loadTweets();//to lead the new tweet.
      })
    })
  });
  
  
  
//renderTweets(tweetDataBase);
//renderTweets(data);