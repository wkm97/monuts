# Monads Collection for typescript

Mimic Kotlin Result.

# Result Monad

## Properties

### isSuccess

Returns **true** if this instance represents a successful outcome. In this case isFailure returns **false**.

### isFailure

Returns **true** if this instance represents a failed outcome. In this case isSuccess returns **false**.

<br>

## Methods

### exceptionOrNull

```typescript
function exceptionOrNull(): E;
```

Returns the encapsulated **Throwable** exception if this instance represents **failure** or `null` if it is **success**.

This function is a shorthand for fold(success => null, error => error);

### getOrNull

```typescript
function getOrNull(): T;
```

Returns the encapsulated value if this instance represents **success** or null if it is **failure**.

### map

```typescript
function map<U>(transform: (value: T) => U): Result<U, E>;
```

Returns the encapsulated result of the given **transform** function applied to the encapsulated value if this instance represents **success** or the original encapsulated **Throwable** exception if it is **failure**.

### fold

```typescript
function fold<R>(onSuccess: (value: T) => R, onFailure: (err: E) => R): R;
```

Returns the result of **onSuccess** for the encapsulated value if this instance represents **success** or the result of **onFailure** function for the encapsulated **Throwable** exception if it is **failure**.

### onSuccess

```typescript
function onSuccess(action: (value: T) => void): Result<T, E>;
```

Performs the given **action** on the encapsulated value if this instance represents **success**. Returns the original `Result` unchanged.

### onFailure

```typescript
function onFailure(action: (err: E) => void): Result<T, E>;
```

Performs the given **action** on the encapsulated **Throwable** exception if this instance represents **failure**. Returns the original `Result` unchanged.

---

## Reference

- [Kotlin Result](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/)
- [Rust Result](https://doc.rust-lang.org/std/result/enum.Result.html)
- [sniptt-official(Repo)](https://github.dev/sniptt-official/monads)
- [typescript-monads(Repo)](https://github.dev/patrickmichalina/typescript-monads)
- [ts-results(Repo)](https://github.dev/vultix/ts-results)
- [result(Repo)](https://github.dev/badrap/result)
