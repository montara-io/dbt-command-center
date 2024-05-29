import styled from "styled-components";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Icon, { IconType } from "../Icon";
import NotificationDot from "../NotificationDot";

import {
  BOLD,
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  MID_FONT_SIZE,
} from "../../constants/style-units";
import { ACCENT, BLUE, white } from "../../constants/colors";
import { isMobileDevice } from "../../utils/responsiveness";

export type TabsProps = {
  tabPanels: {
    icon?: IconType;
    iconSize?: string;
    header: string;
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
  className?: string;
  maxHeight?: string;
  onTabChangeCallback?: (index: number) => void;
};

const StyledTabs = styled.div<{
  headerMaxWidth: string;
  noPadding: boolean;
  maxHeight?: string;
}>`
  .p-tabview-nav-container {
    margin-bottom: ${DEFAULT_SPACING};
    max-width: ${({ headerMaxWidth }) => headerMaxWidth};
  }
  .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
    background: ${white};
    border-color: ${BLUE};
    color: ${BLUE};
  }
  .p-tabview .p-tabview-nav li .p-tabview-nav-link {
    box-shadow: none !important;
    font-weight: 500;
    padding-bottom: ${isMobileDevice() ? "1.5rem" : "0.75rem"};
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
  headerMaxWidth = "100%",
  renderActiveOnly = true,
  noPadding = false,
  className = "",
  maxHeight,
}: Readonly<TabsProps>) {
  const [activeIndex, setActiveIndex] = useState(0);

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
        activeIndex={
          extenalActiveIndex !== undefined ? extenalActiveIndex : activeIndex
        }
        onTabChange={(e) => {
          typeof externalOnTabChange === "function"
            ? externalOnTabChange(e?.index)
            : setActiveIndex(e.index);

          typeof onTabChangeCallback === "function" &&
            onTabChangeCallback(e.index);
        }}
      >
        {(tabPanels || [])
          .filter((t) => !t.isHidden)
          .map((tabPanel) => {
            const dotBackground = tabPanel?.notificationDotBackground || ACCENT;

            return (
              <TabPanel
                key={tabPanel.header}
                header={
                  <>
                    {tabPanel.icon && (
                      <>
                        <Icon
                          iconName={tabPanel.icon}
                          size={tabPanel?.iconSize || MID_FONT_SIZE}
                        />
                        &nbsp;&nbsp;
                      </>
                    )}
                    {tabPanel.header}
                    {!!tabPanel.showNotificationDot && (
                      <NotificationDot
                        className="m-notification-dot"
                        dotBackground={dotBackground}
                      />
                    )}
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
