import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Link } from "react-router-dom";

const Productspage = () => {
  const [sortingOption, setSortingOption] = useState('name');
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
  

  const sortProducts = (products) => {
    return products.slice().sort((a, b) => {
      switch (sortingOption) {
        case 'name':
          return a.product_name.localeCompare(b.product_name);
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className='sorting-options'>
        <label htmlFor='sorting'>Sort By:</label>
        <select id='sorting' value={sortingOption} onChange={(e) => setSortingOption(e.target.value)}>
          <option value='name'>Name</option>
          <option value='rating'>Rating</option>
          <option value='discount'>Discount</option>
        </select>
      </div>
      <div className='Pcard'>
        {companies.map((company) => (
          sortProducts(company.products).map((product) => (
            <Link to={"products"+"/"+product.product_name+"/company"+"/"+company.company_name} key={product.id}>
              <Card product={product} />
            </Link>
          ))
        ))}
      </div>
    </div>
  );
};

export default Productspage;
