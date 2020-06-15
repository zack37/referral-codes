## Referral Code Generator

Generate unique, random, and hard to guess coupon / voucher codes.
Use cases: promo codes, loyalty coupons, gift vouchers, in-app purchases, referral links

This library originates from [voucher-code-generator](https://github.com/voucherifyio/voucher-code-generator-js).

I re-wrote this library using the same API, but with more modern syntax and more performant constructs.

### Installation

Install with yarn:

```
$ yarn add referral-codes
```

Install with npm:

```
$ npm install -save referral-codes
```

### Usage

Generate 5 codes, each 8 characters long:

```
referralCodes.generate({
    length: 8,
    count: 5
});
```

Sample result: `["FR6bwx1q", "ByamOdWV", "7roFwfQs", "rmWlwvll", "pgih5eAB"]`

#### Charset

Default charset is alphanumeric (numbers and letters). However, you can specify your own charset:

```
referralCodes.generate({
    length: 6,
    count: 3,
    charset: "0123456789"
});
```

Sample result: `["386525", "676442", "019075"]`

You can also use one of the predefined charsets by calling `referralCodes.charset(name)`.

| name             | charset                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `"numbers"`      | `"0123456789"`                                                     |
| `"alphabetic"`   | `"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"`           |
| `"alphanumeric"` | `"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"` |

Constants for these defaults can also be used to avoid issues with misspellings and help with intellisense

For example:

```
referralCodes.generate({
    length: 5,
    count: 4,
    charset: referralCodes.charset("alphabetic")
});
```

or

```
referralCodes.generate({
    length: 5,
    count: 4,
    charset: referralCodes.charset(referralCodes.CHARSETS.ALPHABETIC)
});
```

Result: `["odghy", "kZEYc", "eOTCl", "wVCzD"]`

#### Prefix and Postfix

You can optionally surround each generated code with a prefix and/or postfix.

For instance:

```
referralCodes.generate({
    prefix: "promo-",
    postfix: "-2015"
});
```

Result: `["promo-WZ4x1t3U-2015"]`

#### Pattern

Codes may follow a specified pattern. Use hash (`#`) as a placeholder for random characters.
Notice that if `pattern` is specified then `length` is ignored.

Example:

```
referralCodes.generate({
    pattern: "##-###-##",
});
```

Result: `["P7-ofW-Ka"]`

#### Infeasible configs

There exist some configs that are not feasible. For example it's not possible to generate 1500 codes if you want
your codes to be 2 characters long and consisting only of numbers. Referral code generator detects such cases and
throws an error `"Not possible to generate requested number of codes."`.

```
try {
    referralCodes.generate({
        count: 1500,
        length: 2,
        charset: "0123456789"
    })
catch (e) {
    console.log("Sorry, not possible.");
}
```

#### Config reference

| attribute | default value  | description                                                                     |
| --------- | :------------: | ------------------------------------------------------------------------------- |
| `length`  |      `8`       | Number of characters in a generated code (excluding prefix and postfix)         |
| `count`   |      `1`       | Number of codes generated.                                                      |
| `charset` | `alphanumeric` | Characters that can appear in the code.                                         |
| `prefix`  |      `""`      | A text appended before the code.                                                |
| `postfix` |      `""`      | A text appended after the code.                                                 |
| `pattern` |  `"########"`  | A pattern for codes where hashes (`#`) will be replaced with random characters. |

### Testing

Install dependencies:

```
yarn
```

Run tests:

```
yarn test
```

### Benchmarks

Benchmarks were run using the `benchmark` library on a 2019 Macbook Pro 2.6Ghz 6-Core Intel i7 with 32GB 2667MHz RAM

```
with 10 codes x 212,877 ops/sec ±1.81% (84 runs sampled)
with 100 codes x 24,421 ops/sec ±1.50% (86 runs sampled)
with 1000 codes x 2,278 ops/sec ±1.50% (84 runs sampled)
```

Run benchmarks:

```
yarn benchmark
```

### License

Code released under the [MIT license](LICENSE).
