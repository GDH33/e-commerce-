import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { books } from "./data";


function App() {
 const [cart, setCart] = useState([]);

 function addItemToCart(book) {
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route 
          exact 
          path="/books" 
          render={() => <Books books={books} />} 
        />
        <Route 
          path="/books/:id" 
          render={() => (
            <BookInfo 
              books={books} 
              addItemToCart={addItemToCart} 
              cart={cart} 
            />
          )} 
        />
        <Route 
          path="/cart" 
          render={() => (
            <Cart 
              cart={cart} 
              updateCart={updateCart} 
            />
          )} 
        />
      </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

