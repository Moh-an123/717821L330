import React, { useState,useEffect } from 'react';
import companiesData from './../Data.json';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import lap from './../pic.jpg'; 
import lap1 from './../pic2.jpg'; 
import lap2 from './../pic3.jpg'; 
import lap3 from './../pic4.jpg'; 
import Specification from './Specification';

const Productspage1 = () => {
  const { id1, id2 } = useParams();
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/companies') 
      .then(response => {
        setCompanies(response.data.companies);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);
  const [currentImage, setCurrentImage] = useState(0);

  const productImages = [lap2, lap1, lap, lap3];

  console.log('id1:', id1);
  console.log('id2:', id2);

  
  const selectedCompany = companies.find(company => company.company_name === id2);

  if (!selectedCompany) {
    return <div>No company found with name: {id2}</div>;
  }

  const selectedProduct = selectedCompany.products.find(product => product.product_name === id1);

  if (!selectedProduct) {
    return <div>No product found with name: {id1}</div>;
  }

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + productImages.length) % productImages.length);
  };

  return (
    <>
      <h2 className='h11'>Product Details</h2>
      <div className='product'>
        <div className="carousel">
        <button onClick={prevImage}>&lt;</button>
          <img src={productImages[currentImage]} alt="Laptop" className='img2' />
        
          <button onClick={nextImage}>&gt;</button>
        </div>
      
        <h1>Company-{id2}</h1>
        <h3>{selectedProduct.product_name}</h3>
        <p>Price: ${selectedProduct.price}</p>
        <p>Rating: {selectedProduct.rating}</p>
        <p>Discount: {selectedProduct.discount * 100}%</p>
        <p>{selectedProduct.availability ? "In Stock" : "Out of Stock"}</p>
        <Specification />
      </div>
    </>
  );
};

export default Productspage1;
