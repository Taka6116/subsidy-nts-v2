"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * ビューポート入場時などに開始するカウントアップ（旧 ImpactNumber と同ロジック）
 */
export function useCountUp(
  target: number,
  duration: number,
  shouldStart: boolean,
): number {
  const [value, setValue] = useState(0);

  const animate = useCallback(() => {
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (!shouldStart) return;
    if (duration <= 0) {
      setValue(target);
      return;
    }
    animate();
  }, [shouldStart, duration, target, animate]);

  return value;
}
