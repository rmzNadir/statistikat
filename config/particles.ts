import type { IParticlesProps } from 'react-tsparticles';

interface ParticlesThemeConfig {
  dotColor: string;
}
type GetParticlesConfig = (
  themeConfig: ParticlesThemeConfig,
) => IParticlesProps['options'];

export const getParticlesConfig: GetParticlesConfig = (themeConfig) => {
  const { dotColor } = themeConfig;

  return {
    style: {
      position: 'absolute',
    },
    particles: {
      number: {
        value: 365,
        density: {
          enable: true,
          value_area: 727,
        },
      },
      color: {
        value: dotColor,
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
        },
      },
      opacity: {
        value: 0.75,
        random: false,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    retina_detect: true,
  };
};
