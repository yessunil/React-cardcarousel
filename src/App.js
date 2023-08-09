import React from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import "./App.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const App = () => {
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
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Navbar
                onCreateCard={handleCreateCard}
                onCopyCard={handleCopyCard}
                onDeleteCard={handleDeleteCard}
                onShowMoreOptions={handleShowMoreOptions}
              />
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="card-container pt-4 pb-3">
          <button className="arrow-left" onClick={() => handleCardChange(-1)}>
            <FiArrowLeft />
          </button>
          {cards.map((card) => (
            <Carousel
            centerMode = 'boolean'
            >
              <Card
                key={card.id}
                card={card}
                isActive={card.id === activeCard}
              // ...
              />
            </Carousel>
          ))}
          <button className="arrow-right" onClick={() => handleCardChange(1)}>
            <FiArrowRight />
          </button>
        </div>
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
