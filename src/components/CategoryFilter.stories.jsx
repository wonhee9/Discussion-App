import CategoryFilter from './CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  argTypes: {
    onCategoryChange: { action: 'categoryChanged' },
  },
};

const Template = (args) => <CategoryFilter {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: ['react', 'redux', 'vite', 'javascript'],
  selectedCategory: '',
};

export const SelectedReact = Template.bind({});
SelectedReact.args = {
  categories: ['react', 'redux', 'vite', 'javascript'],
  selectedCategory: 'react',
};
