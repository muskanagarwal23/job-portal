import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value); // call the callback with updated query
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query); // optional: trigger on form submit too
    }
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2 rounded-pill px-3 py-2 fs-5"
        style={{ height: '50px' }}
        aria-label="Search"
        value={query}
        onChange={handleChange}
      />
      <Button variant="outline-success" type="submit" className="rounded-pill px-2" style={{ height: '40px' }}>
        <SearchSharpIcon />
      </Button>
    </Form>
  );
};

export default SearchBar;
