import { Icon, loadIcon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

interface IconPreviewProps {
  icon: string;
  size?: number;
}

const ICON_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;

export function IconPreview({ icon, size = 20 }: IconPreviewProps) {
  const [failed, setFailed] = useState(false);

  const isValidIconName = useMemo(() => {
    return Boolean(icon && ICON_NAME_PATTERN.test(icon));
  }, [icon]);

  useEffect(() => {
    let isMounted = true;

    setFailed(false);

    if (!isValidIconName) {
      return;
    }

    loadIcon(icon)
      .then(() => {
        if (isMounted) {
          setFailed(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFailed(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [icon, isValidIconName]);

  if (!isValidIconName || failed) {
    return (
      <span
        aria-label={icon ? `Unable to preview ${icon}` : "No icon selected"}
        className="inline-flex items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-slate-400"
        role="img"
        style={{ width: size, height: size }}
      >
        <span aria-hidden="true" className="block h-1/2 w-1/2 rounded-sm bg-current" />
      </span>
    );
  }

  return (
    <Icon
      aria-label={icon}
      className="shrink-0"
      height={size}
      icon={icon}
      role="img"
      width={size}
    />
  );
}
