import React, { Component } from 'react';
import * as LCC from 'lightning-container';

class RemoteActionsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false}

    this.handleAccountQueryResponse = this.handleAccountQueryResponse.bind(this);
    this.getUserInfo();
  }

  getUserInfo() {
    LCC.callApex("QuickStartAppController.getAllAccounts",
                 "", this.handleAccountQueryResponse,
                 {escape: true});
  }

  handleAccountQueryResponse(result, event) {
    if (event.status) {
      // The apex returns a json object but all quotes are returned as &quot;
      let parse = result.replace(new RegExp("(&quot;)", 'g'), '"');
      console.log(parse);
      let json_result = JSON.parse(parse);
      this.setState({accounts: json_result});
      console.log("===== top.userInfo: " + parse  + "\n===== top.userInfoId: " + this.state.userInfoId)
    }
    else if (event.type === "exception") {
      console.log(event.message + " : " + event.where);
    }
  }
  
  createAccounts(accounts) {
    if (accounts === undefined) {
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
                <div className="slds-truncate" title="Account Number">Account Number</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Annual Revenue">Annual Revenue</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Industry">Industry</div>
              </th>
            </tr>
          </thead>
          <tbody>
            { accounts.map((account, index) => (
              <tr className="slds-hint-parent">
                <th scope="row">
                  <div className="slds-truncate" title={account['Name']}>{account['Name']}</div>
                </th>
                <th scope="row">
                  <div className="slds-truncate" title={account['AccountNumber']}>{account['AccountNumber']}</div>
                </th>
                <td>
                  <div className="slds-truncate" title={account['AnnualRevenue']}>{account['AnnualRevenue']}</div>
                </td>
                <td>
                  <div className="slds-truncate" title={account['Industry']}>{account['Industry']}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let listAllAccounts = this.createAccounts(this.state.accounts);
    return (
      <div id="tab-default-3" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide') } role="tabpanel" aria-labelledby="tab-default-3__item">
        {listAllAccounts}
      </div>
    );
  }
}

export default RemoteActionsTab;