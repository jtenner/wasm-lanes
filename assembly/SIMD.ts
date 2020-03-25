
@unmanaged
export class SIMD<T> {
  [key: number]: T;

  @inline public static load<U>(ptr: usize): SIMD<U> {
    if (!isInteger<U>() || !isFloat<U>()) ERROR("Generic type of SIMD must be numeric.");
    return changetype<SIMD<U>>(v128.load(ptr));
  }

  @inline public static splat<U>(value: U): SIMD<U> {
    if (!isInteger<U>() || !isFloat<U>()) ERROR("Generic type of SIMD must be numeric.");
    return changetype<SIMD<U>>(v128.splat<U>(value));
  }
  @inline public static load_splat<U>(ptr: usize): SIMD<U> {
    if (!isInteger<U>() || !isFloat<U>()) ERROR("Generic type of SIMD must be numeric.");
    return changetype<SIMD<U>>(v128.load_splat<U>(ptr));
  }

  @inline public static from<U>(item: v128): SIMD<U> {
    if (!isInteger<U>() || !isFloat<U>()) ERROR("Generic type of SIMD must be numeric.");
    return changetype<SIMD<U>>(item);
  }

  @inline public get length(): i32 {
    return 16 / sizeof<T>();
  }

  @operator("[]") @inline protected __get(index: i32): T {
    assert(<u32>index < <u32>this.length);
    return this.__uget(index);
  }

  @operator("{}") @inline protected __uget(index: i32): T {
    return v128.extract_lane<T>(changetype<v128>(this), index);
  }

  @operator("*") @inline public mul(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.mul<T>(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator("/") @inline public div(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.div<T>(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator("+") @inline public add(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.add<T>(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator("-") @inline public sub(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.sub<T>(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator("&") @inline public and(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.and(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator("|") @inline public or(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.or(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator("^") @inline public xor(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.xor(changetype<v128>(this), changetype<v128>(operand))
    );
  }

  @operator.prefix("~") @inline public not(): SIMD<T> {
    return changetype<SIMD<T>>(v128.not(changetype<v128>(this)));
  }

  @operator.prefix("!") @inline public not_any_truthy(): bool {
    return !this.any_truthy;
  }

  @inline public any_truthy(): bool {
    return v128.any_true(changetype<v128>(this));
  }

  @inline public as<U>(): SIMD<U> {
    if (!isInteger<T>() || !isFloat<T>()) ERROR("Generic type of SIMD must be numeric.");
    return changetype<SIMD<U>>(this);
  }

  @inline @operator("<<") public shl(operand: i32): SIMD<T> {
    if (!isInteger<T>()) ERROR("Cannot perform shift left on non-integer simd wrapper.");
    return changetype<SIMD<T>>(
      v128.shl<T>(changetype<v128>(this), operand)
    );
  }

  @inline @operator(">>") public shr(operand: i32): SIMD<T> {
    if (!isInteger<T>()) ERROR("Cannot perform shift right on non-integer simd wrapper.");
    return changetype<SIMD<T>>(
      v128.shr<T>(changetype<v128>(this), operand)
    );
  }

  @inline @operator("<") public lt(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.lt<T>(changetype<v128>(this), operand)
    );
  }

  @inline @operator(">") public gt(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.gt<T>(changetype<v128>(this), operand)
    );
  }

  @inline @operator("%") public dot(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.dot<T>(changetype<v128>(this), operand)
    );
  }

  @inline public avgr(operand: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.avgr<T>(changetype<v128>(this), operand)
    );
  }

  @inline public min(other: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.min<T>(changetype<v128>(this), changetype<v128>(other))
    );
  }

  @inline public max(other: SIMD<T>): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.max<T>(changetype<v128>(this), changetype<v128>(other))
    );
  }

  @inline public abs(): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.abs<T>(changetype<v128>(this))
    );
  }

  @inline public get i8(): SIMD<i8> {
    return this.as<i8>()
  }

  @inline public get u8(): SIMD<u8> {
    return this.as<u8>();
  }

  @inline public get i16(): SIMD<i16> {
    return this.as<i16>();
  }

  @inline public get u16(): SIMD<u16> {
    return this.as<u16>();
  }

  @inline public get i32(): SIMD<i32> {
    return this.as<i32>();
  }

  @inline public get u32(): SIMD<u32> {
    return this.as<u32>();
  }

  @inline public get i64(): SIMD<i64> {
    return this.as<i64>();
  }

  @inline public get u64(): SIMD<u64> {
    return this.as<u64>();
  }

  @inline public get f32(): SIMD<f32> {
    return this.as<f32>();
  }

  @inline public get f64(): SIMD<f64> {
    return this.as<f64>();
  }

  @inline public sqrt(): SIMD<T> {
    return changetype<SIMD<T>>(
      v128.sqrt(changetype<v128>(this))
    );
  }

  @inline public trunc_sat<U>(): SIMD<U> {
    if (alignof<T>() !== alignof<U>()) ERROR("Invalid type argument: must have same alignment as T");
    if (!isFloat<T>()) ERROR("Invalid type: SIMD must be float value");
    if (!isInteger<U>()) ERROR("Invlaid type argument: must be integer type.");
    return changetype<SIMD<U>>(
      v128.trunc_sat<U>(changetype<v128>(this))
    );
  }

  @inline public get ops(): SIMD<T> { return this; }

  @inline public storeAt(pointer: usize): SIMD<T> {
    v128.store(pointer, changetype<v128>(this));
    return this;
  }
}
