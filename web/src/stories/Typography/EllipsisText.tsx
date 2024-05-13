import Typography from '.';
import { TooltipProps } from '../Tooltip';

function EllipsisText({
  children,
  className,
  tooltipPosition = 'top',
}: Readonly<{ children: string; className?: string; tooltipPosition?: TooltipProps['position'] }>) {
  return (
    <Typography
      tooltipPosition={tooltipPosition}
      variant="normal-text"
      className={className}
      isEllipsis
      tooltip={children}
    >
      {children}
    </Typography>
  );
}

export default EllipsisText;
