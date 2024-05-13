import styled from 'styled-components';
import { TabView, TabPanel } from 'primereact/tabview';
import { ACCENT, ALERT_SUCCESS, blue, white } from '../../styles/colors';
import { BOLD, DEFAULT_FONT_SIZE, DEFAULT_SPACING, MID_FONT_SIZE } from '../../styles/style-units';
import { useState } from 'react';
import Icon, { IconType } from '../Icon';
import NotificationDot from '../../components/common/NotificationDot';
import {
  ReleasedFeature,
  getReleasedFeatureTexts,
  setFeatureAnnouncementViewed,
} from '../../services/feature-announcements';
import FeatureAnnouncementPopover from '../../components/common/FeatureAnnouncement/FeatureAnnouncementPopover';
import { GlobalStorageKey, setStorageItem } from '../../services/storage';
import { getInitialActiveIndex } from './helpers';
import { isMobileDevice } from '../../utils/responsiveness';

export type TabsProps = {
  tabPanels: {
    icon?: IconType;
    iconSize?: string;
    header: string;
    featureAnnouncement?: ReleasedFeature;
    content: React.ReactNode;
    isHidden?: boolean;
    showNotificationDot?: boolean;
    notificationDotBackground?: string;
    noPadding?: boolean;
  }[];
  extenalActiveIndex?: number;
  externalOnTabChange?: (index: number) => void;
  headerMaxWidth?: string;
  renderActiveOnly?: boolean;
  noPadding?: boolean;
  localStorageKey?: GlobalStorageKey;
  className?: string;
  maxHeight?: string;
  onTabChangeCallback?: (index: number) => void;
};

const StyledTabs = styled.div<{ headerMaxWidth: string; noPadding: boolean; maxHeight?: string }>`
  .p-tabview-nav-container {
    margin-bottom: ${DEFAULT_SPACING};
    max-width: ${({ headerMaxWidth }) => headerMaxWidth};
  }
  .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
    background: ${white};
    border-color: ${blue};
    color: ${blue};
  }
  .p-tabview .p-tabview-nav li .p-tabview-nav-link {
    box-shadow: none !important;
    font-weight: 500;
    padding-bottom: ${isMobileDevice() ? '1.5rem' : '0.75rem'};
  }
  .p-tabview .p-tabview-panels {
    padding: 0;
    max-height: ${({ maxHeight }) => maxHeight};
    overflow-y: auto;
  }
  .p-tabview-panel {
    padding: 0 ${({ noPadding }) => (noPadding ? 0 : DEFAULT_SPACING)};
  }

  .p-tabview-title {
    display: flex;
    align-items: center;
    font-size: ${DEFAULT_FONT_SIZE};
  }
  .p-tabview-title .m-notification-dot,
  .p-tabview-title .m-feature-announcement-dot {
    margin-left: 0.5rem;
  }
  .p-tabview-selected .p-tabview-nav-link {
    font-weight: ${BOLD} !important;
  }
`;

function Tabs({
  tabPanels,
  extenalActiveIndex,
  externalOnTabChange,
  onTabChangeCallback,
  headerMaxWidth = '100%',
  renderActiveOnly = true,
  noPadding = false,
  localStorageKey,
  className = '',
  maxHeight,
}: Readonly<TabsProps>) {
  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex({ localStorageKey }));

  return (
    <StyledTabs
      className={`m-tabs ${className}`}
      headerMaxWidth={headerMaxWidth}
      noPadding={
        noPadding ||
        isMobileDevice() ||
        !!tabPanels[activeIndex]?.noPadding ||
        (!!extenalActiveIndex && !!tabPanels[extenalActiveIndex]?.noPadding)
      }
      maxHeight={maxHeight}
    >
      <TabView
        renderActiveOnly={renderActiveOnly}
        activeIndex={extenalActiveIndex !== undefined ? extenalActiveIndex : activeIndex}
        onTabChange={(e) => {
          const tabPanel = tabPanels[e.index];
          tabPanel?.featureAnnouncement &&
            setFeatureAnnouncementViewed(tabPanel.featureAnnouncement);
          typeof externalOnTabChange === 'function'
            ? externalOnTabChange(e?.index)
            : setActiveIndex(e.index);
          localStorageKey &&
            setStorageItem({
              key: localStorageKey,
              value: e.index,
              userId: '',
            });
          typeof onTabChangeCallback === 'function' && onTabChangeCallback(e.index);
        }}
      >
        {(tabPanels || [])
          .filter((t) => !t.isHidden)
          .map((tabPanel) => {
            const featureAnnouncementTexts = tabPanel.featureAnnouncement
              ? getReleasedFeatureTexts(tabPanel.featureAnnouncement)
              : undefined;

            const dotBackground =
              tabPanel?.notificationDotBackground ||
              (featureAnnouncementTexts ? ALERT_SUCCESS : ACCENT);

            return (
              <TabPanel
                key={tabPanel.header}
                header={
                  <>
                    {tabPanel.icon && (
                      <>
                        <Icon iconName={tabPanel.icon} size={tabPanel?.iconSize || MID_FONT_SIZE} />
                        &nbsp;&nbsp;
                      </>
                    )}
                    {!featureAnnouncementTexts && tabPanel.header}
                    {(!!tabPanel.showNotificationDot || !!featureAnnouncementTexts) &&
                      (featureAnnouncementTexts?.description ? (
                        <FeatureAnnouncementPopover releasedFeature={tabPanel.featureAnnouncement!}>
                          {tabPanel.header}
                        </FeatureAnnouncementPopover>
                      ) : (
                        <NotificationDot
                          className="m-notification-dot"
                          dotBackground={dotBackground}
                        />
                      ))}
                  </>
                }
              >
                {tabPanel.content}
              </TabPanel>
            );
          })}
      </TabView>
    </StyledTabs>
  );
}

export default Tabs;
