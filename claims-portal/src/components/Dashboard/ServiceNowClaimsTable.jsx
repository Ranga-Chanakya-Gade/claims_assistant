/**
 * ServiceNow Claims Table Component
 * Displays FNOL claims from ServiceNow with OAuth connection management
 */

import {
  DxcFlex,
  DxcContainer,
  DxcTypography,
  DxcButton,
  DxcBadge,
  DxcSpinner,
  DxcAlert
} from '@dxc-technology/halstack-react';
import { ClaimStatus } from '../../types/claim.types';
import serviceNowService from '../../services/api/serviceNowService';

const ServiceNowClaimsTable = ({
  snowClaims,
  snowLoading,
  snowError,
  snowConnected,
  onClaimSelect,
  onRetry,
  onDisconnect
}) => {
  // Helper function to map claim status to badge color
  const getStatusColor = (status) => {
    switch (status) {
      case ClaimStatus.NEW:
        return 'info';
      case ClaimStatus.UNDER_REVIEW:
        return 'warning';
      case ClaimStatus.APPROVED:
        return 'success';
      case ClaimStatus.DENIED:
        return 'error';
      case ClaimStatus.CLOSED:
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <DxcContainer
      padding="var(--spacing-padding-m)"
      style={{
        backgroundColor: 'var(--color-bg-neutral-lightest)',
        borderRadius: 'var(--border-radius-m)',
        boxShadow: 'var(--shadow-mid-04)'
      }}
    >
      <DxcFlex direction="column" gap="var(--spacing-gap-m)">
        {/* Header */}
        <DxcFlex justifyContent="space-between" alignItems="center">
          <DxcFlex gap="var(--spacing-gap-s)" alignItems="center">
            <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">
              ServiceNow FNOL Claims
            </DxcTypography>
            {snowConnected && <DxcBadge label={String(snowClaims.length)} notificationBadge />}
          </DxcFlex>
          <DxcFlex gap="var(--spacing-gap-s)" alignItems="center">
            {snowLoading && (
              <DxcSpinner label="Loading..." mode="small" />
            )}
            {serviceNowService.useOAuth && (
              snowConnected ? (
                <DxcButton
                  label="Disconnect"
                  mode="tertiary"
                  icon="link_off"
                  size="small"
                  onClick={onDisconnect}
                />
              ) : (
                <DxcButton
                  label="Connect to ServiceNow"
                  mode="secondary"
                  icon="link"
                  onClick={() => serviceNowService.startOAuthLogin()}
                />
              )
            )}
          </DxcFlex>
        </DxcFlex>

        {/* Error State */}
        {snowError ? (
          <DxcAlert
            type="error"
            inlineText={snowError}
            size="fillParent"
            closable
            onClose={() => {}}
          >
            <DxcButton
              label="Retry"
              mode="secondary"
              size="small"
              icon="refresh"
              onClick={onRetry}
            />
          </DxcAlert>
        ) : !snowConnected && serviceNowService.useOAuth ? (
          /* Not Connected State */
          <DxcContainer
            padding="var(--spacing-padding-m)"
            style={{
              backgroundColor: 'var(--color-bg-neutral-lighter)',
              borderRadius: 'var(--border-radius-m)'
            }}
          >
            <DxcFlex direction="column" gap="var(--spacing-gap-s)" alignItems="center">
              <DxcTypography fontSize="font-scale-03" color="var(--color-fg-neutral-dark)">
                Connect to ServiceNow to view FNOL claims from the global domain.
              </DxcTypography>
            </DxcFlex>
          </DxcContainer>
        ) : snowClaims.length === 0 && !snowLoading ? (
          /* Empty State */
          <DxcContainer
            padding="var(--spacing-padding-m)"
            style={{ backgroundColor: 'var(--color-bg-neutral-lighter)' }}
          >
            <DxcTypography fontSize="font-scale-03" color="var(--color-fg-neutral-dark)">
              No ServiceNow FNOL records found. Check your ServiceNow connection configuration.
            </DxcTypography>
          </DxcContainer>
        ) : (
          /* Claims Table */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #000000', textAlign: 'left' }}>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    FNOL Number
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Insured
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Claimant
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Policy
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Opened
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    color: 'var(--color-fg-neutral-stronger)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {snowClaims.map((claim, index) => (
                  <tr
                    key={claim.sysId || index}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open claim ${claim.fnolNumber || claim.claimNumber} for ${claim.insured?.name || claim.claimant?.name}`}
                    style={{
                      borderBottom: '1px solid var(--border-color-neutral-lighter)',
                      cursor: 'pointer',
                      backgroundColor: index % 2 === 0
                        ? 'var(--color-bg-neutral-lightest)'
                        : 'var(--color-bg-neutral-lighter)'
                    }}
                    onClick={() => onClaimSelect(claim)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClaimSelect(claim);
                      }
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-neutral-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0
                      ? 'var(--color-bg-neutral-lightest)'
                      : 'var(--color-bg-neutral-lighter)'}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold" color="#000000">
                        {claim.fnolNumber || claim.claimNumber || 'N/A'}
                      </DxcTypography>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <DxcBadge
                        label={claim.status || 'unknown'}
                        mode="contextual"
                        color={getStatusColor(claim.status)}
                      />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <DxcTypography fontSize="font-scale-03">
                        {claim.insured?.name || 'N/A'}
                      </DxcTypography>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <DxcTypography fontSize="font-scale-03">
                        {claim.claimant?.name || 'N/A'}
                      </DxcTypography>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <DxcTypography fontSize="font-scale-03">
                        {claim.policy?.policyNumber || 'N/A'}
                      </DxcTypography>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                        {claim.createdAt
                          ? new Date(claim.createdAt).toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric'
                            })
                          : 'N/A'}
                      </DxcTypography>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <DxcFlex gap="var(--spacing-gap-xs)">
                        <DxcButton
                          icon="open_in_new"
                          mode="tertiary"
                          size="small"
                          title="Open Claim"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClaimSelect(claim);
                          }}
                        />
                      </DxcFlex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DxcFlex>
    </DxcContainer>
  );
};

export default ServiceNowClaimsTable;
