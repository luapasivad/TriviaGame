var questionDiv = $('#question') // question and answer HTML divs
    answer1Div = $('#answer1')
    answer2Div = $('#answer2')
    answer3Div = $('#answer3')
    answer4Div = $('#answer4')
    q = 1 // question number
    wrong = 0 // wrong asnwers score
    right = 0 // right answers score
    time = 0 // time tracker
    timer;

questionAnswer = { // object full of Q and A values
    '1' : {
        question: "this is a question 1",
        answer: "this is the answer",
        wrong1: "this is not 1.1",
        wrong2: "this is not 1.2",
        wrong3: "this is not 1.3",
    },
    '2' : {
        question: "this is a question 2",
        answer: "this is the answer",
        wrong1: "this is not 2.1",
        wrong2: "this is not 2.2",
        wrong3: "this is not 2.3",
    },
    '3' : {
        question: "this is a question 3",
        answer: "this is the answer",
        wrong1: "this is not 3.1",
        wrong2: "this is not 3.2",
        wrong3: "this is not 3.3",
    },
    '4' : {
        question: "this is a question 4",
        answer: "this is the answer",
        wrong1: "this is not 4.1",
        wrong2: "this is not 4.2",
        wrong3: "this is not 4.3",
    },
    '5' : {
        question: "this is a question 5",
        answer: "this is the answer",
        wrong1: "this is not 5.1",
        wrong2: "this is not 5.2",
        wrong3: "this is not 5.3",
    }
}

//this function gives us a random number to place the answer
function randomizer() {
    return Math.floor((Math.random()*4))
}

//click to start
$(document).one().click(function() {
    $(document).off('click')
    $('.answer').addClass('answerHover')
    setUp()
})

function setUp() {
    timerFunc()

    questionDiv.text(questionAnswer[q].question) // question 
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
    $('#answerRow').one().click(function() {
        $('#answerRow').off('click')// when clicked, click selectors turn off
        if ($(event.target).text() === correctAnswer.text()) { // if it's the correct answer
            console.log('right') // alert
            clearInterval(timer) // timer pause
            setTimeout(function() {softReset()} , 2000) // reset fo rnext quesiton
        } else { // if its not right
            $('#answerRow').off('click')
            console.log('wrong')// alert
            clearInterval(timer)// timer pause
            setTimeout(function() {softReset()} , 2000) // question reset
        }
    })
}

//timer
function timerFunc() {
timer = setInterval(function() { 
        time++;  
        if (time >= 2) {//if time runs out
        console.log('you lose')
        clearInterval(timer)
        lose()
    };
    //test time
    $('#timer').html(2 - time); }, 1000)  
}
//reset for in between questions
function softReset() {
    q++
    w = 0
    time = 0
    questionDiv.empty()
    answer1Div.empty()
    answer2Div.empty()
    answer3Div.empty()
    answer4Div.empty()
    setUp()
}

function lose() {
    questionDiv.empty()
    answer1Div.empty()
    answer2Div.empty()
    answer3Div.empty()
    answer4Div.empty()
    $('#timer').text("")
    $('.answer').removeClass('answerHover') 
}
