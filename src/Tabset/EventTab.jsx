import React, { Component } from 'react';

class EventTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false}

  }
  render() {
    return (
      <div id="tab-default-2" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide') } role="tabpanel" aria-labelledby="tab-default-2__item">
        <div> Insert Event Content Here</div>
      </div>
    );
  }
}

export default EventTab;