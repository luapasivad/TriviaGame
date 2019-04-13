$(document).ready(function() {
    var question = $('#question') // question and answer HTML divs
        answer1Div = $('#answer1')
        answer2Div = $('#answer2')
        answer3Div = $('#answer3')
        answer4Div = $('#answer4')
        answer = $('.answerRow')
        display = $('#display')

        q = 0

    questionAnswer = [ // object full of Q and A values
        {
            question: "this is a very very long question 1",
            answer: ">  this is the answer",
            wrong1: ">  this is not 1.1",
            wrong2: ">  this is not 1.2",
            wrong3: ">  this is not 1.3",
        },
        {
            question: "this is a question 2",
            answer: "> this is the answer",
            wrong1: "> this is not 2.1",
            wrong2: "> this is not 2.2",
            wrong3: "> this is not 2.3",
        },
        {
            question: "this is a question 3",
            answer: "> this is the answer",
            wrong1: "> this is not 3.1",
            wrong2: "> this is not 3.2",
            wrong3: "> this is not 3.3",
        },
        {
            question: "this is a question 4",
            answer: "> this is the answer",
            wrong1: "> this is not 4.1",
            wrong2: "> this is not 4.2",
            wrong3: "> this is not 4.3",
        },
        {
            question: "this is a question 5",
            answer: "> this is the answer",
            wrong1: "> this is not 5.1",
            wrong2: "> this is not 5.2",
            wrong3: "> this is not 5.3",
        }
           
    ]  
    
    //this function gives us a random number to place the answer
    function randomizer() {
        return Math.floor((Math.random()*4))
        }

    //click to start
    $(document).one().click(function() { setUp() })

    // function start() {
    //     q=1
    //     $(document).off('click') // click to start off on start
    //     answer.addClass('answerHover') // add green hover to answer on start
    //     question.addClass('typewriter') // add typewriter to question on start
    //     setTimeout(function() {
    //         answer.removeClass('hidden') // unhide questions after typing question
    //     }, 4500)
    //     setUp() // run setup function
    // }   

    function setUp() {
        // timerFunc()

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
    })
}


})