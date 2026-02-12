/**
 * My Performance Component
 * Displays individual performance metrics focused on work completed
 */

import { useState } from 'react';
import {
  DxcFlex,
  DxcContainer,
  DxcTypography,
  DxcButton,
  DxcBadge,
  DxcDialog
} from '@dxc-technology/halstack-react';
import { ClaimStatus } from '../../types/claim.types';

const MyPerformance = ({ claims, user }) => {
  const [showClosedClaims, setShowClosedClaims] = useState(false);

  // Calculate yesterday's date range
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const yesterdayEnd = new Date(yesterday);
  yesterdayEnd.setHours(23, 59, 59, 999);

  // Calculate metrics for yesterday
  const yesterdayMetrics = (() => {
    // Mock hours worked (in real app, would come from time tracking system)
    const hoursWorked = 7.5;
    const rollingAverage = 7.8;

    // Cases closed yesterday
    const closedYesterday = claims?.filter(c => {
      if (c.status !== ClaimStatus.CLOSED && c.status !== ClaimStatus.DENIED) return false;
      const closedDate = new Date(c.closedAt || c.updatedAt);
      const isYesterday = closedDate >= yesterday && closedDate <= yesterdayEnd;

      // Filter by user if available
      if (user && c.assignedTo) {
        return isYesterday && (c.assignedTo === user.name || c.assignedTo === user.id);
      }
      return isYesterday;
    }) || [];

    // Activities completed yesterday (mock data - would come from activity log)
    // In production, this would aggregate: calls, emails, letters, indexing, notes, approvals, etc.
    const activitiesCompleted = 42;

    // Activity utilization
    const activitiesPerHour = hoursWorked > 0 ? (activitiesCompleted / hoursWorked).toFixed(1) : 0;
    const utilizationPercent = hoursWorked > 0 ? Math.round((activitiesCompleted / (hoursWorked * 10)) * 100) : 0;

    return {
      hoursWorked,
      rollingAverage,
      casesClosedCount: closedYesterday.length,
      closedClaims: closedYesterday,
      activitiesCompleted,
      activitiesPerHour,
      utilizationPercent
    };
  })();

  // Format hours comparison
  const hoursComparison = yesterdayMetrics.hoursWorked - yesterdayMetrics.rollingAverage;
  const hoursComparisonText = hoursComparison >= 0
    ? `+${hoursComparison.toFixed(1)}h vs avg`
    : `${hoursComparison.toFixed(1)}h vs avg`;
  const hoursComparisonColor = hoursComparison >= 0 ? 'var(--color-fg-success-medium)' : 'var(--color-fg-error-medium)';

  return (
    <>
      <DxcContainer
        padding="var(--spacing-padding-m)"
        style={{
          backgroundColor: 'var(--color-bg-neutral-lightest)',
          borderRadius: 'var(--border-radius-m)',
          boxShadow: 'var(--shadow-mid-04)'
        }}
      >
        <DxcFlex direction="column" gap="var(--spacing-gap-m)">
          {/* Section Title */}
          <DxcFlex justifyContent="space-between" alignItems="center">
            <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">
              My Performance
            </DxcTypography>
            <DxcBadge label="Yesterday" mode="contextual" color="neutral" />
          </DxcFlex>

          {/* Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spacing-gap-m)'
          }}>
            {/* Hours Worked */}
            <DxcContainer
              padding="var(--spacing-padding-m)"
              style={{ backgroundColor: 'var(--color-bg-info-lighter)' }}
            >
              <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                <DxcTypography fontSize="11px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                  HOURS WORKED
                </DxcTypography>
                <DxcTypography fontSize="36px" fontWeight="font-weight-bold" color="#000000">
                  {yesterdayMetrics.hoursWorked}
                </DxcTypography>
                <DxcTypography fontSize="12px" color={hoursComparisonColor}>
                  {hoursComparisonText}
                </DxcTypography>
              </DxcFlex>
            </DxcContainer>

            {/* Cases Closed */}
            <DxcContainer
              padding="var(--spacing-padding-m)"
              style={{ backgroundColor: 'var(--color-bg-success-lighter)', cursor: yesterdayMetrics.casesClosedCount > 0 ? 'pointer' : 'default' }}
              onClick={() => yesterdayMetrics.casesClosedCount > 0 && setShowClosedClaims(true)}
            >
              <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                <DxcTypography fontSize="11px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                  CASES CLOSED
                </DxcTypography>
                <DxcTypography fontSize="36px" fontWeight="font-weight-bold" color="#000000">
                  {yesterdayMetrics.casesClosedCount}
                </DxcTypography>
                {yesterdayMetrics.casesClosedCount > 0 && (
                  <DxcTypography fontSize="12px" color="var(--color-fg-info-medium)">
                    Click to view →
                  </DxcTypography>
                )}
              </DxcFlex>
            </DxcContainer>

            {/* Activities Completed */}
            <DxcContainer
              padding="var(--spacing-padding-m)"
              style={{ backgroundColor: 'var(--color-bg-warning-lighter)' }}
            >
              <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                <DxcTypography fontSize="11px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                  ACTIVITIES COMPLETED
                </DxcTypography>
                <DxcTypography fontSize="36px" fontWeight="font-weight-bold" color="#000000">
                  {yesterdayMetrics.activitiesCompleted}
                </DxcTypography>
                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-strong)">
                  Calls, emails, notes, etc.
                </DxcTypography>
              </DxcFlex>
            </DxcContainer>

            {/* Activity Utilization */}
            <DxcContainer
              padding="var(--spacing-padding-m)"
              style={{
                backgroundColor: yesterdayMetrics.utilizationPercent >= 80
                  ? 'var(--color-bg-success-lighter)'
                  : yesterdayMetrics.utilizationPercent >= 60
                  ? 'var(--color-bg-warning-lighter)'
                  : 'var(--color-bg-error-lighter)'
              }}
            >
              <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                <DxcTypography fontSize="11px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                  ACTIVITY UTILIZATION
                </DxcTypography>
                <DxcTypography fontSize="36px" fontWeight="font-weight-bold" color="#000000">
                  {yesterdayMetrics.utilizationPercent}%
                </DxcTypography>
                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-strong)">
                  {yesterdayMetrics.activitiesPerHour} activities/hour
                </DxcTypography>
              </DxcFlex>
            </DxcContainer>
          </div>

          {/* Info Note */}
          <DxcTypography fontSize="11px" color="var(--color-fg-neutral-dark)" style={{ fontStyle: 'italic' }}>
            📊 Performance data is calculated based on yesterday's activity. Activity utilization target: ≥80%
          </DxcTypography>
        </DxcFlex>
      </DxcContainer>

      {/* Closed Claims Dialog */}
      {showClosedClaims && (
        <DxcDialog onCloseIconClick={() => setShowClosedClaims(false)}>
          <DxcFlex direction="column" gap="var(--spacing-gap-m)">
            <DxcTypography fontSize="font-scale-04" fontWeight="font-weight-bold">
              Cases Closed Yesterday
            </DxcTypography>

            {yesterdayMetrics.closedClaims.length > 0 ? (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000000', textAlign: 'left' }}>
                      <th style={{ padding: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                        Claim Number
                      </th>
                      <th style={{ padding: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                        Claimant
                      </th>
                      <th style={{ padding: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                        Type
                      </th>
                      <th style={{ padding: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                        Closed At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yesterdayMetrics.closedClaims.map((claim, index) => (
                      <tr
                        key={claim.claimNumber || index}
                        style={{
                          borderBottom: '1px solid var(--border-color-neutral-lighter)',
                          backgroundColor: index % 2 === 0 ? '#fff' : 'var(--color-bg-neutral-lighter)'
                        }}
                      >
                        <td style={{ padding: '8px' }}>
                          <DxcTypography fontSize="font-scale-02" fontWeight="font-weight-semibold">
                            {claim.claimNumber || claim.fnolNumber}
                          </DxcTypography>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <DxcTypography fontSize="font-scale-02">
                            {claim.claimant?.name || claim.insured?.name || 'N/A'}
                          </DxcTypography>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <DxcTypography fontSize="font-scale-02">{claim.type}</DxcTypography>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <DxcTypography fontSize="font-scale-02">
                            {new Date(claim.closedAt || claim.updatedAt).toLocaleString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </DxcTypography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <DxcTypography>No cases closed yesterday.</DxcTypography>
            )}

            <DxcFlex justifyContent="flex-end">
              <DxcButton
                label="Close"
                mode="secondary"
                onClick={() => setShowClosedClaims(false)}
              />
            </DxcFlex>
          </DxcFlex>
        </DxcDialog>
      )}
    </>
  );
};

export default MyPerformance;
