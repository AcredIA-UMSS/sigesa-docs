export interface PhaseAggregate {
  approved: number;
  total: number;
}

export function canClosePhase(agg: PhaseAggregate): boolean {
  return agg.total > 0 && agg.approved === agg.total;
}
