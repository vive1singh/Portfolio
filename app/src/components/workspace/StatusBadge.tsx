import type { BayStatus } from "@/config/projects.vivek";
import { STATUS_META } from "@/config/projects.vivek";
import { cn } from "@/lib/utils";

/** Single consistent status chip used everywhere (Implemented / In progress / Planned). */
export const StatusBadge: React.FC<{ status: BayStatus; className?: string }> = ({
  status,
  className,
}) => {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        meta.chip,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
};

export default StatusBadge;
