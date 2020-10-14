import React from 'react';
import { render } from '@testing-library/react';
import Markdown from './Markdown';

describe('Markdown', () => {
  it('renders without crashing', () => {
    const { container } = render(<Markdown />);
    expect(container).toBeInTheDocument();
  });

  it('converts markdown to html', () => {
    const { container } = render(<Markdown source="hello **this is bold**" />);
    expect(container.innerHTML).toContain('<strong>this is bold</strong>');
  });

  describe('custom renderers', () => {
    it('uses the Link renderer', () => {
      const { container } = render(
        <Markdown source="hello [this is a link](foo)" />,
      );
      expect(container.innerHTML).toContain('class');
    });

    it('uses the emphasis renderer', () => {
      const { container } = render(<Markdown source="hello *foo*" />);
      expect(container.innerHTML).toContain('class');
    });
  });
});
