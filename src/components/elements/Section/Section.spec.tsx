import React from 'react';
import { render } from '@testing-library/react';
import Section from './Section';

describe('Section', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Section>{text}</Section>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Section>{text}</Section>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('assigns a small space', () => {
    const text = 'Test';
    const { container } = render(<Section spacing="small">{text}</Section>);
    const node = container.firstChild as HTMLElement;
    expect(node.classList).toContain('my-8');
  });

  it('assigns a medium space', () => {
    const text = 'Test';
    const { container } = render(<Section spacing="medium">{text}</Section>);
    const node = container.firstChild as HTMLElement;
    expect(node.classList).toContain('my-12');
  });

  it('assigns a large space', () => {
    const text = 'Test';
    const { container } = render(<Section spacing="large">{text}</Section>);
    const node = container.firstChild as HTMLElement;
    expect(node.classList).toContain('my-16');
  });
});
