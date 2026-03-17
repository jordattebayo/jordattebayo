import { isRateLimited } from '../src/lib/server/rate-limit';

describe('isRateLimited', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('first request is not limited', () => {
    expect(isRateLimited('rl-first', 3, 60_000)).toBe(false);
  });

  test('allows up to maxRequests within window', () => {
    const key = 'rl-max';
    expect(isRateLimited(key, 3, 60_000)).toBe(false); // 1
    expect(isRateLimited(key, 3, 60_000)).toBe(false); // 2
    expect(isRateLimited(key, 3, 60_000)).toBe(false); // 3
    expect(isRateLimited(key, 3, 60_000)).toBe(true);  // 4 -> blocked
  });

  test('resets after window expires', () => {
    const key = 'rl-reset';
    expect(isRateLimited(key, 1, 1000)).toBe(false);
    expect(isRateLimited(key, 1, 1000)).toBe(true);

    vi.advanceTimersByTime(1001);
    expect(isRateLimited(key, 1, 1000)).toBe(false);
  });

  test('different keys are independent', () => {
    expect(isRateLimited('rl-a', 1, 60_000)).toBe(false);
    expect(isRateLimited('rl-a', 1, 60_000)).toBe(true);
    expect(isRateLimited('rl-b', 1, 60_000)).toBe(false);
  });
});
