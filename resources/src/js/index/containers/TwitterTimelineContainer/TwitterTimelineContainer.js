import React from 'react';
import {Timeline} from 'react-twitter-widgets';

class TwitterTimelineContainer extends React.Component {
  render() {
    return <div className="TwitterTimelineContainer">
      <Timeline
        dataSource={{
          sourceType: 'widget',
          widgetId: '900053403086209024'
        }}
      />
    </div>;
  }
}

export { TwitterTimelineContainer }
