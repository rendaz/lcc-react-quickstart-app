import React, { Component } from 'react';
import EventTab from './Tabset/EventTab.jsx'
import ContextTab from './Tabset/ContextTab.jsx'
import RemoteActionsTab from './Tabset/RemoteActionsTab.jsx'

class Tabset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'contextTab'
    }
  }
  updateActiveTab(tabName) {
    this.setState({activeTab: tabName});
  }

  render() {
    let divStyle = {
      borderColor: '#d9dbdd',
      borderWidth: '1px', 
      borderStyle: 'solid'
    };
    let name = (this.contextTab !== undefined)? this.contextTab.state.userInfo["FirstName"] + this.contextTab.state.userInfo["LastName"] : "";

    return (
      <div className="slds-grid slds-grid_vertical-align-center slds-grid_align-center" style={divStyle}>
        Hello {name}!
        <div className="slds-tabs_default">
          <ul className="slds-tabs_default__nav slds-align_absolute-center" role="tablist">
            <li className={'slds-tabs_default__item ' + (this.state.activeTab === 'contextTab' ? 'slds-is-active' : '')} title="Item One" role="presentation">
              <a className="slds-tabs_default__link" href="#" role="tab" aria-selected="true" aria-controls="tab-default-1" id="tab-default-1__item" onClick={() =>this.updateActiveTab('contextTab')} >Context</a>
            </li>

            <li className={'slds-tabs_default__item ' + (this.state.activeTab === 'eventTab' ? 'slds-is-active' : '')} title="Item Two" role="presentation">
              <a className="slds-tabs_default__link" href="#" role="tab" aria-selected="false" aria-controls="tab-default-2" id="tab-default-2__item" onClick={() =>this.updateActiveTab('eventTab')}>Event</a>
            </li>

            <li className={'slds-tabs_default__item ' + (this.state.activeTab === 'remoteActionsTab' ? 'slds-is-active' : '')} title="Item Three" role="presentation">
              <a className="slds-tabs_default__link" href="#" role="tab" aria-selected="false" aria-controls="tab-default-3" id="tab-default-3__item" onClick={() =>this.updateActiveTab('remoteActionsTab')}>Apex Remote Actions</a>
            </li>
          </ul>
          <div>
            <ContextTab isActive={this.state.activeTab === 'contextTab'} ref={(contextTab) => {this.contextTab = contextTab;}} />
            <EventTab isActive={this.state.activeTab === 'eventTab'} />
            <RemoteActionsTab isActive={this.state.activeTab === 'remoteActionsTab'} />
          </div>
        </div>
      </div>
    );
  }
}

export default Tabset;