const words = [
    "hangman",
    "computer",
    "javascript",
    "executioner",
    "headsman","murderer",
    "executor",
    "assassin",
    "killer",
    "butcher",
    "deathsman",
    "cutthroat",
    "decapitator",
    "homicide",
    "slayer",
    "slaughterer",
    "manslayer",
    "murderess",
    "massacrer"
  ];
  
  let chosenWord = words[Math.floor(Math.random() * words.length)];
  let guessedLetters = [];
  let remainingGuesses = 7;
  
  const wordElement = document.getElementById('word');
  const lettersElement = document.getElementById('letters');
  const hangmanElement = document.getElementById('hangman');
  const winsElement = document.getElementById('wins');
  const lossesElement = document.getElementById('losses');
  const attemptsElement = document.getElementById('attempts');
  
  const hangmanStages = [
    `
      +---+
      |   |
          |
          |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
          |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========`
  ];
  
  let wins = 0;
  let losses = 0;
  
  function displayWord() {
    wordElement.innerHTML = chosenWord
      .split('')
      .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  }
  
  function displayLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const letters = alphabet.split('').map(letter => {
      const isGuessed = guessedLetters.includes(letter);
      return `<span class="letter" ${isGuessed ? 'style="color: gray;"' : ''} onClick="handleLetterClick('${letter}')">${letter}</span>`;
    });
    lettersElement.innerHTML = letters.join('');
  }
  
  function displayHangman() {
    hangmanElement.innerHTML = hangmanStages[7 - remainingGuesses];
  }
  
  function displayStats() {
    winsElement.textContent = `Wins: ${wins}`;
    lossesElement.textContent = `Losses: ${losses}`;
    attemptsElement.textContent = `Attempts Remaining: ${remainingGuesses}`;
  }
  
  function handleLetterClick(letter) {
    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
      if (!chosenWord.includes(letter)) {
        remainingGuesses--;
      }
      displayWord();
      displayLetters();
      displayHangman();
      displayStats();
      checkGameStatus();
    }
  }
  
  function checkGameStatus() {
    if (remainingGuesses === 0) {
      losses++;
      alert(`Game over! The word was: ${chosenWord}`);
      resetGame();
    } else if (!wordElement.innerHTML.includes('_')) {
      wins++;
      alert('Congratulations! You won!');
      resetGame();
    }
  }
  
  function resetGame() {
    guessedLetters = [];
    remainingGuesses = 7;
    serveNewWord();
    displayStats();
  }
  
  function serveNewWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    displayLetters();
    displayHangman();
  }

  function giveHint() {
    const hiddenLetters = chosenWord.split('').filter(letter => !guessedLetters.includes(letter));
    
    if (hiddenLetters.length > 0 && remainingGuesses >= 3) {
      const randomIndex = Math.floor(Math.random() * hiddenLetters.length);
      const hintLetter = hiddenLetters[randomIndex];
      guessedLetters.push(hintLetter);
      
      // Penalty for using hint: Subtract three hangman stages
      remainingGuesses -= 3;
      
      displayWord();
      displayLetters();
      displayHangman();
      displayStats();
      checkGameStatus();
    } else {
      alert("Not enough guesses remaining or no hidden letters!");
    }
  }
  
  displayWord();
  displayLetters();
  displayHangman();
  displayStats();
  