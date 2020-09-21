# coding-quiz
A timed code quiz with multiple choice questions testing your knowledge on coding concepts.


## index.html
At the very top of the body, I have a `<div>` tag that will always be displayed that includes the timer and a link to view all user scores.

This one html file contains all four of my different displays:
*Start display
*Questions display
*Done display
*Scores list display

I decided to include each display in one file instead of putting each display in their own respective html file since each display is only a few lines of code. A lot of the data that is display comes from the JavaScript so it wasn't really cluttered to include all displays. This helped with practicing display/hiding elements with JS and jQuery.

Question display and the scores display has a `<div>` element that is used specifically for appending questions/answer choices and user scores respectively.

There are a few  `<span>` tags nested inside `<p>` tags for a dynamic countdown timer and for displaying the score after the quiz. 


## style.css
All of the styles for each displays are in their own section.

I had a lot of similar stylings for each display, using the same layout and fonts, sizes, colors, buttons.

I included a short media query at the end to make the application a little more responsive for mobile devices. I only mainpulated a few elements.


## script.js
I used a few global variables to be used in a few events and functions. There weren't too many functions so I thought that this was a simpler and easier to read way of handling these variables.

I have all displays hidden except for the start screen display.

Once the start button is clicked, the questions display is shown, while the start screen is hidden. The timer function also starts the countdown. The `getQuestion()` function is run which populates the question/choices taken from the array.

The questions comes from a simple array of objects, all of which contains three key-value pairs which are the question, an array of choices, and the correct answer.

The `getQuestion()` function also had conditional logic that keeps track of the user's points and provides feedback on correct/incorrect answers. If an incorrect choice is selected, the timer also decreases by 10 seconds.

The timer function is a setInterval method which acts as a countdown, after each second the timerNum variable decreases by one and the timerCount display in the html is updated. Once the timerNum gets to 0 or the last question is answered the setInterval is cleared and the quiz ends.

I used local storage for the quiz scores. When the JS code runs, it first tries to pull scores that were saved to local storage and if there were scores saved, the scores array would be empty. After each quiz submission, the user's initials and their score are saved to an object which is then pushed into the all scores array. This array is then saved to the local storage for continued use, until a user clicks on the clear scores button.

The scores array is also sorted before it is displayed in the scores list. The highest scores are displayed at the top of the list while the lowest scores are displayed at the bottom. I used the "sort" method to compare values in the scores array of objects.

There are a few on click events for buttons. Some buttons have a similar functionality, where the current display becomes hidden while another display is shown. The back button (btnBack) on the scores display, takes you back to the start screen, but also resets all global variables to be able to work for a brand new quiz.