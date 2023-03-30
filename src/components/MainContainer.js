import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch(" http://localhost:3001/stocks")
    .then(r=>r.json())
    .then(setStocks)
  } ,[])

useEffect(() => {
  if(sortBy === "Alphabetically"){
    const sortedStocks = sortByName()
    setStocks(sortedStocks)
  }else{
    const sortedStocks = sortByPrice()
    setStocks(sortedStocks)
  }
}, [sortBy])


const filteredStocks = stocks.filter(
  (stock) => stock.type === filterBy
);


  const sortByName = () => {
    return [...stocks].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
  
      return 0;
    });
  }

  const sortByPrice = () => {
    return [...stocks].sort((a, b) => a.price - b.price);
  }
  
  const sortStocks = (e) => {
   setSortBy(e.target.value)
  }

  const buyStock = (stock) => {
    if(!myStocks.includes(stock)){
      const updatedMyStocks = [...myStocks, stock]
      setMyStocks(updatedMyStocks)
    } else{
      alert('Already Bought')
    }
  }

  const sellStock = (stock) => {
    const updatedMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
    setMyStocks(updatedMyStocks)
  }



  return (
    <div>
      <SearchBar handleFilterChange={setFilterBy} sortBy={sortBy} sortStocks={sortStocks} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleClick={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myStocks} handleClick={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
