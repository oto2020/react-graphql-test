import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FindProductByTitleDocument } from './generated/graphql.tsx';



function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error } = useQuery(FindProductByTitleDocument, {
    variables: { searchTerm },
    skip: searchTerm.length < 3 // Пропускаем запрос, если поисковый запрос меньше 3 символов
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a product"
      />
      <ul>
        {data?.products.map(product => (
          <li key={product.id}>
            {product.name} - Category ID: {product.categoryId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
