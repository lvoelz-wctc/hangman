$(document).ready(
    function(){
        $("#submit_guess").click(processGuess);

        //validations
        var myRules = {
            guess:
                {
                    required: true,
                    minlength: 1,
                    maxlength: 1
                }
        }

        var myMessages = {
            guess:
                {
                 required: "Enter a letter.",
                 minlength: "Enter only one letter.",
                 maxlength: "Enter only one letter."
                }
        }

        $("form").validate(
            {
                submitHandler: processGuess,
                rules: myRules,
                messages: myMessages
            }
        );

        var wordsArray=['possum', 'bears', 'weasel', 'flower', 'poodle', 'tiger', 'onion', 'island', 'kitten', 'coffee', 'roads', 'boats'];
        var num = Math.floor(Math.random()*12);  //number must be 0 through 11 to match array indices
        var gameWord = wordsArray[num];
        var letters = gameWord.split(""); //gives us the array of letters
        var wrongLetters = [];
        var blankWord = "";
        var count = 0;

        for (var i=0; i<gameWord.length; i++ ){
            blankWord += "-";
        }

        var revealedArray = blankWord.split(""); // gives us the initial array of dashes

        showWord();

        //--Show the hidden word--//
        function showWord(){
            $("#hiddenWord").text(blankWord);
        }

        //--Process the user's letter--//
        function processGuess(event){
            event.preventDefault();
            var guess = $("#guess").val().toLowerCase();
            count++;
            //count logic here

            var revealedWord = ""; //erased at the start of each call

            //add to wrong letter array
            if (gameWord.includes(guess) === false){
                wrongLetters.push(guess);
                $("#wrong").text("Wrong guesses: "+wrongLetters);
            }

            for (var x=0; x<gameWord.length; x++){
                if (revealedArray[x] === "-"){ //the letter hasn't been guessed yet
                    if (guess === letters[x]){
                        revealedWord = revealedWord + guess; //they got it right
                    }
                    else {
                        revealedWord = revealedWord + "-"; //they got it wrong
                    }
                }
                else { //the letter has been guessed already
                    revealedWord = revealedWord + revealedArray[x];
                }
            }
            revealedArray = revealedWord.split(""); //stays the same going into next function call
            $("#hiddenWord").text(revealedWord); //shows the current hidden word.
            if (count === 6 && revealedWord !==gameWord){
                $("#condition").text("No more guesses - you lost!")
            }
            else if (revealedWord === gameWord){
                $("#condition").text("You won!")
            }
        }
    }
);