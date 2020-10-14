import React from 'react';
import { render } from '@testing-library/react';
import faker from 'faker';
import Image from './Image';

describe('Image', () => {
  it('renders without crashing', () => {
    const { container } = render(<Image src="foo" />);
    expect(container).toBeInTheDocument();
  });

  it('passes source to image', () => {
    const mockSrc = 'foo';
    const { container } = render(<Image src={mockSrc} />);
    const img = container.firstChild as HTMLImageElement;
    expect(img.getAttribute('src')).toEqual(mockSrc);
  });

  it('appends a width to source', () => {
    const mockSrc = 'foo';
    const mockWidth = faker.random.number();
    const { container } = render(<Image src={mockSrc} width={mockWidth} />);
    const img = container.firstChild as HTMLImageElement;
    expect(img.getAttribute('src')).toContain(`?w=${mockWidth}`);
  });

  it('appends a height to source', () => {
    const mockSrc = 'foo';
    const mockHeight = faker.random.number();
    const { container } = render(<Image src={mockSrc} height={mockHeight} />);
    const img = container.firstChild as HTMLImageElement;
    expect(img.getAttribute('src')).toContain(`?h=${mockHeight}`);
  });

  it('appends width and height to source', () => {
    const mockSrc = 'foo';
    const mockWidth = faker.random.number();
    const mockHeight = faker.random.number();
    const { container } = render(
      <Image src={mockSrc} width={mockWidth} height={mockHeight} />,
    );
    const img = container.firstChild as HTMLImageElement;
    expect(img.getAttribute('src')).toContain(`h=${mockHeight}`);
    expect(img.getAttribute('src')).toContain(`w=${mockWidth}`);
  });
});
