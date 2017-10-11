import React, {Component} from 'react';

class TabPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    }
  }

  toggleTab () {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    return (
      <div className={'slds-section ' + (this.state.isActive ? 'slds-is-open' : '')}>
        <h3 className="slds-section__title">
          <button aria-controls="expando-unique-id" aria-expanded="true" className="slds-button slds-section__title-action" onClick={() => this.toggleTab()}>
            <svg className="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
              <use xlinkHref="/utility-sprite/svg/symbols.svg#switch"></use>
            </svg>
            <span className="slds-truncate" title={this.props.title}>{this.props.title}</span>
          </button>
        </h3>
        <div aria-hidden="false" className="slds-section__content" id="expando-unique-id">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default TabPanel;