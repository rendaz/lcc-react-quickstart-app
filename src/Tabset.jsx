import React, { Component } from 'react';
import * as LCC from 'lightning-container';
import EventTab from './Tabset/EventTab.jsx';
import ContextTab from './Tabset/ContextTab.jsx';
import RemoteActionsTab from './Tabset/RemoteActionsTab.jsx';

class Tabset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'contextTab'
      //userInfo: {"Name": "Xander Dale", "CompanyName": "AlphaCo", "Email": "xander@salesforce.com", "UserType": "Developer"}
    }
    this.handleUserQueryResponse = this.handleUserQueryResponse.bind(this);
    this.getUserInfo();
  }
  updateActiveTab(tabName) {
    this.setState({activeTab: tabName});
  }

  getUserInfo() {
    LCC.callApex("QuickStartAppController.getUserInfo",
                 "", this.handleUserQueryResponse,
                 {escape: true});
  }

  handleUserQueryResponse(result, event) {
    if (event.status) {
      // The apex returns a json object but all quotes are returned as &quot;
      let parse = result.replace(new RegExp("(&quot;)", 'g'), '"');
      let json_result = JSON.parse(parse);
      this.setState({userInfo: json_result, userInfoId: json_result['Id']});
      console.log("===== top.userInfo: " + parse  + "\n===== top.userInfoId: " + this.state.userInfoId)
    }
    else if (event.type === "exception") {
      console.log(event.message + " : " + event.where);
    }
  }

  render() {
    let divStyle = {
      borderColor: '#d9dbdd',
      borderWidth: '1px', 
      borderStyle: 'solid'
    };
    let greeting = (typeof this.state.userInfo !== 'undefined')? 'Hello ' + this.state.userInfo['Name'] + '!' : '';
// style={divStyle}
    return (
      <div className="slds-grid slds-grid_vertical-align-center slds-grid_align-center">
        <article className="slds-card slds-container_large">
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__body">
              <h2>
                <span className="slds-text-heading_small slds-truncate slds-p-around_medium">
                  {greeting}
                </span>
                <h1 class="slds-page-header__title slds-truncate slds-align_absolute-center slds-p-bottom_medium" title="LCC React Quickstart App">LCC React Quickstart App</h1>
              </h2>
            </div>
          </header>
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
              <ContextTab isActive={this.state.activeTab === 'contextTab'} userInfoId={this.state.userInfoId}/>
              <EventTab isActive={this.state.activeTab === 'eventTab'} />
              <RemoteActionsTab isActive={this.state.activeTab === 'remoteActionsTab'} />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Tabset;