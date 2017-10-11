import React, { Component } from 'react';
import TabPanel from './TabPanel.jsx';
import * as LCC from 'lightning-container';

class ContextTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false}
    this.handleAccountQueryResponse = this.handleAccountQueryResponse.bind(this);
    this.getUserInfo();
  }

  getUserInfo() {
    LCC.callApex("QuickStartAppController.getUserInfo",
                 "", this.handleAccountQueryResponse,
                 {escape: true});
  }

  handleAccountQueryResponse(result, event) {
    if (event.status) {
      // The apex returns a json object but all quotes are returned as &quot;
      let parse = result.replace(new RegExp("(&quot;)", 'g'), '\"');
      this.setState({userInfo: JSON.parse(parse)});
    }
    else if (event.type === "exception") {
      console.log(event.message + " : " + event.where);
    }
  }
  createContext(contextJson) {
    if (contextJson === undefined) {
      return (
        <div></div>
      );
    }
    return (
      <dl className="slds-dl_horizontal">
        LCC allows you to access context information through the use of apex remote actions.

        Below is a sample of that information:
        <dt className="slds-dl_horizontal__label">First Name:</dt>
        <dd className="slds-dl_horizontal__detail">{contextJson['FirstName']}</dd>
        <dt className="slds-dl_horizontal__label">Last Name:</dt>
        <dd className="slds-dl_horizontal__detail">{contextJson['LastName']}</dd>
        <dt className="slds-dl_horizontal__label">Email Address:</dt>
        <dd className="slds-dl_horizontal__detail">{contextJson['Email']}</dd>
        <dt className="slds-dl_horizontal__label">Role:</dt>
        <dd className="slds-dl_horizontal__detail">{contextJson['UserType']}</dd>
      </dl>
    );
  }

  render() {
    // if (this.state.userInfo !== undefined) {
    //   userInfoParsed = Object.keys(this.state.userInfo).map(function(key, index) {
    //     return (
    //       <div>
    //         <i>key:</i> <span>{this.state.userInfo[key]}</span>
    //       </div>
    //     );
    //   });
    // }
    let userInfoParsed = this.createContext(this.state.userInfo);
    return (
      <div id="tab-default-1" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide') } role="tabpanel" aria-labelledby="tab-default-1__item">
        {userInfoParsed}
      </div>
    );
  }
}

export default ContextTab;
