import { ProgressBar } from 'primereact/progressbar';
import { ProgressSpinner } from 'primereact/progressspinner';
import classNames from 'classnames';
import styled from 'styled-components';
import { isMobileDevice } from '../../utils/responsiveness';
import { DEFAULT_FONT_SIZE, DEFAULT_SPACING, MID_SPACING } from '../../styles/style-units';
import { GRAY_240, blue, blueHover, lightBlue, lighterBlue, white } from '../../styles/colors';
import { useEffect, useState } from 'react';

export type LoadingProps = {
  id?: string;
  mode?: 'dark' | 'light';
  className?: string;
  loadingText?: string;
  longLoadingText?: string;
  longLoadingTimeMs?: number;
  textColor?: string;
  width?: string;
  showLogo?: boolean;
  variant?: 'progressbar' | 'spinner';
  loadingColor?: string;
};

const SPINNER_DIMENSION = '3rem';
const LONG_LOADING_TIME = 8000;

export const StyledLoading = styled.div<{
  textColor?: string;
  isMobile: boolean;
  variant: 'progressbar' | 'spinner';
  loadingColor: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  padding: ${MID_SPACING};
  padding: ${({ variant }) => (variant === 'spinner' ? `0 ${MID_SPACING}` : MID_SPACING)};

  .m-loading-text {
    font-family: 'Poppins', sans-serif;
    margin-bottom: ${DEFAULT_SPACING};
    color: ${({ textColor }) => textColor || 'inherit'};
    font-size: ${({ isMobile }) => (isMobile ? '2rem' : DEFAULT_FONT_SIZE)};
  }
  img&not(.m-logo) {
    position: relative;
    width: 2em;
    height: 2em;
    margin: 0.8em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }
  }
  .m-logo {
    margin-bottom: ${MID_SPACING};
    height: 2.5rem;
  }
  .p-progress-spinner {
    width: ${SPINNER_DIMENSION};
    height: ${SPINNER_DIMENSION};
  }
  .m-loading-container {
    display: flex;
  }
  @keyframes p-progress-spinner-color {
    100%,
    0% {
      stroke: ${lighterBlue};
    }
    40% {
      stroke: ${lightBlue};
    }
    66% {
      stroke: ${blueHover};
    }
    80%,
    90% {
      stroke: ${blue};
    }
  }
  .m-loading-light .p-progressbar,
  .m-loading-dark .p-progressbar {
    width: 140px;
    height: 3px;
  }

  .m-loading-light {
    .p-progressbar {
      background: ${GRAY_240};

      .p-progressbar-value {
        background: ${({ loadingColor }) => loadingColor};
      }
    }
  }

  .m-loading-dark {
    .p-progressbar {
      background: ${({ loadingColor }) => loadingColor};
      .p-progressbar-value {
        background: ${white};
      }
    }
  }
`;
function Loading({
  mode,
  id,
  className,
  loadingText,
  longLoadingText,
  textColor,
  width,
  showLogo,
  variant = 'progressbar',
  longLoadingTimeMs = LONG_LOADING_TIME,
  loadingColor = blue,
}: Readonly<LoadingProps>) {
  const [showLongLoadingText, setShowLongLoadingText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLongLoadingText(true);
    }, longLoadingTimeMs);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadingTextToShow = showLongLoadingText && longLoadingText ? longLoadingText : loadingText;
  return (
    <StyledLoading
      variant={variant}
      isMobile={isMobileDevice()}
      textColor={textColor}
      className="m-loading"
      loadingColor={loadingColor}
    >
      {!!showLogo && <img className="m-logo" src={'/assets/v2/logo.svg'} alt="logo" />}
      {!!loadingTextToShow && <div className="m-loading-text">{`${loadingTextToShow}`}</div>}
      <div
        id={id}
        className={classNames(
          `m-loading-${mode === 'dark' ? 'dark' : 'light'}`,
          className,
          'm-loading-container',
        )}
      >
        {variant === 'progressbar' ? (
          <ProgressBar
            mode="indeterminate"
            style={{
              width,
            }}
          />
        ) : (
          <ProgressSpinner
            style={{ width, height: width ?? SPINNER_DIMENSION }}
            strokeWidth={isMobileDevice() ? '0.5rem' : '0.25rem'}
          />
        )}
      </div>
    </StyledLoading>
  );
}

export default Loading;
