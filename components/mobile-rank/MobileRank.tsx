import type { FC } from 'react';
import React from 'react';
import { Container } from './styles';

interface Props {
  rank: number;
}

export const MobileRank: FC<Props> = ({ rank }) => (
  <Container>
    <div>
      <b>{rank}</b>
    </div>
  </Container>
);
