import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import fetch from 'isomorphic-fetch';


describe('Component: App', () => {

  it('renders without crashing', () => {
    shallow(<App />);
  });
  
  it('renders addition features after loading content', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({isLoadedContent: true});
    
    expect(wrapper.find('.extra-features')).toHaveLength(1);
  });
  
  it('does not render additional features without loaded content', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({isLoadedContent: false});
    
    expect(wrapper.find('.extra-features')).toHaveLength(0);
  });

  it('input state to change based on input field', () => {
    const wrapper = shallow(<App />);
    const airbnb = "https://www.airbnb.com.au/users/show/99824610 ";
    
    wrapper.find('#input-field').simulate('change', {target: {value: airbnb }});
    
    expect(wrapper.state().input).toMatch(airbnb);
  });
  
  it('should not load content given invalid url', () => {
    const wrapper = shallow(<App />);
    const invalidUrl = "https://www.steve.com.au/users/show/99824610 ";

    wrapper.find('#input-field').simulate('change', {target: {value: invalidUrl }});
    wrapper.find('#load-btn').simulate('click');
    
    expect(wrapper.state().loadedContent).toBeFalsy();
  });

  
  
});

