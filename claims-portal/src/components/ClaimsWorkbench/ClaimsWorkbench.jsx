import { useState } from 'react';
import {
  DxcHeading,
  DxcFlex,
  DxcContainer,
  DxcTypography,
  DxcButton,
  DxcBadge,
  DxcTabs,
  DxcInset,
  DxcProgressBar,
  DxcAlert
} from '@dxc-technology/halstack-react';
import './ClaimsWorkbench.css';

const ClaimsWorkbench = ({ claim }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!claim) {
    return (
      <DxcContainer
        padding="var(--spacing-padding-xl)"
        background={{ color: "var(--color-bg-secondary-lightest)" }}
        width="100%"
      >
        <DxcAlert
          type="info"
          inlineText="Please select a claim from the dashboard to view details."
        />
      </DxcContainer>
    );
  }

  // Mock financial data
  const financialData = {
    totalClaimAmount: 500000,
    reserves: {
      initial: 500000,
      current: 495000,
      paid: 5000,
      outstanding: 495000
    },
    payments: [
      {
        id: 'PMT-001',
        date: '01/10/2026',
        payee: 'Jane Smith',
        type: 'Partial Payment',
        amount: 5000,
        status: 'Paid',
        statusColor: 'success',
        method: 'ACH',
        checkNumber: 'ACH-2026-001'
      }
    ],
    pendingPayments: [
      {
        id: 'PMT-002',
        payee: 'Jane Smith',
        type: 'Final Payment',
        amount: 300000,
        status: 'Pending Approval',
        statusColor: 'warning',
        scheduledDate: '01/20/2026'
      },
      {
        id: 'PMT-003',
        payee: 'Michael Smith',
        type: 'Final Payment',
        amount: 195000,
        status: 'Pending Approval',
        statusColor: 'warning',
        scheduledDate: '01/20/2026'
      }
    ]
  };

  const policyDetails = {
    policyNumber: 'POL-2023-456789',
    insuredName: 'John Smith',
    policyType: 'Term Life Insurance',
    coverage: '$500,000',
    effectiveDate: '03/15/2020',
    expirationDate: '03/15/2030',
    premium: '$125/month'
  };

  const beneficiaries = [
    {
      name: 'Jane Smith',
      relationship: 'Spouse',
      percentage: '60%',
      amount: '$300,000',
      status: 'Verified'
    },
    {
      name: 'Michael Smith',
      relationship: 'Son',
      percentage: '40%',
      amount: '$200,000',
      status: 'Verified'
    }
  ];

  const timelineEvents = [
    {
      date: '01/10/2026 2:30 PM',
      event: 'Partial Payment Issued',
      user: 'Sarah Johnson',
      description: 'Expedited payment of $5,000 to cover funeral expenses'
    },
    {
      date: '01/08/2026 9:00 AM',
      event: 'Assigned to Examiner',
      user: 'System',
      description: 'Claim assigned to Sarah Johnson for review'
    },
    {
      date: '01/07/2026 2:45 PM',
      event: 'Requirements Generated',
      user: 'Rules Engine',
      description: '5 requirements generated based on policy type and state regulations'
    },
    {
      date: '01/07/2026 11:15 AM',
      event: 'Death Verification',
      user: 'LexisNexis Integration',
      description: 'Death verified via LexisNexis'
    },
    {
      date: '01/07/2026 10:30 AM',
      event: 'Claim Received',
      user: 'System',
      description: 'Claim automatically received via portal intake'
    }
  ];

  const requirements = [
    { name: 'Death Certificate', status: 'Received', date: '01/07/2026' },
    { name: 'Beneficiary ID Verification', status: 'Received', date: '01/07/2026' },
    { name: 'Claim Form', status: 'Received', date: '01/07/2026' },
    { name: 'Policy Verification', status: 'Completed', date: '01/08/2026' },
    { name: 'Fraud Check', status: 'Completed', date: '01/09/2026' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DxcContainer
      padding="var(--spacing-padding-l)"
      background={{ color: "var(--color-bg-secondary-lightest)" }}
      width="100%"
    >
      <DxcFlex direction="column" gap="var(--spacing-gap-m)">
        {/* Page Header */}
        <DxcFlex justifyContent="space-between" alignItems="flex-start">
          <DxcFlex direction="column" gap="var(--spacing-gap-xs)">
            <DxcHeading level={1} text={`Claim ${claim.id}`} />
            <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
              <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">
                {claim.name}
              </DxcTypography>
              <DxcBadge
                label={claim.status}
                mode="contextual"
                color={claim.statusColor}
              />
              <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                {claim.type}
              </DxcTypography>
            </DxcFlex>
          </DxcFlex>
          <DxcFlex gap="var(--spacing-gap-s)">
            <DxcButton label="Hold" mode="secondary" />
            <DxcButton label="Approve" mode="primary" />
            <DxcButton label="Deny" mode="secondary" />
          </DxcFlex>
        </DxcFlex>

        {/* Progress Card */}
        <DxcContainer
          padding="var(--spacing-padding-l)"
          background={{ color: "var(--color-bg-neutral-lightest)" }}
          borderRadius="var(--border-radius-m)"
          boxShadow="var(--shadow-mid-02)"
        >
          <DxcFlex direction="column" gap="var(--spacing-gap-m)">
            <DxcHeading level={3} text="Claim Progress" />
            <DxcProgressBar
              label="Overall Completion"
              value={85}
              showValue
            />
            <DxcFlex gap="var(--spacing-gap-xl)">
              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-stronger)">
                  SLA DAYS REMAINING
                </DxcTypography>
                <DxcTypography fontSize="32px" fontWeight="font-weight-semibold" color="var(--color-fg-success-medium)">
                  8
                </DxcTypography>
              </DxcFlex>
              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-stronger)">
                  TARGET CLOSE DATE
                </DxcTypography>
                <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">
                  01/20/2026
                </DxcTypography>
              </DxcFlex>
              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-stronger)">
                  FASTTRACK ELIGIBLE
                </DxcTypography>
                <DxcTypography fontSize="16px" fontWeight="font-weight-semibold" color="var(--color-fg-success-medium)">
                  Yes
                </DxcTypography>
              </DxcFlex>
            </DxcFlex>
          </DxcFlex>
        </DxcContainer>

        {/* Tabs */}
        <DxcContainer
          background={{ color: "var(--color-bg-neutral-lightest)" }}
          borderRadius="var(--border-radius-m)"
          boxShadow="var(--shadow-mid-02)"
        >
          <DxcFlex direction="column">
            <DxcInset space="var(--spacing-padding-l)" top>
              <DxcTabs iconPosition="left">
                <DxcTabs.Tab
                  label="Financials"
                  icon="payments"
                  active={activeTab === 0}
                  onClick={() => setActiveTab(0)}
                >
                  <div />
                </DxcTabs.Tab>
                <DxcTabs.Tab
                  label="Policy 360"
                  icon="policy"
                  active={activeTab === 1}
                  onClick={() => setActiveTab(1)}
                >
                  <div />
                </DxcTabs.Tab>
                <DxcTabs.Tab
                  label="Timeline"
                  icon="timeline"
                  active={activeTab === 2}
                  onClick={() => setActiveTab(2)}
                >
                  <div />
                </DxcTabs.Tab>
                <DxcTabs.Tab
                  label="Requirements"
                  icon="checklist"
                  active={activeTab === 3}
                  onClick={() => setActiveTab(3)}
                >
                  <div />
                </DxcTabs.Tab>
              </DxcTabs>
            </DxcInset>

            <DxcInset space="var(--spacing-padding-l)">
              {/* Financials Tab */}
              {activeTab === 0 && (
                <DxcFlex direction="column" gap="var(--spacing-gap-l)">
                  {/* Reserve Summary */}
                  <DxcFlex gap="var(--spacing-gap-m)">
                    <DxcContainer
                      padding="var(--spacing-padding-m)"
                      background={{ color: "var(--color-bg-info-lighter)" }}
                      borderRadius="var(--border-radius-m)"
                      grow={1}
                    >
                      <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                        <DxcTypography fontSize="12px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                          TOTAL CLAIM AMOUNT
                        </DxcTypography>
                        <DxcTypography fontSize="32px" fontWeight="font-weight-semibold" color="var(--color-fg-info-medium)">
                          {formatCurrency(financialData.totalClaimAmount)}
                        </DxcTypography>
                      </DxcFlex>
                    </DxcContainer>
                    <DxcContainer
                      padding="var(--spacing-padding-m)"
                      background={{ color: "var(--color-bg-success-lighter)" }}
                      borderRadius="var(--border-radius-m)"
                      grow={1}
                    >
                      <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                        <DxcTypography fontSize="12px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                          TOTAL PAID
                        </DxcTypography>
                        <DxcTypography fontSize="32px" fontWeight="font-weight-semibold" color="var(--color-fg-success-medium)">
                          {formatCurrency(financialData.reserves.paid)}
                        </DxcTypography>
                      </DxcFlex>
                    </DxcContainer>
                    <DxcContainer
                      padding="var(--spacing-padding-m)"
                      background={{ color: "var(--color-bg-warning-lighter)" }}
                      borderRadius="var(--border-radius-m)"
                      grow={1}
                    >
                      <DxcFlex direction="column" gap="var(--spacing-gap-xs)" alignItems="center">
                        <DxcTypography fontSize="12px" fontWeight="font-weight-semibold" color="var(--color-fg-neutral-stronger)">
                          OUTSTANDING RESERVE
                        </DxcTypography>
                        <DxcTypography fontSize="32px" fontWeight="font-weight-semibold" color="var(--color-fg-warning-medium)">
                          {formatCurrency(financialData.reserves.outstanding)}
                        </DxcTypography>
                      </DxcFlex>
                    </DxcContainer>
                  </DxcFlex>

                  {/* Reserve Details */}
                  <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                    <DxcHeading level={4} text="Reserve History" />
                    <DxcContainer
                      padding="var(--spacing-padding-m)"
                      background={{ color: "var(--color-bg-neutral-lighter)" }}
                      border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                      borderRadius="var(--border-radius-m)"
                    >
                      <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                        <DxcFlex justifyContent="space-between">
                          <DxcTypography fontSize="font-scale-03">Initial Reserve Set</DxcTypography>
                          <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">
                            {formatCurrency(financialData.reserves.initial)}
                          </DxcTypography>
                        </DxcFlex>
                        <DxcFlex justifyContent="space-between">
                          <DxcTypography fontSize="font-scale-03">Payments Issued</DxcTypography>
                          <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold" color="var(--color-fg-error-medium)">
                            -{formatCurrency(financialData.reserves.paid)}
                          </DxcTypography>
                        </DxcFlex>
                        <div style={{ borderTop: "1px solid var(--border-color-neutral-light)", paddingTop: "var(--spacing-gap-s)" }}>
                          <DxcFlex justifyContent="space-between">
                            <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">Current Reserve</DxcTypography>
                            <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold" color="var(--color-fg-warning-medium)">
                              {formatCurrency(financialData.reserves.current)}
                            </DxcTypography>
                          </DxcFlex>
                        </div>
                      </DxcFlex>
                    </DxcContainer>
                  </DxcFlex>

                  {/* Payment History */}
                  <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                    <DxcHeading level={4} text="Payment History" />
                    {financialData.payments.map((payment, index) => (
                      <DxcContainer
                        key={index}
                        background={{ color: "var(--color-bg-neutral-lighter)" }}
                        border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                        borderRadius="var(--border-radius-m)"
                      >
                        <DxcInset space="var(--spacing-padding-m)">
                          <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                            <DxcFlex justifyContent="space-between" alignItems="center">
                              <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
                                <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold" color="var(--color-fg-secondary-medium)">
                                  {payment.id}
                                </DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.payee}</DxcTypography>
                                <DxcBadge label={payment.status} mode="contextual" color={payment.statusColor} />
                              </DxcFlex>
                              <DxcTypography fontSize="20px" fontWeight="font-weight-semibold" color="var(--color-fg-success-medium)">
                                {formatCurrency(payment.amount)}
                              </DxcTypography>
                            </DxcFlex>
                            <DxcFlex gap="var(--spacing-gap-l)">
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Payment Type</DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.type}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Date</DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.date}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Method</DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.method}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Reference</DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.checkNumber}</DxcTypography>
                              </DxcFlex>
                            </DxcFlex>
                          </DxcFlex>
                        </DxcInset>
                      </DxcContainer>
                    ))}
                  </DxcFlex>

                  {/* Pending Payments */}
                  <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                    <DxcFlex justifyContent="space-between" alignItems="center">
                      <DxcHeading level={4} text="Pending Payments" />
                      <DxcButton label="Schedule Payment" mode="primary" icon="add" />
                    </DxcFlex>
                    {financialData.pendingPayments.map((payment, index) => (
                      <DxcContainer
                        key={index}
                        background={{ color: "var(--color-bg-warning-lightest)" }}
                        border={{ color: "var(--border-color-warning-lighter)", style: "solid", width: "1px" }}
                        borderRadius="var(--border-radius-m)"
                      >
                        <DxcInset space="var(--spacing-padding-m)">
                          <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                            <DxcFlex justifyContent="space-between" alignItems="center">
                              <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
                                <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold" color="var(--color-fg-secondary-medium)">
                                  {payment.id}
                                </DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.payee}</DxcTypography>
                                <DxcBadge label={payment.status} mode="contextual" color={payment.statusColor} />
                              </DxcFlex>
                              <DxcTypography fontSize="20px" fontWeight="font-weight-semibold" color="var(--color-fg-warning-medium)">
                                {formatCurrency(payment.amount)}
                              </DxcTypography>
                            </DxcFlex>
                            <DxcFlex gap="var(--spacing-gap-l)" alignItems="center">
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Payment Type</DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.type}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Scheduled Date</DxcTypography>
                                <DxcTypography fontSize="font-scale-03">{payment.scheduledDate}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex gap="var(--spacing-gap-s)" style={{ marginLeft: "auto" }}>
                                <DxcButton label="Approve" mode="primary" size="small" />
                                <DxcButton label="Reject" mode="secondary" size="small" />
                              </DxcFlex>
                            </DxcFlex>
                          </DxcFlex>
                        </DxcInset>
                      </DxcContainer>
                    ))}
                  </DxcFlex>
                </DxcFlex>
              )}

              {/* Policy 360 Tab */}
              {activeTab === 1 && (
                <DxcFlex direction="column" gap="var(--spacing-gap-l)">
                  <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                    <DxcHeading level={4} text="Policy Details" />
                    <DxcContainer
                      padding="var(--spacing-padding-m)"
                      background={{ color: "var(--color-bg-neutral-lighter)" }}
                      border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                      borderRadius="var(--border-radius-m)"
                    >
                      <DxcFlex gap="var(--spacing-gap-xl)" wrap="wrap">
                        <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Policy Number</DxcTypography>
                          <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">{policyDetails.policyNumber}</DxcTypography>
                        </DxcFlex>
                        <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Insured Name</DxcTypography>
                          <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">{policyDetails.insuredName}</DxcTypography>
                        </DxcFlex>
                        <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Policy Type</DxcTypography>
                          <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">{policyDetails.policyType}</DxcTypography>
                        </DxcFlex>
                        <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Coverage</DxcTypography>
                          <DxcTypography fontSize="16px" fontWeight="font-weight-semibold" color="var(--color-fg-info-medium)">{policyDetails.coverage}</DxcTypography>
                        </DxcFlex>
                        <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Effective Date</DxcTypography>
                          <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">{policyDetails.effectiveDate}</DxcTypography>
                        </DxcFlex>
                        <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Premium</DxcTypography>
                          <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">{policyDetails.premium}</DxcTypography>
                        </DxcFlex>
                      </DxcFlex>
                    </DxcContainer>
                  </DxcFlex>

                  <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                    <DxcHeading level={4} text="Beneficiaries" />
                    {beneficiaries.map((ben, index) => (
                      <DxcContainer
                        key={index}
                        background={{ color: "var(--color-bg-neutral-lighter)" }}
                        border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                        borderRadius="var(--border-radius-m)"
                      >
                        <DxcInset space="var(--spacing-padding-m)">
                          <DxcFlex justifyContent="space-between" alignItems="center">
                            <DxcFlex gap="var(--spacing-gap-l)" alignItems="center">
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Name</DxcTypography>
                                <DxcTypography fontSize="16px" fontWeight="font-weight-semibold">{ben.name}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Relationship</DxcTypography>
                                <DxcTypography fontSize="16px">{ben.relationship}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Percentage</DxcTypography>
                                <DxcTypography fontSize="16px">{ben.percentage}</DxcTypography>
                              </DxcFlex>
                              <DxcFlex direction="column" gap="var(--spacing-gap-xxs)">
                                <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">Amount</DxcTypography>
                                <DxcTypography fontSize="20px" fontWeight="font-weight-semibold" color="var(--color-fg-success-medium)">{ben.amount}</DxcTypography>
                              </DxcFlex>
                              <DxcBadge label={ben.status} mode="contextual" color="success" />
                            </DxcFlex>
                          </DxcFlex>
                        </DxcInset>
                      </DxcContainer>
                    ))}
                  </DxcFlex>
                </DxcFlex>
              )}

              {/* Timeline Tab */}
              {activeTab === 2 && (
                <DxcFlex direction="column" gap="var(--spacing-gap-m)">
                  {timelineEvents.map((event, index) => (
                    <DxcContainer
                      key={index}
                      background={{ color: "var(--color-bg-neutral-lighter)" }}
                      border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                      borderRadius="var(--border-radius-m)"
                    >
                      <DxcInset space="var(--spacing-padding-m)">
                        <DxcFlex direction="column" gap="var(--spacing-gap-xs)">
                          <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
                            <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">
                              {event.event}
                            </DxcTypography>
                            <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                              {event.date}
                            </DxcTypography>
                          </DxcFlex>
                          <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                            by {event.user}
                          </DxcTypography>
                          <DxcTypography fontSize="font-scale-03">
                            {event.description}
                          </DxcTypography>
                        </DxcFlex>
                      </DxcInset>
                    </DxcContainer>
                  ))}
                </DxcFlex>
              )}

              {/* Requirements Tab */}
              {activeTab === 3 && (
                <DxcFlex direction="column" gap="var(--spacing-gap-s)">
                  {requirements.map((req, index) => (
                    <DxcContainer
                      key={index}
                      background={{ color: "var(--color-bg-neutral-lighter)" }}
                      border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                      borderRadius="var(--border-radius-m)"
                    >
                      <DxcInset space="var(--spacing-padding-m)">
                        <DxcFlex justifyContent="space-between" alignItems="center">
                          <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
                            <DxcTypography fontSize="font-scale-03" fontWeight="font-weight-semibold">
                              {req.name}
                            </DxcTypography>
                            <DxcBadge label={req.status} mode="contextual" color="success" />
                          </DxcFlex>
                          <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
                            <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                              {req.date}
                            </DxcTypography>
                            <DxcButton label="View" mode="tertiary" size="small" />
                          </DxcFlex>
                        </DxcFlex>
                      </DxcInset>
                    </DxcContainer>
                  ))}
                </DxcFlex>
              )}
            </DxcInset>
          </DxcFlex>
        </DxcContainer>
      </DxcFlex>
    </DxcContainer>
  );
};

export default ClaimsWorkbench;
