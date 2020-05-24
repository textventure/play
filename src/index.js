import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Theme from './Theme';
// import registerServiceWorker from './registerServiceWorker';

render(
  <Theme>
    <App />
  </Theme>,
  document.getElementById('root')
);

// registerServiceWorker();
