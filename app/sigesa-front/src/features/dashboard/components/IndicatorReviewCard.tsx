'use client';

/**
 * IndicatorReviewCard — tarjeta de revisión de un Indicator para [TD].
 * Permite aprobar o rechazar. Muestra estado actual y última evidencia.
 * Solo activo si estado es SUBIDO o SUBSANADO.
 */
import { useState } from 'react';
import { useApproveIndicator } from '@/features/observations/hooks/useApproveIndicator';
import { RejectModal } from '@/features/observations/components/RejectModal';
import { EvidenceList } from '@/features/evidences/components/EvidenceList';
import { useEvidence } from '@/features/evidences/hooks/useEvidence';
import { StateBadge } from '@/shared/ui/StateBadge';
import { Button } from '@/shared/ui/Button';
import type { Indicator } from '@/domain/entities';

interface IndicatorReviewCardProps {
  indicator: Indicator;
}

export function IndicatorReviewCard({ indicator }: IndicatorReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const { data: evidenceData } = useEvidence(indicator.indicatorId);
  const latestEvidenceId = evidenceData?.evidences?.[0]?.evidenceId ?? '';

  const { mutate: approve, isPending: approving } = useApproveIndicator(
    indicator.indicatorId,
  );

  const canAct =
    indicator.currentState === 'SUBIDO' ||
    indicator.currentState === 'SUBSANADO';

  return (
    <>
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <span className="font-mono text-xs text-gray-400">{indicator.code}</span>
            <p className="text-sm font-medium text-gray-900">{indicator.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StateBadge state={indicator.currentState} />
            {canAct && (
              <>
                <Button
                  variant="primary"
                  loading={approving}
                  onClick={() => approve({})}
                >
                  Aprobar
                </Button>
                <Button
                  variant="danger"
                  disabled={!latestEvidenceId}
                  onClick={() => setShowRejectModal(true)}
                >
                  Rechazar
                </Button>
              </>
            )}
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="border-t p-4">
            <EvidenceList
              indicatorId={indicator.indicatorId}
              indicatorState={indicator.currentState}
            />
          </div>
        )}
      </div>

      {showRejectModal && latestEvidenceId && (
        <RejectModal
          indicatorId={indicator.indicatorId}
          evidenceId={latestEvidenceId}
          onClose={() => setShowRejectModal(false)}
        />
      )}
    </>
  );
}
