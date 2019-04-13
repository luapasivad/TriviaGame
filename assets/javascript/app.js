$(document).ready(function() {
    var question = $('#question') // question and answer HTML divs
        answer1Div = $('#answer1')
        answer2Div = $('#answer2')
        answer3Div = $('#answer3')
        answer4Div = $('#answer4')
        answer = $('.answerRow')
        display = $('#display')

        q = 5 // question number
        wrong = 0 // wrong asnwers score
        right = 0 // right answers score
        time = 0 // time tracker
        timer; // timer variable


    questionAnswer = { // object full of Q and A values
        '1' : {
            question: "What is fallout?",
            answer: ">  radioactive particles in the air after a nuclear explosion",
            wrong1: ">  Chinese nationals defecting from the United States",
            wrong2: ">  armament dropped by aircraft",
            wrong3: ">  VAULT-TEC proproetary protection product",
        },
        '2' : {
            question: "Select your best defense from post-nuclear fallout.",
            answer: "> VAULT-TEC vault",
            wrong1: "> local grocery store",
            wrong2: "> basement",
            wrong3: "> nearest fallout shelter",
        },
        '3' : {
            question: "Define V.A.T.S",
            answer: "> VAULT-TEC Assisted Targeting System",
            wrong1: "> Visually Apt Technical Service",
            wrong2: "> Versatile Armored Tent Setup",
            wrong3: "> Verified Army Trainee Support",
        },
        '4' : {
            question: "Which is not a sign of radiation poisoning?",
            answer: "> runny nose",
            wrong1: "> nausea",
            wrong2: "> shortness of breath",
            wrong3: "> death",
        },
        '5' : {
            question: "Have you reserved your spot in a VAULT-TEC vault?",
            answer: "> Yes! I'm prepared for total nuclear annhialation!",
            wrong1: "> No! I do not value my safety!",
            wrong2: "> No! My families security is worthless!",
            wrong3: "> No! I am incompetent!",
        }   
    }
    //click to start
    login()

    function login() {
        question.text('VAULT-TEC Post-Annihalation Apptitude Test').addClass('typewriter').appendTo(question)
        setTimeout(function() {answer1Div.removeClass('hidden').text('.... retrieving question data ....')}, 2000)
        setTimeout(function() {answer2Div.removeClass('hidden').text('.... retrieving answer data ....')}, 3500)
        setTimeout(function() {answer3Div.removeClass('hidden').text('.... loading display .... ')}, 5000)
        setTimeout(function() {
            answer4Div.removeClass('hidden').text(' > ready - click anywhere to begin <'); 
            $(document).one().click(function() {  
                question.removeClass('typewriter')
                setTimeout(function() {start()}, 1000)
            })}, 6500)
        
        
    }

    function start() {

        dump()
        answer.addClass('hidden')
        
        q=1
        $(document).off('click') // click to start off on start
        answer.addClass('answerHover') // add green hover to answer on start
        question.addClass('typewriter') // add typewriter to question on start
        setTimeout(function() {
            answer.removeClass('hidden') // unhide questions after typing question
        }, 2500)
        setUp() // run setup function
    }

    //this function gives us a random number to place the answer
    function randomizer() {
        return Math.floor((Math.random()*4))
    }

    function setUp() {
        timerFunc() // start timer

        setTimeout(function() {
            answer.removeClass('hidden') }, 2500) // load in answers after typing animation

        question.text(questionAnswer[q].question) // question 
        optionDisplayArr = [answer1Div, answer2Div, answer3Div, answer4Div] // array holding the div info for text
        correctAnswer = optionDisplayArr[randomizer()]// store correct answer
        correctAnswer.text(questionAnswer[q].answer)// places the correct answer in div

        // incrementer to move through wrongArr and place the wrong answers wherever the real
        // answer is not displayed in the game
        w = 0

        //fills in the wrong answers around the correct answer
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
        question.removeClass('typewriter')// remove effect
        if ($(event.target).text() === correctAnswer.text()) { // if it's the correct answer
            display.text('CORRECT') // display correct
            $(event.target).addClass('answerRight')
            console.log('right') // alert
            right++ // counter
            q++ // question #
            clearInterval(timer) // timer pause
            setTimeout(function() {softReset()} , 2000) // question reset
        } else { // if its not right
            display.text('WRONG') // display wrong
            $(event.target).addClass('answerWrong') // highlight ref
            console.log('wrong')// alert
            wrong++ // counter
            q++ // question #
            clearInterval(timer)// timer pause
            setTimeout(function() {softReset()} , 2000) // question reset
        }
    })
}

    //timer
    function timerFunc() {
        timer = setInterval(function() { 
            time++;  
            if (time >= 30) {//if time runs out
                question.removeClass('typewriter').empty()
                console.log('you lose')
                clearInterval(timer)
                answer.addClass('hidden')
                setTimeout(function() {gameOver()}, 1000)
        };

            //test time
        $('#timer').html(30 - time); }, 1000)  
    }
    
    //reset for in between questions
    function softReset() {
        w = 0
        time = 0

        dump()
        answer.addClass('hidden')
        answer.removeClass('answerWrong')
        answer.removeClass('answerRight')
        if (q <= 5) { // if there are questions left,
            setTimeout(setUp(), 3000)
            question.addClass('typewriter')
        } else { // if there are no questions left
            setTimeout(gameOver(), 3000)
        }
    }

    // game over screen
    function gameOver() {

        dump()

        question.addClass('typewriter') // typewriter "game over"
        setTimeout(function() { answer.removeClass('hidden') }, 2500) // delay info show
        $('<div>').text('---- GAME OVER ----').appendTo(question);
        
        if (time >= 30) { // if game over due to time
            $('<div>').text('> session expired - timeout').appendTo(answer1Div) // show timeout
        } else { // if game over due to running out of questions
            $('<div>').text('> questions correct: ' + right).appendTo(answer1Div) // score
            $('<div>').text('> questions missed: ' + wrong).appendTo(answer2Div) }

        $(answer).off('click') // turn off click for answers
        answer.removeClass('answerHover') // remove answer hover
        $('<div>').text('Try again?').appendTo(answer3Div) // repurpose div
        $('<div class="tryAgain yes answerHover d-inline-block">').text('Y').appendTo(answer4Div) // yes select
        $('<div class="tryAgain no answerHover d-inline-block">').text('N').appendTo(answer4Div) // no select
        $('.no').one('click', function() { // if yes is clicked
            $(document).off('click') // turn off any click function
            lockOut()
            console.log('no')
        })
        $('.yes').one('click', function() { // if no is clicked
            $(document).off('click') // turn off any click function
            hardReset() // run the reset and start over
            console.log('yes')
        }) 
    }

    function hardReset() { // reset for a new game
        w=0
        wrong=0
        right=0 // all tracking global variables to 0
        time=0

        dump()
        answer.addClass('hidden') // hide answer div for animation
        question.removeClass('typewriter') // remove for animation
        answer.off('click') // no answer click
        setTimeout(function() {start()}, 1000)
    }

    function lockOut() {
        dump()
        $('<div>').text('---- USER LOCKOUT ----').appendTo(question);
        $('<div>').text('please contact an administrator').appendTo(answer1Div);

    }

    function dump() {
        question.empty()
        answer1Div.empty() // empty all divs
        answer2Div.empty()
        answer3Div.empty()
        answer4Div.empty()
        display.empty()
    }
})