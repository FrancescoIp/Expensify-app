import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/not-found';

test('should render Header correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
})