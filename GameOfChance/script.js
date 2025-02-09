The issue is that the sound doesn't have time to play before the page navigates to the next page. To fix this, you can modify the Home button's onclick event:


<button id="home-button" onclick="playSoundAndNavigate()">Home</button>
``"

And add this function:

javascript
function playSoundAndNavigate() {
    playSound();
    setTimeout(() => {
        location.href = 'Game_of_Chance.html';
    }, 500); // Delay navigation by 500ms to allow sound to play
}


Alternatively, you can use Promises:


function playSound() {
    return new Promise(resolve => {
        document.getElementById('click-sound').play();
        resolve();
    });
}

function playSoundAndNavigate() {
    playSound().then(() => {
        location.href = 'Game_of_Chance.html';
    });
}


This ensures the sound plays before navigating to the next page.

Modified code:


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roll a Dice</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-image: url("gradient.png");
            color: #fff;
        }
        
        #dice-container {
            width: 300px;
            height: 300px;
            perspective: 1000px;
            margin-bottom: 20px;
        }
        
        #dice-icon {
            width: 100%;
            height: 100%;
            background-image: url('default.jpg');
            background-size: cover;
            background-position: center;
            animation: roll 1s ease forwards;
        }
        
        #roll-button {
            padding: 15px 30px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            background-color: #007BFF;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        #roll-button:hover {
            background-color: #0056b3;
        }
        
        #home-button {
            padding: 18px 30px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            background-color: #007BFF;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 20px;
            position: absolute;
            top: 0;
            left: 0;
            padding: 20px;
        }
        
        #home-button:hover {
            background-color: #0056b3;
        }
        
        #result {
            margin-top: 20px;
            font-size: 24px;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .result-animate {
            animation: fadeIn 0.5s forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    </style>
</head>
<body>
    <audio id="click-sound">
        <source src="button_click.mp3" type="audio/mp3">
    </audio>
    <div id="dice-container">
        <div id="dice-icon"></div>
    </div>
    <button id="roll-button" onclick="playSound()">Roll!</button>
    <button id="home-button" onclick="playSoundAndNavigate()">Home</button>
    <div id="result"></div>
    <script>
        const diceImages = [
            'd1.jpg',
            'd2.jpg',
            'd3.jpg',
            'd4.jpg',
            'd5.jpg',
            'd6.jpg'
        ];
        
        function playSound() {
            document.getElementById('click-sound').play();
        }
        
        function playSoundAndNavigate() {
            playSound();
            setTimeout(() => {
                location.href = 'Game_of_Chance.html';
            }, 500);
        }
        
        document.getElementById('roll-button').addEventListener('click', function() {
            const result = Math.floor(Math.random() * 6);
            document.getElementById('dice-icon').style.backgroundImage = url('${diceImages[result]}');
            const diceIcon = document.getElementById('dice-icon');
            diceIcon.style.animation = 'roll 1s ease forwards';
            const resultText = "You rolled a " + (result + 1) + "!";
            const resultDiv = document.getElementById('result');
            resultDiv.innerText = resultText;
            resultDiv.classList.remove('result-animate');
            void resultDiv.offsetWidth;
            resultDiv.classList.add('result-animate');
        });
    </script>
</body>
</html>
```