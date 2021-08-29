abstract class BaseResult<V> {
  readonly isSuccess: boolean;
  readonly isFailure: boolean;
  protected readonly value: V;

  public constructor(value: V) {
    this.value = value;
  }
  public abstract exceptionOrNull(): V;
  public abstract getOrNull(): V;
  public abstract map<U>(transform: (value: V) => U): Success<U> | Failure<V>;
  public abstract fold<R>(onSuccess: (value: V) => R, onFailure: (err: V) => R): R;
  public abstract onSuccess(action: (value: V) => void): BaseResult<V>;
  public abstract onFailure(action: (err: V) => void): BaseResult<V>;
}

export class Success<T> extends BaseResult<T> {
  isSuccess = true;
  isFailure = false;

  public constructor(value: T) {
    super(value);
  }

  public exceptionOrNull(): T {
    return null;
  }

  public getOrNull(): T {
    return this.value;
  }

  public map<U>(transform: (value: T) => U): Success<U> {
    return new Success(transform(this.value));
  }

  public fold<R>(onSuccess: (value: T) => R, onFailure: (err: never) => R): R {
    return onSuccess(this.value);
  }

  public onSuccess(action: (value: T) => void): Success<T> {
    action(this.value);
    return this;
  }

  public onFailure(action: (err: T) => void): Success<T> {
    return this;
  }
}

export class Failure<E> extends BaseResult<E> {
  isSuccess = false;
  isFailure = true;

  public constructor(err: E) {
    super(err);
  }

  public exceptionOrNull(): E {
    return this.value;
  }

  public getOrNull(): E {
    return null;
  }

  public map<U>(transform: (err: E) => U): Failure<E> {
    return this;
  }

  public fold<R>(onSuccess: (value: never) => R, onFailure: (err: E) => R): R {
    return onFailure(this.value);
  }

  public onSuccess(action: (value: never) => void): BaseResult<E> {
    return this;
  }

  public onFailure(action: (err: E) => void): BaseResult<E> {
    action(this.value);
    return this;
  }
}

export type Result<T, E> = Success<T> | Failure<E>;
export namespace Result {
  export function success<T>(value: T) {
    return new Success(value);
  }

  export function failure<E>(err: E) {
    return new Failure(err);
  }
}

// export class Result<T, E> {
//   public static success<T>(value: T) {
//     return new Success(value);
//   }

//   public static failure<E>(err: E) {
//     return new Failure(err);
//   }
// }
