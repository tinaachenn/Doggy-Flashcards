import { useState, useRef } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

const App = () => {

  const cardPairs = [
    // { question: "Click on me to flip to the card's answer!", answer: 'Click on me to flip back to the question!', imgSrc: '../src/assets/dog-emoji.png' },
    { level:"easy", question: 'What breed is known for its loyalty and friendly temperament?', answer: 'Golden Retriever', imgSrc: '../src/assets/golden.jpeg' },
    { level:"easy", question: 'Which breed is often used as a police or military working dog?', answer: 'German Shepherd', imgSrc: '../src/assets/german.jpeg' },
    { level:"easy", question: 'Which breed is known for its distinctive curly coat?', answer: 'Poodle', imgSrc: '../src/assets/poodle.jpeg' },
    { level:"easy", question: 'Which breed is known for its distinctive spotted coat?', answer: 'Dalmatian', imgSrc: '../src/assets/dalmatian.webp' },
    { level:"medium", question: 'Which breed is known for its droopy face and strong build?', answer: 'Bulldog', imgSrc: '../src/assets/bulldog.jpeg' },
    { level:"medium", question: 'Which breed is known for its distinctive blue-black tongue?', answer: 'Chow Chow', imgSrc: '../src/assets/chowchow.jpeg' },
    { level:"hard", question: 'Which breed is known for its distinctive fluffy coat?', answer: 'Pomeranian', imgSrc: '../src/assets/pomeranian.jpeg' },
    { level:"hard", question: 'Which breed is known for its distinctive bat-like ears?', answer: 'French Bulldog', imgSrc: '../src/assets/french-bulldog.avif' },
    { level:"easy", question: 'Which breed is known for its distinctive short legs and long body?', answer: 'Dachshund', imgSrc: '../src/assets/dachshund.jpeg' },
    { level:"medium", question: 'Which breed is known for its distinctive fluffy coat and fox-like face?', answer: 'Shiba Inu', imgSrc: '../src/assets/shiba.webp' },
    { level:"hard", question: 'Which Chinese breed is known for its distinctive wrinkly skin and pushed in nose?', answer: 'Shar Pei', imgSrc: '../src/assets/shar-pei.webp' },
    { level:"medium", question: 'Which breed is known for its distinctive long, droopy ears and short legs?', answer: 'Basset Hound', imgSrc: '../src/assets/basset-hound.jpeg' },
    { level:"medium", question: 'Which breed is known for its distinctive long, silky coat and ears?', answer: 'Cavalier King Charles Spaniel', imgSrc: '../src/assets/spaniel.jpeg' },
    { level:"hard", question: 'Which breed is known for its distinctive curly coat and webbed feet?', answer: 'Portuguese Water Dog', imgSrc: '../src/assets/water-dog.jpeg' },
    { level:"hard", question: 'Which breed is known for its hunting lineage, long droopy ears, and originates from Great Britain?', answer: 'Beagle', imgSrc: '../src/assets/beagle.webp' },
    ];
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffledPairs, setShuffledPairs] = useState([...cardPairs]);
  const [currentStreakCount, setStreakCount] = useState(0);
  const [longestStreakCount, setLongestStreakCount] = useState(0);
  const currentCard = shuffledPairs[currentCardIndex];
  const inputElementRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInput = inputElementRef.current.value.trim().toLowerCase(); // Access input element using ref
    const correctAnswer = currentCard.answer.trim().toLowerCase();

    if (userInput === correctAnswer) {
      console.log('Correct answer!');
      inputElementRef.current.classList.remove('incorrect-answer');
      inputElementRef.current.classList.add('correct-answer');
      setStreakCount(currentStreakCount + 1);

      if (currentStreakCount + 1 > longestStreakCount) {
        setLongestStreakCount(currentStreakCount + 1);
      }
    } else {
      console.log('Incorrect answer!');
      inputElementRef.current.classList.remove('correct-answer');
      inputElementRef.current.classList.add('incorrect-answer');
      setStreakCount(0);
    }

    inputElementRef.current.value = '';
  };

  const handleShuffle = () => {
    const shuffled = [...cardPairs].sort(() => Math.random() - 0.5);
    setShuffledPairs(shuffled);
    setCurrentCardIndex(0);
    setStreakCount(0);
    inputElementRef.current.classList.remove('correct-answer');
    inputElementRef.current.classList.remove('incorrect-answer');
  };

  const handleBackCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? shuffledPairs.length - 1 : prevIndex - 1));
    inputElementRef.current.classList.remove('correct-answer');
    inputElementRef.current.classList.remove('incorrect-answer');
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === shuffledPairs.length - 1 ? 0 : prevIndex + 1));
    inputElementRef.current.classList.remove('correct-answer');
    inputElementRef.current.classList.remove('incorrect-answer');
  };

  return (
    <div className="App">
      <div className='Header'>
        <h2>Name that dog breed!</h2>
        <h4>Think you know more dog breeds than the average person? Put it to the test!</h4>
        <h5>Number of cards: {cardPairs.length-1}</h5>
        <h5>Streak: {currentStreakCount}, Longest Streak: {longestStreakCount}</h5>
      </div>
      <div className='container'>
        <Flashcard question={currentCard.question} answer={currentCard.answer} imgSrc={currentCard.imgSrc} />
      </div>
      <input ref={inputElementRef} id="answerInput" type="text" placeholder="Enter your answer here" />
      <button className="submit_button" onClick={handleSubmit}>Submit</button> <br></br>
   <button className="back_button" onClick={handleBackCard} disabled={currentCardIndex === 0}>←</button>
    <button className="next_button" onClick={handleNextCard} disabled={currentCardIndex === shuffledPairs.length - 1}>→</button>
      <button className="shuffle_button" onClick={handleShuffle}>Shuffle</button>
    </div>
  )
}

export default App
