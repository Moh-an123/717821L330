import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Productspage1 from './components/Productspage1';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/products/:id1/company/:id2" element={<Productspage1 />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
