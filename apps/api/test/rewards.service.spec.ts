import { RewardsService } from '../src/rewards/rewards.service';

describe('RewardsService', () => {
  it('computes balance from immutable ledger entries', async () => {
    const service = new RewardsService({
      query: jest.fn().mockResolvedValue({
        rows: [
          { credits_delta: 5, event_type: 'video_complete' },
          { credits_delta: 10, event_type: 'quiz_pass' }
        ]
      })
    } as any);

    const result = await service.getLedger('u1');
    expect(result.balance).toBe(15);
    expect(result.entries).toHaveLength(2);
  });
});
