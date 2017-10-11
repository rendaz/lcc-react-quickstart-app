import React from 'react';
import ReactDOM from 'react-dom';
import QuickstartApp from './QuickstartApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuickstartApp />, div);
});
