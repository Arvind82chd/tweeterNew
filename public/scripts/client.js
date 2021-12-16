/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Tweet database:


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

  const loadTweets = function(data) {
   $.get("/tweets", function (data, status) {
     renderTweets(data);
   })
  };

 
  
  $(document).ready(function () {
    // $.get('/tweets', (data, status) => {
    //   renderTweets(data);
    // })
    $(".tweetForm").submit(function(event) {
      event.preventDefault();
      $.ajax({
      url: 'http://localhost:3000/tweets', 
      method: 'GET',
    })
    .then(function(data) {
      alert("got it")
      loadTweets(data);
    })
    // .fail(function() {
    //   allert('error');
    // })
    // .always(function() {
    //   console.log('complete')
    // })
        });
      });
  //   });

   
  // });
  
  
  
//renderTweets(tweetDataBase);
//renderTweets(data);