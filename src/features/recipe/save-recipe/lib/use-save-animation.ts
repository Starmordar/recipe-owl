import { useRef } from 'react';

const sparkAngles = [0, 60, 120, 180, 240, 300];

function useSaveAnimation() {
  const iconRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const sparkRefs = useRef<Array<HTMLSpanElement | null>>([]);

  function setSparkRef(index: number) {
    return (element: HTMLSpanElement | null) => {
      sparkRefs.current[index] = element;
    };
  }

  function playAnimation(withBurst: boolean) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    iconRef.current?.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.7)', offset: 0.3 },
        { transform: 'scale(1.3)', offset: 0.6 },
        { transform: 'scale(1)' },
      ],
      { duration: 400, easing: 'ease-out' },
    );

    if (!withBurst) return;

    ringRef.current?.animate(
      [
        { transform: 'scale(0.4)', opacity: 0.7 },
        { transform: 'scale(1.7)', opacity: 0 },
      ],
      { duration: 500, easing: 'ease-out' },
    );

    sparkRefs.current.forEach((spark, index) => {
      const rotate = `rotate(${sparkAngles[index]}deg)`;

      spark?.animate(
        [
          { transform: `${rotate} translateY(-10px) scale(1)`, opacity: 1 },
          { transform: `${rotate} translateY(-26px) scale(0)`, opacity: 0 },
        ],
        { duration: 500, easing: 'ease-out' },
      );
    });
  }

  return { iconRef, ringRef, setSparkRef, playAnimation };
}

export { useSaveAnimation, sparkAngles };
