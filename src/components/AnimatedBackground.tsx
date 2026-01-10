import { memo } from 'react';

type AnimatedBackgroundProps = {
  variant?: 'home' | 'projects';
};

function AnimatedBackgroundImpl({ variant = 'home' }: AnimatedBackgroundProps) {
  // Variant is reserved for future styling tweaks; keeping the DOM stable helps reduce layout shift.
  return (
    <div className={variant ? `bg bg--${variant}` : 'bg'} aria-hidden="true">
      <div className="bg__orb bg__orb--a" />
      <div className="bg__orb bg__orb--b" />
      <div className="bg__orb bg__orb--c" />
      <div className="bg__grid" />
      <div className="bg__noise" />
    </div>
  );
}

const AnimatedBackground = memo(AnimatedBackgroundImpl);
export default AnimatedBackground;
