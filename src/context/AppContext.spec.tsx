import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AppProvider, useApp } from './AppContext';
import { createSite } from '@/core/fixtures/createSite';

describe('AppContext', () => {
  describe('useApp', () => {
    it('throws an error if not used within AppProvider', () => {
      const { result } = renderHook(() => useApp());
      expect(result.error).toBeDefined();
    });

    it('returns the provided data', () => {
      const mockSite = createSite();
      const wrapper: React.FC<{
        children: React.ReactNode;
      }> = ({ children }) => (
        <AppProvider site={mockSite}>{children}</AppProvider>
      );
      const { result } = renderHook(() => useApp(), { wrapper });
      expect(result.current.site).toEqual(mockSite);
    });
  });
});
