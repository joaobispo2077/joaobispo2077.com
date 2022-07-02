import { FunctionComponent } from 'react';

import { Box } from '@chakra-ui/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export type CodeblockProps = {
  code: string;
};

export const Codeblock: FunctionComponent<CodeblockProps> = ({ code }) => {
  return (
    <Box borderRadius={8} overflow="hidden">
      <SyntaxHighlighter language={'tsx'} style={dracula}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};
