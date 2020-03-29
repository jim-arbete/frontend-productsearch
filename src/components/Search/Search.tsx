import React from 'react';
import './Search.css';

export type StandardProps = {
  children?: React.ReactNode
  value?: string
  size?: string
  onClick?: (event: React.MouseEvent) => void,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export type IconSVG = {
} & StandardProps

export type SearchProps = {
  placeholder?: string
} & StandardProps

export const SearchIconSVG = ({size}: IconSVG) => 
  <svg className="search-icon" style={{ height: size }} viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
  
SearchIconSVG.defaultProps = {
  size: '26px'
}

export const SearchButton = ({children, value, onClick}: StandardProps) => (
    <button onClick={onClick} className="search-button" value={value} type="button" aria-label="Search">
      {children}
    </button>
)

export const SearchInput = ({onChange, size, placeholder, value}: SearchProps) =>
    <input tabIndex={0}  onChange={onChange} value={value} className="search-input" style={{ height: size }} placeholder={placeholder} type="text" />
  
SearchInput.defaultProps = {
  placeholder: '',
  size: '40px'
}

export default SearchInput;
