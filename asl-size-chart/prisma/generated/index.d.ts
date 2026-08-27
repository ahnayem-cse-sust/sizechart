
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model SizeChart
 * 
 */
export type SizeChart = $Result.DefaultSelection<Prisma.$SizeChartPayload>
/**
 * Model Template
 * 
 */
export type Template = $Result.DefaultSelection<Prisma.$TemplatePayload>
/**
 * Model TemplateContent
 * 
 */
export type TemplateContent = $Result.DefaultSelection<Prisma.$TemplateContentPayload>
/**
 * Model Chart
 * 
 */
export type Chart = $Result.DefaultSelection<Prisma.$ChartPayload>
/**
 * Model ChartContent
 * 
 */
export type ChartContent = $Result.DefaultSelection<Prisma.$ChartContentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sizeChart`: Exposes CRUD operations for the **SizeChart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SizeCharts
    * const sizeCharts = await prisma.sizeChart.findMany()
    * ```
    */
  get sizeChart(): Prisma.SizeChartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templateContent`: Exposes CRUD operations for the **TemplateContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplateContents
    * const templateContents = await prisma.templateContent.findMany()
    * ```
    */
  get templateContent(): Prisma.TemplateContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chart`: Exposes CRUD operations for the **Chart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Charts
    * const charts = await prisma.chart.findMany()
    * ```
    */
  get chart(): Prisma.ChartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chartContent`: Exposes CRUD operations for the **ChartContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChartContents
    * const chartContents = await prisma.chartContent.findMany()
    * ```
    */
  get chartContent(): Prisma.ChartContentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    SizeChart: 'SizeChart',
    Template: 'Template',
    TemplateContent: 'TemplateContent',
    Chart: 'Chart',
    ChartContent: 'ChartContent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "session" | "sizeChart" | "template" | "templateContent" | "chart" | "chartContent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      SizeChart: {
        payload: Prisma.$SizeChartPayload<ExtArgs>
        fields: Prisma.SizeChartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SizeChartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SizeChartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>
          }
          findFirst: {
            args: Prisma.SizeChartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SizeChartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>
          }
          findMany: {
            args: Prisma.SizeChartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>[]
          }
          create: {
            args: Prisma.SizeChartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>
          }
          createMany: {
            args: Prisma.SizeChartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SizeChartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>[]
          }
          delete: {
            args: Prisma.SizeChartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>
          }
          update: {
            args: Prisma.SizeChartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>
          }
          deleteMany: {
            args: Prisma.SizeChartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SizeChartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SizeChartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>[]
          }
          upsert: {
            args: Prisma.SizeChartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SizeChartPayload>
          }
          aggregate: {
            args: Prisma.SizeChartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSizeChart>
          }
          groupBy: {
            args: Prisma.SizeChartGroupByArgs<ExtArgs>
            result: $Utils.Optional<SizeChartGroupByOutputType>[]
          }
          count: {
            args: Prisma.SizeChartCountArgs<ExtArgs>
            result: $Utils.Optional<SizeChartCountAggregateOutputType> | number
          }
        }
      }
      Template: {
        payload: Prisma.$TemplatePayload<ExtArgs>
        fields: Prisma.TemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findFirst: {
            args: Prisma.TemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findMany: {
            args: Prisma.TemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          create: {
            args: Prisma.TemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          createMany: {
            args: Prisma.TemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          delete: {
            args: Prisma.TemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          update: {
            args: Prisma.TemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          deleteMany: {
            args: Prisma.TemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          upsert: {
            args: Prisma.TemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.TemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      TemplateContent: {
        payload: Prisma.$TemplateContentPayload<ExtArgs>
        fields: Prisma.TemplateContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>
          }
          findFirst: {
            args: Prisma.TemplateContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>
          }
          findMany: {
            args: Prisma.TemplateContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>[]
          }
          create: {
            args: Prisma.TemplateContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>
          }
          createMany: {
            args: Prisma.TemplateContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>[]
          }
          delete: {
            args: Prisma.TemplateContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>
          }
          update: {
            args: Prisma.TemplateContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>
          }
          deleteMany: {
            args: Prisma.TemplateContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>[]
          }
          upsert: {
            args: Prisma.TemplateContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateContentPayload>
          }
          aggregate: {
            args: Prisma.TemplateContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplateContent>
          }
          groupBy: {
            args: Prisma.TemplateContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateContentCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateContentCountAggregateOutputType> | number
          }
        }
      }
      Chart: {
        payload: Prisma.$ChartPayload<ExtArgs>
        fields: Prisma.ChartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          findFirst: {
            args: Prisma.ChartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          findMany: {
            args: Prisma.ChartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>[]
          }
          create: {
            args: Prisma.ChartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          createMany: {
            args: Prisma.ChartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>[]
          }
          delete: {
            args: Prisma.ChartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          update: {
            args: Prisma.ChartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          deleteMany: {
            args: Prisma.ChartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>[]
          }
          upsert: {
            args: Prisma.ChartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          aggregate: {
            args: Prisma.ChartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChart>
          }
          groupBy: {
            args: Prisma.ChartGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChartGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChartCountArgs<ExtArgs>
            result: $Utils.Optional<ChartCountAggregateOutputType> | number
          }
        }
      }
      ChartContent: {
        payload: Prisma.$ChartContentPayload<ExtArgs>
        fields: Prisma.ChartContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChartContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChartContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>
          }
          findFirst: {
            args: Prisma.ChartContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChartContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>
          }
          findMany: {
            args: Prisma.ChartContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>[]
          }
          create: {
            args: Prisma.ChartContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>
          }
          createMany: {
            args: Prisma.ChartContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChartContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>[]
          }
          delete: {
            args: Prisma.ChartContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>
          }
          update: {
            args: Prisma.ChartContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>
          }
          deleteMany: {
            args: Prisma.ChartContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChartContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChartContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>[]
          }
          upsert: {
            args: Prisma.ChartContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartContentPayload>
          }
          aggregate: {
            args: Prisma.ChartContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChartContent>
          }
          groupBy: {
            args: Prisma.ChartContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChartContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChartContentCountArgs<ExtArgs>
            result: $Utils.Optional<ChartContentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    session?: SessionOmit
    sizeChart?: SizeChartOmit
    template?: TemplateOmit
    templateContent?: TemplateContentOmit
    chart?: ChartOmit
    chartContent?: ChartContentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionSumAggregateOutputType = {
    userId: bigint | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    shop: number
    state: number
    isOnline: number
    scope: number
    expires: number
    accessToken: number
    userId: number
    firstName: number
    lastName: number
    email: number
    accountOwner: number
    locale: number
    collaborator: number
    emailVerified: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    userId?: true
  }

  export type SessionSumAggregateInputType = {
    userId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    shop: string
    state: string
    isOnline: boolean
    scope: string | null
    expires: Date | null
    accessToken: string
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "state" | "isOnline" | "scope" | "expires" | "accessToken" | "userId" | "firstName" | "lastName" | "email" | "accountOwner" | "locale" | "collaborator" | "emailVerified", ExtArgs["result"]["session"]>

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      state: string
      isOnline: boolean
      scope: string | null
      expires: Date | null
      accessToken: string
      userId: bigint | null
      firstName: string | null
      lastName: string | null
      email: string | null
      accountOwner: boolean
      locale: string | null
      collaborator: boolean | null
      emailVerified: boolean | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly shop: FieldRef<"Session", 'String'>
    readonly state: FieldRef<"Session", 'String'>
    readonly isOnline: FieldRef<"Session", 'Boolean'>
    readonly scope: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly accessToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'BigInt'>
    readonly firstName: FieldRef<"Session", 'String'>
    readonly lastName: FieldRef<"Session", 'String'>
    readonly email: FieldRef<"Session", 'String'>
    readonly accountOwner: FieldRef<"Session", 'Boolean'>
    readonly locale: FieldRef<"Session", 'String'>
    readonly collaborator: FieldRef<"Session", 'Boolean'>
    readonly emailVerified: FieldRef<"Session", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
  }


  /**
   * Model SizeChart
   */

  export type AggregateSizeChart = {
    _count: SizeChartCountAggregateOutputType | null
    _avg: SizeChartAvgAggregateOutputType | null
    _sum: SizeChartSumAggregateOutputType | null
    _min: SizeChartMinAggregateOutputType | null
    _max: SizeChartMaxAggregateOutputType | null
  }

  export type SizeChartAvgAggregateOutputType = {
    id: number | null
  }

  export type SizeChartSumAggregateOutputType = {
    id: number | null
  }

  export type SizeChartMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SizeChartMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SizeChartCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SizeChartAvgAggregateInputType = {
    id?: true
  }

  export type SizeChartSumAggregateInputType = {
    id?: true
  }

  export type SizeChartMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SizeChartMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SizeChartCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SizeChartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SizeChart to aggregate.
     */
    where?: SizeChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeCharts to fetch.
     */
    orderBy?: SizeChartOrderByWithRelationInput | SizeChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SizeChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeCharts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SizeCharts
    **/
    _count?: true | SizeChartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SizeChartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SizeChartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SizeChartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SizeChartMaxAggregateInputType
  }

  export type GetSizeChartAggregateType<T extends SizeChartAggregateArgs> = {
        [P in keyof T & keyof AggregateSizeChart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSizeChart[P]>
      : GetScalarType<T[P], AggregateSizeChart[P]>
  }




  export type SizeChartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SizeChartWhereInput
    orderBy?: SizeChartOrderByWithAggregationInput | SizeChartOrderByWithAggregationInput[]
    by: SizeChartScalarFieldEnum[] | SizeChartScalarFieldEnum
    having?: SizeChartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SizeChartCountAggregateInputType | true
    _avg?: SizeChartAvgAggregateInputType
    _sum?: SizeChartSumAggregateInputType
    _min?: SizeChartMinAggregateInputType
    _max?: SizeChartMaxAggregateInputType
  }

  export type SizeChartGroupByOutputType = {
    id: number
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: SizeChartCountAggregateOutputType | null
    _avg: SizeChartAvgAggregateOutputType | null
    _sum: SizeChartSumAggregateOutputType | null
    _min: SizeChartMinAggregateOutputType | null
    _max: SizeChartMaxAggregateOutputType | null
  }

  type GetSizeChartGroupByPayload<T extends SizeChartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SizeChartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SizeChartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SizeChartGroupByOutputType[P]>
            : GetScalarType<T[P], SizeChartGroupByOutputType[P]>
        }
      >
    >


  export type SizeChartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sizeChart"]>

  export type SizeChartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sizeChart"]>

  export type SizeChartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sizeChart"]>

  export type SizeChartSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SizeChartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["sizeChart"]>

  export type $SizeChartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SizeChart"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sizeChart"]>
    composites: {}
  }

  type SizeChartGetPayload<S extends boolean | null | undefined | SizeChartDefaultArgs> = $Result.GetResult<Prisma.$SizeChartPayload, S>

  type SizeChartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SizeChartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: SizeChartCountAggregateInputType | true
    }

  export interface SizeChartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SizeChart'], meta: { name: 'SizeChart' } }
    /**
     * Find zero or one SizeChart that matches the filter.
     * @param {SizeChartFindUniqueArgs} args - Arguments to find a SizeChart
     * @example
     * // Get one SizeChart
     * const sizeChart = await prisma.sizeChart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SizeChartFindUniqueArgs>(args: SelectSubset<T, SizeChartFindUniqueArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SizeChart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SizeChartFindUniqueOrThrowArgs} args - Arguments to find a SizeChart
     * @example
     * // Get one SizeChart
     * const sizeChart = await prisma.sizeChart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SizeChartFindUniqueOrThrowArgs>(args: SelectSubset<T, SizeChartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SizeChart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartFindFirstArgs} args - Arguments to find a SizeChart
     * @example
     * // Get one SizeChart
     * const sizeChart = await prisma.sizeChart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SizeChartFindFirstArgs>(args?: SelectSubset<T, SizeChartFindFirstArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SizeChart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartFindFirstOrThrowArgs} args - Arguments to find a SizeChart
     * @example
     * // Get one SizeChart
     * const sizeChart = await prisma.sizeChart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SizeChartFindFirstOrThrowArgs>(args?: SelectSubset<T, SizeChartFindFirstOrThrowArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SizeCharts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SizeCharts
     * const sizeCharts = await prisma.sizeChart.findMany()
     * 
     * // Get first 10 SizeCharts
     * const sizeCharts = await prisma.sizeChart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sizeChartWithIdOnly = await prisma.sizeChart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SizeChartFindManyArgs>(args?: SelectSubset<T, SizeChartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SizeChart.
     * @param {SizeChartCreateArgs} args - Arguments to create a SizeChart.
     * @example
     * // Create one SizeChart
     * const SizeChart = await prisma.sizeChart.create({
     *   data: {
     *     // ... data to create a SizeChart
     *   }
     * })
     * 
     */
    create<T extends SizeChartCreateArgs>(args: SelectSubset<T, SizeChartCreateArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SizeCharts.
     * @param {SizeChartCreateManyArgs} args - Arguments to create many SizeCharts.
     * @example
     * // Create many SizeCharts
     * const sizeChart = await prisma.sizeChart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SizeChartCreateManyArgs>(args?: SelectSubset<T, SizeChartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SizeCharts and returns the data saved in the database.
     * @param {SizeChartCreateManyAndReturnArgs} args - Arguments to create many SizeCharts.
     * @example
     * // Create many SizeCharts
     * const sizeChart = await prisma.sizeChart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SizeCharts and only return the `id`
     * const sizeChartWithIdOnly = await prisma.sizeChart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SizeChartCreateManyAndReturnArgs>(args?: SelectSubset<T, SizeChartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SizeChart.
     * @param {SizeChartDeleteArgs} args - Arguments to delete one SizeChart.
     * @example
     * // Delete one SizeChart
     * const SizeChart = await prisma.sizeChart.delete({
     *   where: {
     *     // ... filter to delete one SizeChart
     *   }
     * })
     * 
     */
    delete<T extends SizeChartDeleteArgs>(args: SelectSubset<T, SizeChartDeleteArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SizeChart.
     * @param {SizeChartUpdateArgs} args - Arguments to update one SizeChart.
     * @example
     * // Update one SizeChart
     * const sizeChart = await prisma.sizeChart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SizeChartUpdateArgs>(args: SelectSubset<T, SizeChartUpdateArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SizeCharts.
     * @param {SizeChartDeleteManyArgs} args - Arguments to filter SizeCharts to delete.
     * @example
     * // Delete a few SizeCharts
     * const { count } = await prisma.sizeChart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SizeChartDeleteManyArgs>(args?: SelectSubset<T, SizeChartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SizeCharts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SizeCharts
     * const sizeChart = await prisma.sizeChart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SizeChartUpdateManyArgs>(args: SelectSubset<T, SizeChartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SizeCharts and returns the data updated in the database.
     * @param {SizeChartUpdateManyAndReturnArgs} args - Arguments to update many SizeCharts.
     * @example
     * // Update many SizeCharts
     * const sizeChart = await prisma.sizeChart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SizeCharts and only return the `id`
     * const sizeChartWithIdOnly = await prisma.sizeChart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SizeChartUpdateManyAndReturnArgs>(args: SelectSubset<T, SizeChartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SizeChart.
     * @param {SizeChartUpsertArgs} args - Arguments to update or create a SizeChart.
     * @example
     * // Update or create a SizeChart
     * const sizeChart = await prisma.sizeChart.upsert({
     *   create: {
     *     // ... data to create a SizeChart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SizeChart we want to update
     *   }
     * })
     */
    upsert<T extends SizeChartUpsertArgs>(args: SelectSubset<T, SizeChartUpsertArgs<ExtArgs>>): Prisma__SizeChartClient<$Result.GetResult<Prisma.$SizeChartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SizeCharts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartCountArgs} args - Arguments to filter SizeCharts to count.
     * @example
     * // Count the number of SizeCharts
     * const count = await prisma.sizeChart.count({
     *   where: {
     *     // ... the filter for the SizeCharts we want to count
     *   }
     * })
    **/
    count<T extends SizeChartCountArgs>(
      args?: Subset<T, SizeChartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SizeChartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SizeChart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SizeChartAggregateArgs>(args: Subset<T, SizeChartAggregateArgs>): Prisma.PrismaPromise<GetSizeChartAggregateType<T>>

    /**
     * Group by SizeChart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SizeChartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SizeChartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SizeChartGroupByArgs['orderBy'] }
        : { orderBy?: SizeChartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SizeChartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSizeChartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SizeChart model
   */
  readonly fields: SizeChartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SizeChart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SizeChartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SizeChart model
   */
  interface SizeChartFieldRefs {
    readonly id: FieldRef<"SizeChart", 'Int'>
    readonly title: FieldRef<"SizeChart", 'String'>
    readonly content: FieldRef<"SizeChart", 'String'>
    readonly createdAt: FieldRef<"SizeChart", 'DateTime'>
    readonly updatedAt: FieldRef<"SizeChart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SizeChart findUnique
   */
  export type SizeChartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * Filter, which SizeChart to fetch.
     */
    where: SizeChartWhereUniqueInput
  }

  /**
   * SizeChart findUniqueOrThrow
   */
  export type SizeChartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * Filter, which SizeChart to fetch.
     */
    where: SizeChartWhereUniqueInput
  }

  /**
   * SizeChart findFirst
   */
  export type SizeChartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * Filter, which SizeChart to fetch.
     */
    where?: SizeChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeCharts to fetch.
     */
    orderBy?: SizeChartOrderByWithRelationInput | SizeChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SizeCharts.
     */
    cursor?: SizeChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeCharts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SizeCharts.
     */
    distinct?: SizeChartScalarFieldEnum | SizeChartScalarFieldEnum[]
  }

  /**
   * SizeChart findFirstOrThrow
   */
  export type SizeChartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * Filter, which SizeChart to fetch.
     */
    where?: SizeChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeCharts to fetch.
     */
    orderBy?: SizeChartOrderByWithRelationInput | SizeChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SizeCharts.
     */
    cursor?: SizeChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeCharts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SizeCharts.
     */
    distinct?: SizeChartScalarFieldEnum | SizeChartScalarFieldEnum[]
  }

  /**
   * SizeChart findMany
   */
  export type SizeChartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * Filter, which SizeCharts to fetch.
     */
    where?: SizeChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SizeCharts to fetch.
     */
    orderBy?: SizeChartOrderByWithRelationInput | SizeChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SizeCharts.
     */
    cursor?: SizeChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SizeCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SizeCharts.
     */
    skip?: number
    distinct?: SizeChartScalarFieldEnum | SizeChartScalarFieldEnum[]
  }

  /**
   * SizeChart create
   */
  export type SizeChartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * The data needed to create a SizeChart.
     */
    data: XOR<SizeChartCreateInput, SizeChartUncheckedCreateInput>
  }

  /**
   * SizeChart createMany
   */
  export type SizeChartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SizeCharts.
     */
    data: SizeChartCreateManyInput | SizeChartCreateManyInput[]
  }

  /**
   * SizeChart createManyAndReturn
   */
  export type SizeChartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * The data used to create many SizeCharts.
     */
    data: SizeChartCreateManyInput | SizeChartCreateManyInput[]
  }

  /**
   * SizeChart update
   */
  export type SizeChartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * The data needed to update a SizeChart.
     */
    data: XOR<SizeChartUpdateInput, SizeChartUncheckedUpdateInput>
    /**
     * Choose, which SizeChart to update.
     */
    where: SizeChartWhereUniqueInput
  }

  /**
   * SizeChart updateMany
   */
  export type SizeChartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SizeCharts.
     */
    data: XOR<SizeChartUpdateManyMutationInput, SizeChartUncheckedUpdateManyInput>
    /**
     * Filter which SizeCharts to update
     */
    where?: SizeChartWhereInput
    /**
     * Limit how many SizeCharts to update.
     */
    limit?: number
  }

  /**
   * SizeChart updateManyAndReturn
   */
  export type SizeChartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * The data used to update SizeCharts.
     */
    data: XOR<SizeChartUpdateManyMutationInput, SizeChartUncheckedUpdateManyInput>
    /**
     * Filter which SizeCharts to update
     */
    where?: SizeChartWhereInput
    /**
     * Limit how many SizeCharts to update.
     */
    limit?: number
  }

  /**
   * SizeChart upsert
   */
  export type SizeChartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * The filter to search for the SizeChart to update in case it exists.
     */
    where: SizeChartWhereUniqueInput
    /**
     * In case the SizeChart found by the `where` argument doesn't exist, create a new SizeChart with this data.
     */
    create: XOR<SizeChartCreateInput, SizeChartUncheckedCreateInput>
    /**
     * In case the SizeChart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SizeChartUpdateInput, SizeChartUncheckedUpdateInput>
  }

  /**
   * SizeChart delete
   */
  export type SizeChartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
    /**
     * Filter which SizeChart to delete.
     */
    where: SizeChartWhereUniqueInput
  }

  /**
   * SizeChart deleteMany
   */
  export type SizeChartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SizeCharts to delete
     */
    where?: SizeChartWhereInput
    /**
     * Limit how many SizeCharts to delete.
     */
    limit?: number
  }

  /**
   * SizeChart without action
   */
  export type SizeChartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SizeChart
     */
    select?: SizeChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SizeChart
     */
    omit?: SizeChartOmit<ExtArgs> | null
  }


  /**
   * Model Template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateAvgAggregateOutputType = {
    id: number | null
  }

  export type TemplateSumAggregateOutputType = {
    id: number | null
  }

  export type TemplateMinAggregateOutputType = {
    id: number | null
    title: string | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: number | null
    title: string | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    title: number
    category: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplateAvgAggregateInputType = {
    id?: true
  }

  export type TemplateSumAggregateInputType = {
    id?: true
  }

  export type TemplateMinAggregateInputType = {
    id?: true
    title?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    title?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    title?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithAggregationInput | TemplateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _avg?: TemplateAvgAggregateInputType
    _sum?: TemplateSumAggregateInputType
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: number
    title: string
    category: string
    createdAt: Date
    updatedAt: Date
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectScalar = {
    id?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "category" | "createdAt" | "updatedAt", ExtArgs["result"]["template"]>

  export type $TemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Template"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      category: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type TemplateGetPayload<S extends boolean | null | undefined | TemplateDefaultArgs> = $Result.GetResult<Prisma.$TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFindUniqueArgs>(args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFindFirstArgs>(args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFindManyArgs>(args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends TemplateCreateArgs>(args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateCreateManyArgs>(args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {TemplateCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends TemplateDeleteArgs>(args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateUpdateArgs>(args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateDeleteManyArgs>(args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateUpdateManyArgs>(args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates and returns the data updated in the database.
     * @param {TemplateUpdateManyAndReturnArgs} args - Arguments to update many Templates.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends TemplateUpsertArgs>(args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Template model
   */
  readonly fields: TemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Template model
   */
  interface TemplateFieldRefs {
    readonly id: FieldRef<"Template", 'Int'>
    readonly title: FieldRef<"Template", 'String'>
    readonly category: FieldRef<"Template", 'String'>
    readonly createdAt: FieldRef<"Template", 'DateTime'>
    readonly updatedAt: FieldRef<"Template", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Template findUnique
   */
  export type TemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findFirst
   */
  export type TemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }

  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
  }

  /**
   * Template createManyAndReturn
   */
  export type TemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
  }

  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template updateManyAndReturn
   */
  export type TemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }

  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to delete.
     */
    limit?: number
  }

  /**
   * Template without action
   */
  export type TemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
  }


  /**
   * Model TemplateContent
   */

  export type AggregateTemplateContent = {
    _count: TemplateContentCountAggregateOutputType | null
    _avg: TemplateContentAvgAggregateOutputType | null
    _sum: TemplateContentSumAggregateOutputType | null
    _min: TemplateContentMinAggregateOutputType | null
    _max: TemplateContentMaxAggregateOutputType | null
  }

  export type TemplateContentAvgAggregateOutputType = {
    id: number | null
    serial_no: number | null
    template_id: number | null
  }

  export type TemplateContentSumAggregateOutputType = {
    id: number | null
    serial_no: number | null
    template_id: number | null
  }

  export type TemplateContentMinAggregateOutputType = {
    id: number | null
    serial_no: number | null
    template_id: number | null
    content_type: string | null
    content_obj: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateContentMaxAggregateOutputType = {
    id: number | null
    serial_no: number | null
    template_id: number | null
    content_type: string | null
    content_obj: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateContentCountAggregateOutputType = {
    id: number
    serial_no: number
    template_id: number
    content_type: number
    content_obj: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplateContentAvgAggregateInputType = {
    id?: true
    serial_no?: true
    template_id?: true
  }

  export type TemplateContentSumAggregateInputType = {
    id?: true
    serial_no?: true
    template_id?: true
  }

  export type TemplateContentMinAggregateInputType = {
    id?: true
    serial_no?: true
    template_id?: true
    content_type?: true
    content_obj?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateContentMaxAggregateInputType = {
    id?: true
    serial_no?: true
    template_id?: true
    content_type?: true
    content_obj?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateContentCountAggregateInputType = {
    id?: true
    serial_no?: true
    template_id?: true
    content_type?: true
    content_obj?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplateContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateContent to aggregate.
     */
    where?: TemplateContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateContents to fetch.
     */
    orderBy?: TemplateContentOrderByWithRelationInput | TemplateContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplateContents
    **/
    _count?: true | TemplateContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateContentMaxAggregateInputType
  }

  export type GetTemplateContentAggregateType<T extends TemplateContentAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplateContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplateContent[P]>
      : GetScalarType<T[P], AggregateTemplateContent[P]>
  }




  export type TemplateContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateContentWhereInput
    orderBy?: TemplateContentOrderByWithAggregationInput | TemplateContentOrderByWithAggregationInput[]
    by: TemplateContentScalarFieldEnum[] | TemplateContentScalarFieldEnum
    having?: TemplateContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateContentCountAggregateInputType | true
    _avg?: TemplateContentAvgAggregateInputType
    _sum?: TemplateContentSumAggregateInputType
    _min?: TemplateContentMinAggregateInputType
    _max?: TemplateContentMaxAggregateInputType
  }

  export type TemplateContentGroupByOutputType = {
    id: number
    serial_no: number
    template_id: number
    content_type: string
    content_obj: string
    createdAt: Date
    updatedAt: Date
    _count: TemplateContentCountAggregateOutputType | null
    _avg: TemplateContentAvgAggregateOutputType | null
    _sum: TemplateContentSumAggregateOutputType | null
    _min: TemplateContentMinAggregateOutputType | null
    _max: TemplateContentMaxAggregateOutputType | null
  }

  type GetTemplateContentGroupByPayload<T extends TemplateContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateContentGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateContentGroupByOutputType[P]>
        }
      >
    >


  export type TemplateContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serial_no?: boolean
    template_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["templateContent"]>

  export type TemplateContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serial_no?: boolean
    template_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["templateContent"]>

  export type TemplateContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serial_no?: boolean
    template_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["templateContent"]>

  export type TemplateContentSelectScalar = {
    id?: boolean
    serial_no?: boolean
    template_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplateContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serial_no" | "template_id" | "content_type" | "content_obj" | "createdAt" | "updatedAt", ExtArgs["result"]["templateContent"]>

  export type $TemplateContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplateContent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serial_no: number
      template_id: number
      content_type: string
      content_obj: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["templateContent"]>
    composites: {}
  }

  type TemplateContentGetPayload<S extends boolean | null | undefined | TemplateContentDefaultArgs> = $Result.GetResult<Prisma.$TemplateContentPayload, S>

  type TemplateContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: TemplateContentCountAggregateInputType | true
    }

  export interface TemplateContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplateContent'], meta: { name: 'TemplateContent' } }
    /**
     * Find zero or one TemplateContent that matches the filter.
     * @param {TemplateContentFindUniqueArgs} args - Arguments to find a TemplateContent
     * @example
     * // Get one TemplateContent
     * const templateContent = await prisma.templateContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateContentFindUniqueArgs>(args: SelectSubset<T, TemplateContentFindUniqueArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplateContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateContentFindUniqueOrThrowArgs} args - Arguments to find a TemplateContent
     * @example
     * // Get one TemplateContent
     * const templateContent = await prisma.templateContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateContentFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentFindFirstArgs} args - Arguments to find a TemplateContent
     * @example
     * // Get one TemplateContent
     * const templateContent = await prisma.templateContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateContentFindFirstArgs>(args?: SelectSubset<T, TemplateContentFindFirstArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentFindFirstOrThrowArgs} args - Arguments to find a TemplateContent
     * @example
     * // Get one TemplateContent
     * const templateContent = await prisma.templateContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateContentFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplateContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplateContents
     * const templateContents = await prisma.templateContent.findMany()
     * 
     * // Get first 10 TemplateContents
     * const templateContents = await prisma.templateContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateContentWithIdOnly = await prisma.templateContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateContentFindManyArgs>(args?: SelectSubset<T, TemplateContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplateContent.
     * @param {TemplateContentCreateArgs} args - Arguments to create a TemplateContent.
     * @example
     * // Create one TemplateContent
     * const TemplateContent = await prisma.templateContent.create({
     *   data: {
     *     // ... data to create a TemplateContent
     *   }
     * })
     * 
     */
    create<T extends TemplateContentCreateArgs>(args: SelectSubset<T, TemplateContentCreateArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplateContents.
     * @param {TemplateContentCreateManyArgs} args - Arguments to create many TemplateContents.
     * @example
     * // Create many TemplateContents
     * const templateContent = await prisma.templateContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateContentCreateManyArgs>(args?: SelectSubset<T, TemplateContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemplateContents and returns the data saved in the database.
     * @param {TemplateContentCreateManyAndReturnArgs} args - Arguments to create many TemplateContents.
     * @example
     * // Create many TemplateContents
     * const templateContent = await prisma.templateContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemplateContents and only return the `id`
     * const templateContentWithIdOnly = await prisma.templateContent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateContentCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemplateContent.
     * @param {TemplateContentDeleteArgs} args - Arguments to delete one TemplateContent.
     * @example
     * // Delete one TemplateContent
     * const TemplateContent = await prisma.templateContent.delete({
     *   where: {
     *     // ... filter to delete one TemplateContent
     *   }
     * })
     * 
     */
    delete<T extends TemplateContentDeleteArgs>(args: SelectSubset<T, TemplateContentDeleteArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplateContent.
     * @param {TemplateContentUpdateArgs} args - Arguments to update one TemplateContent.
     * @example
     * // Update one TemplateContent
     * const templateContent = await prisma.templateContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateContentUpdateArgs>(args: SelectSubset<T, TemplateContentUpdateArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplateContents.
     * @param {TemplateContentDeleteManyArgs} args - Arguments to filter TemplateContents to delete.
     * @example
     * // Delete a few TemplateContents
     * const { count } = await prisma.templateContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateContentDeleteManyArgs>(args?: SelectSubset<T, TemplateContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplateContents
     * const templateContent = await prisma.templateContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateContentUpdateManyArgs>(args: SelectSubset<T, TemplateContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateContents and returns the data updated in the database.
     * @param {TemplateContentUpdateManyAndReturnArgs} args - Arguments to update many TemplateContents.
     * @example
     * // Update many TemplateContents
     * const templateContent = await prisma.templateContent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemplateContents and only return the `id`
     * const templateContentWithIdOnly = await prisma.templateContent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateContentUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemplateContent.
     * @param {TemplateContentUpsertArgs} args - Arguments to update or create a TemplateContent.
     * @example
     * // Update or create a TemplateContent
     * const templateContent = await prisma.templateContent.upsert({
     *   create: {
     *     // ... data to create a TemplateContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplateContent we want to update
     *   }
     * })
     */
    upsert<T extends TemplateContentUpsertArgs>(args: SelectSubset<T, TemplateContentUpsertArgs<ExtArgs>>): Prisma__TemplateContentClient<$Result.GetResult<Prisma.$TemplateContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplateContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentCountArgs} args - Arguments to filter TemplateContents to count.
     * @example
     * // Count the number of TemplateContents
     * const count = await prisma.templateContent.count({
     *   where: {
     *     // ... the filter for the TemplateContents we want to count
     *   }
     * })
    **/
    count<T extends TemplateContentCountArgs>(
      args?: Subset<T, TemplateContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplateContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateContentAggregateArgs>(args: Subset<T, TemplateContentAggregateArgs>): Prisma.PrismaPromise<GetTemplateContentAggregateType<T>>

    /**
     * Group by TemplateContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateContentGroupByArgs['orderBy'] }
        : { orderBy?: TemplateContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplateContent model
   */
  readonly fields: TemplateContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplateContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TemplateContent model
   */
  interface TemplateContentFieldRefs {
    readonly id: FieldRef<"TemplateContent", 'Int'>
    readonly serial_no: FieldRef<"TemplateContent", 'Int'>
    readonly template_id: FieldRef<"TemplateContent", 'Int'>
    readonly content_type: FieldRef<"TemplateContent", 'String'>
    readonly content_obj: FieldRef<"TemplateContent", 'String'>
    readonly createdAt: FieldRef<"TemplateContent", 'DateTime'>
    readonly updatedAt: FieldRef<"TemplateContent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TemplateContent findUnique
   */
  export type TemplateContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * Filter, which TemplateContent to fetch.
     */
    where: TemplateContentWhereUniqueInput
  }

  /**
   * TemplateContent findUniqueOrThrow
   */
  export type TemplateContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * Filter, which TemplateContent to fetch.
     */
    where: TemplateContentWhereUniqueInput
  }

  /**
   * TemplateContent findFirst
   */
  export type TemplateContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * Filter, which TemplateContent to fetch.
     */
    where?: TemplateContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateContents to fetch.
     */
    orderBy?: TemplateContentOrderByWithRelationInput | TemplateContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateContents.
     */
    cursor?: TemplateContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateContents.
     */
    distinct?: TemplateContentScalarFieldEnum | TemplateContentScalarFieldEnum[]
  }

  /**
   * TemplateContent findFirstOrThrow
   */
  export type TemplateContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * Filter, which TemplateContent to fetch.
     */
    where?: TemplateContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateContents to fetch.
     */
    orderBy?: TemplateContentOrderByWithRelationInput | TemplateContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateContents.
     */
    cursor?: TemplateContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateContents.
     */
    distinct?: TemplateContentScalarFieldEnum | TemplateContentScalarFieldEnum[]
  }

  /**
   * TemplateContent findMany
   */
  export type TemplateContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * Filter, which TemplateContents to fetch.
     */
    where?: TemplateContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateContents to fetch.
     */
    orderBy?: TemplateContentOrderByWithRelationInput | TemplateContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplateContents.
     */
    cursor?: TemplateContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateContents.
     */
    skip?: number
    distinct?: TemplateContentScalarFieldEnum | TemplateContentScalarFieldEnum[]
  }

  /**
   * TemplateContent create
   */
  export type TemplateContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * The data needed to create a TemplateContent.
     */
    data: XOR<TemplateContentCreateInput, TemplateContentUncheckedCreateInput>
  }

  /**
   * TemplateContent createMany
   */
  export type TemplateContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplateContents.
     */
    data: TemplateContentCreateManyInput | TemplateContentCreateManyInput[]
  }

  /**
   * TemplateContent createManyAndReturn
   */
  export type TemplateContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * The data used to create many TemplateContents.
     */
    data: TemplateContentCreateManyInput | TemplateContentCreateManyInput[]
  }

  /**
   * TemplateContent update
   */
  export type TemplateContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * The data needed to update a TemplateContent.
     */
    data: XOR<TemplateContentUpdateInput, TemplateContentUncheckedUpdateInput>
    /**
     * Choose, which TemplateContent to update.
     */
    where: TemplateContentWhereUniqueInput
  }

  /**
   * TemplateContent updateMany
   */
  export type TemplateContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplateContents.
     */
    data: XOR<TemplateContentUpdateManyMutationInput, TemplateContentUncheckedUpdateManyInput>
    /**
     * Filter which TemplateContents to update
     */
    where?: TemplateContentWhereInput
    /**
     * Limit how many TemplateContents to update.
     */
    limit?: number
  }

  /**
   * TemplateContent updateManyAndReturn
   */
  export type TemplateContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * The data used to update TemplateContents.
     */
    data: XOR<TemplateContentUpdateManyMutationInput, TemplateContentUncheckedUpdateManyInput>
    /**
     * Filter which TemplateContents to update
     */
    where?: TemplateContentWhereInput
    /**
     * Limit how many TemplateContents to update.
     */
    limit?: number
  }

  /**
   * TemplateContent upsert
   */
  export type TemplateContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * The filter to search for the TemplateContent to update in case it exists.
     */
    where: TemplateContentWhereUniqueInput
    /**
     * In case the TemplateContent found by the `where` argument doesn't exist, create a new TemplateContent with this data.
     */
    create: XOR<TemplateContentCreateInput, TemplateContentUncheckedCreateInput>
    /**
     * In case the TemplateContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateContentUpdateInput, TemplateContentUncheckedUpdateInput>
  }

  /**
   * TemplateContent delete
   */
  export type TemplateContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
    /**
     * Filter which TemplateContent to delete.
     */
    where: TemplateContentWhereUniqueInput
  }

  /**
   * TemplateContent deleteMany
   */
  export type TemplateContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateContents to delete
     */
    where?: TemplateContentWhereInput
    /**
     * Limit how many TemplateContents to delete.
     */
    limit?: number
  }

  /**
   * TemplateContent without action
   */
  export type TemplateContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateContent
     */
    select?: TemplateContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateContent
     */
    omit?: TemplateContentOmit<ExtArgs> | null
  }


  /**
   * Model Chart
   */

  export type AggregateChart = {
    _count: ChartCountAggregateOutputType | null
    _avg: ChartAvgAggregateOutputType | null
    _sum: ChartSumAggregateOutputType | null
    _min: ChartMinAggregateOutputType | null
    _max: ChartMaxAggregateOutputType | null
  }

  export type ChartAvgAggregateOutputType = {
    id: number | null
  }

  export type ChartSumAggregateOutputType = {
    id: number | null
  }

  export type ChartMinAggregateOutputType = {
    id: number | null
    title: string | null
    available_sizes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChartMaxAggregateOutputType = {
    id: number | null
    title: string | null
    available_sizes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChartCountAggregateOutputType = {
    id: number
    title: number
    available_sizes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChartAvgAggregateInputType = {
    id?: true
  }

  export type ChartSumAggregateInputType = {
    id?: true
  }

  export type ChartMinAggregateInputType = {
    id?: true
    title?: true
    available_sizes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChartMaxAggregateInputType = {
    id?: true
    title?: true
    available_sizes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChartCountAggregateInputType = {
    id?: true
    title?: true
    available_sizes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chart to aggregate.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Charts
    **/
    _count?: true | ChartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChartMaxAggregateInputType
  }

  export type GetChartAggregateType<T extends ChartAggregateArgs> = {
        [P in keyof T & keyof AggregateChart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChart[P]>
      : GetScalarType<T[P], AggregateChart[P]>
  }




  export type ChartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChartWhereInput
    orderBy?: ChartOrderByWithAggregationInput | ChartOrderByWithAggregationInput[]
    by: ChartScalarFieldEnum[] | ChartScalarFieldEnum
    having?: ChartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChartCountAggregateInputType | true
    _avg?: ChartAvgAggregateInputType
    _sum?: ChartSumAggregateInputType
    _min?: ChartMinAggregateInputType
    _max?: ChartMaxAggregateInputType
  }

  export type ChartGroupByOutputType = {
    id: number
    title: string
    available_sizes: string
    createdAt: Date
    updatedAt: Date
    _count: ChartCountAggregateOutputType | null
    _avg: ChartAvgAggregateOutputType | null
    _sum: ChartSumAggregateOutputType | null
    _min: ChartMinAggregateOutputType | null
    _max: ChartMaxAggregateOutputType | null
  }

  type GetChartGroupByPayload<T extends ChartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChartGroupByOutputType[P]>
            : GetScalarType<T[P], ChartGroupByOutputType[P]>
        }
      >
    >


  export type ChartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    available_sizes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chart"]>

  export type ChartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    available_sizes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chart"]>

  export type ChartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    available_sizes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chart"]>

  export type ChartSelectScalar = {
    id?: boolean
    title?: boolean
    available_sizes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "available_sizes" | "createdAt" | "updatedAt", ExtArgs["result"]["chart"]>

  export type $ChartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chart"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      available_sizes: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chart"]>
    composites: {}
  }

  type ChartGetPayload<S extends boolean | null | undefined | ChartDefaultArgs> = $Result.GetResult<Prisma.$ChartPayload, S>

  type ChartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ChartCountAggregateInputType | true
    }

  export interface ChartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chart'], meta: { name: 'Chart' } }
    /**
     * Find zero or one Chart that matches the filter.
     * @param {ChartFindUniqueArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChartFindUniqueArgs>(args: SelectSubset<T, ChartFindUniqueArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChartFindUniqueOrThrowArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChartFindUniqueOrThrowArgs>(args: SelectSubset<T, ChartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartFindFirstArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChartFindFirstArgs>(args?: SelectSubset<T, ChartFindFirstArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartFindFirstOrThrowArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChartFindFirstOrThrowArgs>(args?: SelectSubset<T, ChartFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Charts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Charts
     * const charts = await prisma.chart.findMany()
     * 
     * // Get first 10 Charts
     * const charts = await prisma.chart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chartWithIdOnly = await prisma.chart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChartFindManyArgs>(args?: SelectSubset<T, ChartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chart.
     * @param {ChartCreateArgs} args - Arguments to create a Chart.
     * @example
     * // Create one Chart
     * const Chart = await prisma.chart.create({
     *   data: {
     *     // ... data to create a Chart
     *   }
     * })
     * 
     */
    create<T extends ChartCreateArgs>(args: SelectSubset<T, ChartCreateArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Charts.
     * @param {ChartCreateManyArgs} args - Arguments to create many Charts.
     * @example
     * // Create many Charts
     * const chart = await prisma.chart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChartCreateManyArgs>(args?: SelectSubset<T, ChartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Charts and returns the data saved in the database.
     * @param {ChartCreateManyAndReturnArgs} args - Arguments to create many Charts.
     * @example
     * // Create many Charts
     * const chart = await prisma.chart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Charts and only return the `id`
     * const chartWithIdOnly = await prisma.chart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChartCreateManyAndReturnArgs>(args?: SelectSubset<T, ChartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chart.
     * @param {ChartDeleteArgs} args - Arguments to delete one Chart.
     * @example
     * // Delete one Chart
     * const Chart = await prisma.chart.delete({
     *   where: {
     *     // ... filter to delete one Chart
     *   }
     * })
     * 
     */
    delete<T extends ChartDeleteArgs>(args: SelectSubset<T, ChartDeleteArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chart.
     * @param {ChartUpdateArgs} args - Arguments to update one Chart.
     * @example
     * // Update one Chart
     * const chart = await prisma.chart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChartUpdateArgs>(args: SelectSubset<T, ChartUpdateArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Charts.
     * @param {ChartDeleteManyArgs} args - Arguments to filter Charts to delete.
     * @example
     * // Delete a few Charts
     * const { count } = await prisma.chart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChartDeleteManyArgs>(args?: SelectSubset<T, ChartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Charts
     * const chart = await prisma.chart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChartUpdateManyArgs>(args: SelectSubset<T, ChartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charts and returns the data updated in the database.
     * @param {ChartUpdateManyAndReturnArgs} args - Arguments to update many Charts.
     * @example
     * // Update many Charts
     * const chart = await prisma.chart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Charts and only return the `id`
     * const chartWithIdOnly = await prisma.chart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChartUpdateManyAndReturnArgs>(args: SelectSubset<T, ChartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chart.
     * @param {ChartUpsertArgs} args - Arguments to update or create a Chart.
     * @example
     * // Update or create a Chart
     * const chart = await prisma.chart.upsert({
     *   create: {
     *     // ... data to create a Chart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chart we want to update
     *   }
     * })
     */
    upsert<T extends ChartUpsertArgs>(args: SelectSubset<T, ChartUpsertArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Charts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartCountArgs} args - Arguments to filter Charts to count.
     * @example
     * // Count the number of Charts
     * const count = await prisma.chart.count({
     *   where: {
     *     // ... the filter for the Charts we want to count
     *   }
     * })
    **/
    count<T extends ChartCountArgs>(
      args?: Subset<T, ChartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChartAggregateArgs>(args: Subset<T, ChartAggregateArgs>): Prisma.PrismaPromise<GetChartAggregateType<T>>

    /**
     * Group by Chart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChartGroupByArgs['orderBy'] }
        : { orderBy?: ChartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chart model
   */
  readonly fields: ChartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chart model
   */
  interface ChartFieldRefs {
    readonly id: FieldRef<"Chart", 'Int'>
    readonly title: FieldRef<"Chart", 'String'>
    readonly available_sizes: FieldRef<"Chart", 'String'>
    readonly createdAt: FieldRef<"Chart", 'DateTime'>
    readonly updatedAt: FieldRef<"Chart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chart findUnique
   */
  export type ChartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart findUniqueOrThrow
   */
  export type ChartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart findFirst
   */
  export type ChartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charts.
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charts.
     */
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * Chart findFirstOrThrow
   */
  export type ChartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charts.
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charts.
     */
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * Chart findMany
   */
  export type ChartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Filter, which Charts to fetch.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Charts.
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * Chart create
   */
  export type ChartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * The data needed to create a Chart.
     */
    data: XOR<ChartCreateInput, ChartUncheckedCreateInput>
  }

  /**
   * Chart createMany
   */
  export type ChartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Charts.
     */
    data: ChartCreateManyInput | ChartCreateManyInput[]
  }

  /**
   * Chart createManyAndReturn
   */
  export type ChartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * The data used to create many Charts.
     */
    data: ChartCreateManyInput | ChartCreateManyInput[]
  }

  /**
   * Chart update
   */
  export type ChartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * The data needed to update a Chart.
     */
    data: XOR<ChartUpdateInput, ChartUncheckedUpdateInput>
    /**
     * Choose, which Chart to update.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart updateMany
   */
  export type ChartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Charts.
     */
    data: XOR<ChartUpdateManyMutationInput, ChartUncheckedUpdateManyInput>
    /**
     * Filter which Charts to update
     */
    where?: ChartWhereInput
    /**
     * Limit how many Charts to update.
     */
    limit?: number
  }

  /**
   * Chart updateManyAndReturn
   */
  export type ChartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * The data used to update Charts.
     */
    data: XOR<ChartUpdateManyMutationInput, ChartUncheckedUpdateManyInput>
    /**
     * Filter which Charts to update
     */
    where?: ChartWhereInput
    /**
     * Limit how many Charts to update.
     */
    limit?: number
  }

  /**
   * Chart upsert
   */
  export type ChartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * The filter to search for the Chart to update in case it exists.
     */
    where: ChartWhereUniqueInput
    /**
     * In case the Chart found by the `where` argument doesn't exist, create a new Chart with this data.
     */
    create: XOR<ChartCreateInput, ChartUncheckedCreateInput>
    /**
     * In case the Chart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChartUpdateInput, ChartUncheckedUpdateInput>
  }

  /**
   * Chart delete
   */
  export type ChartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Filter which Chart to delete.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart deleteMany
   */
  export type ChartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Charts to delete
     */
    where?: ChartWhereInput
    /**
     * Limit how many Charts to delete.
     */
    limit?: number
  }

  /**
   * Chart without action
   */
  export type ChartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
  }


  /**
   * Model ChartContent
   */

  export type AggregateChartContent = {
    _count: ChartContentCountAggregateOutputType | null
    _avg: ChartContentAvgAggregateOutputType | null
    _sum: ChartContentSumAggregateOutputType | null
    _min: ChartContentMinAggregateOutputType | null
    _max: ChartContentMaxAggregateOutputType | null
  }

  export type ChartContentAvgAggregateOutputType = {
    id: number | null
    serial_no: number | null
    chart_id: number | null
  }

  export type ChartContentSumAggregateOutputType = {
    id: number | null
    serial_no: number | null
    chart_id: number | null
  }

  export type ChartContentMinAggregateOutputType = {
    id: number | null
    serial_no: number | null
    chart_id: number | null
    content_type: string | null
    content_obj: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChartContentMaxAggregateOutputType = {
    id: number | null
    serial_no: number | null
    chart_id: number | null
    content_type: string | null
    content_obj: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChartContentCountAggregateOutputType = {
    id: number
    serial_no: number
    chart_id: number
    content_type: number
    content_obj: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChartContentAvgAggregateInputType = {
    id?: true
    serial_no?: true
    chart_id?: true
  }

  export type ChartContentSumAggregateInputType = {
    id?: true
    serial_no?: true
    chart_id?: true
  }

  export type ChartContentMinAggregateInputType = {
    id?: true
    serial_no?: true
    chart_id?: true
    content_type?: true
    content_obj?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChartContentMaxAggregateInputType = {
    id?: true
    serial_no?: true
    chart_id?: true
    content_type?: true
    content_obj?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChartContentCountAggregateInputType = {
    id?: true
    serial_no?: true
    chart_id?: true
    content_type?: true
    content_obj?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChartContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChartContent to aggregate.
     */
    where?: ChartContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChartContents to fetch.
     */
    orderBy?: ChartContentOrderByWithRelationInput | ChartContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChartContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChartContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChartContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChartContents
    **/
    _count?: true | ChartContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChartContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChartContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChartContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChartContentMaxAggregateInputType
  }

  export type GetChartContentAggregateType<T extends ChartContentAggregateArgs> = {
        [P in keyof T & keyof AggregateChartContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChartContent[P]>
      : GetScalarType<T[P], AggregateChartContent[P]>
  }




  export type ChartContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChartContentWhereInput
    orderBy?: ChartContentOrderByWithAggregationInput | ChartContentOrderByWithAggregationInput[]
    by: ChartContentScalarFieldEnum[] | ChartContentScalarFieldEnum
    having?: ChartContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChartContentCountAggregateInputType | true
    _avg?: ChartContentAvgAggregateInputType
    _sum?: ChartContentSumAggregateInputType
    _min?: ChartContentMinAggregateInputType
    _max?: ChartContentMaxAggregateInputType
  }

  export type ChartContentGroupByOutputType = {
    id: number
    serial_no: number
    chart_id: number
    content_type: string
    content_obj: string
    createdAt: Date
    updatedAt: Date
    _count: ChartContentCountAggregateOutputType | null
    _avg: ChartContentAvgAggregateOutputType | null
    _sum: ChartContentSumAggregateOutputType | null
    _min: ChartContentMinAggregateOutputType | null
    _max: ChartContentMaxAggregateOutputType | null
  }

  type GetChartContentGroupByPayload<T extends ChartContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChartContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChartContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChartContentGroupByOutputType[P]>
            : GetScalarType<T[P], ChartContentGroupByOutputType[P]>
        }
      >
    >


  export type ChartContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serial_no?: boolean
    chart_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chartContent"]>

  export type ChartContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serial_no?: boolean
    chart_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chartContent"]>

  export type ChartContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serial_no?: boolean
    chart_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chartContent"]>

  export type ChartContentSelectScalar = {
    id?: boolean
    serial_no?: boolean
    chart_id?: boolean
    content_type?: boolean
    content_obj?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChartContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serial_no" | "chart_id" | "content_type" | "content_obj" | "createdAt" | "updatedAt", ExtArgs["result"]["chartContent"]>

  export type $ChartContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChartContent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serial_no: number
      chart_id: number
      content_type: string
      content_obj: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chartContent"]>
    composites: {}
  }

  type ChartContentGetPayload<S extends boolean | null | undefined | ChartContentDefaultArgs> = $Result.GetResult<Prisma.$ChartContentPayload, S>

  type ChartContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChartContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ChartContentCountAggregateInputType | true
    }

  export interface ChartContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChartContent'], meta: { name: 'ChartContent' } }
    /**
     * Find zero or one ChartContent that matches the filter.
     * @param {ChartContentFindUniqueArgs} args - Arguments to find a ChartContent
     * @example
     * // Get one ChartContent
     * const chartContent = await prisma.chartContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChartContentFindUniqueArgs>(args: SelectSubset<T, ChartContentFindUniqueArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChartContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChartContentFindUniqueOrThrowArgs} args - Arguments to find a ChartContent
     * @example
     * // Get one ChartContent
     * const chartContent = await prisma.chartContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChartContentFindUniqueOrThrowArgs>(args: SelectSubset<T, ChartContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChartContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentFindFirstArgs} args - Arguments to find a ChartContent
     * @example
     * // Get one ChartContent
     * const chartContent = await prisma.chartContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChartContentFindFirstArgs>(args?: SelectSubset<T, ChartContentFindFirstArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChartContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentFindFirstOrThrowArgs} args - Arguments to find a ChartContent
     * @example
     * // Get one ChartContent
     * const chartContent = await prisma.chartContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChartContentFindFirstOrThrowArgs>(args?: SelectSubset<T, ChartContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChartContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChartContents
     * const chartContents = await prisma.chartContent.findMany()
     * 
     * // Get first 10 ChartContents
     * const chartContents = await prisma.chartContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chartContentWithIdOnly = await prisma.chartContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChartContentFindManyArgs>(args?: SelectSubset<T, ChartContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChartContent.
     * @param {ChartContentCreateArgs} args - Arguments to create a ChartContent.
     * @example
     * // Create one ChartContent
     * const ChartContent = await prisma.chartContent.create({
     *   data: {
     *     // ... data to create a ChartContent
     *   }
     * })
     * 
     */
    create<T extends ChartContentCreateArgs>(args: SelectSubset<T, ChartContentCreateArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChartContents.
     * @param {ChartContentCreateManyArgs} args - Arguments to create many ChartContents.
     * @example
     * // Create many ChartContents
     * const chartContent = await prisma.chartContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChartContentCreateManyArgs>(args?: SelectSubset<T, ChartContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChartContents and returns the data saved in the database.
     * @param {ChartContentCreateManyAndReturnArgs} args - Arguments to create many ChartContents.
     * @example
     * // Create many ChartContents
     * const chartContent = await prisma.chartContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChartContents and only return the `id`
     * const chartContentWithIdOnly = await prisma.chartContent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChartContentCreateManyAndReturnArgs>(args?: SelectSubset<T, ChartContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChartContent.
     * @param {ChartContentDeleteArgs} args - Arguments to delete one ChartContent.
     * @example
     * // Delete one ChartContent
     * const ChartContent = await prisma.chartContent.delete({
     *   where: {
     *     // ... filter to delete one ChartContent
     *   }
     * })
     * 
     */
    delete<T extends ChartContentDeleteArgs>(args: SelectSubset<T, ChartContentDeleteArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChartContent.
     * @param {ChartContentUpdateArgs} args - Arguments to update one ChartContent.
     * @example
     * // Update one ChartContent
     * const chartContent = await prisma.chartContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChartContentUpdateArgs>(args: SelectSubset<T, ChartContentUpdateArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChartContents.
     * @param {ChartContentDeleteManyArgs} args - Arguments to filter ChartContents to delete.
     * @example
     * // Delete a few ChartContents
     * const { count } = await prisma.chartContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChartContentDeleteManyArgs>(args?: SelectSubset<T, ChartContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChartContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChartContents
     * const chartContent = await prisma.chartContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChartContentUpdateManyArgs>(args: SelectSubset<T, ChartContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChartContents and returns the data updated in the database.
     * @param {ChartContentUpdateManyAndReturnArgs} args - Arguments to update many ChartContents.
     * @example
     * // Update many ChartContents
     * const chartContent = await prisma.chartContent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChartContents and only return the `id`
     * const chartContentWithIdOnly = await prisma.chartContent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChartContentUpdateManyAndReturnArgs>(args: SelectSubset<T, ChartContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChartContent.
     * @param {ChartContentUpsertArgs} args - Arguments to update or create a ChartContent.
     * @example
     * // Update or create a ChartContent
     * const chartContent = await prisma.chartContent.upsert({
     *   create: {
     *     // ... data to create a ChartContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChartContent we want to update
     *   }
     * })
     */
    upsert<T extends ChartContentUpsertArgs>(args: SelectSubset<T, ChartContentUpsertArgs<ExtArgs>>): Prisma__ChartContentClient<$Result.GetResult<Prisma.$ChartContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChartContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentCountArgs} args - Arguments to filter ChartContents to count.
     * @example
     * // Count the number of ChartContents
     * const count = await prisma.chartContent.count({
     *   where: {
     *     // ... the filter for the ChartContents we want to count
     *   }
     * })
    **/
    count<T extends ChartContentCountArgs>(
      args?: Subset<T, ChartContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChartContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChartContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChartContentAggregateArgs>(args: Subset<T, ChartContentAggregateArgs>): Prisma.PrismaPromise<GetChartContentAggregateType<T>>

    /**
     * Group by ChartContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChartContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChartContentGroupByArgs['orderBy'] }
        : { orderBy?: ChartContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChartContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChartContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChartContent model
   */
  readonly fields: ChartContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChartContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChartContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChartContent model
   */
  interface ChartContentFieldRefs {
    readonly id: FieldRef<"ChartContent", 'Int'>
    readonly serial_no: FieldRef<"ChartContent", 'Int'>
    readonly chart_id: FieldRef<"ChartContent", 'Int'>
    readonly content_type: FieldRef<"ChartContent", 'String'>
    readonly content_obj: FieldRef<"ChartContent", 'String'>
    readonly createdAt: FieldRef<"ChartContent", 'DateTime'>
    readonly updatedAt: FieldRef<"ChartContent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChartContent findUnique
   */
  export type ChartContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * Filter, which ChartContent to fetch.
     */
    where: ChartContentWhereUniqueInput
  }

  /**
   * ChartContent findUniqueOrThrow
   */
  export type ChartContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * Filter, which ChartContent to fetch.
     */
    where: ChartContentWhereUniqueInput
  }

  /**
   * ChartContent findFirst
   */
  export type ChartContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * Filter, which ChartContent to fetch.
     */
    where?: ChartContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChartContents to fetch.
     */
    orderBy?: ChartContentOrderByWithRelationInput | ChartContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChartContents.
     */
    cursor?: ChartContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChartContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChartContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChartContents.
     */
    distinct?: ChartContentScalarFieldEnum | ChartContentScalarFieldEnum[]
  }

  /**
   * ChartContent findFirstOrThrow
   */
  export type ChartContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * Filter, which ChartContent to fetch.
     */
    where?: ChartContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChartContents to fetch.
     */
    orderBy?: ChartContentOrderByWithRelationInput | ChartContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChartContents.
     */
    cursor?: ChartContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChartContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChartContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChartContents.
     */
    distinct?: ChartContentScalarFieldEnum | ChartContentScalarFieldEnum[]
  }

  /**
   * ChartContent findMany
   */
  export type ChartContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * Filter, which ChartContents to fetch.
     */
    where?: ChartContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChartContents to fetch.
     */
    orderBy?: ChartContentOrderByWithRelationInput | ChartContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChartContents.
     */
    cursor?: ChartContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChartContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChartContents.
     */
    skip?: number
    distinct?: ChartContentScalarFieldEnum | ChartContentScalarFieldEnum[]
  }

  /**
   * ChartContent create
   */
  export type ChartContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * The data needed to create a ChartContent.
     */
    data: XOR<ChartContentCreateInput, ChartContentUncheckedCreateInput>
  }

  /**
   * ChartContent createMany
   */
  export type ChartContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChartContents.
     */
    data: ChartContentCreateManyInput | ChartContentCreateManyInput[]
  }

  /**
   * ChartContent createManyAndReturn
   */
  export type ChartContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * The data used to create many ChartContents.
     */
    data: ChartContentCreateManyInput | ChartContentCreateManyInput[]
  }

  /**
   * ChartContent update
   */
  export type ChartContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * The data needed to update a ChartContent.
     */
    data: XOR<ChartContentUpdateInput, ChartContentUncheckedUpdateInput>
    /**
     * Choose, which ChartContent to update.
     */
    where: ChartContentWhereUniqueInput
  }

  /**
   * ChartContent updateMany
   */
  export type ChartContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChartContents.
     */
    data: XOR<ChartContentUpdateManyMutationInput, ChartContentUncheckedUpdateManyInput>
    /**
     * Filter which ChartContents to update
     */
    where?: ChartContentWhereInput
    /**
     * Limit how many ChartContents to update.
     */
    limit?: number
  }

  /**
   * ChartContent updateManyAndReturn
   */
  export type ChartContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * The data used to update ChartContents.
     */
    data: XOR<ChartContentUpdateManyMutationInput, ChartContentUncheckedUpdateManyInput>
    /**
     * Filter which ChartContents to update
     */
    where?: ChartContentWhereInput
    /**
     * Limit how many ChartContents to update.
     */
    limit?: number
  }

  /**
   * ChartContent upsert
   */
  export type ChartContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * The filter to search for the ChartContent to update in case it exists.
     */
    where: ChartContentWhereUniqueInput
    /**
     * In case the ChartContent found by the `where` argument doesn't exist, create a new ChartContent with this data.
     */
    create: XOR<ChartContentCreateInput, ChartContentUncheckedCreateInput>
    /**
     * In case the ChartContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChartContentUpdateInput, ChartContentUncheckedUpdateInput>
  }

  /**
   * ChartContent delete
   */
  export type ChartContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
    /**
     * Filter which ChartContent to delete.
     */
    where: ChartContentWhereUniqueInput
  }

  /**
   * ChartContent deleteMany
   */
  export type ChartContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChartContents to delete
     */
    where?: ChartContentWhereInput
    /**
     * Limit how many ChartContents to delete.
     */
    limit?: number
  }

  /**
   * ChartContent without action
   */
  export type ChartContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartContent
     */
    select?: ChartContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChartContent
     */
    omit?: ChartContentOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SessionScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    state: 'state',
    isOnline: 'isOnline',
    scope: 'scope',
    expires: 'expires',
    accessToken: 'accessToken',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    accountOwner: 'accountOwner',
    locale: 'locale',
    collaborator: 'collaborator',
    emailVerified: 'emailVerified'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SizeChartScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SizeChartScalarFieldEnum = (typeof SizeChartScalarFieldEnum)[keyof typeof SizeChartScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    title: 'title',
    category: 'category',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const TemplateContentScalarFieldEnum: {
    id: 'id',
    serial_no: 'serial_no',
    template_id: 'template_id',
    content_type: 'content_type',
    content_obj: 'content_obj',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplateContentScalarFieldEnum = (typeof TemplateContentScalarFieldEnum)[keyof typeof TemplateContentScalarFieldEnum]


  export const ChartScalarFieldEnum: {
    id: 'id',
    title: 'title',
    available_sizes: 'available_sizes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChartScalarFieldEnum = (typeof ChartScalarFieldEnum)[keyof typeof ChartScalarFieldEnum]


  export const ChartContentScalarFieldEnum: {
    id: 'id',
    serial_no: 'serial_no',
    chart_id: 'chart_id',
    content_type: 'content_type',
    content_obj: 'content_obj',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChartContentScalarFieldEnum = (typeof ChartContentScalarFieldEnum)[keyof typeof ChartContentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntNullableFilter<"Session"> | bigint | number | null
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntNullableFilter<"Session"> | bigint | number | null
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    shop?: StringWithAggregatesFilter<"Session"> | string
    state?: StringWithAggregatesFilter<"Session"> | string
    isOnline?: BoolWithAggregatesFilter<"Session"> | boolean
    scope?: StringNullableWithAggregatesFilter<"Session"> | string | null
    expires?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    accessToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: BigIntNullableWithAggregatesFilter<"Session"> | bigint | number | null
    firstName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    email?: StringNullableWithAggregatesFilter<"Session"> | string | null
    accountOwner?: BoolWithAggregatesFilter<"Session"> | boolean
    locale?: StringNullableWithAggregatesFilter<"Session"> | string | null
    collaborator?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
  }

  export type SizeChartWhereInput = {
    AND?: SizeChartWhereInput | SizeChartWhereInput[]
    OR?: SizeChartWhereInput[]
    NOT?: SizeChartWhereInput | SizeChartWhereInput[]
    id?: IntFilter<"SizeChart"> | number
    title?: StringFilter<"SizeChart"> | string
    content?: StringFilter<"SizeChart"> | string
    createdAt?: DateTimeFilter<"SizeChart"> | Date | string
    updatedAt?: DateTimeFilter<"SizeChart"> | Date | string
  }

  export type SizeChartOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SizeChartWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SizeChartWhereInput | SizeChartWhereInput[]
    OR?: SizeChartWhereInput[]
    NOT?: SizeChartWhereInput | SizeChartWhereInput[]
    title?: StringFilter<"SizeChart"> | string
    content?: StringFilter<"SizeChart"> | string
    createdAt?: DateTimeFilter<"SizeChart"> | Date | string
    updatedAt?: DateTimeFilter<"SizeChart"> | Date | string
  }, "id">

  export type SizeChartOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SizeChartCountOrderByAggregateInput
    _avg?: SizeChartAvgOrderByAggregateInput
    _max?: SizeChartMaxOrderByAggregateInput
    _min?: SizeChartMinOrderByAggregateInput
    _sum?: SizeChartSumOrderByAggregateInput
  }

  export type SizeChartScalarWhereWithAggregatesInput = {
    AND?: SizeChartScalarWhereWithAggregatesInput | SizeChartScalarWhereWithAggregatesInput[]
    OR?: SizeChartScalarWhereWithAggregatesInput[]
    NOT?: SizeChartScalarWhereWithAggregatesInput | SizeChartScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SizeChart"> | number
    title?: StringWithAggregatesFilter<"SizeChart"> | string
    content?: StringWithAggregatesFilter<"SizeChart"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SizeChart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SizeChart"> | Date | string
  }

  export type TemplateWhereInput = {
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    id?: IntFilter<"Template"> | number
    title?: StringFilter<"Template"> | string
    category?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    title?: StringFilter<"Template"> | string
    category?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
  }, "id">

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _avg?: TemplateAvgOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
    _sum?: TemplateSumOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    OR?: TemplateScalarWhereWithAggregatesInput[]
    NOT?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Template"> | number
    title?: StringWithAggregatesFilter<"Template"> | string
    category?: StringWithAggregatesFilter<"Template"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
  }

  export type TemplateContentWhereInput = {
    AND?: TemplateContentWhereInput | TemplateContentWhereInput[]
    OR?: TemplateContentWhereInput[]
    NOT?: TemplateContentWhereInput | TemplateContentWhereInput[]
    id?: IntFilter<"TemplateContent"> | number
    serial_no?: IntFilter<"TemplateContent"> | number
    template_id?: IntFilter<"TemplateContent"> | number
    content_type?: StringFilter<"TemplateContent"> | string
    content_obj?: StringFilter<"TemplateContent"> | string
    createdAt?: DateTimeFilter<"TemplateContent"> | Date | string
    updatedAt?: DateTimeFilter<"TemplateContent"> | Date | string
  }

  export type TemplateContentOrderByWithRelationInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateContentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TemplateContentWhereInput | TemplateContentWhereInput[]
    OR?: TemplateContentWhereInput[]
    NOT?: TemplateContentWhereInput | TemplateContentWhereInput[]
    serial_no?: IntFilter<"TemplateContent"> | number
    template_id?: IntFilter<"TemplateContent"> | number
    content_type?: StringFilter<"TemplateContent"> | string
    content_obj?: StringFilter<"TemplateContent"> | string
    createdAt?: DateTimeFilter<"TemplateContent"> | Date | string
    updatedAt?: DateTimeFilter<"TemplateContent"> | Date | string
  }, "id">

  export type TemplateContentOrderByWithAggregationInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplateContentCountOrderByAggregateInput
    _avg?: TemplateContentAvgOrderByAggregateInput
    _max?: TemplateContentMaxOrderByAggregateInput
    _min?: TemplateContentMinOrderByAggregateInput
    _sum?: TemplateContentSumOrderByAggregateInput
  }

  export type TemplateContentScalarWhereWithAggregatesInput = {
    AND?: TemplateContentScalarWhereWithAggregatesInput | TemplateContentScalarWhereWithAggregatesInput[]
    OR?: TemplateContentScalarWhereWithAggregatesInput[]
    NOT?: TemplateContentScalarWhereWithAggregatesInput | TemplateContentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TemplateContent"> | number
    serial_no?: IntWithAggregatesFilter<"TemplateContent"> | number
    template_id?: IntWithAggregatesFilter<"TemplateContent"> | number
    content_type?: StringWithAggregatesFilter<"TemplateContent"> | string
    content_obj?: StringWithAggregatesFilter<"TemplateContent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TemplateContent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TemplateContent"> | Date | string
  }

  export type ChartWhereInput = {
    AND?: ChartWhereInput | ChartWhereInput[]
    OR?: ChartWhereInput[]
    NOT?: ChartWhereInput | ChartWhereInput[]
    id?: IntFilter<"Chart"> | number
    title?: StringFilter<"Chart"> | string
    available_sizes?: StringFilter<"Chart"> | string
    createdAt?: DateTimeFilter<"Chart"> | Date | string
    updatedAt?: DateTimeFilter<"Chart"> | Date | string
  }

  export type ChartOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    available_sizes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChartWhereInput | ChartWhereInput[]
    OR?: ChartWhereInput[]
    NOT?: ChartWhereInput | ChartWhereInput[]
    title?: StringFilter<"Chart"> | string
    available_sizes?: StringFilter<"Chart"> | string
    createdAt?: DateTimeFilter<"Chart"> | Date | string
    updatedAt?: DateTimeFilter<"Chart"> | Date | string
  }, "id">

  export type ChartOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    available_sizes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChartCountOrderByAggregateInput
    _avg?: ChartAvgOrderByAggregateInput
    _max?: ChartMaxOrderByAggregateInput
    _min?: ChartMinOrderByAggregateInput
    _sum?: ChartSumOrderByAggregateInput
  }

  export type ChartScalarWhereWithAggregatesInput = {
    AND?: ChartScalarWhereWithAggregatesInput | ChartScalarWhereWithAggregatesInput[]
    OR?: ChartScalarWhereWithAggregatesInput[]
    NOT?: ChartScalarWhereWithAggregatesInput | ChartScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Chart"> | number
    title?: StringWithAggregatesFilter<"Chart"> | string
    available_sizes?: StringWithAggregatesFilter<"Chart"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Chart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Chart"> | Date | string
  }

  export type ChartContentWhereInput = {
    AND?: ChartContentWhereInput | ChartContentWhereInput[]
    OR?: ChartContentWhereInput[]
    NOT?: ChartContentWhereInput | ChartContentWhereInput[]
    id?: IntFilter<"ChartContent"> | number
    serial_no?: IntFilter<"ChartContent"> | number
    chart_id?: IntFilter<"ChartContent"> | number
    content_type?: StringFilter<"ChartContent"> | string
    content_obj?: StringFilter<"ChartContent"> | string
    createdAt?: DateTimeFilter<"ChartContent"> | Date | string
    updatedAt?: DateTimeFilter<"ChartContent"> | Date | string
  }

  export type ChartContentOrderByWithRelationInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartContentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChartContentWhereInput | ChartContentWhereInput[]
    OR?: ChartContentWhereInput[]
    NOT?: ChartContentWhereInput | ChartContentWhereInput[]
    serial_no?: IntFilter<"ChartContent"> | number
    chart_id?: IntFilter<"ChartContent"> | number
    content_type?: StringFilter<"ChartContent"> | string
    content_obj?: StringFilter<"ChartContent"> | string
    createdAt?: DateTimeFilter<"ChartContent"> | Date | string
    updatedAt?: DateTimeFilter<"ChartContent"> | Date | string
  }, "id">

  export type ChartContentOrderByWithAggregationInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChartContentCountOrderByAggregateInput
    _avg?: ChartContentAvgOrderByAggregateInput
    _max?: ChartContentMaxOrderByAggregateInput
    _min?: ChartContentMinOrderByAggregateInput
    _sum?: ChartContentSumOrderByAggregateInput
  }

  export type ChartContentScalarWhereWithAggregatesInput = {
    AND?: ChartContentScalarWhereWithAggregatesInput | ChartContentScalarWhereWithAggregatesInput[]
    OR?: ChartContentScalarWhereWithAggregatesInput[]
    NOT?: ChartContentScalarWhereWithAggregatesInput | ChartContentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChartContent"> | number
    serial_no?: IntWithAggregatesFilter<"ChartContent"> | number
    chart_id?: IntWithAggregatesFilter<"ChartContent"> | number
    content_type?: StringWithAggregatesFilter<"ChartContent"> | string
    content_obj?: StringWithAggregatesFilter<"ChartContent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ChartContent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChartContent"> | Date | string
  }

  export type SessionCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUncheckedCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionCreateManyInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SizeChartCreateInput = {
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SizeChartUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SizeChartUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeChartUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeChartCreateManyInput = {
    id?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SizeChartUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SizeChartUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateInput = {
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUncheckedCreateInput = {
    id?: number
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateManyInput = {
    id?: number
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateContentCreateInput = {
    serial_no: number
    template_id: number
    content_type: string
    content_obj: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateContentUncheckedCreateInput = {
    id?: number
    serial_no: number
    template_id: number
    content_type: string
    content_obj: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateContentUpdateInput = {
    serial_no?: IntFieldUpdateOperationsInput | number
    template_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateContentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serial_no?: IntFieldUpdateOperationsInput | number
    template_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateContentCreateManyInput = {
    id?: number
    serial_no: number
    template_id: number
    content_type: string
    content_obj: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateContentUpdateManyMutationInput = {
    serial_no?: IntFieldUpdateOperationsInput | number
    template_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateContentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serial_no?: IntFieldUpdateOperationsInput | number
    template_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartCreateInput = {
    title: string
    available_sizes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChartUncheckedCreateInput = {
    id?: number
    title: string
    available_sizes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChartUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    available_sizes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    available_sizes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartCreateManyInput = {
    id?: number
    title: string
    available_sizes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChartUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    available_sizes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    available_sizes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartContentCreateInput = {
    serial_no: number
    chart_id: number
    content_type: string
    content_obj: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChartContentUncheckedCreateInput = {
    id?: number
    serial_no: number
    chart_id: number
    content_type: string
    content_obj: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChartContentUpdateInput = {
    serial_no?: IntFieldUpdateOperationsInput | number
    chart_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartContentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serial_no?: IntFieldUpdateOperationsInput | number
    chart_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartContentCreateManyInput = {
    id?: number
    serial_no: number
    chart_id: number
    content_type: string
    content_obj: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChartContentUpdateManyMutationInput = {
    serial_no?: IntFieldUpdateOperationsInput | number
    chart_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChartContentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serial_no?: IntFieldUpdateOperationsInput | number
    chart_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_obj?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SizeChartCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SizeChartAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SizeChartMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SizeChartMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SizeChartSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TemplateContentCountOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateContentAvgOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
  }

  export type TemplateContentMaxOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateContentMinOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateContentSumOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    template_id?: SortOrder
  }

  export type ChartCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    available_sizes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChartMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    available_sizes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    available_sizes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChartContentCountOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartContentAvgOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
  }

  export type ChartContentMaxOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartContentMinOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
    content_type?: SortOrder
    content_obj?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChartContentSumOrderByAggregateInput = {
    id?: SortOrder
    serial_no?: SortOrder
    chart_id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}