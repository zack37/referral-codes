export declare enum Charset {
  NUMBERS = 'numbers',
  ALPHABETIC = 'alphabetic',
  ALPHANUMERIC = 'alphanumeric',
}
export declare type Config = {
  length?: number;
  count?: number;
  charset?: string;
  prefix?: string;
  postfix?: string;
  pattern?: string;
};
export declare const charset: (name: Charset) => string;
export declare const generateOne: ({
  pattern,
  charset,
  prefix,
  postfix,
}: Required<
  Pick<Config, 'pattern' | 'charset' | 'prefix' | 'postfix'>
>) => string;
export declare const generate: (config: Config) => string[];
