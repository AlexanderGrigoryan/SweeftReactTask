import React from 'react'
import styled from 'styled-components';

interface SearchInputProps {
query: string;
setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput({query, setQuery}: SearchInputProps) {
  return (
    <StyledInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
  )
}

export default SearchInput

const StyledInput = styled.input`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
    margin-bottom: 20px;
`