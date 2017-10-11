import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuickstartApp from './QuickstartApp';
import registerServiceWorker from './registerServiceWorker';
require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

ReactDOM.render(<QuickstartApp />, document.getElementById('root'));
registerServiceWorker();
