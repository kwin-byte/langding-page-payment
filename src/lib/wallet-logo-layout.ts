import type { BankLogo } from "./bank-logos";

export type LogoPlacement = {
  src: string;
  order: number;
  left: number;
  top: number;
  scale: number;
  zIndex: number;
  delay: number;
  rotateY: number;
  rotateX: number;
  opacity: number;
  isHero: boolean;
};

/** Bố cục giống ảnh mẫu — coin phụ quanh coin trung tâm */
const ORBIT_SLOTS = [
  { left: 26, top: 30, scale: 0.88, zIndex: 20, rotateY: -18, rotateX: 12, opacity: 1 },
  { left: 74, top: 26, scale: 0.72, zIndex: 11, rotateY: 22, rotateX: 16, opacity: 0.9 },
  { left: 84, top: 50, scale: 0.8, zIndex: 18, rotateY: 28, rotateX: 10, opacity: 1 },
  { left: 72, top: 72, scale: 0.78, zIndex: 19, rotateY: 14, rotateX: 18, opacity: 1 },
  { left: 26, top: 70, scale: 0.74, zIndex: 17, rotateY: -22, rotateX: 14, opacity: 0.95 },
  { left: 14, top: 48, scale: 0.62, zIndex: 8, rotateY: -28, rotateX: 20, opacity: 0.8 },
  { left: 88, top: 36, scale: 0.58, zIndex: 9, rotateY: 32, rotateX: 18, opacity: 0.78 },
  { left: 40, top: 82, scale: 0.52, zIndex: 7, rotateY: -8, rotateX: 22, opacity: 0.72 },
  { left: 58, top: 14, scale: 0.48, zIndex: 6, rotateY: 6, rotateX: 24, opacity: 0.68 },
];

export function getWalletLogoPlacements(logos: BankLogo[]): LogoPlacement[] {
  if (logos.length === 0) return [];

  const [hero, ...satellites] = logos;

  const heroPlacement: LogoPlacement = {
    src: hero.src,
    order: hero.order,
    left: 50,
    top: 51,
    scale: 1.22,
    zIndex: 25,
    delay: 0,
    rotateY: -10,
    rotateX: 10,
    opacity: 1,
    isHero: true,
  };

  const satellitePlacements: LogoPlacement[] = satellites.map((logo, i) => {
    const slot = ORBIT_SLOTS[i % ORBIT_SLOTS.length];
    const rank = i + 2;
    const depthPenalty = Math.min((rank - 2) * 0.05, 0.28);

    return {
      src: logo.src,
      order: logo.order,
      left: slot.left,
      top: slot.top,
      scale: Math.max(slot.scale - depthPenalty, 0.42),
      zIndex: slot.zIndex,
      delay: (i % 6) * 0.45,
      rotateY: slot.rotateY,
      rotateX: slot.rotateX,
      opacity: Math.max(slot.opacity - depthPenalty * 0.45, 0.6),
      isHero: false,
    };
  });

  return [...satellitePlacements, heroPlacement].sort((a, b) => a.zIndex - b.zIndex);
}
