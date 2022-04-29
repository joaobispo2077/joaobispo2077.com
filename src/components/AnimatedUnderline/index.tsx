import { AnimatedBox } from '@src/components/AnimatedBox';

export const AnimatedUnderline = () => {
  return (
    <AnimatedBox
      width="100%"
      height="1px"
      borderRadius={4}
      position="absolute"
      backgroundColor="brand.primary"
      layoutId="underline"
    />
  );
};
