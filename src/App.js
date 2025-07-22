import React, { useState } from "react";
import "./style.css";

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

function App() {
  const [monsterCardName, setMonsterCardName] = useState('');
  const [spellCardName, setSpellCardName] = useState('');
  const [trapCardName, setTrapCardName] = useState('');
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCardInfo = async (cardName, cardType) => {
    try {
      const response = await fetch(`${API_URL}?name=${cardName}`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const filteredCards = data.data.filter(card => card.type.includes(cardType));
        if (filteredCards.length > 0) {
          setCardData({ data: filteredCards });
          setError(null);
        } else {
          setError(`No ${cardType} cards found with that name!`);
          setCardData(null);
        }
      } else {
        setError("Card not found in the database! Try another section type or check the spelling!");
        setCardData(null);
      }
    } catch (error) {
      console.error('Error fetching card info:', error);
      setError("Error fetching card info");
      setCardData(null);
    }
  };

  const handleMonsterSearch = (e) => {
    e.preventDefault();
    fetchCardInfo(monsterCardName, 'Monster');
    setMonsterCardName('');
  };

  const handleSpellSearch = (e) => {
    e.preventDefault();
    fetchCardInfo(spellCardName, 'Spell Card');
    setSpellCardName('');
  };

  const handleTrapSearch = (e) => {
    e.preventDefault();
    fetchCardInfo(trapCardName, 'Trap Card');
    setTrapCardName('');
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <img src="/img/Avatar.png" alt="Avatar" className="avatar" />
          <h3>Felipe Ferreira &copy;</h3>
        </div>
      </header>

      <div className="banner"></div>

      <h1>Yu-Gi-Oh! Card Search</h1>

      <div className="banner"></div>

      <form onSubmit={(e) => { e.preventDefault(); }}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Monster Card name"
            value={monsterCardName}
            onChange={(e) => setMonsterCardName(e.target.value)}
          />
          <button type="submit" onClick={handleMonsterSearch}>Search Monster Card</button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Spell Card name"
            value={spellCardName}
            onChange={(e) => setSpellCardName(e.target.value)}
          />
          <button type="submit" onClick={handleSpellSearch}>Search Spell Card</button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Trap Card name"
            value={trapCardName}
            onChange={(e) => setTrapCardName(e.target.value)}
          />
          <button type="submit" onClick={handleTrapSearch}>Search Trap Card</button>
        </div>
      </form>

      {error && <p>{error}</p>}
      {cardData && !error && (
        <div className="card-info">
          <h2>{cardData.data[0].name}</h2>
          <p>Level/Rank: {cardData.data[0].level}</p>
          <p>Attack: {cardData.data[0].atk}</p>
          <p>Defense: {cardData.data[0].def}</p>
          <img src={cardData.data[0].card_images[0].image_url} alt={monsterCardName || spellCardName || trapCardName} />
        </div>
      )}

      <div className="banner"></div>

      <footer>
        <div className="footer-content">
          <img src="/img/Avatar.png" alt="Avatar" className="avatar" />
          <h3>Felipe Ferreira &copy;</h3>
        </div>
      </footer>

    </div>
  );
}

export default App;


