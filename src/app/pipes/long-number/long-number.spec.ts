import { LongNumberPipe } from './long-number.pipe';

describe('LongNumberPipe', () => {
  let longNumber: any;

  beforeEach(() => {
    longNumber = new LongNumberPipe('en');
  });

  it('should delegate to DecimalPipe if length <= 9', () => {
    expect(longNumber.transform(1234, '1.0-3')).toBe('1,234');
  });

  it('should delegate to toExponential if length > 9', () => {
    expect(longNumber.transform(1000000000, '1.0-3')).toBe('1.00e+9');
  });
});
