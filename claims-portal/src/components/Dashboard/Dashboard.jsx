import { useState } from 'react';
import {
  DxcHeading,
  DxcFlex,
  DxcContainer,
  DxcTypography,
  DxcTextInput,
  DxcButton,
  DxcSwitch,
  DxcTabs,
  DxcBadge,
  DxcPaginator,
  DxcInset,
} from '@dxc-technology/halstack-react';
import './Dashboard.css';

const Dashboard = ({ onClaimSelect }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const submissionsData = [
    {
      id: '1000212',
      name: 'James Smith',
      status: 'In-Progress',
      statusColor: 'warning',
      type: 'LOB: Life',
      submitted: '01/05/2026',
      received: '01/07/2026',
      effective: '01/07/2026'
    },
    {
      id: '1000213',
      name: 'Mary Johnson',
      status: 'Quote Required',
      statusColor: 'error',
      type: 'LOB: Annuity',
      submitted: '01/05/2026',
      received: '01/07/2026',
      effective: '01/07/2026'
    },
    {
      id: '1000214',
      name: 'Robert Davis',
      status: 'New Submission',
      statusColor: 'success',
      type: 'LOB: Life',
      submitted: '01/05/2026',
      received: '01/07/2026',
      effective: '01/07/2026'
    },
    {
      id: '1000215',
      name: 'Patricia Wilson',
      status: 'In-Progress',
      statusColor: 'warning',
      type: 'LOB: Annuity',
      submitted: '01/05/2026',
      received: '01/07/2026',
      effective: '01/07/2026'
    },
    {
      id: '1000216',
      name: 'Michael Brown',
      status: 'In-Progress',
      statusColor: 'warning',
      type: 'LOB: Life',
      submitted: '01/05/2026',
      received: '01/07/2026',
      effective: '01/07/2026'
    }
  ];

  return (
    <DxcContainer
      padding="var(--spacing-padding-l)"
      background={{ color: "var(--color-bg-secondary-lightest)" }}
      width="100%"
    >
      <DxcFlex direction="column" gap="var(--spacing-gap-m)">
        {/* Page Title */}
        <DxcHeading level={1} text="Dashboard" />

        {/* Highlights Section - Top Cards */}
        <DxcFlex gap="var(--spacing-gap-m)">
          {/* My Tasks Card */}
          <DxcContainer
            padding="var(--spacing-padding-m)"
            background={{ color: "var(--color-bg-neutral-lightest)" }}
            borderRadius="var(--border-radius-m)"
            boxShadow="var(--shadow-mid-04)"
            grow={1}
            height="240px"
            boxSizing="border-box"
          >
            <DxcFlex direction="column" gap="var(--spacing-gap-m)">
              <DxcHeading level={3} text="My Tasks" />
              <DxcFlex gap="var(--spacing-gap-none)" alignItems="center">
                {/* Open Claims */}
                <DxcFlex
                  direction="column"
                  gap="var(--spacing-gap-s)"
                  alignItems="center"
                  justifyContent="center"
                  grow={1}
                  basis="0"
                >
                  <DxcTypography
                    fontSize="32px"
                    fontWeight="font-weight-semibold"
                    color="var(--color-fg-secondary-strong)"
                    textAlign="center"
                  >
                    12
                  </DxcTypography>
                  <DxcTypography
                    fontSize="font-scale-03"
                    fontWeight="font-weight-semibold"
                    color="var(--color-fg-neutral-stronger)"
                    textAlign="center"
                  >
                    Open Claims
                  </DxcTypography>
                </DxcFlex>

                {/* Divider */}
                <DxcContainer padding="var(--spacing-padding-xs)">
                  <DxcContainer
                    width="1px"
                    height="97px"
                    background={{ color: "var(--color-bg-neutral-light)" }}
                  />
                </DxcContainer>

                {/* New Today */}
                <DxcFlex
                  direction="column"
                  gap="var(--spacing-gap-s)"
                  alignItems="center"
                  justifyContent="center"
                  grow={1}
                  basis="0"
                >
                  <DxcTypography
                    fontSize="32px"
                    fontWeight="font-weight-semibold"
                    color="var(--color-fg-error-medium)"
                    textAlign="center"
                  >
                    2
                  </DxcTypography>
                  <DxcTypography
                    fontSize="font-scale-03"
                    fontWeight="font-weight-semibold"
                    color="var(--color-fg-neutral-stronger)"
                    textAlign="center"
                  >
                    New Today
                  </DxcTypography>
                </DxcFlex>

                {/* Divider */}
                <DxcContainer padding="var(--spacing-padding-xs)">
                  <DxcContainer
                    width="1px"
                    height="97px"
                    background={{ color: "var(--color-bg-neutral-light)" }}
                  />
                </DxcContainer>

                {/* New This Week */}
                <DxcFlex
                  direction="column"
                  gap="var(--spacing-gap-s)"
                  alignItems="center"
                  justifyContent="center"
                  grow={1}
                  basis="0"
                >
                  <DxcTypography
                    fontSize="32px"
                    fontWeight="font-weight-semibold"
                    color="var(--color-fg-warning-medium)"
                    textAlign="center"
                  >
                    6
                  </DxcTypography>
                  <DxcTypography
                    fontSize="font-scale-03"
                    fontWeight="font-weight-semibold"
                    color="var(--color-fg-neutral-stronger)"
                    textAlign="center"
                  >
                    New This Week
                  </DxcTypography>
                </DxcFlex>
              </DxcFlex>
            </DxcFlex>
          </DxcContainer>

          {/* Key Metrics Card */}
          <DxcContainer
            background={{ color: "var(--color-bg-neutral-lightest)" }}
            borderRadius="var(--border-radius-m)"
            boxShadow="var(--shadow-mid-04)"
            grow={2}
            height="240px"
            boxSizing="border-box"
            padding="var(--spacing-padding-m)"
          >
            <DxcFlex direction="column" gap="var(--spacing-gap-m)">
              <DxcHeading level={3} text="Key Metrics" />
              <DxcFlex gap="var(--spacing-gap-m)" alignItems="center" justifyContent="space-between">
                {/* Claims Paid YTD */}
                <div style={{ borderTop: "4px solid var(--border-color-info-medium)", flex: "1" }}>
                  <DxcContainer
                    height="120px"
                    background={{ color: "var(--color-bg-neutral-lightest)" }}
                  >
                    <DxcFlex
                      direction="column"
                      gap="var(--spacing-gap-xxs)"
                      alignItems="center"
                      justifyContent="center"
                      fullHeight
                    >
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-neutral-stronger)"
                        textAlign="center"
                      >
                        CLAIMS PAID YTD
                      </DxcTypography>
                      <DxcTypography
                        fontSize="32px"
                        fontWeight="font-weight-semibold"
                        color="var(--color-fg-secondary-medium)"
                        textAlign="center"
                      >
                        $18.2M
                      </DxcTypography>
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-secondary-medium)"
                        textAlign="center"
                      >
                        +12% vs last year
                      </DxcTypography>
                    </DxcFlex>
                  </DxcContainer>
                </div>

                {/* Pending Review */}
                <div style={{ borderTop: "4px solid var(--color-semantic03-400)", flex: "1" }}>
                  <DxcContainer
                    height="120px"
                    background={{ color: "var(--color-bg-neutral-lightest)" }}
                  >
                    <DxcFlex
                      direction="column"
                      gap="var(--spacing-gap-xxs)"
                      alignItems="center"
                      justifyContent="center"
                      fullHeight
                    >
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-neutral-stronger)"
                        textAlign="center"
                      >
                        PENDING REVIEW
                      </DxcTypography>
                      <DxcTypography
                        fontSize="32px"
                        fontWeight="font-weight-semibold"
                        color="var(--color-fg-warning-medium)"
                        textAlign="center"
                      >
                        7
                      </DxcTypography>
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-warning-medium)"
                        textAlign="center"
                      >
                        3 closing today
                      </DxcTypography>
                    </DxcFlex>
                  </DxcContainer>
                </div>

                {/* Approved This Month */}
                <div style={{ borderTop: "4px solid var(--color-semantic02-500)", flex: "1" }}>
                  <DxcContainer
                    height="120px"
                    background={{ color: "var(--color-bg-neutral-lightest)" }}
                  >
                    <DxcFlex
                      direction="column"
                      gap="var(--spacing-gap-xxs)"
                      alignItems="center"
                      justifyContent="center"
                      fullHeight
                    >
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-neutral-stronger)"
                        textAlign="center"
                      >
                        APPROVED THIS MONTH
                      </DxcTypography>
                      <DxcTypography
                        fontSize="32px"
                        fontWeight="font-weight-semibold"
                        color="var(--color-fg-success-medium)"
                        textAlign="center"
                      >
                        42
                      </DxcTypography>
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-success-medium)"
                        textAlign="center"
                      >
                        87% approval rate
                      </DxcTypography>
                    </DxcFlex>
                  </DxcContainer>
                </div>

                {/* Declined This Month */}
                <div style={{ borderTop: "4px solid var(--color-semantic04-500)", flex: "1" }}>
                  <DxcContainer
                    height="120px"
                    background={{ color: "var(--color-bg-neutral-lightest)" }}
                  >
                    <DxcFlex
                      direction="column"
                      gap="var(--spacing-gap-xxs)"
                      alignItems="center"
                      justifyContent="center"
                      fullHeight
                    >
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-neutral-stronger)"
                        textAlign="center"
                      >
                        DECLINED THIS MONTH
                      </DxcTypography>
                      <DxcTypography
                        fontSize="32px"
                        fontWeight="font-weight-semibold"
                        color="var(--color-fg-error-medium)"
                        textAlign="center"
                      >
                        7
                      </DxcTypography>
                      <DxcTypography
                        fontSize="12px"
                        fontWeight="font-weight-regular"
                        color="var(--color-fg-error-medium)"
                        textAlign="center"
                      >
                        13% decline rate
                      </DxcTypography>
                    </DxcFlex>
                  </DxcContainer>
                </div>
              </DxcFlex>
            </DxcFlex>
          </DxcContainer>
        </DxcFlex>

        {/* Main Content Card - My Priorities */}
        <DxcContainer
          padding="var(--spacing-padding-l)"
          background={{ color: "var(--color-bg-neutral-lightest)" }}
          borderRadius="var(--border-radius-m)"
          boxShadow="var(--shadow-mid-02)"
        >
          <DxcFlex direction="column" gap="var(--spacing-gap-s)">
            <DxcHeading level={3} text="My Priorities" />

            {/* Tabs */}
            <DxcTabs iconPosition="left">
              <DxcTabs.Tab
                label="All Claims"
                icon="assignment"
                active={activeTabIndex === 0}
                onClick={() => setActiveTabIndex(0)}
              >
                <div />
              </DxcTabs.Tab>
              <DxcTabs.Tab
                label="Life Insurance"
                icon="favorite"
                active={activeTabIndex === 1}
                onClick={() => setActiveTabIndex(1)}
              >
                <div />
              </DxcTabs.Tab>
              <DxcTabs.Tab
                label="Annuities"
                icon="account_balance"
                active={activeTabIndex === 2}
                onClick={() => setActiveTabIndex(2)}
              >
                <div />
              </DxcTabs.Tab>
            </DxcTabs>

            {/* Toolbar */}
            <DxcFlex justifyContent="space-between" alignItems="center">
              <DxcTextInput
                placeholder="Search for Claim, Policy, or Quote Numbers..."
                value={searchValue}
                onChange={({ value }) => setSearchValue(value)}
                size="medium"
              />
              <DxcFlex gap="var(--spacing-gap-ml)" alignItems="center">
                <DxcButton
                  label="Columns"
                  mode="tertiary"
                  icon="view_column"
                  onClick={() => {}}
                />
                <DxcFlex gap="var(--spacing-gap-none)" alignItems="center">
                  <DxcTypography
                    fontSize="font-scale-03"
                    color="var(--color-fg-secondary-strong)"
                  >
                    Card View
                  </DxcTypography>
                  <DxcSwitch
                    checked={isGridView}
                    onChange={(checked) => setIsGridView(checked)}
                  />
                  <DxcTypography
                    fontSize="font-scale-03"
                    color="var(--color-fg-secondary-strong)"
                  >
                    Grid View
                  </DxcTypography>
                </DxcFlex>
              </DxcFlex>
            </DxcFlex>

            {/* Cards List or Grid */}
            <DxcFlex
              direction={isGridView ? "row" : "column"}
              gap="var(--spacing-gap-m)"
              wrap={isGridView ? "wrap" : "nowrap"}
            >
              {submissionsData.map((submission, index) => (
                <DxcContainer
                  key={index}
                  background={{ color: "var(--color-bg-neutral-lighter)" }}
                  border={{ color: "var(--border-color-neutral-lighter)", style: "solid", width: "1px" }}
                  borderRadius="var(--border-radius-m)"
                  style={isGridView ? { flex: "1 1 calc(50% - var(--spacing-gap-m) / 2)", minWidth: "400px", cursor: "pointer" } : { cursor: "pointer" }}
                  onClick={() => onClaimSelect(submission)}
                >
                  <DxcInset space="var(--spacing-padding-m)">
                    <DxcFlex direction="column" gap="var(--spacing-gap-xs)">
                      <DxcFlex justifyContent="space-between" alignItems="center">
                        <DxcFlex gap="var(--spacing-gap-m)" alignItems="center">
                          <DxcTypography
                            fontSize="font-scale-03"
                            fontWeight="font-weight-semibold"
                            color="var(--color-fg-secondary-medium)"
                          >
                            {submission.id}
                          </DxcTypography>
                          <DxcTypography fontSize="font-scale-03">
                            {submission.name}
                          </DxcTypography>
                        </DxcFlex>
                        <DxcFlex gap="var(--spacing-gap-s)" alignItems="center">
                          <DxcButton
                            icon="check"
                            mode="tertiary"
                            title="Approve"
                            onClick={() => {}}
                          />
                          <DxcButton
                            icon="cancel"
                            mode="tertiary"
                            title="Decline"
                            onClick={() => {}}
                          />
                          <DxcButton
                            icon="swap_horiz"
                            mode="tertiary"
                            title="Transfer"
                            onClick={() => {}}
                          />
                        </DxcFlex>
                      </DxcFlex>

                      <DxcFlex gap="var(--spacing-gap-m)" alignItems="center" wrap="wrap">
                        <DxcBadge
                          label={submission.status}
                          mode="contextual"
                          color={submission.statusColor}
                        />
                        <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                          {submission.type}
                        </DxcTypography>
                        <div style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-fg-neutral-strong)"
                        }} />
                        <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                          Submitted: {submission.submitted}
                        </DxcTypography>
                        <div style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-fg-neutral-strong)"
                        }} />
                        <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                          Received: {submission.received}
                        </DxcTypography>
                        <div style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-fg-neutral-strong)"
                        }} />
                        <DxcTypography fontSize="12px" color="var(--color-fg-neutral-dark)">
                          Effective: {submission.effective}
                        </DxcTypography>
                      </DxcFlex>
                    </DxcFlex>
                  </DxcInset>
                </DxcContainer>
              ))}
            </DxcFlex>

            {/* Paginator */}
            <DxcPaginator
              currentPage={currentPage}
              itemsPerPage={9}
              totalItems={12}
              showGoToPage={true}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </DxcFlex>
        </DxcContainer>
      </DxcFlex>
    </DxcContainer>
  );
};

export default Dashboard;
