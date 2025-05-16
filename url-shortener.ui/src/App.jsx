import React from 'react';
import UrlShortener from './components/UrlShortener';
import UrlStats from './components/UrlStats';

function App() {
  return (
    <div>
      <UrlShortener />
      <hr />
      <UrlStats />
    </div>
  );
}

export default App;
