export abstract class Result<T = true, E = Error> {
  readonly isSuccess: boolean;
  readonly isFailure: boolean;
  protected value: T = null;
  protected err: E = null;

  public abstract exceptionOrNull(): E;
  public abstract getOrNull(): T;
  public abstract map<U>(transform: (value: T) => U): Result<U, E>;
  public abstract fold<R>(fn: { onSuccess: (value: T) => R; onFailure: (err: E) => R }): R;
  public abstract onSuccess(action: (value: T) => void): Result<T, E>;
  public abstract onFailure(action: (err: E) => void): Result<T, E>;

  public static success<T>(value: T) {
    return new Success(value);
  }

  public static failure<E>(err: E) {
    return new Failure(err);
  }
}

export class Success<T> extends Result<T, null> {
  isSuccess = true;
  isFailure = false;

  public constructor(value: T) {
    super();
    this.value = value;
  }

  public exceptionOrNull(): null {
    return null;
  }

  public getOrNull(): T {
    return this.value;
  }

  public map<U>(transform: (value: T) => U): Success<U> {
    return new Success(transform(this.value));
  }

  public fold<R>(fn: { onSuccess: (value: T) => R; onFailure: (err: never) => R }) {
    return fn.onSuccess(this.value);
  }

  public onSuccess(action: (value: T) => void): Success<T> {
    action(this.value);
    return this;
  }

  public onFailure(action: (err: never) => void): Success<T> {
    return this;
  }
}

export class Failure<E> extends Result<null, E> {
  isSuccess = false;
  isFailure = true;

  public constructor(err: E) {
    super();
    this.err = err;
  }

  public exceptionOrNull(): E {
    return this.err;
  }

  public getOrNull(): null {
    return null;
  }

  public map<U>(transform: (value: never) => U): Failure<E> {
    return this;
  }

  public fold<R>(fn: { onSuccess: (value: never) => R; onFailure: (err: E) => R }) {
    return fn.onFailure(this.err);
  }

  public onSuccess(action: (value: never) => void): Failure<E> {
    return this;
  }

  public onFailure(action: (err: E) => void): Failure<E> {
    action(this.err);
    return this;
  }
}
