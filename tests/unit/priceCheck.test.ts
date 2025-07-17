import { shouldTrigger } from '../../src/utils/priceCheck';

describe('shouldTrigger', () => {
  it('should return true if price is ABOVE target', () => {
    expect(shouldTrigger('ABOVE', 100, 110)).toBe(true);
  });

  it('should return true if price is BELOW target', () => {
    expect(shouldTrigger('BELOW', 100, 90)).toBe(true);
  });

  it('should return false if price does not match direction', () => {
    expect(shouldTrigger('ABOVE', 100, 90)).toBe(false);
    expect(shouldTrigger('BELOW', 100, 110)).toBe(false);
  });
});
