import React from 'react';
import { VideoPage } from '../components/features/videoPage/VideoPage';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'VideoPage',
    component: VideoPage,
  } as Meta;
  
  const Template: Story<any> = (args) => <VideoPage {...args} />;

  export const VideoMain = Template.bind({});
