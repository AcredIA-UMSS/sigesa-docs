import type { IndicatorState } from '@/domain/entities';
import { STATE_BADGE } from '@/shared/utils/stateColors';

interface StateBadgeProps {
  state: IndicatorState;
}

export function StateBadge({ state }: StateBadgeProps) {
  const { label, className } = STATE_BADGE[state];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
