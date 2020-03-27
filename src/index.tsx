import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchPage from './pages/SearchPage/SearchPage';

// Legacy Mode: 
// ReactDOM.render(
//   <React.StrictMode>
//     <SearchPage />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// Concurrent Mode: 
const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(<SearchPage />);
