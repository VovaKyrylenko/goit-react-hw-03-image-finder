import styled from '@emotion/styled';
import { InfinitySpin } from 'react-loader-spinner';

export const Loader = styled(InfinitySpin)`
  width: 100px;
`;

export const Relative = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  display: flex;
  align-items: center;
`;
