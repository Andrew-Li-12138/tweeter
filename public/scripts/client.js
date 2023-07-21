
$(document).ready(function() {
  
  //preventing XSS with Escaping
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //take data and incorporate it with HTML
  const createTweetElement = function(tweet) {
    let $newTweet = $(
      `<article class="tweet-container">
  <header class="tweet-header">
    <div class="avatar-name"> 
      <div><img src=${tweet.user.avatars} alt = "profile picture" /></div>
      <div>${tweet.user.name}</div>
    </div>
    <div class="username">${tweet.user.handle}</div>
  </header>
  <p class="tweet-text">${escape(tweet.content.text)}</p>
  <footer class="tweet-footer">
    <div>${timeago.format(tweet.created_at)}</div>
    <div class="tweet-icons"><!--icons-- had to use svg as <i></i> from Font Awsome did not show up properly-->
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#273b77}</style><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
    </div>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#213454}</style><path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"/></svg>
    </div>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
    </div>
    </div>
  </footer>
</article>`);
    return $newTweet;
  };


  const renderTweets = function(tweets) {
    //empty tweets container before render new ones so they don't end up duplicating
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      const $eachTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($eachTweet);
    }
  };
   
  
  const fetchTweets = function() {
    $.get('/tweets/')
      .then((res) => {
        renderTweets(res);
      })
      .catch(err => console.log(err));
  };


  $('#enter-tweets').on('submit', function(event) {
    
    event.preventDefault();


    const serializeText =  $('#enter-tweets').serialize();

    //disallow form submission in the event that the tweet area is empty, or exceeds the 140 character limit
    if (serializeText.length <= 5) {
      $('div.err-msg p:first-child').text('⛔️ Tweet cannot be empty');
      //apply slidedown animation to p tag and overides display:none to show the error message
      $('div.err-msg p:first-child').slideDown(500, 'linear');
      return;
    }

    if (serializeText.length > 145) {
      $('div.err-msg p:last-child').text('⛔️ Tweet has exceeded max character (140) limit ');
      $('div.err-msg p:last-child').slideDown(500, 'linear');
      return;
    }
  
    //slide error message up to hide it when text is not empty and less than 140
    if (serializeText.length <= 145 && serializeText.length > 5) {
      $('div.err-msg p').slideUp(500, 'linear');
    }
    
    //clear out text in textarea before fetchTweets 
    $('#tweet-text').val('');
  
    $.post('/tweets/', serializeText)
    //Verify the AJAX request
      .then(() => {
        console.log('tweet sent to server');
      })
    //call fetchTweets asynchronously which handles a get request and prepends tweets
      .then(() => {
        fetchTweets();
      })
      .catch(err => console.log(err));
  });
  
  //call fetchTweets again for showing all results when manually refreshing at browser after $.post event
  fetchTweets();
  
});
 






