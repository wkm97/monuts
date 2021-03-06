import { Result } from './Result_v3';

describe('Unit Test for Result', () => {
  test('exceptionOrNull for Result', () => {
    const ok = Result.success(123);
    const err = Result.failure(new Error('oh no'));

    expect(ok.exceptionOrNull()).toBeNull();
    expect(err.exceptionOrNull()).toBeInstanceOf(Error);

    expect(ok.isSuccess).toEqual(true);
    expect(ok.isFailure).toEqual(false);

    expect(err.isSuccess).toEqual(false);
    expect(err.isFailure).toEqual(true);
  });

  test('getOrNull for Result', () => {
    const ok = Result.success(123);
    const err = Result.failure(new Error('oh no'));

    expect(ok.getOrNull()).toEqual(123);
    expect(err.getOrNull()).toBeNull();
  });

  test('map for Result', () => {
    const ok = Result.success(123);
    const err: Result<number, Error> = Result.failure(new Error('oh no'));

    expect(ok.map(value => value + 2).getOrNull()).toEqual(125);
    expect(err.map(value => value + 2).exceptionOrNull()).toEqual(new Error('oh no'));
  });

  test('fold for Result', () => {
    const ok = Result.success(123);
    const err: Result<number, Error> = Result.failure(new Error('oh no'));
    let result = ok.fold({
      onSuccess: item => item + 2,
      onFailure: () => 10,
    });
    expect(result).toEqual(125);

    result = err.fold({
      onSuccess: item => item + 2,
      onFailure: () => 10,
    });
    expect(result).toEqual(10);
  });

  test('onSuccess for Result', () => {
    const ok: Result<number, Error> = Result.success(123);
    const err: Result<number, Error> = Result.failure(new Error('oh no'));

    let result = ok.onSuccess(value => {
      const newValue = value + 2;
      expect(newValue).toEqual(125);
    });
    expect(result.getOrNull()).toEqual(123);

    result = err.onFailure(error => {
      expect(error).toEqual(new Error('oh no'));
    });
    expect(result.exceptionOrNull()).toEqual(new Error('oh no'));
  });

  test('compare for Result', () => {
    const n1 = Result.success(1);
    const n2 = Result.success(1);

    console.log(n1.getOrNull() === n2.getOrNull());
  });
});
