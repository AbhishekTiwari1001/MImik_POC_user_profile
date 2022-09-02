import { render, screen } from '@testing-library/react';
import Table from '../components/Table'

const props ={
    data: {
            name: 'Sample Name'
        }
}

test('renders table component', () => {
  render(<Table {...props}/>);
  const linkElement = screen.getByText(/Sample Name/i);
  expect(linkElement).toBeInTheDocument();
});
