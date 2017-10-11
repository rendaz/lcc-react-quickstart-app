import React, { Component } from 'react';

class RemoteActionsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false}

  }
  render() {
    return (
      <div id="tab-default-3" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide') } role="tabpanel" aria-labelledby="tab-default-3__item">
        <div> Insert Remote ActionsContent Here</div>
      </div>
    );
  }
}

export default RemoteActionsTab;