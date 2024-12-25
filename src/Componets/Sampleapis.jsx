import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sampleapis = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.sampleapis.com/beers/ale')
      .then(response => {
        setBeers(response.data);
      })
      .catch(error => {
        console.error('Error fetching the beers data:', error);
      });
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Beer List</h1>
      <input
        type="text"
        placeholder="Search for a beer..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="block w-4/5 max-w-md mx-auto p-2 border rounded mb-4"
      />
      <div className="flex flex-wrap justify-center">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="border rounded-lg m-2 p-4 w-64 text-center">
            <img 
              src={beer.image || 'https://via.placeholder.com/150'} 
              alt={beer.name} 
              className="w-full h-auto rounded mb-2" 
            />
            <h2 className="text-xl font-semibold">{beer.name}</h2>
            <p className="text-gray-600">{beer.description}</p>
            <p className="text-gray-800 font-bold">{beer.price}</p>
            <p className="text-gray-600">Rating: {beer.rating.average} ({beer.rating.reviews} reviews)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sampleapis;
