/// <reference path="../node_modules/assemblyscript/std/assembly/index.d.ts" />

export class SIMD<T> {
  [key: number]: T;

  /** Perform a * b + c for each lane. */
  public static qfma<U>(a: SIMD<U>, b: SIMD<U>, c: SIMD<U>): SIMD<U>;
  /** Perform a * b - c for each lane. */
  public static qfms<U>(a: SIMD<U>, b: SIMD<U>, c: SIMD<U>): SIMD<U>;
  /** Load a SIMD instance from a pointer and a type. */
  public static load<U>(ptr: usize): SIMD<U>;
  /** Create a SIMD with every lane set to value and a type. */
  public static splat<U>(value: U): SIMD<U>;
  /** Create a SIMD with every lane set to a value loaded from memory and a type. */
  public static load_splat<U>(ptr: usize): SIMD<U>;
  /** Convert a v128 to a SIMD<U> */
  public static from<U>(item: v128): SIMD<U>;
  /** Store all 128 bits at a given pointer. */
  public storeAt(pointer: usize): SIMD<T>
  /** Get the length of this SIMD instance. */
  readonly length: i32;
  /** Replace a lane of this SIMD value with the given value. */
  public replace_lane(index: i32, value: T): SIMD<T>;
  /** Replace a lane of this SIMD value with the given value. Unsafe! */
  public replace_lane_unchecked(index: i32, value: T): SIMD<T>;
  /** Determine if two SIMD<T> are equal. */
  public eq(operand: SIMD<T>): bool;
  /** Determine if two SIMD<T> are unequal. */
  public neq(operand: SIMD<T>): bool;
  /** Multiply two SIMD values together. */
  public mul(operand: SIMD<T>): SIMD<T>;
  /** Divide two SIMD values together. */
  public div(operand: SIMD<T>): SIMD<T>;
  /** Add two SIMD values together. */
  public add(operand: SIMD<T>): SIMD<T>;
  /** Subtract two SIMD values together. */
  public sub(operand: SIMD<T>): SIMD<T>;
  /** Logical and two SIMD values together. */
  public and(operand: SIMD<T>): SIMD<T>;
  /** Logical or two SIMD values together. */
  public or(operand: SIMD<T>): SIMD<T>;
  /** Logical xor two SIMD values together. */
  public xor(operand: SIMD<T>): SIMD<T>;
  /** Logical not of the SIMD value. */
  public not(): SIMD<T>;
  /** Returns true if every lane is falsy. */
  public not_any_truthy(): bool;
  /** Returns true of any lane is true. */
  public any_truthy(): bool;
  /** Cast the simd to a given type. */
  public as<U>(): SIMD<U>;
  /** Shift the bits left by a scalar. T must be an integer. */
  public shl(operand: i32): SIMD<T>;
  /** Shift the bits right by a scalar. T must be an integer. */
  public shr(operand: i32): SIMD<T>;
  /** Check if any lane is less than the operand's lane. */
  public lt(operand: SIMD<T>): SIMD<T>;
  /** Check if any lane is greater than the operand's lane. */
  public gt(operand: SIMD<T>): SIMD<T>;
  /** Perform the dot product with the operand. */
  public dot(operand: SIMD<T>): SIMD<T>;
  /** Perform the average between two SIMD values, rounding to the nearest whole number. */
  public avgr(operand: SIMD<T>): SIMD<T>;
  /** Returns the smallest value of each lane between two values. */
  public min(other: SIMD<T>): SIMD<T>;
  /** Returns the largest value of each lane between two values. */
  public max(other: SIMD<T>): SIMD<T>;
  /** Return the absolute value of each lane. */
  public abs(): SIMD<T>;
  /** Perform the sqrt of each lane. */
  public sqrt(): SIMD<T>;
  /** Truncate each lane to an integer value. */
  public trunc_sat<U>(): SIMD<U>;
  /** Cast this SIMD to have i8 lanes. */
  public readonly i8: SIMD<i8>;
  /** Cast this SIMD to have u8 lanes. */
  public readonly u8: SIMD<u8>;
  /** Cast this SIMD to have i16 lanes. */
  public readonly i16: SIMD<i16>;
  /** Cast this SIMD to have u16 lanes. */
  public readonly u16: SIMD<u16>;
  /** Cast this SIMD to have i32 lanes. */
  public readonly i32: SIMD<i32>;
  /** Cast this SIMD to have u32 lanes. */
  public readonly u32: SIMD<u32>;
  /** Cast this SIMD to have i64 lanes. */
  public readonly i64: SIMD<i64>;
  /** Cast this SIMD to have u64 lanes. */
  public readonly u64: SIMD<u64>;
  /** Cast this SIMD to have f32 lanes. */
  public readonly f32: SIMD<f32>;
  /** Cast this SIMD to have f64 lanes. */
  public readonly f64: SIMD<f64>;

  /** Suppress VSCode type errors by casting this value to any in your editor. */
  public readonly ops: any;
}
