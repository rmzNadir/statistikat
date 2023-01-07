import { useColorModeValue } from '@chakra-ui/system';
import { motion, useAnimation } from 'framer-motion';
import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { getParticlesConfig } from '@config/particles';
import { theme } from '@config/theme';
import { StyledParticles } from './styles';

export const Particles = () => {
  const controls = useAnimation();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    controls.start({
      opacity: '100%',
      transition: { duration: 0.5 },
    });
  }, [controls]);

  const dotColor = useColorModeValue(
    theme.colors.purple[900],
    theme.colors.white,
  );

  return (
    <motion.div animate={controls} initial={{ opacity: '0%' }}>
      <StyledParticles
        init={particlesInit}
        loaded={particlesLoaded}
        options={getParticlesConfig({ dotColor })}
      />
    </motion.div>
  );
};
