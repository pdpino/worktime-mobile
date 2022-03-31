import React from 'react';
import Collapsible from 'react-native-collapsible';

export default function asCollapsible(
  OuterComponent,
  FixedComponent,
  CollapsibleComponent,
  startCollapsed = true,
) {
  class AsCollapsible extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isCollapsed: startCollapsed,
      };
    }

    toggleCollapse = () => {
      this.setState(({ isCollapsed }) => ({
        isCollapsed: !isCollapsed,
      }));
    }

    render() {
      const { isCollapsed } = this.state;

      return (
        <OuterComponent
          {...this.props}
        >
          <FixedComponent
            {...this.props}
            isCollapsed={isCollapsed}
            toggleCollapse={this.toggleCollapse}
          />
          <Collapsible collapsed={isCollapsed}>
            <CollapsibleComponent
              {...this.props}
              isCollapsed={isCollapsed}
            />
          </Collapsible>
        </OuterComponent>
      );
    }
  }

  return AsCollapsible;
}
