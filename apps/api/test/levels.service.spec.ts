import { LevelsService } from '../src/levels/levels.service';

describe('LevelsService.computeL1ToL2', () => {
  it('returns remaining requirements when thresholds not met', () => {
    const result = LevelsService.computeL1ToL2(5, 1, 50, 5);
    expect(result.currentLevel).toBe(1);
    expect(result.nextLevel).toBe(2);
    expect(result.remainingMessage).toContain('45');
  });

  it('unlocks level 2 when requirements met', () => {
    const result = LevelsService.computeL1ToL2(50, 5, 50, 5);
    expect(result.currentLevel).toBe(2);
    expect(result.nextLevel).toBe(3);
  });
});
