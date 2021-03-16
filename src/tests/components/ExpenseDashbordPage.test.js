import React from 'react';
import { shallow } from 'enzyme';
import ExpensDashbordPage from '../../components/ExpenseDashbordPage';

test('should render Header correctly', () => {
  const wrapper = shallow(<ExpensDashbordPage />);
  expect(wrapper).toMatchSnapshot();
})