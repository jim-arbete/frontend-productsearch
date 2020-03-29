import React, { useEffect, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import SearchInput, { SearchButton, SearchIconSVG } from '../Search/Search';

type SearchFormProps = {
  /** The callback function triggered when the `input changes and you click on the `search-icon``, the clear-icon or press the `Enter` key. */
  onAutocompleteSearch: (value: string) => void
  onSubmitSearch: (value: string) => void
  /** Limit when the change event should be triggered by SET characters amount */
  minAllowedInputChars: number
}

const SearchForm = ({ onAutocompleteSearch, onSubmitSearch, minAllowedInputChars }: SearchFormProps) => {
  const [debouncedSearch, search, setSearch] = useDebounce('', 700);
  
  // `isFormSubmitted` prevents onAutocompleteSearch from running after the form is submitted because of the debounce
  const isFormSubmitted = useRef(false);

  const setValueAndValidate = (value: string): void => {
    if (value.length > minAllowedInputChars) setSearch(value);
  }

  useEffect(() => {
    if (!isFormSubmitted.current && search === debouncedSearch) onAutocompleteSearch(debouncedSearch);
    isFormSubmitted.current = false;
  }, [debouncedSearch, search, onAutocompleteSearch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    isFormSubmitted.current = true;
    onSubmitSearch(search);
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
