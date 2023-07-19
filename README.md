# Tweeter Project

Tweeter is a simple, single-page Twitter clone. Customer can add tweets by entering text and hit submit button. 

New tweets contains header which also contains the user’s avatar, name and handle; Contains the body, which contains the user’s tweet;
Contains the footer which displays how long ago the tweet was created and icons on the right.

Character counter starts at 140 and is decremented dynamically as the user types in the textarea; Counter turns red when more than 140 characters have been typed into the textarea. Error message will pop out on top of textarea when tweet's exceeds 140 characters or is empty. 

If a user shrinks down the page width to below 1024px, the layout switches from a two-column layout to a one-column layout, for a mobile device friendly user experience. 

## Final Product ScreeShots

### New Tweets can be entered in textbox and submitted by clicking "tweet" button
!["enterTweet"](https://github.com/Andrew-Li-12138/tweeter/blob/master/screenshots/enterTweet.png)

### Newly entered tweet shows up at the top
!["newTweet"](https://github.com/Andrew-Li-12138/tweeter/blob/master/screenshots/newTweet.png)

### Error message will show up if user trys to submit an empty tweet or tweet's length exceeds 140 characters
!["errMessages1"](https://github.com/Andrew-Li-12138/tweeter/blob/master/screenshots/errEmpty.png)
!["errMessages2"](https://github.com/Andrew-Li-12138/tweeter/blob/master/screenshots/errExceed.png)

### Different layouts will be applied when page width is below 1024px so it can be both desktop and mobile friendly
!["layout1"](https://github.com/Andrew-Li-12138/tweeter/blob/master/screenshots/mobileView.png)
!["layout2"](https://github.com/Andrew-Li-12138/tweeter/blob/master/screenshots/mobileView2.png)

## Dependencies

- Express
- Node 5.10.x or above

## devDependencies: 

- nodemon

## Getting Started

1. Install dependencies using the `npm install` command. 
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

