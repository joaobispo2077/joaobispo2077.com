import styled from '@emotion/styled';

import { brandColors } from './theme';

export const Scrollbar = styled.div`
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${brandColors.command};
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 8px;
    background-color: #2e3338;
  }
`;
