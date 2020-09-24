import React from 'react';
import { VideoPage } from '../components/features/videoPage/VideoPage';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'VideoPage',
    component: VideoPage,
  } as Meta;
  
  const Template: Story<any> = (args) => <VideoPage {...args} />;

  export const VideoMain = Template.bind({});
