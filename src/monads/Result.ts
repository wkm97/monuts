/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

/*
  Usage
  -------------------------
  Result<T, E> = Success<T, null> | Failure<null, E>
    Success is a result => extends
    Failure is a result => extends
  
  missing from kotlin:
    getOrDefault
    getOrElse
    getOrThrow

*/
export interface IResult<T, E> {
  readonly isSuccess: boolean;
  readonly isFailure: boolean;
  exceptionOrNull(): E;
  getOrNull(): T;
  map<U>(transform: (value: T) => U): Result<U, E>;
  fold<R>(onSuccess: (value: T) => R, onFailure: (err: E) => R): R;
  onSuccess(action: (value: T) => void): Result<T, E>;
  onFailure(action: (err: E) => void): Result<T, E>;
}

class Success<T, E> implements IResult<T, E> {
  isSuccess = true;
  isFailure = false;
  private value: T;

  public constructor(value: T) {
    this.value = value;
  }

  public safeUnwrap() {
    return this.value;
  }

  public exceptionOrNull(): null {
    return null;
  }

  public getOrNull() {
    return this.value;
  }

  public map<U>(transform: (value: T) => U): Success<U, E> {
    return new Success(transform(this.value));
  }

  public fold<R>(onSuccess: (value: T) => R, onFailure: (err: null) => R) {
    return onSuccess(this.value);
  }

  public onSuccess(action: (value: T) => void): Result<T, E> {
    action(this.value);
    return this;
  }

  public onFailure(action: (err: E) => void): Result<T, E> {
    return this;
  }
}

class Failure<T, E> implements IResult<T, E> {
  isSuccess = false;
  isFailure = true;
  private err: E;

  public constructor(err: E) {
    this.err = err;
  }

  public exceptionOrNull(): E {
    return this.err;
  }

  public getOrNull(): null {
    return null;
  }

  public map<U>(transform: (value: T) => U): Failure<U, E> {
    return new Failure(this.err);
  }

  public fold<R>(onSuccess: (value: T) => R, onFailure: (err: E) => R) {
    return onFailure(this.err);
  }

  public onSuccess(action: (value: T) => void): Result<T, E> {
    return this;
  }

  public onFailure(action: (err: E) => void): Result<T, E> {
    action(this.err);
    return this;
  }
}

export type Result<T, E> = Success<T, E> | Failure<T, E>;

// eslint-disable-next-line no-redeclare
export namespace Result {
  export function success<T, E>(value: T): Success<T, E> {
    return new Success(value);
  }

  export function failure<T, E>(err: E): Failure<T, E> {
    return new Failure(err);
  }
}
