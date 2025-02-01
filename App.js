import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { books } from "./data";


function App() {
 const [cart, setCart] = useState([]);

 function addToCart(book) {
  const dupeItem = cart.find((item) => item.id === book.id);
  setCart((oldCart) =>
    dupeItem
      ? [
          ...oldCart.map((item) => {
            return item.id === dupeItem.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item;
          }),
        ]
      : [...oldCart, { ...book, quantity: 1 }]
  );
}

function updateCart(item, newQuantity) {
  setCart((oldCart) =>
    oldCart.map((oldItem) => {
      if (oldItem.id === item.id) {
        return {
          ...oldItem,
          quantity: newQuantity,
        };
      } else {
        return oldItem;
      }
    })
  );
}

function removeItem(item) {
  setCart((oldCart) => oldCart.filter((cartItem) => cartItem.id !== item.id));
}

function numberOfItems() {
  let counter = 0;
  cart.forEach((item) => {
    counter += +item.quantity;
  });
  return counter;
}

function numberOfItems() {
  let counter = 0;
  cart.forEach((item) => {
    counter += +item.quantity;
  });
  return counter;
}

function calcPrices() {
  let total = 0;
  cart.forEach((item) => {
    total += (item.salePrice || item.originalPrice) * item.quantity;
  });
  return {
    subtotal: total * 0.9,
    tax: total * 0.1,
    total,
  };
}

return (
  <Router>
    <div className="App">
      <Nav cart={cart} />
      <Routes>
        <Route exact path="/" component={<Home />} />
        <Route 
          exact 
          path="/books" 
          element={() => <Books books={books} />} 
        />
        <Route 
          path="/books/:id" 
          element={() => (
            <BookInfo 
              books={books} 
              addItemToCart={addToCart} 
              cart={cart} 
            />
          )} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              books={books}
              cart={cart} 
              updateCart={updateCart}
            />
          } 
        />
      </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

