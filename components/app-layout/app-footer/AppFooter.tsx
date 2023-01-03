import { Link } from '@chakra-ui/react';
import { AppFooterContainer } from './styles';

export const AppFooter = () => (
  <AppFooterContainer>
    <p>Reject modernity, return to monke 🦍</p>
    <Link
      textDecor="underline"
      target="_blank"
      href="https://github.com/rmzNadir"
    >
      Github
    </Link>
  </AppFooterContainer>
);
