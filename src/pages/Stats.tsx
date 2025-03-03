import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

import { useCardsData } from '../components/CardsContext';
import { CardData } from '../utils/types';

import { SORTING_DATA } from '../utils/constants';

export default function Stats() {
  const cards = useRef(useCardsData() || []);
  const [sortMethod, setSortMethod] = useState<SortMethodType>("Card Ascending");

  const sortFunctions = {
    "Card Ascending": (a:CardData, b:CardData) => SORTING_DATA.name.sortFunction(a, b),
    "Card Descending": (a:CardData, b:CardData) => SORTING_DATA.name.sortFunction(b, a),
    "Date Ascending": (a:CardData, b:CardData) => SORTING_DATA.date.sortFunction(a, b),
    "Date Descending": (a:CardData, b:CardData) => SORTING_DATA.date.sortFunction(b, a),
    "Design Ascending": (a:CardData, b:CardData) => SORTING_DATA.design.sortFunction(a, b),
    "Design Descending": (a:CardData, b:CardData) => SORTING_DATA.design.sortFunction(b, a),
    "Transit Ascending": (a:CardData, b:CardData) => SORTING_DATA.transit.sortFunction(a, b),
    "Transit Descending": (a:CardData, b:CardData) => SORTING_DATA.transit.sortFunction(b, a),
  }

  type SortMethodType = keyof typeof sortFunctions;

  const [currentType, currentDirection] = sortMethod.split(" ");
  function sortVisuals(type: string) {
    let arrows = null;
    if (type !== currentType) {
      arrows = <><span>▲</span><span>▼</span></>
    } else {
      if (currentDirection === "Ascending") {
        arrows = <span>▲</span>
      } else {
        arrows = <span>▼</span>
      }
    }
    return <div className="sort-visuals">{arrows}</div>
  }

  cards.current = [...cards.current].sort(sortFunctions[sortMethod]);

  const headerElements = (
    <tr key="stats-header">
      <th className="stats-table-header-column">
        <button onClick={() => setSortMethod(prev => prev === "Card Ascending" ? "Card Descending" : "Card Ascending")}>
          <span>Card</span>
          {sortVisuals("Card")}
        </button>
      </th>
      <th>
        <button onClick={() => setSortMethod(prev => prev === "Date Ascending" ? "Date Descending" : "Date Ascending")}>
          <span>Date Acquired</span>
          {sortVisuals("Date")}
        </button>
      </th>
      <th>
        <button onClick={() => setSortMethod(prev => prev === "Design Ascending" ? "Design Descending" : "Design Ascending")}>
          <span>Design</span>
          {sortVisuals("Design")}
        </button>
      </th>
      <th>
        <button onClick={() => setSortMethod(prev => prev === "Transit Ascending" ? "Transit Descending" : "Transit Ascending")}>
          <span>Transit System</span>
          {sortVisuals("Transit")}
        </button>
      </th>
    </tr>
  )

  const rowElements = cards.current.map((card: CardData) => (
    <tr key={`stats-row-${card.id}`}>
      <td className="stats-table-first-column">
        <Link to={`/${card.id}`}>
          {card.Card}
        </Link>
      </td>
      <td>
        {card["Date Obtained"]}
      </td>
      <td>
        {card["Card Design"]}
      </td>
      <td>
        {card["Transit System"]}
      </td>
    </tr>
  ))

  return (
    <div className="stats-table-container">
      <h1>
        Stats
      </h1>
      <p><em>The ratings below reflect my personal opinions and experiences! Your mileage may vary.</em></p>
      <table>
        <thead>
          {headerElements}
        </thead>
        <tbody>
          {rowElements}
        </tbody>
      </table>
    </div>
  );
}