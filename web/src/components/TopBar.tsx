import styled from "styled-components";
import Typography from "../stories/Typography";
import { DEFAULT_SPACING, SMALL_SPACING } from "../constants/style-units";
import { LOGO_URL } from "../constants";
import { AnalyticsEvent, trackEvent } from "../services/analytics";

const StyledTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .m-logo {
    cursor: pointer;
    height: 1.5rem;
  }
`;

function TopBar() {
  return (
    <StyledTopBar>
      <Typography
        variant="h2"
        style={{ margin: `${SMALL_SPACING} 0 ${DEFAULT_SPACING} 0` }}
      >
        🚀 dbt Command Center
      </Typography>

      <img
        onClick={() => {
          trackEvent({
            eventName: AnalyticsEvent.UserNavigatedToMontaraWebsite,
          });
          window.open("https://montara.io", "_blank");
        }}
        className="m-logo"
        src={LOGO_URL}
        alt="logo"
      />
    </StyledTopBar>
  );
}

export default TopBar;
