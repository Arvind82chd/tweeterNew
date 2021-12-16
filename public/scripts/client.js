/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Tweet database:

const tweetDataBase =
 [ {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1639342241661
  }];

  // const $tweet = createTweetElement(tweetDataBase);

  // console.log($tweet);
  // $('#tweets-container').append($tweet);

  
  const createTweetElement = function(data) {
    
    const element = `<article class="old-tweets">
      <header class="topLine">
        <div class="topLineLeft">
        <img alt="avtar" src=${data.user.avatars}>
        <h3>${data.user.name}</h3>
        </div>
        <h3>${data.user.handle}</h3>
      </header>
      <p class="tweetsOutput" name="tweets">${data.content.text}</p>
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
    for (let tweet of data) {
      const element = createTweetElement(tweet);
      console.log(element);
      tweetContainer.append(element)
    }
  }

  
  
  $(document).ready(function () {
    $.get('/tweets', (data, status) => {
      renderTweets(data);
    })
    $(function() {
      const $button = $('.btn');
      $button.on('click', function () {
        console.log('Button clicked, performing ajax call...');
        $.ajax('initial-tweets.json', { method: 'GET' })
        .then(function (initalTweetsJson) {
          console.log('Success: ', initalTweetsJson);
          $button.replaceWith(initalTweetsJson);
         
        });
      });
    });

   
  });
  
  
  
//renderTweets(tweetDataBase);
//renderTweets(data);