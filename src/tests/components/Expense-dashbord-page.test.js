import React from 'react';
import { shallow } from 'enzyme';
import ExpensDashbordPage from '../../components/expense-dashbord-page';

test('should render Header correctly', () => {
  const wrapper = shallow(<ExpensDashbordPage />);
  expect(wrapper).toMatchSnapshot();
})