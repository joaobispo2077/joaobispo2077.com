import { brandColors } from '@src/styles/theme';

type GenerateLinearGradientProps<GenericReturn> = (
  startColor: keyof typeof brandColors,
  endColor: keyof typeof brandColors,
) => GenericReturn;

type GenerateTextGradientReturn = {
  backgroundImage: string;
  backgroundClip: string;
  backgroundSize: string;
};

export const generateLinearGradient: GenerateLinearGradientProps<string> = (
  startColor,
  endColor,
) => {
  const start = brandColors[startColor];
  const end = brandColors[endColor];

  const gradient = `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;

  return gradient;
};

export const generateTextLinearGradient: GenerateLinearGradientProps<
  GenerateTextGradientReturn
> = (startColor, endColor) => {
  const gradient = generateLinearGradient(startColor, endColor);
  return {
    backgroundImage: gradient,
    backgroundClip: 'text',
    backgroundSize: '100%',
  };
};
