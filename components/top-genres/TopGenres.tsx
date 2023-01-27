import { Tag, TagLabel } from '@chakra-ui/react';
import type { FC } from 'react';
import { Section } from '@components/section';
import { useGetTopGenres } from '@hooks/queries/useTopGenres';
import { TopGenresContainer } from './style';

export const TopGenres: FC = () => {
  const { data } = useGetTopGenres();

  return (
    <Section title="Top Genres">
      <TopGenresContainer>
        {data?.map(({ name }) => (
          <Tag borderRadius="full" key={name} minW="max-content">
            <TagLabel>{name}</TagLabel>
          </Tag>
        ))}
      </TopGenresContainer>
    </Section>
  );
};
