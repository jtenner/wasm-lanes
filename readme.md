# wasm-lanes

An AssemblyScript library for dealing with SIMD in a more ergonomic way.

## Getting Started

To get started, install from github.

```
npm install jtenner/wasm-lanes
```

## Usage

Make sure you have SIMD enabled in your compilation.

```
asc entry.ts --enable simd [rest of parameters]
```

Then, import `SIMD` from the library in your AssemblyScript files.

```ts
import { SIMD } from "wasm-lanes";

let abcd = SIMD.load<i32>(somePointer); // Returns a SIMD<i32>
let efgh = SIMD.load<i32>(anotherPointer);

let sum = abcd.add(efgh); // zero cost abstraction after optimization
```

Operator overloads are implemented, so this is technically valid AssemblyScript, even though your
ide will report a TypeError because `SIMD<T>` is not a number.

```ts
let sum = abcd + efgh; // type error in your IDE (yuck!)
```

Instead, there is a way to force your IDE to recognize your SIMD value as `any` at the cost of
losing strongly typed information. The `ops` property is an identity property, but the `index.d.ts`
file returns `any` as the type, so your IDE will not complain about operator usage. Using this
feature may result in compile time errors.

```ts
let abcd = SIMD.splat<i32>(42).ops;
let efgh = SIMD.load<i32>(99).ops;

let sum = abcd + efgh; // much better
// sum is still a SIMD<i32> even though your IDE says it's any
```

The operators that are overloaded are as follows:

- Get lane `@operator("[]") @inline protected __get(index: i32): T`
- Unchecked get lane `@operator("{}") @inline protected __uget(index: i32): T`
- Multiplication `@operator("*") @inline public mul(operand: SIMD<T>): SIMD<T>`
- Division `@operator("/") @inline public div(operand: SIMD<T>): SIMD<T>`
- Addition `@operator("+") @inline public add(operand: SIMD<T>): SIMD<T>`
- Subtraction `@operator("-") @inline public sub(operand: SIMD<T>): SIMD<T>`
- Logical And `@operator("&") @inline public and(operand: SIMD<T>): SIMD<T>`
- Logical Or `@operator("|") @inline public or(operand: SIMD<T>): SIMD<T>`
- Logical Xor `@operator("^") @inline public xor(operand: SIMD<T>): SIMD<T>`
- Logical Not `@operator.prefix("~") @inline public not(): SIMD<T>`
- Truthy not `@operator.prefix("!") @inline public not_any_truthy(): bool`
- Shift left `@operator("<<") @inline public shl(operand: i32): SIMD<T>`
- Shift right `@operator(">>") @inline public shr(operand: i32): SIMD<T>`
- Less than `@operator("<") @inline public lt(operand: SIMD<T>): SIMD<T>`
- Greater than `@operator(">") @inline public gt(operand: SIMD<T>): SIMD<T>`
- Dot Product `@operator("%") @inline public dot(operand: SIMD<T>): SIMD<T>`
- Equals `@operator("==") @inline public eq(operand: SIMD<T>): bool`
- Not Equals `@operator("!=") @inline public neq(operand: SIMD<T>): bool`

## Casting to different types

You can cast a SIMD value to different lane types as a zero cost abstraction.

```ts
// create a SIMD with i32 lanes equivalent to 0xDEADBEEF
let a = SIMD.splat<i32>(0xDEADBEEF).i8; // 0 cost cast to signed 8-bit integer lanes
let b = a.f32; // 0 cost cast to f32 lanes
let c = a.u64; // 0 cost cast to u64 lanes
```

## license

```
Copyright 2020 Joshua Tenner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
