import { useColorModeValue } from '@chakra-ui/system';
import { motion, useAnimation } from 'framer-motion';
import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import { getParticlesConfig } from '@config/particles';
import { theme } from '@config/theme';
import { StyledParticles } from './styles';

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type Engine = Parameters<typeof loadFull>['0'];

export const Particles = () => {
  const animationControls = useAnimation();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    animationControls.start('visible');
  }, [animationControls]);

  const dotColor = useColorModeValue(
    theme.colors.purple[900],
    theme.colors.white,
  );

  return (
    <motion.div
      animate={animationControls}
      variants={animationVariants}
      initial="hidden"
      transition={{ duration: 0.5 }}
    >
      <StyledParticles
        init={particlesInit}
        loaded={particlesLoaded}
        options={getParticlesConfig({ dotColor })}
      />
    </motion.div>
  );
};
