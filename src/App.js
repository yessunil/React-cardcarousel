// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";


function App() {
  const [cards, setCards] = React.useState([
    { id: 1, heading: "Add heading 1", subHeading: "Add Sub heading", para: "this is your para" },
    { id: 2, heading: "Add heading 2", subHeading: "Add Sub heading", para: "this is your para" },
    { id: 3, heading: "Add heading 3", subHeading: "Add Sub heading", para: "this is your para" },
  ]); 
  const [activeCard, setActiveCard] = React.useState(2);
  const cardsPerPage = 3;
  
  const handleCreateCard = () => {
    const newCard = {
      id: cards.length + 1,
      heading: "Add heading " + (cards.length + 1),
      subHeading: "Add Sub heading " + (cards.length + 1),
      para: "this is your para " + + (cards.length + 1),
    };
    setCards([...cards, newCard]);
    handleCardChange(1)
  };

  const handleCopyCard = () => {
    const activeCardIndex = cards.findIndex((card) => card.id === activeCard);
    if (activeCardIndex !== -1) {
      const copiedCard = { ...cards[activeCardIndex], id: cards.length + 1 };
      setCards([...cards, copiedCard]);
    }
    handleCardChange(1)
  };

  const handleDeleteCard = () => {
    const filteredCards = cards.filter((card) => card.id !== activeCard);
    setCards(filteredCards);
  
    if (filteredCards.length > 0) {
      handleCardChange(-1)
    } else {
      //setActiveCard(filteredCards[0].id); 
      setActiveCard(null); 
    }
  };

  const handleShowMoreOptions = () => {
    window.confirm("delete all")
  };

  const handleCardChange = (step) => {
    const activeCardIndex = cards.findIndex((card) => card.id === activeCard);
    if (activeCardIndex !== -1) {
      const nextCardIndex = activeCardIndex + step;
      if (nextCardIndex >= 0 && nextCardIndex < cards.length) {
        setActiveCard(cards[nextCardIndex].id);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    const firstCardIndex = (pageNumber - 1) * cardsPerPage;
    if (firstCardIndex < cards.length) {
      setActiveCard(cards[firstCardIndex].id);
    }
  };
  return (
    <div className="app">
      <Navbar
        onCreateCard={handleCreateCard}
        onCopyCard={handleCopyCard}
        onDeleteCard={handleDeleteCard}
        onShowMoreOptions={handleShowMoreOptions}
      />
      <div className="card-container">
        <button className="arrow-left" onClick={() => handleCardChange(-1)}>
          <FiArrowLeft />
        </button>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isActive={card.id === activeCard}
            // ...
          />
        ))}
        <button className="arrow-right" onClick={() => handleCardChange(1)}>
          <FiArrowRight />
        </button>
      </div>
      <Pagination
        totalCards={cards.length}
        activeCard={activeCard}
        onPageChange={handlePageChange}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
};
export default App;
