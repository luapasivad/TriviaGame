$(document).ready(function() {
var question = $('#question') // question and answer HTML divs
    answer1Div = $('#answer1')
    answer2Div = $('#answer2')
    answer3Div = $('#answer3')
    answer4Div = $('#answer4')
    answer = $('.answerRow')
    question = $('#question')
    display = $('#display')

    q = 4 // question number
    wrong = 0 // wrong asnwers score
    right = 0 // right answers score
    time = 0 // time tracker
    timer;


    questionAnswer = { // object full of Q and A values
        '1' : {
            question: "this is a very very long question 1",
            answer: ">  this is the answer",
            wrong1: ">  this is not 1.1",
            wrong2: ">  this is not 1.2",
            wrong3: ">  this is not 1.3",
        },
        '2' : {
            question: "this is a question 2",
            answer: "> this is the answer",
            wrong1: "> this is not 2.1",
            wrong2: "> this is not 2.2",
            wrong3: "> this is not 2.3",
        },
        '3' : {
            question: "this is a question 3",
            answer: "> this is the answer",
            wrong1: "> this is not 3.1",
            wrong2: "> this is not 3.2",
            wrong3: "> this is not 3.3",
        },
        '4' : {
            question: "this is a question 4",
            answer: "> this is the answer",
            wrong1: "> this is not 4.1",
            wrong2: "> this is not 4.2",
            wrong3: "> this is not 4.3",
        },
        '5' : {
            question: "this is a question 5",
            answer: "> this is the answer",
            wrong1: "> this is not 5.1",
            wrong2: "> this is not 5.2",
            wrong3: "> this is not 5.3",
        }   
    }

    //this function gives us a random number to place the answer
    function randomizer() {
    return Math.floor((Math.random()*4))
    }

    //click to start
    $(document).one().click(function() {
        $(document).off('click') // click to start off on start
        answer.addClass('answerHover') // add green hover to answer on start
        question.addClass('typewriter') // add typewriter to question on start
        setTimeout(function() {
            answer.removeClass('hidden') // unhide questions after typing question
        }, 4500)
        setUp() // run setup function
    })


    function setUp() {
    timerFunc()

    setTimeout(function() {
        answer.removeClass('hidden') }, 4500) // load in answers after typing animation

    question.text(questionAnswer[q].question) // question 
    optionDisplayArr = [answer1Div, answer2Div, answer3Div, answer4Div] // array holding the div info for text
    correctAnswer = optionDisplayArr[randomizer()]// store correct answer
    correctAnswer.text(questionAnswer[q].answer)// places the correct answer in div

    // incrementer to move through wrongArr and place the wrong answers wherever the real
    // answer is not displayed in the game
    w = 0

    for (let i=0; i<optionDisplayArr.length; i++) {
        if (optionDisplayArr[i].text().length < 1) {
            wrongArr = [questionAnswer[q].wrong1, questionAnswer[q].wrong2, questionAnswer[q].wrong3] // array holding the 3 wrong answers for the setUp() function
            optionDisplayArr[i].text(wrongArr[w])    // if the div is empty, it gets the first wrong answer stored in the object
            w++                                      // and then we increment to the next wrong answer
        }
    }
    // on click function for selection
    answer.one().click(function() {
        answer.off('click')// when clicked, click selectors turn off
        question.removeClass('typewriter')
        if ($(event.target).text() === correctAnswer.text()) { // if it's the correct answer
            display.text('CORRECT')
            console.log('right') // alert
            right++ // counter
            q++ // question #
            clearInterval(timer) // timer pause
            setTimeout(function() {softReset()} , 2000) // reset for next quesiton
        } else { // if its not right
            answer.off('click')
            display.text('WRONG')
            $(event.target).addClass('answerWrong')
            console.log('wrong')// alert
            wrong++ // counter
            q++ // question #
            clearInterval(timer)// timer pause
            setTimeout(function() {softReset()} , 2000) // question reset
        }
        if (q>5) { // TEST
            return
        }
    })
    }

    //timer
    function timerFunc() {
    timer = setInterval(function() { 
        time++;  
        if (time >= 30) {//if time runs out
        console.log('you lose')
        clearInterval(timer)
        lose()
    };
    //test time
    $('#timer').html(30 - time); }, 10000)  
    }

    function endCheck() {


        question.addClass('typewriter') // typewriter "game over"
        setTimeout(function() { answer.removeClass('hidden') }, 500) // show score
        $('<div>').text('---- GAME OVER ----').appendTo(question);
        $('<div>').text('> Questions correct: ' + right).appendTo(answer1Div)
        $('<div>').text('> Questions missed: ' + wrong).appendTo(answer2Div)

        $('<div>').text('Try again?').appendTo(answer3Div)
        $('<div class="tryAgain yes answerHover d-inline-block">').text('Y').appendTo(answer4Div)
        $('<div class="tryAgain no answerHover d-inline-block">').text('N').appendTo(answer4Div)



        
    }
    //reset for in between questions
    function softReset() {
        w = 0
        time = 0

        question.empty()
        answer1Div.empty()
        answer2Div.empty()
        answer3Div.empty()
        answer4Div.empty()
        display.empty()
        answer.addClass('hidden')
        answer.removeClass('answerWrong')
        if (q <= 5) {
            setTimeout(setUp(), 3000)
            question.addClass('typewriter')
        } else {
            setTimeout(endCheck(), 3000)
        }
    }

    function lose() {
    questionDiv.empty()
    answer1Div.empty()
    answer2Div.empty()
    answer3Div.empty()
    answer4Div.empty()
    $('#timer').text("")
    answer.removeClass('answerHover') 
    }
})