import { query } from '@sigesa/shared';
import type { IndicatorStatus } from '@sigesa/shared';
import type { IndicatorStateQueryPort } from '../../ports/secondary.js';

export class RDSIndicatorStateQuery implements IndicatorStateQueryPort {
  async getCurrentState(indicatorId: string): Promise<IndicatorStatus | null> {
    const res = await query<{ current_state: IndicatorStatus }>(
      `SELECT current_state FROM indicator_current_view WHERE indicator_id = $1`,
      [indicatorId],
    );
    return res.rows[0]?.current_state ?? null;
  }
}
