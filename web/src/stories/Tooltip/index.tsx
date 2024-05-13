import { Tooltip as PrimeTooltip } from 'primereact/tooltip';
import { isDesktopDevice } from '../../utils/responsiveness';

const MIN_ELLIPSIS_LENGTH = 16;

export type TooltipProps = {
  tooltip: string;
  elementId: string;
  children?: any;
  isEllipsis?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

function Tooltip({
  tooltip,
  elementId,
  children,
  isEllipsis = true,
  position,
}: Readonly<TooltipProps>) {
  return (
    <>
      {
        <PrimeTooltip
          target={`#${elementId}`}
          content={tooltip}
          disabled={isEllipsis ? tooltip.length < MIN_ELLIPSIS_LENGTH : false}
          position={position}
          style={{ maxWidth: isDesktopDevice() ? '25rem' : '40rem' }}
        />
      }
      {!!children && children}
    </>
  );
}

export default Tooltip;
