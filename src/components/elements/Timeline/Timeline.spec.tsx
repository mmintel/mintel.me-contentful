import React from 'react';
import { render } from '@testing-library/react';
import Timeline from '.';

describe('Timeline', () => {
  it('renders without crashing', () => {
    const { container } = render(<Timeline />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Timeline>{text}</Timeline>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('wraps children', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item time="12">1</Timeline.Item>
        <Timeline.Item time="24">2</Timeline.Item>
      </Timeline>,
    );
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toEqual(2);
  });

  it('renders the time', () => {
    const { getByText } = render(
      <Timeline>
        <Timeline.Item time="12">1</Timeline.Item>
      </Timeline>,
    );
    const time = getByText('12');
    expect(time).toBeInTheDocument();
  });
});
