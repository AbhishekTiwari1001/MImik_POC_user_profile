import { render, screen } from '@testing-library/react';
import Form from '../components/Form';

const props = {
    fields:[{
        name: 'name',
        label: 'label',
        required: false
        
    }], 
    userDetails:[], 
    onChange:jest.fn(), 
    fieldsError:[],
}
test('renders form component', () => {
  render(<Form {...props}/>);
  const linkElement = screen.getByTestId(/outlined-basic/i);
  expect(linkElement).toBeInTheDocument();
});
