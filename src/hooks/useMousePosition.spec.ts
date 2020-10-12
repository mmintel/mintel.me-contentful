import { renderHook, act } from '@testing-library/react-hooks';
import { useMousePosition } from './useMousePosition';
import faker from 'faker';

describe('useMousePosition', () => {
  it('returns a default position', async () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current.x).toEqual(0);
    expect(result.current.y).toBe(0);
  });

  it('returns current mouse position', async () => {
    const { result } = renderHook(() => useMousePosition());
    const mockPosition = {
      screenX: faker.random.number(),
      screenY: faker.random.number(),
    };

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', mockPosition));
    });

    expect(result.current.x).toEqual(mockPosition.screenX);
    expect(result.current.y).toBe(mockPosition.screenY);
  });
});
