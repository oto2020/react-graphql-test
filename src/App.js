import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PRODUCT_BY_TITLE } from './graphql/productQueries.tsx'; // Убедитесь, что путь указан верно

function App() {
  const [term, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Обновление debouncedTerm после задержки ввода
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);  // Задержка 500 мс

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  // Запрос к GraphQL серверу
  const { data, loading, error } = useQuery(FIND_PRODUCT_BY_TITLE, {
    variables: { term: debouncedTerm },
    skip: debouncedTerm.length < 3
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a product"
      />
      <ul>
        {data?.products.map(product => (
          <li key={product.id}>
            {product.name} - Category ID: {product.categoryId}
            {/* Добавьте здесь дополнительные детали по мере необходимости */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
