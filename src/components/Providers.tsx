import styled from 'styled-components';

import { ProviderCardProps, ProviderProps } from '../types';

const ProvidersContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const ProviderCard = styled.div<ProviderCardProps>`
  width: 12rem;
  height: 12rem;
  background-image: url(${(props) => props.logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;

  border: ${(props) => (props.isActive ? '2px solid #f50057' : '2px solid rgba(0, 0, 0, 0.12)')};
  border-radius: 4px;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  /* prettier-ignore */
  &:hover {
    box-shadow:
      0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
  }
`;

export default function Providers(props: ProviderProps) {
  const { providers, handleSelect, isActive } = props;

  return providers.length ? (
    <ProvidersContainer data-testid="providers">
      {providers.map((item) => (
        <ProviderCard
          data-testid={item.value}
          key={item.value}
          onClick={() => handleSelect(item)}
          logo={item.logo}
          isActive={isActive(item)}
        />
      ))}
    </ProvidersContainer>
  ) : null;
}
