export enum Charset {
  NUMBERS = 'numbers',
  ALPHABETIC = 'alphabetic',
  ALPHANUMERIC = 'alphanumeric',
}

export type Config = {
  length?: number;
  count?: number;
  charset?: string;
  prefix?: string;
  postfix?: string;
  pattern?: string;
};

const placeholder = '#';

type Sizeable<T> = Iterable<T> & ArrayLike<T>;

function size<T>(fn: (x: T) => boolean, array: Sizeable<T>): number {
  return fn ? [...array].filter((x) => fn(x)).length : array.length;
}

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomElement = <T>(array: ArrayLike<T>): T =>
  array[randomInt(0, array.length - 1)];

const charsets = {
  [Charset.NUMBERS]: '0123456789',
  [Charset.ALPHABETIC]: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  [Charset.ALPHANUMERIC]:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

export const charset = (name: Charset): string => charsets[name];

const createConfig = (config: Config = {}): Required<Config> => ({
  count: config.count ?? 1,
  length: config.length ?? 8,
  charset: config.charset ?? charset(Charset.ALPHANUMERIC),
  prefix: config.prefix ?? '',
  postfix: config.postfix ?? '',
  pattern: config.pattern ?? placeholder.repeat(config.length ?? 8),
});

export const generateOne = ({
  pattern,
  charset,
  prefix,
  postfix,
}: Required<
  Pick<Config, 'pattern' | 'charset' | 'prefix' | 'postfix'>
>): string => {
  // Uses for_of loop for performance reasons
  let code = '';
  for (const p of pattern) {
    const c = p === placeholder ? randomElement(charset) : p;
    code += c;
  }

  return `${prefix}${code}${postfix}`;
};

const isFeasible = (
  charset: string,
  pattern: string,
  count: number,
): boolean => {
  return charset.length ** size((x) => x === placeholder, pattern) >= count;
};

export const generate = (config: Config): string[] => {
  const validatedConfig = createConfig(config);
  const { charset, count, pattern } = validatedConfig;

  if (!isFeasible(charset, pattern, count)) {
    throw new Error('Not possible to generate requested number of codes.');
  }

  const codes = new Set<string>();
  while (codes.size < count) {
    codes.add(generateOne(validatedConfig));
  }

  return [...codes];
};
