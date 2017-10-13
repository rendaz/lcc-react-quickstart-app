import React, { Component } from 'react';
import * as ForceJsService from './ForceJsService.jsx';
//import TabPanel from './TabPanel.jsx';

export let requestUserInfo = id => {
  let q = "SELECT name, email, companyname, usertype FROM user WHERE id= '" + id + "'";
  return ForceJsService.query(q);
}

class ContextTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false}
    console.log("construct userinfoid: " + props.userInfoId);
  }

  createContext(contextJson) {
    if (contextJson === undefined) {
      return (
        <div></div>
      );
    }
    return (
      <div className="slds-card__body">
        LCC allows you to access context information through the use of apex remote actions.
        Below is a sample of that information:

        <table className="slds-table slds-table_fixed-layout slds-table_bordered slds-no-row-hover slds-table_cell-buffer">
          <thead>
            <tr className="slds-text-title_caps">
              <th scope="col">
                <div className="slds-truncate" title="Name">Name</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Company">Company</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Title">Title</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Email">Email</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="slds-hint-parent">
              <th scope="row">
                <div className="slds-truncate" title={contextJson['Name']}>{contextJson['Name']}</div>
              </th>
              <td>
                <div className="slds-truncate" title={contextJson['CompanyName']}>{contextJson['CompanyName']}</div>
              </td>
              <td>
                <div className="slds-truncate" title={contextJson['UserType']}>{contextJson['UserType']}</div>
              </td>
              <td>
                <div className="slds-truncate" title={contextJson['Email']}>{contextJson['Email']}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // <dl className="slds-dl_horizontal">
  //         <dt className="slds-dl_horizontal__label">First Name:</dt>
  //         <dd className="slds-dl_horizontal__detail"></dd>
  //         <dt className="slds-dl_horizontal__label">Last Name:</dt>
  //         <dd className="slds-dl_horizontal__detail"></dd>
  //         <dt className="slds-dl_horizontal__label">Email Address:</dt>
  //         <dd className="slds-dl_horizontal__detail"></dd>
  //         <dt className="slds-dl_horizontal__label">Role:</dt>
  //         <dd className="slds-dl_horizontal__detail"></dd>
  //       </dl>

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
    if (!this.state.userInfo && this.props.userInfoId) {
        requestUserInfo(this.props.userInfoId).then(userInfo => {
          if (userInfo.totalSize == 1) {
            this.setState({userInfo: userInfo.records[0]});
          } else {
            console.error("userInfo total size: " + userInfo.totalSize);
          }
        });
    }
    let userInfoParsed = this.state.userInfo ? this.createContext(this.state.userInfo) : "";
    return (
      <div id="tab-default-1" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide') } role="tabpanel" aria-labelledby="tab-default-1__item">
        {userInfoParsed}
      </div>
    );
  }
}

export default ContextTab;
