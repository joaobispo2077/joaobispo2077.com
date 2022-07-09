export type MakePartial<
  OriginalType,
  KeyFromOriginalType extends keyof OriginalType,
> = Omit<OriginalType, KeyFromOriginalType> &
  Partial<Pick<OriginalType, KeyFromOriginalType>>;
