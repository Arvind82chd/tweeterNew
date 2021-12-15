/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Tweet database:

const tweetDataBase =
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1639342241661
  };

const createTweetElement = function() {

  const tweet = `<article>
 <section class="old-tweets">
        <header class="topLine">
          <div class="topLineLeft">
            <img alt="avtar" src=${tweetDataBase.user.avatars}>
            <h3>${tweetDataBase.user.name}</h3>
          </div>
          
          <h3>${tweetDataBase.user.handle}</h3>
        </header>
        <p class="tweetsOutput" name="tweets">${tweetDataBase.content.text}</p>
        <footer class="belowTweet">
          <output class="timestamp">${tweetDataBase.created_at}</output>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </section>

  </article>`;

  return tweet;
}

console.log(createTweetElement(tweetDataBase));