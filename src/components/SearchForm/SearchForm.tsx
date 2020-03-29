import React, { useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import SearchInput, { SearchButton, SearchIconSVG } from '../Search/Search';

type SearchFormProps = {
  /** The callback function triggered when the `input changes and you click on the `search-icon``, the clear-icon or press the `Enter` key. */
  onSearch: (value: string) => void
  /** Limit when the change event should be triggered by SET characters amount */
  minAllowedInputChars: number
}

const SearchForm = ({ onSearch, minAllowedInputChars }: SearchFormProps) => {
  const [debouncedSearch, search, setSearch] = useDebounce('', 700);

  const setValueAndValidate = (value: string): void => {
    if (value.length > minAllowedInputChars) setSearch(value);
  }

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(search);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex search-wrapper">
          <SearchInput onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValueAndValidate(event.target.value)} placeholder="Search products" />
          <SearchButton onClick={handleSubmit}>
            <SearchIconSVG />
          </SearchButton>
        </div>
      </form>
    </>
  )
}

SearchForm.defaultProps = {
  minAllowedInputChars: 1,
}

export default SearchForm;
