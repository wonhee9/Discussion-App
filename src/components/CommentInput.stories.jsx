import { MemoryRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    addComment: { action: 'commentAdded' },
  },
};

const Template = (args) => <CommentInput {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  authUser: null,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authUser: {
    id: 'user-123',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
};
