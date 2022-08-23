import React, { useState, useCallback } from 'react';
import './Search.scss';
import debounce from 'lodash/debounce';
import { useAuth } from '../../hook/useAuth';

export const Search: React.FC = () => {
  const content = useAuth();
  const appliedQuery = content?.appliedQuery;
  const setAppliedQuery = content?.setAppliedQuery;
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        setAppliedQuery && setAppliedQuery(newQuery.toLowerCase());
      } else {
        setAppliedQuery && setAppliedQuery('');
      }
    }, 500),
    []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        placeholder="Search or start new chat"
        className="search__input"
        onChange={handleQueryChange}
      />
    </div>
  );
};
