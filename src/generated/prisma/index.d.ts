
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
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>
/**
 * Model TutorialPost
 * 
 */
export type TutorialPost = $Result.DefaultSelection<Prisma.$TutorialPostPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CourseProgress
 * 
 */
export type CourseProgress = $Result.DefaultSelection<Prisma.$CourseProgressPayload>
/**
 * Model LessonProgress
 * 
 */
export type LessonProgress = $Result.DefaultSelection<Prisma.$LessonProgressPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model CourseTrack
 * 
 */
export type CourseTrack = $Result.DefaultSelection<Prisma.$CourseTrackPayload>
/**
 * Model CourseTrackEnrollment
 * 
 */
export type CourseTrackEnrollment = $Result.DefaultSelection<Prisma.$CourseTrackEnrollmentPayload>
/**
 * Model Exercise
 * 
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>
/**
 * Model Lesson
 * 
 */
export type Lesson = $Result.DefaultSelection<Prisma.$LessonPayload>
/**
 * Model ContactMessage
 * 
 */
export type ContactMessage = $Result.DefaultSelection<Prisma.$ContactMessagePayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model LessonFeedback
 * 
 */
export type LessonFeedback = $Result.DefaultSelection<Prisma.$LessonFeedbackPayload>
/**
 * Model LessonNote
 * 
 */
export type LessonNote = $Result.DefaultSelection<Prisma.$LessonNotePayload>
/**
 * Model Badge
 * 
 */
export type Badge = $Result.DefaultSelection<Prisma.$BadgePayload>
/**
 * Model UserBadge
 * 
 */
export type UserBadge = $Result.DefaultSelection<Prisma.$UserBadgePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BlogPosts
 * const blogPosts = await prisma.blogPost.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more BlogPosts
   * const blogPosts = await prisma.blogPost.findMany()
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tutorialPost`: Exposes CRUD operations for the **TutorialPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TutorialPosts
    * const tutorialPosts = await prisma.tutorialPost.findMany()
    * ```
    */
  get tutorialPost(): Prisma.TutorialPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseProgress`: Exposes CRUD operations for the **CourseProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseProgresses
    * const courseProgresses = await prisma.courseProgress.findMany()
    * ```
    */
  get courseProgress(): Prisma.CourseProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonProgress`: Exposes CRUD operations for the **LessonProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonProgresses
    * const lessonProgresses = await prisma.lessonProgress.findMany()
    * ```
    */
  get lessonProgress(): Prisma.LessonProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseTrack`: Exposes CRUD operations for the **CourseTrack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseTracks
    * const courseTracks = await prisma.courseTrack.findMany()
    * ```
    */
  get courseTrack(): Prisma.CourseTrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseTrackEnrollment`: Exposes CRUD operations for the **CourseTrackEnrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseTrackEnrollments
    * const courseTrackEnrollments = await prisma.courseTrackEnrollment.findMany()
    * ```
    */
  get courseTrackEnrollment(): Prisma.CourseTrackEnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lesson`: Exposes CRUD operations for the **Lesson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lesson.findMany()
    * ```
    */
  get lesson(): Prisma.LessonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactMessages
    * const contactMessages = await prisma.contactMessage.findMany()
    * ```
    */
  get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonFeedback`: Exposes CRUD operations for the **LessonFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonFeedbacks
    * const lessonFeedbacks = await prisma.lessonFeedback.findMany()
    * ```
    */
  get lessonFeedback(): Prisma.LessonFeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonNote`: Exposes CRUD operations for the **LessonNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonNotes
    * const lessonNotes = await prisma.lessonNote.findMany()
    * ```
    */
  get lessonNote(): Prisma.LessonNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.badge`: Exposes CRUD operations for the **Badge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Badges
    * const badges = await prisma.badge.findMany()
    * ```
    */
  get badge(): Prisma.BadgeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userBadge`: Exposes CRUD operations for the **UserBadge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBadges
    * const userBadges = await prisma.userBadge.findMany()
    * ```
    */
  get userBadge(): Prisma.UserBadgeDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    BlogPost: 'BlogPost',
    TutorialPost: 'TutorialPost',
    Comment: 'Comment',
    User: 'User',
    CourseProgress: 'CourseProgress',
    LessonProgress: 'LessonProgress',
    Message: 'Message',
    Course: 'Course',
    CourseTrack: 'CourseTrack',
    CourseTrackEnrollment: 'CourseTrackEnrollment',
    Exercise: 'Exercise',
    Lesson: 'Lesson',
    ContactMessage: 'ContactMessage',
    ActivityLog: 'ActivityLog',
    LessonFeedback: 'LessonFeedback',
    LessonNote: 'LessonNote',
    Badge: 'Badge',
    UserBadge: 'UserBadge'
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
      modelProps: "blogPost" | "tutorialPost" | "comment" | "user" | "courseProgress" | "lessonProgress" | "message" | "course" | "courseTrack" | "courseTrackEnrollment" | "exercise" | "lesson" | "contactMessage" | "activityLog" | "lessonFeedback" | "lessonNote" | "badge" | "userBadge"
      txIsolationLevel: never
    }
    model: {
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BlogPostFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BlogPostAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
          }
        }
      }
      TutorialPost: {
        payload: Prisma.$TutorialPostPayload<ExtArgs>
        fields: Prisma.TutorialPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TutorialPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TutorialPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>
          }
          findFirst: {
            args: Prisma.TutorialPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TutorialPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>
          }
          findMany: {
            args: Prisma.TutorialPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>[]
          }
          create: {
            args: Prisma.TutorialPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>
          }
          createMany: {
            args: Prisma.TutorialPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TutorialPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>
          }
          update: {
            args: Prisma.TutorialPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>
          }
          deleteMany: {
            args: Prisma.TutorialPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TutorialPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TutorialPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPostPayload>
          }
          aggregate: {
            args: Prisma.TutorialPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTutorialPost>
          }
          groupBy: {
            args: Prisma.TutorialPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<TutorialPostGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TutorialPostFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TutorialPostAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TutorialPostCountArgs<ExtArgs>
            result: $Utils.Optional<TutorialPostCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CommentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CommentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CourseProgress: {
        payload: Prisma.$CourseProgressPayload<ExtArgs>
        fields: Prisma.CourseProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>
          }
          findFirst: {
            args: Prisma.CourseProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>
          }
          findMany: {
            args: Prisma.CourseProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>[]
          }
          create: {
            args: Prisma.CourseProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>
          }
          createMany: {
            args: Prisma.CourseProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>
          }
          update: {
            args: Prisma.CourseProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>
          }
          deleteMany: {
            args: Prisma.CourseProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseProgressPayload>
          }
          aggregate: {
            args: Prisma.CourseProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseProgress>
          }
          groupBy: {
            args: Prisma.CourseProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseProgressGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CourseProgressFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CourseProgressAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CourseProgressCountArgs<ExtArgs>
            result: $Utils.Optional<CourseProgressCountAggregateOutputType> | number
          }
        }
      }
      LessonProgress: {
        payload: Prisma.$LessonProgressPayload<ExtArgs>
        fields: Prisma.LessonProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          findFirst: {
            args: Prisma.LessonProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          findMany: {
            args: Prisma.LessonProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[]
          }
          create: {
            args: Prisma.LessonProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          createMany: {
            args: Prisma.LessonProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LessonProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          update: {
            args: Prisma.LessonProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          deleteMany: {
            args: Prisma.LessonProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LessonProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          aggregate: {
            args: Prisma.LessonProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonProgress>
          }
          groupBy: {
            args: Prisma.LessonProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonProgressGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LessonProgressFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LessonProgressAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LessonProgressCountArgs<ExtArgs>
            result: $Utils.Optional<LessonProgressCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MessageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MessageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CourseFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CourseAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      CourseTrack: {
        payload: Prisma.$CourseTrackPayload<ExtArgs>
        fields: Prisma.CourseTrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseTrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseTrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>
          }
          findFirst: {
            args: Prisma.CourseTrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseTrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>
          }
          findMany: {
            args: Prisma.CourseTrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>[]
          }
          create: {
            args: Prisma.CourseTrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>
          }
          createMany: {
            args: Prisma.CourseTrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseTrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>
          }
          update: {
            args: Prisma.CourseTrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>
          }
          deleteMany: {
            args: Prisma.CourseTrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseTrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseTrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackPayload>
          }
          aggregate: {
            args: Prisma.CourseTrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseTrack>
          }
          groupBy: {
            args: Prisma.CourseTrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseTrackGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CourseTrackFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CourseTrackAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CourseTrackCountArgs<ExtArgs>
            result: $Utils.Optional<CourseTrackCountAggregateOutputType> | number
          }
        }
      }
      CourseTrackEnrollment: {
        payload: Prisma.$CourseTrackEnrollmentPayload<ExtArgs>
        fields: Prisma.CourseTrackEnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseTrackEnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseTrackEnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>
          }
          findFirst: {
            args: Prisma.CourseTrackEnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseTrackEnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>
          }
          findMany: {
            args: Prisma.CourseTrackEnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>[]
          }
          create: {
            args: Prisma.CourseTrackEnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>
          }
          createMany: {
            args: Prisma.CourseTrackEnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseTrackEnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>
          }
          update: {
            args: Prisma.CourseTrackEnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.CourseTrackEnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseTrackEnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseTrackEnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTrackEnrollmentPayload>
          }
          aggregate: {
            args: Prisma.CourseTrackEnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseTrackEnrollment>
          }
          groupBy: {
            args: Prisma.CourseTrackEnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseTrackEnrollmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CourseTrackEnrollmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CourseTrackEnrollmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CourseTrackEnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<CourseTrackEnrollmentCountAggregateOutputType> | number
          }
        }
      }
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ExerciseFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ExerciseAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
      Lesson: {
        payload: Prisma.$LessonPayload<ExtArgs>
        fields: Prisma.LessonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findFirst: {
            args: Prisma.LessonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findMany: {
            args: Prisma.LessonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          create: {
            args: Prisma.LessonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          createMany: {
            args: Prisma.LessonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LessonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          update: {
            args: Prisma.LessonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          deleteMany: {
            args: Prisma.LessonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LessonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          aggregate: {
            args: Prisma.LessonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLesson>
          }
          groupBy: {
            args: Prisma.LessonGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LessonFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LessonAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LessonCountArgs<ExtArgs>
            result: $Utils.Optional<LessonCountAggregateOutputType> | number
          }
        }
      }
      ContactMessage: {
        payload: Prisma.$ContactMessagePayload<ExtArgs>
        fields: Prisma.ContactMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findFirst: {
            args: Prisma.ContactMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findMany: {
            args: Prisma.ContactMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          create: {
            args: Prisma.ContactMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          createMany: {
            args: Prisma.ContactMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContactMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          update: {
            args: Prisma.ContactMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          deleteMany: {
            args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          aggregate: {
            args: Prisma.ContactMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactMessage>
          }
          groupBy: {
            args: Prisma.ContactMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ContactMessageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ContactMessageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ContactMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ActivityLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ActivityLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      LessonFeedback: {
        payload: Prisma.$LessonFeedbackPayload<ExtArgs>
        fields: Prisma.LessonFeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonFeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonFeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>
          }
          findFirst: {
            args: Prisma.LessonFeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonFeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>
          }
          findMany: {
            args: Prisma.LessonFeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>[]
          }
          create: {
            args: Prisma.LessonFeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>
          }
          createMany: {
            args: Prisma.LessonFeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LessonFeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>
          }
          update: {
            args: Prisma.LessonFeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>
          }
          deleteMany: {
            args: Prisma.LessonFeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonFeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LessonFeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonFeedbackPayload>
          }
          aggregate: {
            args: Prisma.LessonFeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonFeedback>
          }
          groupBy: {
            args: Prisma.LessonFeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonFeedbackGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LessonFeedbackFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LessonFeedbackAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LessonFeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<LessonFeedbackCountAggregateOutputType> | number
          }
        }
      }
      LessonNote: {
        payload: Prisma.$LessonNotePayload<ExtArgs>
        fields: Prisma.LessonNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>
          }
          findFirst: {
            args: Prisma.LessonNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>
          }
          findMany: {
            args: Prisma.LessonNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>[]
          }
          create: {
            args: Prisma.LessonNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>
          }
          createMany: {
            args: Prisma.LessonNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LessonNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>
          }
          update: {
            args: Prisma.LessonNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>
          }
          deleteMany: {
            args: Prisma.LessonNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LessonNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonNotePayload>
          }
          aggregate: {
            args: Prisma.LessonNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonNote>
          }
          groupBy: {
            args: Prisma.LessonNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonNoteGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LessonNoteFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LessonNoteAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LessonNoteCountArgs<ExtArgs>
            result: $Utils.Optional<LessonNoteCountAggregateOutputType> | number
          }
        }
      }
      Badge: {
        payload: Prisma.$BadgePayload<ExtArgs>
        fields: Prisma.BadgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findFirst: {
            args: Prisma.BadgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findMany: {
            args: Prisma.BadgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          create: {
            args: Prisma.BadgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          createMany: {
            args: Prisma.BadgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BadgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          update: {
            args: Prisma.BadgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          deleteMany: {
            args: Prisma.BadgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BadgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          aggregate: {
            args: Prisma.BadgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadge>
          }
          groupBy: {
            args: Prisma.BadgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadgeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BadgeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BadgeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BadgeCountArgs<ExtArgs>
            result: $Utils.Optional<BadgeCountAggregateOutputType> | number
          }
        }
      }
      UserBadge: {
        payload: Prisma.$UserBadgePayload<ExtArgs>
        fields: Prisma.UserBadgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBadgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBadgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          findFirst: {
            args: Prisma.UserBadgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBadgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          findMany: {
            args: Prisma.UserBadgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>[]
          }
          create: {
            args: Prisma.UserBadgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          createMany: {
            args: Prisma.UserBadgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserBadgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          update: {
            args: Prisma.UserBadgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          deleteMany: {
            args: Prisma.UserBadgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserBadgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserBadgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          aggregate: {
            args: Prisma.UserBadgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserBadge>
          }
          groupBy: {
            args: Prisma.UserBadgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserBadgeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserBadgeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserBadgeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserBadgeCountArgs<ExtArgs>
            result: $Utils.Optional<UserBadgeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    }
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
    blogPost?: BlogPostOmit
    tutorialPost?: TutorialPostOmit
    comment?: CommentOmit
    user?: UserOmit
    courseProgress?: CourseProgressOmit
    lessonProgress?: LessonProgressOmit
    message?: MessageOmit
    course?: CourseOmit
    courseTrack?: CourseTrackOmit
    courseTrackEnrollment?: CourseTrackEnrollmentOmit
    exercise?: ExerciseOmit
    lesson?: LessonOmit
    contactMessage?: ContactMessageOmit
    activityLog?: ActivityLogOmit
    lessonFeedback?: LessonFeedbackOmit
    lessonNote?: LessonNoteOmit
    badge?: BadgeOmit
    userBadge?: UserBadgeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    messages: number
    CourseProgress: number
    LessonProgress: number
    badges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    CourseProgress?: boolean | UserCountOutputTypeCountCourseProgressArgs
    LessonProgress?: boolean | UserCountOutputTypeCountLessonProgressArgs
    badges?: boolean | UserCountOutputTypeCountBadgesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCourseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBadgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBadgeWhereInput
  }


  /**
   * Count Type CourseProgressCountOutputType
   */

  export type CourseProgressCountOutputType = {
    lessonProgress: number
  }

  export type CourseProgressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessonProgress?: boolean | CourseProgressCountOutputTypeCountLessonProgressArgs
  }

  // Custom InputTypes
  /**
   * CourseProgressCountOutputType without action
   */
  export type CourseProgressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgressCountOutputType
     */
    select?: CourseProgressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseProgressCountOutputType without action
   */
  export type CourseProgressCountOutputTypeCountLessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    lessons: number
    CourseProgress: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessons?: boolean | CourseCountOutputTypeCountLessonsArgs
    CourseProgress?: boolean | CourseCountOutputTypeCountCourseProgressArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountCourseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseProgressWhereInput
  }


  /**
   * Count Type CourseTrackCountOutputType
   */

  export type CourseTrackCountOutputType = {
    enrollments: number
  }

  export type CourseTrackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | CourseTrackCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * CourseTrackCountOutputType without action
   */
  export type CourseTrackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackCountOutputType
     */
    select?: CourseTrackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseTrackCountOutputType without action
   */
  export type CourseTrackCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseTrackEnrollmentWhereInput
  }


  /**
   * Count Type LessonCountOutputType
   */

  export type LessonCountOutputType = {
    exercises: number
    LessonProgress: number
  }

  export type LessonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercises?: boolean | LessonCountOutputTypeCountExercisesArgs
    LessonProgress?: boolean | LessonCountOutputTypeCountLessonProgressArgs
  }

  // Custom InputTypes
  /**
   * LessonCountOutputType without action
   */
  export type LessonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonCountOutputType
     */
    select?: LessonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LessonCountOutputType without action
   */
  export type LessonCountOutputTypeCountExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }

  /**
   * LessonCountOutputType without action
   */
  export type LessonCountOutputTypeCountLessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
  }


  /**
   * Count Type BadgeCountOutputType
   */

  export type BadgeCountOutputType = {
    users: number
  }

  export type BadgeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | BadgeCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * BadgeCountOutputType without action
   */
  export type BadgeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeCountOutputType
     */
    select?: BadgeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BadgeCountOutputType without action
   */
  export type BadgeCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBadgeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
    image: string | null
    isAI: boolean | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
    image: string | null
    isAI: boolean | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    createdAt: number
    updatedAt: number
    tags: number
    slug: number
    image: number
    isAI: number
    _all: number
  }


  export type BlogPostMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    image?: true
    isAI?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    image?: true
    isAI?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    tags?: true
    slug?: true
    image?: true
    isAI?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: string
    title: string
    description: string
    content: string | null
    createdAt: Date
    updatedAt: Date
    tags: string[]
    slug: string
    image: string | null
    isAI: boolean | null
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
    slug?: boolean
    image?: boolean
    isAI?: boolean
  }, ExtArgs["result"]["blogPost"]>



  export type BlogPostSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
    slug?: boolean
    image?: boolean
    isAI?: boolean
  }

  export type BlogPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "createdAt" | "updatedAt" | "tags" | "slug" | "image" | "isAI", ExtArgs["result"]["blogPost"]>

  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      content: string | null
      createdAt: Date
      updatedAt: Date
      tags: string[]
      slug: string
      image: string | null
      isAI: boolean | null
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * @param {BlogPostFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const blogPost = await prisma.blogPost.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BlogPostFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a BlogPost.
     * @param {BlogPostAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const blogPost = await prisma.blogPost.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BlogPostAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
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
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BlogPost model
   */
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'String'>
    readonly title: FieldRef<"BlogPost", 'String'>
    readonly description: FieldRef<"BlogPost", 'String'>
    readonly content: FieldRef<"BlogPost", 'String'>
    readonly createdAt: FieldRef<"BlogPost", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly tags: FieldRef<"BlogPost", 'String[]'>
    readonly slug: FieldRef<"BlogPost", 'String'>
    readonly image: FieldRef<"BlogPost", 'String'>
    readonly isAI: FieldRef<"BlogPost", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to update.
     */
    limit?: number
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to delete.
     */
    limit?: number
  }

  /**
   * BlogPost findRaw
   */
  export type BlogPostFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * BlogPost aggregateRaw
   */
  export type BlogPostAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
  }


  /**
   * Model TutorialPost
   */

  export type AggregateTutorialPost = {
    _count: TutorialPostCountAggregateOutputType | null
    _min: TutorialPostMinAggregateOutputType | null
    _max: TutorialPostMaxAggregateOutputType | null
  }

  export type TutorialPostMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    difficulty: string | null
    slug: string | null
  }

  export type TutorialPostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    difficulty: string | null
    slug: string | null
  }

  export type TutorialPostCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    createdAt: number
    updatedAt: number
    tags: number
    difficulty: number
    slug: number
    _all: number
  }


  export type TutorialPostMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    difficulty?: true
    slug?: true
  }

  export type TutorialPostMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    difficulty?: true
    slug?: true
  }

  export type TutorialPostCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    tags?: true
    difficulty?: true
    slug?: true
    _all?: true
  }

  export type TutorialPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TutorialPost to aggregate.
     */
    where?: TutorialPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialPosts to fetch.
     */
    orderBy?: TutorialPostOrderByWithRelationInput | TutorialPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TutorialPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TutorialPosts
    **/
    _count?: true | TutorialPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TutorialPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TutorialPostMaxAggregateInputType
  }

  export type GetTutorialPostAggregateType<T extends TutorialPostAggregateArgs> = {
        [P in keyof T & keyof AggregateTutorialPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTutorialPost[P]>
      : GetScalarType<T[P], AggregateTutorialPost[P]>
  }




  export type TutorialPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutorialPostWhereInput
    orderBy?: TutorialPostOrderByWithAggregationInput | TutorialPostOrderByWithAggregationInput[]
    by: TutorialPostScalarFieldEnum[] | TutorialPostScalarFieldEnum
    having?: TutorialPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TutorialPostCountAggregateInputType | true
    _min?: TutorialPostMinAggregateInputType
    _max?: TutorialPostMaxAggregateInputType
  }

  export type TutorialPostGroupByOutputType = {
    id: string
    title: string
    description: string
    content: string | null
    createdAt: Date
    updatedAt: Date
    tags: string[]
    difficulty: string | null
    slug: string
    _count: TutorialPostCountAggregateOutputType | null
    _min: TutorialPostMinAggregateOutputType | null
    _max: TutorialPostMaxAggregateOutputType | null
  }

  type GetTutorialPostGroupByPayload<T extends TutorialPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TutorialPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TutorialPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TutorialPostGroupByOutputType[P]>
            : GetScalarType<T[P], TutorialPostGroupByOutputType[P]>
        }
      >
    >


  export type TutorialPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
    difficulty?: boolean
    slug?: boolean
  }, ExtArgs["result"]["tutorialPost"]>



  export type TutorialPostSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
    difficulty?: boolean
    slug?: boolean
  }

  export type TutorialPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "createdAt" | "updatedAt" | "tags" | "difficulty" | "slug", ExtArgs["result"]["tutorialPost"]>

  export type $TutorialPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TutorialPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      content: string | null
      createdAt: Date
      updatedAt: Date
      tags: string[]
      difficulty: string | null
      slug: string
    }, ExtArgs["result"]["tutorialPost"]>
    composites: {}
  }

  type TutorialPostGetPayload<S extends boolean | null | undefined | TutorialPostDefaultArgs> = $Result.GetResult<Prisma.$TutorialPostPayload, S>

  type TutorialPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TutorialPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TutorialPostCountAggregateInputType | true
    }

  export interface TutorialPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TutorialPost'], meta: { name: 'TutorialPost' } }
    /**
     * Find zero or one TutorialPost that matches the filter.
     * @param {TutorialPostFindUniqueArgs} args - Arguments to find a TutorialPost
     * @example
     * // Get one TutorialPost
     * const tutorialPost = await prisma.tutorialPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TutorialPostFindUniqueArgs>(args: SelectSubset<T, TutorialPostFindUniqueArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TutorialPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TutorialPostFindUniqueOrThrowArgs} args - Arguments to find a TutorialPost
     * @example
     * // Get one TutorialPost
     * const tutorialPost = await prisma.tutorialPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TutorialPostFindUniqueOrThrowArgs>(args: SelectSubset<T, TutorialPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TutorialPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostFindFirstArgs} args - Arguments to find a TutorialPost
     * @example
     * // Get one TutorialPost
     * const tutorialPost = await prisma.tutorialPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TutorialPostFindFirstArgs>(args?: SelectSubset<T, TutorialPostFindFirstArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TutorialPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostFindFirstOrThrowArgs} args - Arguments to find a TutorialPost
     * @example
     * // Get one TutorialPost
     * const tutorialPost = await prisma.tutorialPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TutorialPostFindFirstOrThrowArgs>(args?: SelectSubset<T, TutorialPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TutorialPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TutorialPosts
     * const tutorialPosts = await prisma.tutorialPost.findMany()
     * 
     * // Get first 10 TutorialPosts
     * const tutorialPosts = await prisma.tutorialPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tutorialPostWithIdOnly = await prisma.tutorialPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TutorialPostFindManyArgs>(args?: SelectSubset<T, TutorialPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TutorialPost.
     * @param {TutorialPostCreateArgs} args - Arguments to create a TutorialPost.
     * @example
     * // Create one TutorialPost
     * const TutorialPost = await prisma.tutorialPost.create({
     *   data: {
     *     // ... data to create a TutorialPost
     *   }
     * })
     * 
     */
    create<T extends TutorialPostCreateArgs>(args: SelectSubset<T, TutorialPostCreateArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TutorialPosts.
     * @param {TutorialPostCreateManyArgs} args - Arguments to create many TutorialPosts.
     * @example
     * // Create many TutorialPosts
     * const tutorialPost = await prisma.tutorialPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TutorialPostCreateManyArgs>(args?: SelectSubset<T, TutorialPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TutorialPost.
     * @param {TutorialPostDeleteArgs} args - Arguments to delete one TutorialPost.
     * @example
     * // Delete one TutorialPost
     * const TutorialPost = await prisma.tutorialPost.delete({
     *   where: {
     *     // ... filter to delete one TutorialPost
     *   }
     * })
     * 
     */
    delete<T extends TutorialPostDeleteArgs>(args: SelectSubset<T, TutorialPostDeleteArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TutorialPost.
     * @param {TutorialPostUpdateArgs} args - Arguments to update one TutorialPost.
     * @example
     * // Update one TutorialPost
     * const tutorialPost = await prisma.tutorialPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TutorialPostUpdateArgs>(args: SelectSubset<T, TutorialPostUpdateArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TutorialPosts.
     * @param {TutorialPostDeleteManyArgs} args - Arguments to filter TutorialPosts to delete.
     * @example
     * // Delete a few TutorialPosts
     * const { count } = await prisma.tutorialPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TutorialPostDeleteManyArgs>(args?: SelectSubset<T, TutorialPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TutorialPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TutorialPosts
     * const tutorialPost = await prisma.tutorialPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TutorialPostUpdateManyArgs>(args: SelectSubset<T, TutorialPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TutorialPost.
     * @param {TutorialPostUpsertArgs} args - Arguments to update or create a TutorialPost.
     * @example
     * // Update or create a TutorialPost
     * const tutorialPost = await prisma.tutorialPost.upsert({
     *   create: {
     *     // ... data to create a TutorialPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TutorialPost we want to update
     *   }
     * })
     */
    upsert<T extends TutorialPostUpsertArgs>(args: SelectSubset<T, TutorialPostUpsertArgs<ExtArgs>>): Prisma__TutorialPostClient<$Result.GetResult<Prisma.$TutorialPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TutorialPosts that matches the filter.
     * @param {TutorialPostFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tutorialPost = await prisma.tutorialPost.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TutorialPostFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a TutorialPost.
     * @param {TutorialPostAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tutorialPost = await prisma.tutorialPost.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TutorialPostAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of TutorialPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostCountArgs} args - Arguments to filter TutorialPosts to count.
     * @example
     * // Count the number of TutorialPosts
     * const count = await prisma.tutorialPost.count({
     *   where: {
     *     // ... the filter for the TutorialPosts we want to count
     *   }
     * })
    **/
    count<T extends TutorialPostCountArgs>(
      args?: Subset<T, TutorialPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TutorialPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TutorialPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TutorialPostAggregateArgs>(args: Subset<T, TutorialPostAggregateArgs>): Prisma.PrismaPromise<GetTutorialPostAggregateType<T>>

    /**
     * Group by TutorialPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialPostGroupByArgs} args - Group by arguments.
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
      T extends TutorialPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TutorialPostGroupByArgs['orderBy'] }
        : { orderBy?: TutorialPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TutorialPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTutorialPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TutorialPost model
   */
  readonly fields: TutorialPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TutorialPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TutorialPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TutorialPost model
   */
  interface TutorialPostFieldRefs {
    readonly id: FieldRef<"TutorialPost", 'String'>
    readonly title: FieldRef<"TutorialPost", 'String'>
    readonly description: FieldRef<"TutorialPost", 'String'>
    readonly content: FieldRef<"TutorialPost", 'String'>
    readonly createdAt: FieldRef<"TutorialPost", 'DateTime'>
    readonly updatedAt: FieldRef<"TutorialPost", 'DateTime'>
    readonly tags: FieldRef<"TutorialPost", 'String[]'>
    readonly difficulty: FieldRef<"TutorialPost", 'String'>
    readonly slug: FieldRef<"TutorialPost", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TutorialPost findUnique
   */
  export type TutorialPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * Filter, which TutorialPost to fetch.
     */
    where: TutorialPostWhereUniqueInput
  }

  /**
   * TutorialPost findUniqueOrThrow
   */
  export type TutorialPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * Filter, which TutorialPost to fetch.
     */
    where: TutorialPostWhereUniqueInput
  }

  /**
   * TutorialPost findFirst
   */
  export type TutorialPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * Filter, which TutorialPost to fetch.
     */
    where?: TutorialPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialPosts to fetch.
     */
    orderBy?: TutorialPostOrderByWithRelationInput | TutorialPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TutorialPosts.
     */
    cursor?: TutorialPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TutorialPosts.
     */
    distinct?: TutorialPostScalarFieldEnum | TutorialPostScalarFieldEnum[]
  }

  /**
   * TutorialPost findFirstOrThrow
   */
  export type TutorialPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * Filter, which TutorialPost to fetch.
     */
    where?: TutorialPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialPosts to fetch.
     */
    orderBy?: TutorialPostOrderByWithRelationInput | TutorialPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TutorialPosts.
     */
    cursor?: TutorialPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TutorialPosts.
     */
    distinct?: TutorialPostScalarFieldEnum | TutorialPostScalarFieldEnum[]
  }

  /**
   * TutorialPost findMany
   */
  export type TutorialPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * Filter, which TutorialPosts to fetch.
     */
    where?: TutorialPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialPosts to fetch.
     */
    orderBy?: TutorialPostOrderByWithRelationInput | TutorialPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TutorialPosts.
     */
    cursor?: TutorialPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialPosts.
     */
    skip?: number
    distinct?: TutorialPostScalarFieldEnum | TutorialPostScalarFieldEnum[]
  }

  /**
   * TutorialPost create
   */
  export type TutorialPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * The data needed to create a TutorialPost.
     */
    data: XOR<TutorialPostCreateInput, TutorialPostUncheckedCreateInput>
  }

  /**
   * TutorialPost createMany
   */
  export type TutorialPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TutorialPosts.
     */
    data: TutorialPostCreateManyInput | TutorialPostCreateManyInput[]
  }

  /**
   * TutorialPost update
   */
  export type TutorialPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * The data needed to update a TutorialPost.
     */
    data: XOR<TutorialPostUpdateInput, TutorialPostUncheckedUpdateInput>
    /**
     * Choose, which TutorialPost to update.
     */
    where: TutorialPostWhereUniqueInput
  }

  /**
   * TutorialPost updateMany
   */
  export type TutorialPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TutorialPosts.
     */
    data: XOR<TutorialPostUpdateManyMutationInput, TutorialPostUncheckedUpdateManyInput>
    /**
     * Filter which TutorialPosts to update
     */
    where?: TutorialPostWhereInput
    /**
     * Limit how many TutorialPosts to update.
     */
    limit?: number
  }

  /**
   * TutorialPost upsert
   */
  export type TutorialPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * The filter to search for the TutorialPost to update in case it exists.
     */
    where: TutorialPostWhereUniqueInput
    /**
     * In case the TutorialPost found by the `where` argument doesn't exist, create a new TutorialPost with this data.
     */
    create: XOR<TutorialPostCreateInput, TutorialPostUncheckedCreateInput>
    /**
     * In case the TutorialPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TutorialPostUpdateInput, TutorialPostUncheckedUpdateInput>
  }

  /**
   * TutorialPost delete
   */
  export type TutorialPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
    /**
     * Filter which TutorialPost to delete.
     */
    where: TutorialPostWhereUniqueInput
  }

  /**
   * TutorialPost deleteMany
   */
  export type TutorialPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TutorialPosts to delete
     */
    where?: TutorialPostWhereInput
    /**
     * Limit how many TutorialPosts to delete.
     */
    limit?: number
  }

  /**
   * TutorialPost findRaw
   */
  export type TutorialPostFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TutorialPost aggregateRaw
   */
  export type TutorialPostAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TutorialPost without action
   */
  export type TutorialPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialPost
     */
    select?: TutorialPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialPost
     */
    omit?: TutorialPostOmit<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    authorId: string | null
    authorName: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    postSlug: string | null
    replyingToId: string | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    authorId: string | null
    authorName: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    postSlug: string | null
    replyingToId: string | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    authorId: number
    authorName: number
    content: number
    createdAt: number
    updatedAt: number
    postSlug: number
    replyingToId: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    authorId?: true
    authorName?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    postSlug?: true
    replyingToId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    authorId?: true
    authorName?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    postSlug?: true
    replyingToId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    authorId?: true
    authorName?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    postSlug?: true
    replyingToId?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    authorId: string | null
    authorName: string | null
    content: string
    createdAt: Date
    updatedAt: Date
    postSlug: string
    replyingToId: string | null
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    authorName?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postSlug?: boolean
    replyingToId?: boolean
  }, ExtArgs["result"]["comment"]>



  export type CommentSelectScalar = {
    id?: boolean
    authorId?: boolean
    authorName?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postSlug?: boolean
    replyingToId?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authorId" | "authorName" | "content" | "createdAt" | "updatedAt" | "postSlug" | "replyingToId", ExtArgs["result"]["comment"]>

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authorId: string | null
      authorName: string | null
      content: string
      createdAt: Date
      updatedAt: Date
      postSlug: string
      replyingToId: string | null
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * @param {CommentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const comment = await prisma.comment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CommentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Comment.
     * @param {CommentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const comment = await prisma.comment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CommentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
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
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly authorId: FieldRef<"Comment", 'String'>
    readonly authorName: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
    readonly postSlug: FieldRef<"Comment", 'String'>
    readonly replyingToId: FieldRef<"Comment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment findRaw
   */
  export type CommentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Comment aggregateRaw
   */
  export type CommentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    currentStreak: number | null
    longestStreak: number | null
  }

  export type UserSumAggregateOutputType = {
    currentStreak: number | null
    longestStreak: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sessionToken: string | null
    thejoey: boolean | null
    username: string | null
    bio: string | null
    website: string | null
    twitter: string | null
    github: string | null
    linkedin: string | null
    isProfileVerified: boolean | null
    profileImage: string | null
    currentStreak: number | null
    longestStreak: number | null
    lastActivityDate: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sessionToken: string | null
    thejoey: boolean | null
    username: string | null
    bio: string | null
    website: string | null
    twitter: string | null
    github: string | null
    linkedin: string | null
    isProfileVerified: boolean | null
    profileImage: string | null
    currentStreak: number | null
    longestStreak: number | null
    lastActivityDate: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    sessionToken: number
    thejoey: number
    username: number
    bio: number
    website: number
    twitter: number
    github: number
    linkedin: number
    isProfileVerified: number
    profileImage: number
    currentStreak: number
    longestStreak: number
    lastActivityDate: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    currentStreak?: true
    longestStreak?: true
  }

  export type UserSumAggregateInputType = {
    currentStreak?: true
    longestStreak?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    sessionToken?: true
    thejoey?: true
    username?: true
    bio?: true
    website?: true
    twitter?: true
    github?: true
    linkedin?: true
    isProfileVerified?: true
    profileImage?: true
    currentStreak?: true
    longestStreak?: true
    lastActivityDate?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    sessionToken?: true
    thejoey?: true
    username?: true
    bio?: true
    website?: true
    twitter?: true
    github?: true
    linkedin?: true
    isProfileVerified?: true
    profileImage?: true
    currentStreak?: true
    longestStreak?: true
    lastActivityDate?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    sessionToken?: true
    thejoey?: true
    username?: true
    bio?: true
    website?: true
    twitter?: true
    github?: true
    linkedin?: true
    isProfileVerified?: true
    profileImage?: true
    currentStreak?: true
    longestStreak?: true
    lastActivityDate?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    sessionToken: string | null
    thejoey: boolean | null
    username: string | null
    bio: string | null
    website: string | null
    twitter: string | null
    github: string | null
    linkedin: string | null
    isProfileVerified: boolean
    profileImage: string | null
    currentStreak: number
    longestStreak: number
    lastActivityDate: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessionToken?: boolean
    thejoey?: boolean
    username?: boolean
    bio?: boolean
    website?: boolean
    twitter?: boolean
    github?: boolean
    linkedin?: boolean
    isProfileVerified?: boolean
    profileImage?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    lastActivityDate?: boolean
    messages?: boolean | User$messagesArgs<ExtArgs>
    CourseProgress?: boolean | User$CourseProgressArgs<ExtArgs>
    LessonProgress?: boolean | User$LessonProgressArgs<ExtArgs>
    badges?: boolean | User$badgesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessionToken?: boolean
    thejoey?: boolean
    username?: boolean
    bio?: boolean
    website?: boolean
    twitter?: boolean
    github?: boolean
    linkedin?: boolean
    isProfileVerified?: boolean
    profileImage?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    lastActivityDate?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt" | "updatedAt" | "sessionToken" | "thejoey" | "username" | "bio" | "website" | "twitter" | "github" | "linkedin" | "isProfileVerified" | "profileImage" | "currentStreak" | "longestStreak" | "lastActivityDate", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | User$messagesArgs<ExtArgs>
    CourseProgress?: boolean | User$CourseProgressArgs<ExtArgs>
    LessonProgress?: boolean | User$LessonProgressArgs<ExtArgs>
    badges?: boolean | User$badgesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      CourseProgress: Prisma.$CourseProgressPayload<ExtArgs>[]
      LessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[]
      badges: Prisma.$UserBadgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      createdAt: Date
      updatedAt: Date
      sessionToken: string | null
      thejoey: boolean | null
      username: string | null
      bio: string | null
      website: string | null
      twitter: string | null
      github: string | null
      linkedin: string | null
      isProfileVerified: boolean
      profileImage: string | null
      currentStreak: number
      longestStreak: number
      lastActivityDate: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    CourseProgress<T extends User$CourseProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$CourseProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    LessonProgress<T extends User$LessonProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$LessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    badges<T extends User$badgesArgs<ExtArgs> = {}>(args?: Subset<T, User$badgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly sessionToken: FieldRef<"User", 'String'>
    readonly thejoey: FieldRef<"User", 'Boolean'>
    readonly username: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly website: FieldRef<"User", 'String'>
    readonly twitter: FieldRef<"User", 'String'>
    readonly github: FieldRef<"User", 'String'>
    readonly linkedin: FieldRef<"User", 'String'>
    readonly isProfileVerified: FieldRef<"User", 'Boolean'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly currentStreak: FieldRef<"User", 'Int'>
    readonly longestStreak: FieldRef<"User", 'Int'>
    readonly lastActivityDate: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.CourseProgress
   */
  export type User$CourseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    where?: CourseProgressWhereInput
    orderBy?: CourseProgressOrderByWithRelationInput | CourseProgressOrderByWithRelationInput[]
    cursor?: CourseProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseProgressScalarFieldEnum | CourseProgressScalarFieldEnum[]
  }

  /**
   * User.LessonProgress
   */
  export type User$LessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    cursor?: LessonProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * User.badges
   */
  export type User$badgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    where?: UserBadgeWhereInput
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    cursor?: UserBadgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CourseProgress
   */

  export type AggregateCourseProgress = {
    _count: CourseProgressCountAggregateOutputType | null
    _min: CourseProgressMinAggregateOutputType | null
    _max: CourseProgressMaxAggregateOutputType | null
  }

  export type CourseProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    completed: boolean | null
    courseSlug: string | null
  }

  export type CourseProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    completed: boolean | null
    courseSlug: string | null
  }

  export type CourseProgressCountAggregateOutputType = {
    id: number
    userId: number
    completed: number
    courseSlug: number
    _all: number
  }


  export type CourseProgressMinAggregateInputType = {
    id?: true
    userId?: true
    completed?: true
    courseSlug?: true
  }

  export type CourseProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    completed?: true
    courseSlug?: true
  }

  export type CourseProgressCountAggregateInputType = {
    id?: true
    userId?: true
    completed?: true
    courseSlug?: true
    _all?: true
  }

  export type CourseProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseProgress to aggregate.
     */
    where?: CourseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseProgresses to fetch.
     */
    orderBy?: CourseProgressOrderByWithRelationInput | CourseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseProgresses
    **/
    _count?: true | CourseProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseProgressMaxAggregateInputType
  }

  export type GetCourseProgressAggregateType<T extends CourseProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseProgress[P]>
      : GetScalarType<T[P], AggregateCourseProgress[P]>
  }




  export type CourseProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseProgressWhereInput
    orderBy?: CourseProgressOrderByWithAggregationInput | CourseProgressOrderByWithAggregationInput[]
    by: CourseProgressScalarFieldEnum[] | CourseProgressScalarFieldEnum
    having?: CourseProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseProgressCountAggregateInputType | true
    _min?: CourseProgressMinAggregateInputType
    _max?: CourseProgressMaxAggregateInputType
  }

  export type CourseProgressGroupByOutputType = {
    id: string
    userId: string | null
    completed: boolean | null
    courseSlug: string
    _count: CourseProgressCountAggregateOutputType | null
    _min: CourseProgressMinAggregateOutputType | null
    _max: CourseProgressMaxAggregateOutputType | null
  }

  type GetCourseProgressGroupByPayload<T extends CourseProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseProgressGroupByOutputType[P]>
            : GetScalarType<T[P], CourseProgressGroupByOutputType[P]>
        }
      >
    >


  export type CourseProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    completed?: boolean
    courseSlug?: boolean
    Course?: boolean | CourseProgress$CourseArgs<ExtArgs>
    User?: boolean | CourseProgress$UserArgs<ExtArgs>
    lessonProgress?: boolean | CourseProgress$lessonProgressArgs<ExtArgs>
    _count?: boolean | CourseProgressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseProgress"]>



  export type CourseProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    completed?: boolean
    courseSlug?: boolean
  }

  export type CourseProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "completed" | "courseSlug", ExtArgs["result"]["courseProgress"]>
  export type CourseProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Course?: boolean | CourseProgress$CourseArgs<ExtArgs>
    User?: boolean | CourseProgress$UserArgs<ExtArgs>
    lessonProgress?: boolean | CourseProgress$lessonProgressArgs<ExtArgs>
    _count?: boolean | CourseProgressCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CourseProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseProgress"
    objects: {
      Course: Prisma.$CoursePayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs> | null
      lessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      completed: boolean | null
      courseSlug: string
    }, ExtArgs["result"]["courseProgress"]>
    composites: {}
  }

  type CourseProgressGetPayload<S extends boolean | null | undefined | CourseProgressDefaultArgs> = $Result.GetResult<Prisma.$CourseProgressPayload, S>

  type CourseProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseProgressCountAggregateInputType | true
    }

  export interface CourseProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseProgress'], meta: { name: 'CourseProgress' } }
    /**
     * Find zero or one CourseProgress that matches the filter.
     * @param {CourseProgressFindUniqueArgs} args - Arguments to find a CourseProgress
     * @example
     * // Get one CourseProgress
     * const courseProgress = await prisma.courseProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseProgressFindUniqueArgs>(args: SelectSubset<T, CourseProgressFindUniqueArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseProgressFindUniqueOrThrowArgs} args - Arguments to find a CourseProgress
     * @example
     * // Get one CourseProgress
     * const courseProgress = await prisma.courseProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressFindFirstArgs} args - Arguments to find a CourseProgress
     * @example
     * // Get one CourseProgress
     * const courseProgress = await prisma.courseProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseProgressFindFirstArgs>(args?: SelectSubset<T, CourseProgressFindFirstArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressFindFirstOrThrowArgs} args - Arguments to find a CourseProgress
     * @example
     * // Get one CourseProgress
     * const courseProgress = await prisma.courseProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseProgresses
     * const courseProgresses = await prisma.courseProgress.findMany()
     * 
     * // Get first 10 CourseProgresses
     * const courseProgresses = await prisma.courseProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseProgressWithIdOnly = await prisma.courseProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseProgressFindManyArgs>(args?: SelectSubset<T, CourseProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseProgress.
     * @param {CourseProgressCreateArgs} args - Arguments to create a CourseProgress.
     * @example
     * // Create one CourseProgress
     * const CourseProgress = await prisma.courseProgress.create({
     *   data: {
     *     // ... data to create a CourseProgress
     *   }
     * })
     * 
     */
    create<T extends CourseProgressCreateArgs>(args: SelectSubset<T, CourseProgressCreateArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseProgresses.
     * @param {CourseProgressCreateManyArgs} args - Arguments to create many CourseProgresses.
     * @example
     * // Create many CourseProgresses
     * const courseProgress = await prisma.courseProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseProgressCreateManyArgs>(args?: SelectSubset<T, CourseProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CourseProgress.
     * @param {CourseProgressDeleteArgs} args - Arguments to delete one CourseProgress.
     * @example
     * // Delete one CourseProgress
     * const CourseProgress = await prisma.courseProgress.delete({
     *   where: {
     *     // ... filter to delete one CourseProgress
     *   }
     * })
     * 
     */
    delete<T extends CourseProgressDeleteArgs>(args: SelectSubset<T, CourseProgressDeleteArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseProgress.
     * @param {CourseProgressUpdateArgs} args - Arguments to update one CourseProgress.
     * @example
     * // Update one CourseProgress
     * const courseProgress = await prisma.courseProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseProgressUpdateArgs>(args: SelectSubset<T, CourseProgressUpdateArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseProgresses.
     * @param {CourseProgressDeleteManyArgs} args - Arguments to filter CourseProgresses to delete.
     * @example
     * // Delete a few CourseProgresses
     * const { count } = await prisma.courseProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseProgressDeleteManyArgs>(args?: SelectSubset<T, CourseProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseProgresses
     * const courseProgress = await prisma.courseProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseProgressUpdateManyArgs>(args: SelectSubset<T, CourseProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseProgress.
     * @param {CourseProgressUpsertArgs} args - Arguments to update or create a CourseProgress.
     * @example
     * // Update or create a CourseProgress
     * const courseProgress = await prisma.courseProgress.upsert({
     *   create: {
     *     // ... data to create a CourseProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseProgress we want to update
     *   }
     * })
     */
    upsert<T extends CourseProgressUpsertArgs>(args: SelectSubset<T, CourseProgressUpsertArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseProgresses that matches the filter.
     * @param {CourseProgressFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const courseProgress = await prisma.courseProgress.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CourseProgressFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CourseProgress.
     * @param {CourseProgressAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const courseProgress = await prisma.courseProgress.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CourseProgressAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CourseProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressCountArgs} args - Arguments to filter CourseProgresses to count.
     * @example
     * // Count the number of CourseProgresses
     * const count = await prisma.courseProgress.count({
     *   where: {
     *     // ... the filter for the CourseProgresses we want to count
     *   }
     * })
    **/
    count<T extends CourseProgressCountArgs>(
      args?: Subset<T, CourseProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseProgressAggregateArgs>(args: Subset<T, CourseProgressAggregateArgs>): Prisma.PrismaPromise<GetCourseProgressAggregateType<T>>

    /**
     * Group by CourseProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseProgressGroupByArgs} args - Group by arguments.
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
      T extends CourseProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseProgressGroupByArgs['orderBy'] }
        : { orderBy?: CourseProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseProgress model
   */
  readonly fields: CourseProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Course<T extends CourseProgress$CourseArgs<ExtArgs> = {}>(args?: Subset<T, CourseProgress$CourseArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    User<T extends CourseProgress$UserArgs<ExtArgs> = {}>(args?: Subset<T, CourseProgress$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lessonProgress<T extends CourseProgress$lessonProgressArgs<ExtArgs> = {}>(args?: Subset<T, CourseProgress$lessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CourseProgress model
   */
  interface CourseProgressFieldRefs {
    readonly id: FieldRef<"CourseProgress", 'String'>
    readonly userId: FieldRef<"CourseProgress", 'String'>
    readonly completed: FieldRef<"CourseProgress", 'Boolean'>
    readonly courseSlug: FieldRef<"CourseProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CourseProgress findUnique
   */
  export type CourseProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * Filter, which CourseProgress to fetch.
     */
    where: CourseProgressWhereUniqueInput
  }

  /**
   * CourseProgress findUniqueOrThrow
   */
  export type CourseProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * Filter, which CourseProgress to fetch.
     */
    where: CourseProgressWhereUniqueInput
  }

  /**
   * CourseProgress findFirst
   */
  export type CourseProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * Filter, which CourseProgress to fetch.
     */
    where?: CourseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseProgresses to fetch.
     */
    orderBy?: CourseProgressOrderByWithRelationInput | CourseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseProgresses.
     */
    cursor?: CourseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseProgresses.
     */
    distinct?: CourseProgressScalarFieldEnum | CourseProgressScalarFieldEnum[]
  }

  /**
   * CourseProgress findFirstOrThrow
   */
  export type CourseProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * Filter, which CourseProgress to fetch.
     */
    where?: CourseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseProgresses to fetch.
     */
    orderBy?: CourseProgressOrderByWithRelationInput | CourseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseProgresses.
     */
    cursor?: CourseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseProgresses.
     */
    distinct?: CourseProgressScalarFieldEnum | CourseProgressScalarFieldEnum[]
  }

  /**
   * CourseProgress findMany
   */
  export type CourseProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * Filter, which CourseProgresses to fetch.
     */
    where?: CourseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseProgresses to fetch.
     */
    orderBy?: CourseProgressOrderByWithRelationInput | CourseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseProgresses.
     */
    cursor?: CourseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseProgresses.
     */
    skip?: number
    distinct?: CourseProgressScalarFieldEnum | CourseProgressScalarFieldEnum[]
  }

  /**
   * CourseProgress create
   */
  export type CourseProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseProgress.
     */
    data: XOR<CourseProgressCreateInput, CourseProgressUncheckedCreateInput>
  }

  /**
   * CourseProgress createMany
   */
  export type CourseProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseProgresses.
     */
    data: CourseProgressCreateManyInput | CourseProgressCreateManyInput[]
  }

  /**
   * CourseProgress update
   */
  export type CourseProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseProgress.
     */
    data: XOR<CourseProgressUpdateInput, CourseProgressUncheckedUpdateInput>
    /**
     * Choose, which CourseProgress to update.
     */
    where: CourseProgressWhereUniqueInput
  }

  /**
   * CourseProgress updateMany
   */
  export type CourseProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseProgresses.
     */
    data: XOR<CourseProgressUpdateManyMutationInput, CourseProgressUncheckedUpdateManyInput>
    /**
     * Filter which CourseProgresses to update
     */
    where?: CourseProgressWhereInput
    /**
     * Limit how many CourseProgresses to update.
     */
    limit?: number
  }

  /**
   * CourseProgress upsert
   */
  export type CourseProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseProgress to update in case it exists.
     */
    where: CourseProgressWhereUniqueInput
    /**
     * In case the CourseProgress found by the `where` argument doesn't exist, create a new CourseProgress with this data.
     */
    create: XOR<CourseProgressCreateInput, CourseProgressUncheckedCreateInput>
    /**
     * In case the CourseProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseProgressUpdateInput, CourseProgressUncheckedUpdateInput>
  }

  /**
   * CourseProgress delete
   */
  export type CourseProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    /**
     * Filter which CourseProgress to delete.
     */
    where: CourseProgressWhereUniqueInput
  }

  /**
   * CourseProgress deleteMany
   */
  export type CourseProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseProgresses to delete
     */
    where?: CourseProgressWhereInput
    /**
     * Limit how many CourseProgresses to delete.
     */
    limit?: number
  }

  /**
   * CourseProgress findRaw
   */
  export type CourseProgressFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CourseProgress aggregateRaw
   */
  export type CourseProgressAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CourseProgress.Course
   */
  export type CourseProgress$CourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }

  /**
   * CourseProgress.User
   */
  export type CourseProgress$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CourseProgress.lessonProgress
   */
  export type CourseProgress$lessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    cursor?: LessonProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * CourseProgress without action
   */
  export type CourseProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
  }


  /**
   * Model LessonProgress
   */

  export type AggregateLessonProgress = {
    _count: LessonProgressCountAggregateOutputType | null
    _min: LessonProgressMinAggregateOutputType | null
    _max: LessonProgressMaxAggregateOutputType | null
  }

  export type LessonProgressMinAggregateOutputType = {
    id: string | null
    completed: boolean | null
    lessonSlug: string | null
    courseProgressId: string | null
    userId: string | null
  }

  export type LessonProgressMaxAggregateOutputType = {
    id: string | null
    completed: boolean | null
    lessonSlug: string | null
    courseProgressId: string | null
    userId: string | null
  }

  export type LessonProgressCountAggregateOutputType = {
    id: number
    completed: number
    lessonSlug: number
    courseProgressId: number
    userId: number
    _all: number
  }


  export type LessonProgressMinAggregateInputType = {
    id?: true
    completed?: true
    lessonSlug?: true
    courseProgressId?: true
    userId?: true
  }

  export type LessonProgressMaxAggregateInputType = {
    id?: true
    completed?: true
    lessonSlug?: true
    courseProgressId?: true
    userId?: true
  }

  export type LessonProgressCountAggregateInputType = {
    id?: true
    completed?: true
    lessonSlug?: true
    courseProgressId?: true
    userId?: true
    _all?: true
  }

  export type LessonProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonProgress to aggregate.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonProgresses
    **/
    _count?: true | LessonProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonProgressMaxAggregateInputType
  }

  export type GetLessonProgressAggregateType<T extends LessonProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonProgress[P]>
      : GetScalarType<T[P], AggregateLessonProgress[P]>
  }




  export type LessonProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithAggregationInput | LessonProgressOrderByWithAggregationInput[]
    by: LessonProgressScalarFieldEnum[] | LessonProgressScalarFieldEnum
    having?: LessonProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonProgressCountAggregateInputType | true
    _min?: LessonProgressMinAggregateInputType
    _max?: LessonProgressMaxAggregateInputType
  }

  export type LessonProgressGroupByOutputType = {
    id: string
    completed: boolean | null
    lessonSlug: string
    courseProgressId: string | null
    userId: string | null
    _count: LessonProgressCountAggregateOutputType | null
    _min: LessonProgressMinAggregateOutputType | null
    _max: LessonProgressMaxAggregateOutputType | null
  }

  type GetLessonProgressGroupByPayload<T extends LessonProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonProgressGroupByOutputType[P]>
            : GetScalarType<T[P], LessonProgressGroupByOutputType[P]>
        }
      >
    >


  export type LessonProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    completed?: boolean
    lessonSlug?: boolean
    courseProgressId?: boolean
    userId?: boolean
    CourseProgress?: boolean | LessonProgress$CourseProgressArgs<ExtArgs>
    Lesson?: boolean | LessonProgress$LessonArgs<ExtArgs>
    User?: boolean | LessonProgress$UserArgs<ExtArgs>
  }, ExtArgs["result"]["lessonProgress"]>



  export type LessonProgressSelectScalar = {
    id?: boolean
    completed?: boolean
    lessonSlug?: boolean
    courseProgressId?: boolean
    userId?: boolean
  }

  export type LessonProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "completed" | "lessonSlug" | "courseProgressId" | "userId", ExtArgs["result"]["lessonProgress"]>
  export type LessonProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    CourseProgress?: boolean | LessonProgress$CourseProgressArgs<ExtArgs>
    Lesson?: boolean | LessonProgress$LessonArgs<ExtArgs>
    User?: boolean | LessonProgress$UserArgs<ExtArgs>
  }

  export type $LessonProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonProgress"
    objects: {
      CourseProgress: Prisma.$CourseProgressPayload<ExtArgs> | null
      Lesson: Prisma.$LessonPayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      completed: boolean | null
      lessonSlug: string
      courseProgressId: string | null
      userId: string | null
    }, ExtArgs["result"]["lessonProgress"]>
    composites: {}
  }

  type LessonProgressGetPayload<S extends boolean | null | undefined | LessonProgressDefaultArgs> = $Result.GetResult<Prisma.$LessonProgressPayload, S>

  type LessonProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonProgressCountAggregateInputType | true
    }

  export interface LessonProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonProgress'], meta: { name: 'LessonProgress' } }
    /**
     * Find zero or one LessonProgress that matches the filter.
     * @param {LessonProgressFindUniqueArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonProgressFindUniqueArgs>(args: SelectSubset<T, LessonProgressFindUniqueArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonProgressFindUniqueOrThrowArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressFindFirstArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonProgressFindFirstArgs>(args?: SelectSubset<T, LessonProgressFindFirstArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressFindFirstOrThrowArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonProgresses
     * const lessonProgresses = await prisma.lessonProgress.findMany()
     * 
     * // Get first 10 LessonProgresses
     * const lessonProgresses = await prisma.lessonProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonProgressWithIdOnly = await prisma.lessonProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonProgressFindManyArgs>(args?: SelectSubset<T, LessonProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonProgress.
     * @param {LessonProgressCreateArgs} args - Arguments to create a LessonProgress.
     * @example
     * // Create one LessonProgress
     * const LessonProgress = await prisma.lessonProgress.create({
     *   data: {
     *     // ... data to create a LessonProgress
     *   }
     * })
     * 
     */
    create<T extends LessonProgressCreateArgs>(args: SelectSubset<T, LessonProgressCreateArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonProgresses.
     * @param {LessonProgressCreateManyArgs} args - Arguments to create many LessonProgresses.
     * @example
     * // Create many LessonProgresses
     * const lessonProgress = await prisma.lessonProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonProgressCreateManyArgs>(args?: SelectSubset<T, LessonProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LessonProgress.
     * @param {LessonProgressDeleteArgs} args - Arguments to delete one LessonProgress.
     * @example
     * // Delete one LessonProgress
     * const LessonProgress = await prisma.lessonProgress.delete({
     *   where: {
     *     // ... filter to delete one LessonProgress
     *   }
     * })
     * 
     */
    delete<T extends LessonProgressDeleteArgs>(args: SelectSubset<T, LessonProgressDeleteArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonProgress.
     * @param {LessonProgressUpdateArgs} args - Arguments to update one LessonProgress.
     * @example
     * // Update one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonProgressUpdateArgs>(args: SelectSubset<T, LessonProgressUpdateArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonProgresses.
     * @param {LessonProgressDeleteManyArgs} args - Arguments to filter LessonProgresses to delete.
     * @example
     * // Delete a few LessonProgresses
     * const { count } = await prisma.lessonProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonProgressDeleteManyArgs>(args?: SelectSubset<T, LessonProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonProgresses
     * const lessonProgress = await prisma.lessonProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonProgressUpdateManyArgs>(args: SelectSubset<T, LessonProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LessonProgress.
     * @param {LessonProgressUpsertArgs} args - Arguments to update or create a LessonProgress.
     * @example
     * // Update or create a LessonProgress
     * const lessonProgress = await prisma.lessonProgress.upsert({
     *   create: {
     *     // ... data to create a LessonProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonProgress we want to update
     *   }
     * })
     */
    upsert<T extends LessonProgressUpsertArgs>(args: SelectSubset<T, LessonProgressUpsertArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonProgresses that matches the filter.
     * @param {LessonProgressFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lessonProgress = await prisma.lessonProgress.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LessonProgressFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a LessonProgress.
     * @param {LessonProgressAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lessonProgress = await prisma.lessonProgress.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LessonProgressAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of LessonProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressCountArgs} args - Arguments to filter LessonProgresses to count.
     * @example
     * // Count the number of LessonProgresses
     * const count = await prisma.lessonProgress.count({
     *   where: {
     *     // ... the filter for the LessonProgresses we want to count
     *   }
     * })
    **/
    count<T extends LessonProgressCountArgs>(
      args?: Subset<T, LessonProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LessonProgressAggregateArgs>(args: Subset<T, LessonProgressAggregateArgs>): Prisma.PrismaPromise<GetLessonProgressAggregateType<T>>

    /**
     * Group by LessonProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressGroupByArgs} args - Group by arguments.
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
      T extends LessonProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonProgressGroupByArgs['orderBy'] }
        : { orderBy?: LessonProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LessonProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonProgress model
   */
  readonly fields: LessonProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    CourseProgress<T extends LessonProgress$CourseProgressArgs<ExtArgs> = {}>(args?: Subset<T, LessonProgress$CourseProgressArgs<ExtArgs>>): Prisma__CourseProgressClient<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Lesson<T extends LessonProgress$LessonArgs<ExtArgs> = {}>(args?: Subset<T, LessonProgress$LessonArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    User<T extends LessonProgress$UserArgs<ExtArgs> = {}>(args?: Subset<T, LessonProgress$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LessonProgress model
   */
  interface LessonProgressFieldRefs {
    readonly id: FieldRef<"LessonProgress", 'String'>
    readonly completed: FieldRef<"LessonProgress", 'Boolean'>
    readonly lessonSlug: FieldRef<"LessonProgress", 'String'>
    readonly courseProgressId: FieldRef<"LessonProgress", 'String'>
    readonly userId: FieldRef<"LessonProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LessonProgress findUnique
   */
  export type LessonProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress findUniqueOrThrow
   */
  export type LessonProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress findFirst
   */
  export type LessonProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonProgresses.
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonProgresses.
     */
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonProgress findFirstOrThrow
   */
  export type LessonProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonProgresses.
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonProgresses.
     */
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonProgress findMany
   */
  export type LessonProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgresses to fetch.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonProgresses.
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonProgress create
   */
  export type LessonProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a LessonProgress.
     */
    data: XOR<LessonProgressCreateInput, LessonProgressUncheckedCreateInput>
  }

  /**
   * LessonProgress createMany
   */
  export type LessonProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonProgresses.
     */
    data: LessonProgressCreateManyInput | LessonProgressCreateManyInput[]
  }

  /**
   * LessonProgress update
   */
  export type LessonProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a LessonProgress.
     */
    data: XOR<LessonProgressUpdateInput, LessonProgressUncheckedUpdateInput>
    /**
     * Choose, which LessonProgress to update.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress updateMany
   */
  export type LessonProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonProgresses.
     */
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyInput>
    /**
     * Filter which LessonProgresses to update
     */
    where?: LessonProgressWhereInput
    /**
     * Limit how many LessonProgresses to update.
     */
    limit?: number
  }

  /**
   * LessonProgress upsert
   */
  export type LessonProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the LessonProgress to update in case it exists.
     */
    where: LessonProgressWhereUniqueInput
    /**
     * In case the LessonProgress found by the `where` argument doesn't exist, create a new LessonProgress with this data.
     */
    create: XOR<LessonProgressCreateInput, LessonProgressUncheckedCreateInput>
    /**
     * In case the LessonProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonProgressUpdateInput, LessonProgressUncheckedUpdateInput>
  }

  /**
   * LessonProgress delete
   */
  export type LessonProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter which LessonProgress to delete.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress deleteMany
   */
  export type LessonProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonProgresses to delete
     */
    where?: LessonProgressWhereInput
    /**
     * Limit how many LessonProgresses to delete.
     */
    limit?: number
  }

  /**
   * LessonProgress findRaw
   */
  export type LessonProgressFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LessonProgress aggregateRaw
   */
  export type LessonProgressAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LessonProgress.CourseProgress
   */
  export type LessonProgress$CourseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    where?: CourseProgressWhereInput
  }

  /**
   * LessonProgress.Lesson
   */
  export type LessonProgress$LessonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    where?: LessonWhereInput
  }

  /**
   * LessonProgress.User
   */
  export type LessonProgress$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * LessonProgress without action
   */
  export type LessonProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    title: number
    description: number
    createdAt: number
    userId: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    userId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    userId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    title: string
    description: string
    createdAt: Date
    userId: string | null
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    userId?: boolean
    User?: boolean | Message$UserArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>



  export type MessageSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "createdAt" | "userId", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | Message$UserArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      User: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      createdAt: Date
      userId: string | null
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * @param {MessageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const message = await prisma.message.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MessageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Message.
     * @param {MessageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const message = await prisma.message.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MessageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
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
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends Message$UserArgs<ExtArgs> = {}>(args?: Subset<T, Message$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly title: FieldRef<"Message", 'String'>
    readonly description: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly userId: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message findRaw
   */
  export type MessageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Message aggregateRaw
   */
  export type MessageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Message.User
   */
  export type Message$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    duration: number | null
  }

  export type CourseSumAggregateOutputType = {
    duration: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    slug: string | null
    progressional: boolean | null
    userId: string | null
    duration: number | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    slug: string | null
    progressional: boolean | null
    userId: string | null
    duration: number | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    tags: number
    slug: number
    progressional: number
    userId: number
    order: number
    rating: number
    duration: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    duration?: true
  }

  export type CourseSumAggregateInputType = {
    duration?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    progressional?: true
    userId?: true
    duration?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    progressional?: true
    userId?: true
    duration?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    tags?: true
    slug?: true
    progressional?: true
    userId?: true
    order?: true
    rating?: true
    duration?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    title: string
    description: string
    tags: string[]
    slug: string
    progressional: boolean
    userId: string | null
    order: string[]
    rating: JsonValue | null
    duration: number | null
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    slug?: boolean
    progressional?: boolean
    userId?: boolean
    order?: boolean
    rating?: boolean
    duration?: boolean
    lessons?: boolean | Course$lessonsArgs<ExtArgs>
    CourseProgress?: boolean | Course$CourseProgressArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>



  export type CourseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    slug?: boolean
    progressional?: boolean
    userId?: boolean
    order?: boolean
    rating?: boolean
    duration?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "tags" | "slug" | "progressional" | "userId" | "order" | "rating" | "duration", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessons?: boolean | Course$lessonsArgs<ExtArgs>
    CourseProgress?: boolean | Course$CourseProgressArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      lessons: Prisma.$LessonPayload<ExtArgs>[]
      CourseProgress: Prisma.$CourseProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      tags: string[]
      slug: string
      progressional: boolean
      userId: string | null
      order: string[]
      rating: Prisma.JsonValue | null
      duration: number | null
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * @param {CourseFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const course = await prisma.course.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CourseFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Course.
     * @param {CourseAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const course = await prisma.course.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CourseAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
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
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lessons<T extends Course$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Course$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    CourseProgress<T extends Course$CourseProgressArgs<ExtArgs> = {}>(args?: Subset<T, Course$CourseProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly tags: FieldRef<"Course", 'String[]'>
    readonly slug: FieldRef<"Course", 'String'>
    readonly progressional: FieldRef<"Course", 'Boolean'>
    readonly userId: FieldRef<"Course", 'String'>
    readonly order: FieldRef<"Course", 'String[]'>
    readonly rating: FieldRef<"Course", 'Json'>
    readonly duration: FieldRef<"Course", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course findRaw
   */
  export type CourseFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Course aggregateRaw
   */
  export type CourseAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Course.lessons
   */
  export type Course$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    cursor?: LessonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Course.CourseProgress
   */
  export type Course$CourseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseProgress
     */
    select?: CourseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseProgress
     */
    omit?: CourseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseProgressInclude<ExtArgs> | null
    where?: CourseProgressWhereInput
    orderBy?: CourseProgressOrderByWithRelationInput | CourseProgressOrderByWithRelationInput[]
    cursor?: CourseProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseProgressScalarFieldEnum | CourseProgressScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model CourseTrack
   */

  export type AggregateCourseTrack = {
    _count: CourseTrackCountAggregateOutputType | null
    _min: CourseTrackMinAggregateOutputType | null
    _max: CourseTrackMaxAggregateOutputType | null
  }

  export type CourseTrackMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseTrackMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseTrackCountAggregateOutputType = {
    id: number
    title: number
    description: number
    slug: number
    courseSlugs: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseTrackMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseTrackMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseTrackCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    courseSlugs?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseTrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseTrack to aggregate.
     */
    where?: CourseTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTracks to fetch.
     */
    orderBy?: CourseTrackOrderByWithRelationInput | CourseTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseTracks
    **/
    _count?: true | CourseTrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseTrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseTrackMaxAggregateInputType
  }

  export type GetCourseTrackAggregateType<T extends CourseTrackAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseTrack[P]>
      : GetScalarType<T[P], AggregateCourseTrack[P]>
  }




  export type CourseTrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseTrackWhereInput
    orderBy?: CourseTrackOrderByWithAggregationInput | CourseTrackOrderByWithAggregationInput[]
    by: CourseTrackScalarFieldEnum[] | CourseTrackScalarFieldEnum
    having?: CourseTrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseTrackCountAggregateInputType | true
    _min?: CourseTrackMinAggregateInputType
    _max?: CourseTrackMaxAggregateInputType
  }

  export type CourseTrackGroupByOutputType = {
    id: string
    title: string
    description: string
    slug: string
    courseSlugs: string[]
    createdAt: Date
    updatedAt: Date
    _count: CourseTrackCountAggregateOutputType | null
    _min: CourseTrackMinAggregateOutputType | null
    _max: CourseTrackMaxAggregateOutputType | null
  }

  type GetCourseTrackGroupByPayload<T extends CourseTrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseTrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseTrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseTrackGroupByOutputType[P]>
            : GetScalarType<T[P], CourseTrackGroupByOutputType[P]>
        }
      >
    >


  export type CourseTrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    courseSlugs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    enrollments?: boolean | CourseTrack$enrollmentsArgs<ExtArgs>
    _count?: boolean | CourseTrackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseTrack"]>



  export type CourseTrackSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    courseSlugs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseTrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "slug" | "courseSlugs" | "createdAt" | "updatedAt", ExtArgs["result"]["courseTrack"]>
  export type CourseTrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | CourseTrack$enrollmentsArgs<ExtArgs>
    _count?: boolean | CourseTrackCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CourseTrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseTrack"
    objects: {
      enrollments: Prisma.$CourseTrackEnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      slug: string
      courseSlugs: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["courseTrack"]>
    composites: {}
  }

  type CourseTrackGetPayload<S extends boolean | null | undefined | CourseTrackDefaultArgs> = $Result.GetResult<Prisma.$CourseTrackPayload, S>

  type CourseTrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseTrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseTrackCountAggregateInputType | true
    }

  export interface CourseTrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseTrack'], meta: { name: 'CourseTrack' } }
    /**
     * Find zero or one CourseTrack that matches the filter.
     * @param {CourseTrackFindUniqueArgs} args - Arguments to find a CourseTrack
     * @example
     * // Get one CourseTrack
     * const courseTrack = await prisma.courseTrack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseTrackFindUniqueArgs>(args: SelectSubset<T, CourseTrackFindUniqueArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseTrack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseTrackFindUniqueOrThrowArgs} args - Arguments to find a CourseTrack
     * @example
     * // Get one CourseTrack
     * const courseTrack = await prisma.courseTrack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseTrackFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseTrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseTrack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackFindFirstArgs} args - Arguments to find a CourseTrack
     * @example
     * // Get one CourseTrack
     * const courseTrack = await prisma.courseTrack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseTrackFindFirstArgs>(args?: SelectSubset<T, CourseTrackFindFirstArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseTrack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackFindFirstOrThrowArgs} args - Arguments to find a CourseTrack
     * @example
     * // Get one CourseTrack
     * const courseTrack = await prisma.courseTrack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseTrackFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseTrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseTracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseTracks
     * const courseTracks = await prisma.courseTrack.findMany()
     * 
     * // Get first 10 CourseTracks
     * const courseTracks = await prisma.courseTrack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseTrackWithIdOnly = await prisma.courseTrack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseTrackFindManyArgs>(args?: SelectSubset<T, CourseTrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseTrack.
     * @param {CourseTrackCreateArgs} args - Arguments to create a CourseTrack.
     * @example
     * // Create one CourseTrack
     * const CourseTrack = await prisma.courseTrack.create({
     *   data: {
     *     // ... data to create a CourseTrack
     *   }
     * })
     * 
     */
    create<T extends CourseTrackCreateArgs>(args: SelectSubset<T, CourseTrackCreateArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseTracks.
     * @param {CourseTrackCreateManyArgs} args - Arguments to create many CourseTracks.
     * @example
     * // Create many CourseTracks
     * const courseTrack = await prisma.courseTrack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseTrackCreateManyArgs>(args?: SelectSubset<T, CourseTrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CourseTrack.
     * @param {CourseTrackDeleteArgs} args - Arguments to delete one CourseTrack.
     * @example
     * // Delete one CourseTrack
     * const CourseTrack = await prisma.courseTrack.delete({
     *   where: {
     *     // ... filter to delete one CourseTrack
     *   }
     * })
     * 
     */
    delete<T extends CourseTrackDeleteArgs>(args: SelectSubset<T, CourseTrackDeleteArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseTrack.
     * @param {CourseTrackUpdateArgs} args - Arguments to update one CourseTrack.
     * @example
     * // Update one CourseTrack
     * const courseTrack = await prisma.courseTrack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseTrackUpdateArgs>(args: SelectSubset<T, CourseTrackUpdateArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseTracks.
     * @param {CourseTrackDeleteManyArgs} args - Arguments to filter CourseTracks to delete.
     * @example
     * // Delete a few CourseTracks
     * const { count } = await prisma.courseTrack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseTrackDeleteManyArgs>(args?: SelectSubset<T, CourseTrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseTracks
     * const courseTrack = await prisma.courseTrack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseTrackUpdateManyArgs>(args: SelectSubset<T, CourseTrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseTrack.
     * @param {CourseTrackUpsertArgs} args - Arguments to update or create a CourseTrack.
     * @example
     * // Update or create a CourseTrack
     * const courseTrack = await prisma.courseTrack.upsert({
     *   create: {
     *     // ... data to create a CourseTrack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseTrack we want to update
     *   }
     * })
     */
    upsert<T extends CourseTrackUpsertArgs>(args: SelectSubset<T, CourseTrackUpsertArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseTracks that matches the filter.
     * @param {CourseTrackFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const courseTrack = await prisma.courseTrack.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CourseTrackFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CourseTrack.
     * @param {CourseTrackAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const courseTrack = await prisma.courseTrack.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CourseTrackAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CourseTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackCountArgs} args - Arguments to filter CourseTracks to count.
     * @example
     * // Count the number of CourseTracks
     * const count = await prisma.courseTrack.count({
     *   where: {
     *     // ... the filter for the CourseTracks we want to count
     *   }
     * })
    **/
    count<T extends CourseTrackCountArgs>(
      args?: Subset<T, CourseTrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseTrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseTrackAggregateArgs>(args: Subset<T, CourseTrackAggregateArgs>): Prisma.PrismaPromise<GetCourseTrackAggregateType<T>>

    /**
     * Group by CourseTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackGroupByArgs} args - Group by arguments.
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
      T extends CourseTrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseTrackGroupByArgs['orderBy'] }
        : { orderBy?: CourseTrackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseTrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseTrack model
   */
  readonly fields: CourseTrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseTrack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseTrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends CourseTrack$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, CourseTrack$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CourseTrack model
   */
  interface CourseTrackFieldRefs {
    readonly id: FieldRef<"CourseTrack", 'String'>
    readonly title: FieldRef<"CourseTrack", 'String'>
    readonly description: FieldRef<"CourseTrack", 'String'>
    readonly slug: FieldRef<"CourseTrack", 'String'>
    readonly courseSlugs: FieldRef<"CourseTrack", 'String[]'>
    readonly createdAt: FieldRef<"CourseTrack", 'DateTime'>
    readonly updatedAt: FieldRef<"CourseTrack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CourseTrack findUnique
   */
  export type CourseTrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrack to fetch.
     */
    where: CourseTrackWhereUniqueInput
  }

  /**
   * CourseTrack findUniqueOrThrow
   */
  export type CourseTrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrack to fetch.
     */
    where: CourseTrackWhereUniqueInput
  }

  /**
   * CourseTrack findFirst
   */
  export type CourseTrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrack to fetch.
     */
    where?: CourseTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTracks to fetch.
     */
    orderBy?: CourseTrackOrderByWithRelationInput | CourseTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseTracks.
     */
    cursor?: CourseTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseTracks.
     */
    distinct?: CourseTrackScalarFieldEnum | CourseTrackScalarFieldEnum[]
  }

  /**
   * CourseTrack findFirstOrThrow
   */
  export type CourseTrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrack to fetch.
     */
    where?: CourseTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTracks to fetch.
     */
    orderBy?: CourseTrackOrderByWithRelationInput | CourseTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseTracks.
     */
    cursor?: CourseTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseTracks.
     */
    distinct?: CourseTrackScalarFieldEnum | CourseTrackScalarFieldEnum[]
  }

  /**
   * CourseTrack findMany
   */
  export type CourseTrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * Filter, which CourseTracks to fetch.
     */
    where?: CourseTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTracks to fetch.
     */
    orderBy?: CourseTrackOrderByWithRelationInput | CourseTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseTracks.
     */
    cursor?: CourseTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTracks.
     */
    skip?: number
    distinct?: CourseTrackScalarFieldEnum | CourseTrackScalarFieldEnum[]
  }

  /**
   * CourseTrack create
   */
  export type CourseTrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseTrack.
     */
    data: XOR<CourseTrackCreateInput, CourseTrackUncheckedCreateInput>
  }

  /**
   * CourseTrack createMany
   */
  export type CourseTrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseTracks.
     */
    data: CourseTrackCreateManyInput | CourseTrackCreateManyInput[]
  }

  /**
   * CourseTrack update
   */
  export type CourseTrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseTrack.
     */
    data: XOR<CourseTrackUpdateInput, CourseTrackUncheckedUpdateInput>
    /**
     * Choose, which CourseTrack to update.
     */
    where: CourseTrackWhereUniqueInput
  }

  /**
   * CourseTrack updateMany
   */
  export type CourseTrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseTracks.
     */
    data: XOR<CourseTrackUpdateManyMutationInput, CourseTrackUncheckedUpdateManyInput>
    /**
     * Filter which CourseTracks to update
     */
    where?: CourseTrackWhereInput
    /**
     * Limit how many CourseTracks to update.
     */
    limit?: number
  }

  /**
   * CourseTrack upsert
   */
  export type CourseTrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseTrack to update in case it exists.
     */
    where: CourseTrackWhereUniqueInput
    /**
     * In case the CourseTrack found by the `where` argument doesn't exist, create a new CourseTrack with this data.
     */
    create: XOR<CourseTrackCreateInput, CourseTrackUncheckedCreateInput>
    /**
     * In case the CourseTrack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseTrackUpdateInput, CourseTrackUncheckedUpdateInput>
  }

  /**
   * CourseTrack delete
   */
  export type CourseTrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
    /**
     * Filter which CourseTrack to delete.
     */
    where: CourseTrackWhereUniqueInput
  }

  /**
   * CourseTrack deleteMany
   */
  export type CourseTrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseTracks to delete
     */
    where?: CourseTrackWhereInput
    /**
     * Limit how many CourseTracks to delete.
     */
    limit?: number
  }

  /**
   * CourseTrack findRaw
   */
  export type CourseTrackFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CourseTrack aggregateRaw
   */
  export type CourseTrackAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CourseTrack.enrollments
   */
  export type CourseTrack$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    where?: CourseTrackEnrollmentWhereInput
    orderBy?: CourseTrackEnrollmentOrderByWithRelationInput | CourseTrackEnrollmentOrderByWithRelationInput[]
    cursor?: CourseTrackEnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseTrackEnrollmentScalarFieldEnum | CourseTrackEnrollmentScalarFieldEnum[]
  }

  /**
   * CourseTrack without action
   */
  export type CourseTrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrack
     */
    select?: CourseTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrack
     */
    omit?: CourseTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackInclude<ExtArgs> | null
  }


  /**
   * Model CourseTrackEnrollment
   */

  export type AggregateCourseTrackEnrollment = {
    _count: CourseTrackEnrollmentCountAggregateOutputType | null
    _min: CourseTrackEnrollmentMinAggregateOutputType | null
    _max: CourseTrackEnrollmentMaxAggregateOutputType | null
  }

  export type CourseTrackEnrollmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    trackSlug: string | null
    completed: boolean | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type CourseTrackEnrollmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    trackSlug: string | null
    completed: boolean | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type CourseTrackEnrollmentCountAggregateOutputType = {
    id: number
    userId: number
    trackSlug: number
    completed: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type CourseTrackEnrollmentMinAggregateInputType = {
    id?: true
    userId?: true
    trackSlug?: true
    completed?: true
    startedAt?: true
    completedAt?: true
  }

  export type CourseTrackEnrollmentMaxAggregateInputType = {
    id?: true
    userId?: true
    trackSlug?: true
    completed?: true
    startedAt?: true
    completedAt?: true
  }

  export type CourseTrackEnrollmentCountAggregateInputType = {
    id?: true
    userId?: true
    trackSlug?: true
    completed?: true
    startedAt?: true
    completedAt?: true
    _all?: true
  }

  export type CourseTrackEnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseTrackEnrollment to aggregate.
     */
    where?: CourseTrackEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTrackEnrollments to fetch.
     */
    orderBy?: CourseTrackEnrollmentOrderByWithRelationInput | CourseTrackEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseTrackEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTrackEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTrackEnrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseTrackEnrollments
    **/
    _count?: true | CourseTrackEnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseTrackEnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseTrackEnrollmentMaxAggregateInputType
  }

  export type GetCourseTrackEnrollmentAggregateType<T extends CourseTrackEnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseTrackEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseTrackEnrollment[P]>
      : GetScalarType<T[P], AggregateCourseTrackEnrollment[P]>
  }




  export type CourseTrackEnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseTrackEnrollmentWhereInput
    orderBy?: CourseTrackEnrollmentOrderByWithAggregationInput | CourseTrackEnrollmentOrderByWithAggregationInput[]
    by: CourseTrackEnrollmentScalarFieldEnum[] | CourseTrackEnrollmentScalarFieldEnum
    having?: CourseTrackEnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseTrackEnrollmentCountAggregateInputType | true
    _min?: CourseTrackEnrollmentMinAggregateInputType
    _max?: CourseTrackEnrollmentMaxAggregateInputType
  }

  export type CourseTrackEnrollmentGroupByOutputType = {
    id: string
    userId: string
    trackSlug: string
    completed: boolean
    startedAt: Date
    completedAt: Date | null
    _count: CourseTrackEnrollmentCountAggregateOutputType | null
    _min: CourseTrackEnrollmentMinAggregateOutputType | null
    _max: CourseTrackEnrollmentMaxAggregateOutputType | null
  }

  type GetCourseTrackEnrollmentGroupByPayload<T extends CourseTrackEnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseTrackEnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseTrackEnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseTrackEnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], CourseTrackEnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type CourseTrackEnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    trackSlug?: boolean
    completed?: boolean
    startedAt?: boolean
    completedAt?: boolean
    track?: boolean | CourseTrackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseTrackEnrollment"]>



  export type CourseTrackEnrollmentSelectScalar = {
    id?: boolean
    userId?: boolean
    trackSlug?: boolean
    completed?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type CourseTrackEnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "trackSlug" | "completed" | "startedAt" | "completedAt", ExtArgs["result"]["courseTrackEnrollment"]>
  export type CourseTrackEnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    track?: boolean | CourseTrackDefaultArgs<ExtArgs>
  }

  export type $CourseTrackEnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseTrackEnrollment"
    objects: {
      track: Prisma.$CourseTrackPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      trackSlug: string
      completed: boolean
      startedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["courseTrackEnrollment"]>
    composites: {}
  }

  type CourseTrackEnrollmentGetPayload<S extends boolean | null | undefined | CourseTrackEnrollmentDefaultArgs> = $Result.GetResult<Prisma.$CourseTrackEnrollmentPayload, S>

  type CourseTrackEnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseTrackEnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseTrackEnrollmentCountAggregateInputType | true
    }

  export interface CourseTrackEnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseTrackEnrollment'], meta: { name: 'CourseTrackEnrollment' } }
    /**
     * Find zero or one CourseTrackEnrollment that matches the filter.
     * @param {CourseTrackEnrollmentFindUniqueArgs} args - Arguments to find a CourseTrackEnrollment
     * @example
     * // Get one CourseTrackEnrollment
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseTrackEnrollmentFindUniqueArgs>(args: SelectSubset<T, CourseTrackEnrollmentFindUniqueArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseTrackEnrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseTrackEnrollmentFindUniqueOrThrowArgs} args - Arguments to find a CourseTrackEnrollment
     * @example
     * // Get one CourseTrackEnrollment
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseTrackEnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseTrackEnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseTrackEnrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentFindFirstArgs} args - Arguments to find a CourseTrackEnrollment
     * @example
     * // Get one CourseTrackEnrollment
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseTrackEnrollmentFindFirstArgs>(args?: SelectSubset<T, CourseTrackEnrollmentFindFirstArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseTrackEnrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentFindFirstOrThrowArgs} args - Arguments to find a CourseTrackEnrollment
     * @example
     * // Get one CourseTrackEnrollment
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseTrackEnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseTrackEnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseTrackEnrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseTrackEnrollments
     * const courseTrackEnrollments = await prisma.courseTrackEnrollment.findMany()
     * 
     * // Get first 10 CourseTrackEnrollments
     * const courseTrackEnrollments = await prisma.courseTrackEnrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseTrackEnrollmentWithIdOnly = await prisma.courseTrackEnrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseTrackEnrollmentFindManyArgs>(args?: SelectSubset<T, CourseTrackEnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseTrackEnrollment.
     * @param {CourseTrackEnrollmentCreateArgs} args - Arguments to create a CourseTrackEnrollment.
     * @example
     * // Create one CourseTrackEnrollment
     * const CourseTrackEnrollment = await prisma.courseTrackEnrollment.create({
     *   data: {
     *     // ... data to create a CourseTrackEnrollment
     *   }
     * })
     * 
     */
    create<T extends CourseTrackEnrollmentCreateArgs>(args: SelectSubset<T, CourseTrackEnrollmentCreateArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseTrackEnrollments.
     * @param {CourseTrackEnrollmentCreateManyArgs} args - Arguments to create many CourseTrackEnrollments.
     * @example
     * // Create many CourseTrackEnrollments
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseTrackEnrollmentCreateManyArgs>(args?: SelectSubset<T, CourseTrackEnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CourseTrackEnrollment.
     * @param {CourseTrackEnrollmentDeleteArgs} args - Arguments to delete one CourseTrackEnrollment.
     * @example
     * // Delete one CourseTrackEnrollment
     * const CourseTrackEnrollment = await prisma.courseTrackEnrollment.delete({
     *   where: {
     *     // ... filter to delete one CourseTrackEnrollment
     *   }
     * })
     * 
     */
    delete<T extends CourseTrackEnrollmentDeleteArgs>(args: SelectSubset<T, CourseTrackEnrollmentDeleteArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseTrackEnrollment.
     * @param {CourseTrackEnrollmentUpdateArgs} args - Arguments to update one CourseTrackEnrollment.
     * @example
     * // Update one CourseTrackEnrollment
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseTrackEnrollmentUpdateArgs>(args: SelectSubset<T, CourseTrackEnrollmentUpdateArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseTrackEnrollments.
     * @param {CourseTrackEnrollmentDeleteManyArgs} args - Arguments to filter CourseTrackEnrollments to delete.
     * @example
     * // Delete a few CourseTrackEnrollments
     * const { count } = await prisma.courseTrackEnrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseTrackEnrollmentDeleteManyArgs>(args?: SelectSubset<T, CourseTrackEnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseTrackEnrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseTrackEnrollments
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseTrackEnrollmentUpdateManyArgs>(args: SelectSubset<T, CourseTrackEnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseTrackEnrollment.
     * @param {CourseTrackEnrollmentUpsertArgs} args - Arguments to update or create a CourseTrackEnrollment.
     * @example
     * // Update or create a CourseTrackEnrollment
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.upsert({
     *   create: {
     *     // ... data to create a CourseTrackEnrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseTrackEnrollment we want to update
     *   }
     * })
     */
    upsert<T extends CourseTrackEnrollmentUpsertArgs>(args: SelectSubset<T, CourseTrackEnrollmentUpsertArgs<ExtArgs>>): Prisma__CourseTrackEnrollmentClient<$Result.GetResult<Prisma.$CourseTrackEnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseTrackEnrollments that matches the filter.
     * @param {CourseTrackEnrollmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CourseTrackEnrollmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CourseTrackEnrollment.
     * @param {CourseTrackEnrollmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const courseTrackEnrollment = await prisma.courseTrackEnrollment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CourseTrackEnrollmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CourseTrackEnrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentCountArgs} args - Arguments to filter CourseTrackEnrollments to count.
     * @example
     * // Count the number of CourseTrackEnrollments
     * const count = await prisma.courseTrackEnrollment.count({
     *   where: {
     *     // ... the filter for the CourseTrackEnrollments we want to count
     *   }
     * })
    **/
    count<T extends CourseTrackEnrollmentCountArgs>(
      args?: Subset<T, CourseTrackEnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseTrackEnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseTrackEnrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseTrackEnrollmentAggregateArgs>(args: Subset<T, CourseTrackEnrollmentAggregateArgs>): Prisma.PrismaPromise<GetCourseTrackEnrollmentAggregateType<T>>

    /**
     * Group by CourseTrackEnrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTrackEnrollmentGroupByArgs} args - Group by arguments.
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
      T extends CourseTrackEnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseTrackEnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: CourseTrackEnrollmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseTrackEnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseTrackEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseTrackEnrollment model
   */
  readonly fields: CourseTrackEnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseTrackEnrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseTrackEnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    track<T extends CourseTrackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseTrackDefaultArgs<ExtArgs>>): Prisma__CourseTrackClient<$Result.GetResult<Prisma.$CourseTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CourseTrackEnrollment model
   */
  interface CourseTrackEnrollmentFieldRefs {
    readonly id: FieldRef<"CourseTrackEnrollment", 'String'>
    readonly userId: FieldRef<"CourseTrackEnrollment", 'String'>
    readonly trackSlug: FieldRef<"CourseTrackEnrollment", 'String'>
    readonly completed: FieldRef<"CourseTrackEnrollment", 'Boolean'>
    readonly startedAt: FieldRef<"CourseTrackEnrollment", 'DateTime'>
    readonly completedAt: FieldRef<"CourseTrackEnrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CourseTrackEnrollment findUnique
   */
  export type CourseTrackEnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrackEnrollment to fetch.
     */
    where: CourseTrackEnrollmentWhereUniqueInput
  }

  /**
   * CourseTrackEnrollment findUniqueOrThrow
   */
  export type CourseTrackEnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrackEnrollment to fetch.
     */
    where: CourseTrackEnrollmentWhereUniqueInput
  }

  /**
   * CourseTrackEnrollment findFirst
   */
  export type CourseTrackEnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrackEnrollment to fetch.
     */
    where?: CourseTrackEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTrackEnrollments to fetch.
     */
    orderBy?: CourseTrackEnrollmentOrderByWithRelationInput | CourseTrackEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseTrackEnrollments.
     */
    cursor?: CourseTrackEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTrackEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTrackEnrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseTrackEnrollments.
     */
    distinct?: CourseTrackEnrollmentScalarFieldEnum | CourseTrackEnrollmentScalarFieldEnum[]
  }

  /**
   * CourseTrackEnrollment findFirstOrThrow
   */
  export type CourseTrackEnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrackEnrollment to fetch.
     */
    where?: CourseTrackEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTrackEnrollments to fetch.
     */
    orderBy?: CourseTrackEnrollmentOrderByWithRelationInput | CourseTrackEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseTrackEnrollments.
     */
    cursor?: CourseTrackEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTrackEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTrackEnrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseTrackEnrollments.
     */
    distinct?: CourseTrackEnrollmentScalarFieldEnum | CourseTrackEnrollmentScalarFieldEnum[]
  }

  /**
   * CourseTrackEnrollment findMany
   */
  export type CourseTrackEnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseTrackEnrollments to fetch.
     */
    where?: CourseTrackEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTrackEnrollments to fetch.
     */
    orderBy?: CourseTrackEnrollmentOrderByWithRelationInput | CourseTrackEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseTrackEnrollments.
     */
    cursor?: CourseTrackEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTrackEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTrackEnrollments.
     */
    skip?: number
    distinct?: CourseTrackEnrollmentScalarFieldEnum | CourseTrackEnrollmentScalarFieldEnum[]
  }

  /**
   * CourseTrackEnrollment create
   */
  export type CourseTrackEnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseTrackEnrollment.
     */
    data: XOR<CourseTrackEnrollmentCreateInput, CourseTrackEnrollmentUncheckedCreateInput>
  }

  /**
   * CourseTrackEnrollment createMany
   */
  export type CourseTrackEnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseTrackEnrollments.
     */
    data: CourseTrackEnrollmentCreateManyInput | CourseTrackEnrollmentCreateManyInput[]
  }

  /**
   * CourseTrackEnrollment update
   */
  export type CourseTrackEnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseTrackEnrollment.
     */
    data: XOR<CourseTrackEnrollmentUpdateInput, CourseTrackEnrollmentUncheckedUpdateInput>
    /**
     * Choose, which CourseTrackEnrollment to update.
     */
    where: CourseTrackEnrollmentWhereUniqueInput
  }

  /**
   * CourseTrackEnrollment updateMany
   */
  export type CourseTrackEnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseTrackEnrollments.
     */
    data: XOR<CourseTrackEnrollmentUpdateManyMutationInput, CourseTrackEnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which CourseTrackEnrollments to update
     */
    where?: CourseTrackEnrollmentWhereInput
    /**
     * Limit how many CourseTrackEnrollments to update.
     */
    limit?: number
  }

  /**
   * CourseTrackEnrollment upsert
   */
  export type CourseTrackEnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseTrackEnrollment to update in case it exists.
     */
    where: CourseTrackEnrollmentWhereUniqueInput
    /**
     * In case the CourseTrackEnrollment found by the `where` argument doesn't exist, create a new CourseTrackEnrollment with this data.
     */
    create: XOR<CourseTrackEnrollmentCreateInput, CourseTrackEnrollmentUncheckedCreateInput>
    /**
     * In case the CourseTrackEnrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseTrackEnrollmentUpdateInput, CourseTrackEnrollmentUncheckedUpdateInput>
  }

  /**
   * CourseTrackEnrollment delete
   */
  export type CourseTrackEnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
    /**
     * Filter which CourseTrackEnrollment to delete.
     */
    where: CourseTrackEnrollmentWhereUniqueInput
  }

  /**
   * CourseTrackEnrollment deleteMany
   */
  export type CourseTrackEnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseTrackEnrollments to delete
     */
    where?: CourseTrackEnrollmentWhereInput
    /**
     * Limit how many CourseTrackEnrollments to delete.
     */
    limit?: number
  }

  /**
   * CourseTrackEnrollment findRaw
   */
  export type CourseTrackEnrollmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CourseTrackEnrollment aggregateRaw
   */
  export type CourseTrackEnrollmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CourseTrackEnrollment without action
   */
  export type CourseTrackEnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTrackEnrollment
     */
    select?: CourseTrackEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTrackEnrollment
     */
    omit?: CourseTrackEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTrackEnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: string | null
    question: string | null
    type: string | null
    options: string | null
    correctAnswer: string | null
    hint: string | null
    lessonSlug: string | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: string | null
    question: string | null
    type: string | null
    options: string | null
    correctAnswer: string | null
    hint: string | null
    lessonSlug: string | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    question: number
    type: number
    options: number
    correctAnswer: number
    hint: number
    lessonSlug: number
    _all: number
  }


  export type ExerciseMinAggregateInputType = {
    id?: true
    question?: true
    type?: true
    options?: true
    correctAnswer?: true
    hint?: true
    lessonSlug?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    question?: true
    type?: true
    options?: true
    correctAnswer?: true
    hint?: true
    lessonSlug?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    question?: true
    type?: true
    options?: true
    correctAnswer?: true
    hint?: true
    lessonSlug?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: string
    question: string
    type: string
    options: string | null
    correctAnswer: string
    hint: string | null
    lessonSlug: string
    _count: ExerciseCountAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    type?: boolean
    options?: boolean
    correctAnswer?: boolean
    hint?: boolean
    lessonSlug?: boolean
    Lesson?: boolean | Exercise$LessonArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>



  export type ExerciseSelectScalar = {
    id?: boolean
    question?: boolean
    type?: boolean
    options?: boolean
    correctAnswer?: boolean
    hint?: boolean
    lessonSlug?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question" | "type" | "options" | "correctAnswer" | "hint" | "lessonSlug", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Lesson?: boolean | Exercise$LessonArgs<ExtArgs>
  }

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      Lesson: Prisma.$LessonPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      question: string
      type: string
      options: string | null
      correctAnswer: string
      hint: string | null
      lessonSlug: string
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * @param {ExerciseFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const exercise = await prisma.exercise.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ExerciseFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Exercise.
     * @param {ExerciseAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const exercise = await prisma.exercise.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ExerciseAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
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
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Lesson<T extends Exercise$LessonArgs<ExtArgs> = {}>(args?: Subset<T, Exercise$LessonArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'String'>
    readonly question: FieldRef<"Exercise", 'String'>
    readonly type: FieldRef<"Exercise", 'String'>
    readonly options: FieldRef<"Exercise", 'String'>
    readonly correctAnswer: FieldRef<"Exercise", 'String'>
    readonly hint: FieldRef<"Exercise", 'String'>
    readonly lessonSlug: FieldRef<"Exercise", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise findRaw
   */
  export type ExerciseFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Exercise aggregateRaw
   */
  export type ExerciseAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Exercise.Lesson
   */
  export type Exercise$LessonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    where?: LessonWhereInput
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Model Lesson
   */

  export type AggregateLesson = {
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  export type LessonAvgAggregateOutputType = {
    duration: number | null
  }

  export type LessonSumAggregateOutputType = {
    duration: number | null
  }

  export type LessonMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    slug: string | null
    courseSlug: string | null
    completed: boolean | null
    duration: number | null
  }

  export type LessonMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    slug: string | null
    courseSlug: string | null
    completed: boolean | null
    duration: number | null
  }

  export type LessonCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    slug: number
    courseSlug: number
    completed: number
    duration: number
    _all: number
  }


  export type LessonAvgAggregateInputType = {
    duration?: true
  }

  export type LessonSumAggregateInputType = {
    duration?: true
  }

  export type LessonMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    slug?: true
    courseSlug?: true
    completed?: true
    duration?: true
  }

  export type LessonMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    slug?: true
    courseSlug?: true
    completed?: true
    duration?: true
  }

  export type LessonCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    slug?: true
    courseSlug?: true
    completed?: true
    duration?: true
    _all?: true
  }

  export type LessonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lesson to aggregate.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lessons
    **/
    _count?: true | LessonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LessonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LessonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonMaxAggregateInputType
  }

  export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
        [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLesson[P]>
      : GetScalarType<T[P], AggregateLesson[P]>
  }




  export type LessonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithAggregationInput | LessonOrderByWithAggregationInput[]
    by: LessonScalarFieldEnum[] | LessonScalarFieldEnum
    having?: LessonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonCountAggregateInputType | true
    _avg?: LessonAvgAggregateInputType
    _sum?: LessonSumAggregateInputType
    _min?: LessonMinAggregateInputType
    _max?: LessonMaxAggregateInputType
  }

  export type LessonGroupByOutputType = {
    id: string
    title: string
    description: string
    content: string | null
    slug: string
    courseSlug: string
    completed: boolean | null
    duration: number | null
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonGroupByOutputType[P]>
            : GetScalarType<T[P], LessonGroupByOutputType[P]>
        }
      >
    >


  export type LessonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    slug?: boolean
    courseSlug?: boolean
    completed?: boolean
    duration?: boolean
    exercises?: boolean | Lesson$exercisesArgs<ExtArgs>
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    LessonProgress?: boolean | Lesson$LessonProgressArgs<ExtArgs>
    _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lesson"]>



  export type LessonSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    slug?: boolean
    courseSlug?: boolean
    completed?: boolean
    duration?: boolean
  }

  export type LessonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "slug" | "courseSlug" | "completed" | "duration", ExtArgs["result"]["lesson"]>
  export type LessonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercises?: boolean | Lesson$exercisesArgs<ExtArgs>
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    LessonProgress?: boolean | Lesson$LessonProgressArgs<ExtArgs>
    _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LessonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lesson"
    objects: {
      exercises: Prisma.$ExercisePayload<ExtArgs>[]
      Course: Prisma.$CoursePayload<ExtArgs>
      LessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      content: string | null
      slug: string
      courseSlug: string
      completed: boolean | null
      duration: number | null
    }, ExtArgs["result"]["lesson"]>
    composites: {}
  }

  type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = $Result.GetResult<Prisma.$LessonPayload, S>

  type LessonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonCountAggregateInputType | true
    }

  export interface LessonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lesson'], meta: { name: 'Lesson' } }
    /**
     * Find zero or one Lesson that matches the filter.
     * @param {LessonFindUniqueArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonFindUniqueArgs>(args: SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lesson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonFindUniqueOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lesson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonFindFirstArgs>(args?: SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lesson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lessons
     * const lessons = await prisma.lesson.findMany()
     * 
     * // Get first 10 Lessons
     * const lessons = await prisma.lesson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonWithIdOnly = await prisma.lesson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonFindManyArgs>(args?: SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lesson.
     * @param {LessonCreateArgs} args - Arguments to create a Lesson.
     * @example
     * // Create one Lesson
     * const Lesson = await prisma.lesson.create({
     *   data: {
     *     // ... data to create a Lesson
     *   }
     * })
     * 
     */
    create<T extends LessonCreateArgs>(args: SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lessons.
     * @param {LessonCreateManyArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonCreateManyArgs>(args?: SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lesson.
     * @param {LessonDeleteArgs} args - Arguments to delete one Lesson.
     * @example
     * // Delete one Lesson
     * const Lesson = await prisma.lesson.delete({
     *   where: {
     *     // ... filter to delete one Lesson
     *   }
     * })
     * 
     */
    delete<T extends LessonDeleteArgs>(args: SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lesson.
     * @param {LessonUpdateArgs} args - Arguments to update one Lesson.
     * @example
     * // Update one Lesson
     * const lesson = await prisma.lesson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonUpdateArgs>(args: SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lessons.
     * @param {LessonDeleteManyArgs} args - Arguments to filter Lessons to delete.
     * @example
     * // Delete a few Lessons
     * const { count } = await prisma.lesson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonDeleteManyArgs>(args?: SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonUpdateManyArgs>(args: SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lesson.
     * @param {LessonUpsertArgs} args - Arguments to update or create a Lesson.
     * @example
     * // Update or create a Lesson
     * const lesson = await prisma.lesson.upsert({
     *   create: {
     *     // ... data to create a Lesson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lesson we want to update
     *   }
     * })
     */
    upsert<T extends LessonUpsertArgs>(args: SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lessons that matches the filter.
     * @param {LessonFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lesson = await prisma.lesson.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LessonFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Lesson.
     * @param {LessonAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lesson = await prisma.lesson.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LessonAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonCountArgs} args - Arguments to filter Lessons to count.
     * @example
     * // Count the number of Lessons
     * const count = await prisma.lesson.count({
     *   where: {
     *     // ... the filter for the Lessons we want to count
     *   }
     * })
    **/
    count<T extends LessonCountArgs>(
      args?: Subset<T, LessonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LessonAggregateArgs>(args: Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>

    /**
     * Group by Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonGroupByArgs} args - Group by arguments.
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
      T extends LessonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonGroupByArgs['orderBy'] }
        : { orderBy?: LessonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lesson model
   */
  readonly fields: LessonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lesson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exercises<T extends Lesson$exercisesArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$exercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    LessonProgress<T extends Lesson$LessonProgressArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$LessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Lesson model
   */
  interface LessonFieldRefs {
    readonly id: FieldRef<"Lesson", 'String'>
    readonly title: FieldRef<"Lesson", 'String'>
    readonly description: FieldRef<"Lesson", 'String'>
    readonly content: FieldRef<"Lesson", 'String'>
    readonly slug: FieldRef<"Lesson", 'String'>
    readonly courseSlug: FieldRef<"Lesson", 'String'>
    readonly completed: FieldRef<"Lesson", 'Boolean'>
    readonly duration: FieldRef<"Lesson", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Lesson findUnique
   */
  export type LessonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findUniqueOrThrow
   */
  export type LessonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findFirst
   */
  export type LessonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findFirstOrThrow
   */
  export type LessonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findMany
   */
  export type LessonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson create
   */
  export type LessonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The data needed to create a Lesson.
     */
    data: XOR<LessonCreateInput, LessonUncheckedCreateInput>
  }

  /**
   * Lesson createMany
   */
  export type LessonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
  }

  /**
   * Lesson update
   */
  export type LessonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The data needed to update a Lesson.
     */
    data: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
    /**
     * Choose, which Lesson to update.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson updateMany
   */
  export type LessonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput
    /**
     * Limit how many Lessons to update.
     */
    limit?: number
  }

  /**
   * Lesson upsert
   */
  export type LessonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The filter to search for the Lesson to update in case it exists.
     */
    where: LessonWhereUniqueInput
    /**
     * In case the Lesson found by the `where` argument doesn't exist, create a new Lesson with this data.
     */
    create: XOR<LessonCreateInput, LessonUncheckedCreateInput>
    /**
     * In case the Lesson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
  }

  /**
   * Lesson delete
   */
  export type LessonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter which Lesson to delete.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson deleteMany
   */
  export type LessonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lessons to delete
     */
    where?: LessonWhereInput
    /**
     * Limit how many Lessons to delete.
     */
    limit?: number
  }

  /**
   * Lesson findRaw
   */
  export type LessonFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Lesson aggregateRaw
   */
  export type LessonAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Lesson.exercises
   */
  export type Lesson$exercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Lesson.LessonProgress
   */
  export type Lesson$LessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    cursor?: LessonProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * Lesson without action
   */
  export type LessonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
  }


  /**
   * Model ContactMessage
   */

  export type AggregateContactMessage = {
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  export type ContactMessageMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type ContactMessageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type ContactMessageCountAggregateOutputType = {
    id: number
    name: number
    email: number
    subject: number
    message: number
    createdAt: number
    read: number
    _all: number
  }


  export type ContactMessageMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    subject?: true
    message?: true
    createdAt?: true
    read?: true
  }

  export type ContactMessageMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    subject?: true
    message?: true
    createdAt?: true
    read?: true
  }

  export type ContactMessageCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    subject?: true
    message?: true
    createdAt?: true
    read?: true
    _all?: true
  }

  export type ContactMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessage to aggregate.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactMessages
    **/
    _count?: true | ContactMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMessageMaxAggregateInputType
  }

  export type GetContactMessageAggregateType<T extends ContactMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactMessage[P]>
      : GetScalarType<T[P], AggregateContactMessage[P]>
  }




  export type ContactMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactMessageWhereInput
    orderBy?: ContactMessageOrderByWithAggregationInput | ContactMessageOrderByWithAggregationInput[]
    by: ContactMessageScalarFieldEnum[] | ContactMessageScalarFieldEnum
    having?: ContactMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactMessageCountAggregateInputType | true
    _min?: ContactMessageMinAggregateInputType
    _max?: ContactMessageMaxAggregateInputType
  }

  export type ContactMessageGroupByOutputType = {
    id: string
    name: string
    email: string
    subject: string | null
    message: string
    createdAt: Date
    read: boolean
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  type GetContactMessageGroupByPayload<T extends ContactMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
        }
      >
    >


  export type ContactMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["contactMessage"]>



  export type ContactMessageSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    read?: boolean
  }

  export type ContactMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "subject" | "message" | "createdAt" | "read", ExtArgs["result"]["contactMessage"]>

  export type $ContactMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      subject: string | null
      message: string
      createdAt: Date
      read: boolean
    }, ExtArgs["result"]["contactMessage"]>
    composites: {}
  }

  type ContactMessageGetPayload<S extends boolean | null | undefined | ContactMessageDefaultArgs> = $Result.GetResult<Prisma.$ContactMessagePayload, S>

  type ContactMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactMessageCountAggregateInputType | true
    }

  export interface ContactMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactMessage'], meta: { name: 'ContactMessage' } }
    /**
     * Find zero or one ContactMessage that matches the filter.
     * @param {ContactMessageFindUniqueArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactMessageFindUniqueArgs>(args: SelectSubset<T, ContactMessageFindUniqueArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactMessageFindUniqueOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactMessageFindFirstArgs>(args?: SelectSubset<T, ContactMessageFindFirstArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany()
     * 
     * // Get first 10 ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactMessageFindManyArgs>(args?: SelectSubset<T, ContactMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactMessage.
     * @param {ContactMessageCreateArgs} args - Arguments to create a ContactMessage.
     * @example
     * // Create one ContactMessage
     * const ContactMessage = await prisma.contactMessage.create({
     *   data: {
     *     // ... data to create a ContactMessage
     *   }
     * })
     * 
     */
    create<T extends ContactMessageCreateArgs>(args: SelectSubset<T, ContactMessageCreateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactMessages.
     * @param {ContactMessageCreateManyArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactMessageCreateManyArgs>(args?: SelectSubset<T, ContactMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ContactMessage.
     * @param {ContactMessageDeleteArgs} args - Arguments to delete one ContactMessage.
     * @example
     * // Delete one ContactMessage
     * const ContactMessage = await prisma.contactMessage.delete({
     *   where: {
     *     // ... filter to delete one ContactMessage
     *   }
     * })
     * 
     */
    delete<T extends ContactMessageDeleteArgs>(args: SelectSubset<T, ContactMessageDeleteArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactMessage.
     * @param {ContactMessageUpdateArgs} args - Arguments to update one ContactMessage.
     * @example
     * // Update one ContactMessage
     * const contactMessage = await prisma.contactMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactMessageUpdateArgs>(args: SelectSubset<T, ContactMessageUpdateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactMessages.
     * @param {ContactMessageDeleteManyArgs} args - Arguments to filter ContactMessages to delete.
     * @example
     * // Delete a few ContactMessages
     * const { count } = await prisma.contactMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactMessageDeleteManyArgs>(args?: SelectSubset<T, ContactMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactMessageUpdateManyArgs>(args: SelectSubset<T, ContactMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactMessage.
     * @param {ContactMessageUpsertArgs} args - Arguments to update or create a ContactMessage.
     * @example
     * // Update or create a ContactMessage
     * const contactMessage = await prisma.contactMessage.upsert({
     *   create: {
     *     // ... data to create a ContactMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactMessage we want to update
     *   }
     * })
     */
    upsert<T extends ContactMessageUpsertArgs>(args: SelectSubset<T, ContactMessageUpsertArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * @param {ContactMessageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const contactMessage = await prisma.contactMessage.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ContactMessageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ContactMessage.
     * @param {ContactMessageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const contactMessage = await prisma.contactMessage.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ContactMessageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageCountArgs} args - Arguments to filter ContactMessages to count.
     * @example
     * // Count the number of ContactMessages
     * const count = await prisma.contactMessage.count({
     *   where: {
     *     // ... the filter for the ContactMessages we want to count
     *   }
     * })
    **/
    count<T extends ContactMessageCountArgs>(
      args?: Subset<T, ContactMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactMessageAggregateArgs>(args: Subset<T, ContactMessageAggregateArgs>): Prisma.PrismaPromise<GetContactMessageAggregateType<T>>

    /**
     * Group by ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageGroupByArgs} args - Group by arguments.
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
      T extends ContactMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactMessageGroupByArgs['orderBy'] }
        : { orderBy?: ContactMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactMessage model
   */
  readonly fields: ContactMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ContactMessage model
   */
  interface ContactMessageFieldRefs {
    readonly id: FieldRef<"ContactMessage", 'String'>
    readonly name: FieldRef<"ContactMessage", 'String'>
    readonly email: FieldRef<"ContactMessage", 'String'>
    readonly subject: FieldRef<"ContactMessage", 'String'>
    readonly message: FieldRef<"ContactMessage", 'String'>
    readonly createdAt: FieldRef<"ContactMessage", 'DateTime'>
    readonly read: FieldRef<"ContactMessage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ContactMessage findUnique
   */
  export type ContactMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findUniqueOrThrow
   */
  export type ContactMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findFirst
   */
  export type ContactMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findFirstOrThrow
   */
  export type ContactMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findMany
   */
  export type ContactMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessages to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage create
   */
  export type ContactMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactMessage.
     */
    data: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
  }

  /**
   * ContactMessage createMany
   */
  export type ContactMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
  }

  /**
   * ContactMessage update
   */
  export type ContactMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactMessage.
     */
    data: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
    /**
     * Choose, which ContactMessage to update.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage updateMany
   */
  export type ContactMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to update.
     */
    limit?: number
  }

  /**
   * ContactMessage upsert
   */
  export type ContactMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactMessage to update in case it exists.
     */
    where: ContactMessageWhereUniqueInput
    /**
     * In case the ContactMessage found by the `where` argument doesn't exist, create a new ContactMessage with this data.
     */
    create: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
    /**
     * In case the ContactMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
  }

  /**
   * ContactMessage delete
   */
  export type ContactMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter which ContactMessage to delete.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage deleteMany
   */
  export type ContactMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessages to delete
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to delete.
     */
    limit?: number
  }

  /**
   * ContactMessage findRaw
   */
  export type ContactMessageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ContactMessage aggregateRaw
   */
  export type ContactMessageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ContactMessage without action
   */
  export type ContactMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    description: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    description: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    action: number
    description: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    action?: true
    description?: true
    userId?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    action?: true
    description?: true
    userId?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    action?: true
    description?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    action: string
    description: string | null
    userId: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    description?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>



  export type ActivityLogSelectScalar = {
    id?: boolean
    action?: boolean
    description?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "description" | "userId" | "createdAt", ExtArgs["result"]["activityLog"]>

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      description: string | null
      userId: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * @param {ActivityLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const activityLog = await prisma.activityLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ActivityLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ActivityLog.
     * @param {ActivityLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const activityLog = await prisma.activityLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ActivityLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
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
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly action: FieldRef<"ActivityLog", 'String'>
    readonly description: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog findRaw
   */
  export type ActivityLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ActivityLog aggregateRaw
   */
  export type ActivityLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
  }


  /**
   * Model LessonFeedback
   */

  export type AggregateLessonFeedback = {
    _count: LessonFeedbackCountAggregateOutputType | null
    _min: LessonFeedbackMinAggregateOutputType | null
    _max: LessonFeedbackMaxAggregateOutputType | null
  }

  export type LessonFeedbackMinAggregateOutputType = {
    id: string | null
    lessonSlug: string | null
    feedback: string | null
    createdAt: Date | null
  }

  export type LessonFeedbackMaxAggregateOutputType = {
    id: string | null
    lessonSlug: string | null
    feedback: string | null
    createdAt: Date | null
  }

  export type LessonFeedbackCountAggregateOutputType = {
    id: number
    lessonSlug: number
    feedback: number
    createdAt: number
    _all: number
  }


  export type LessonFeedbackMinAggregateInputType = {
    id?: true
    lessonSlug?: true
    feedback?: true
    createdAt?: true
  }

  export type LessonFeedbackMaxAggregateInputType = {
    id?: true
    lessonSlug?: true
    feedback?: true
    createdAt?: true
  }

  export type LessonFeedbackCountAggregateInputType = {
    id?: true
    lessonSlug?: true
    feedback?: true
    createdAt?: true
    _all?: true
  }

  export type LessonFeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonFeedback to aggregate.
     */
    where?: LessonFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonFeedbacks to fetch.
     */
    orderBy?: LessonFeedbackOrderByWithRelationInput | LessonFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonFeedbacks
    **/
    _count?: true | LessonFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonFeedbackMaxAggregateInputType
  }

  export type GetLessonFeedbackAggregateType<T extends LessonFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonFeedback[P]>
      : GetScalarType<T[P], AggregateLessonFeedback[P]>
  }




  export type LessonFeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonFeedbackWhereInput
    orderBy?: LessonFeedbackOrderByWithAggregationInput | LessonFeedbackOrderByWithAggregationInput[]
    by: LessonFeedbackScalarFieldEnum[] | LessonFeedbackScalarFieldEnum
    having?: LessonFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonFeedbackCountAggregateInputType | true
    _min?: LessonFeedbackMinAggregateInputType
    _max?: LessonFeedbackMaxAggregateInputType
  }

  export type LessonFeedbackGroupByOutputType = {
    id: string
    lessonSlug: string
    feedback: string
    createdAt: Date
    _count: LessonFeedbackCountAggregateOutputType | null
    _min: LessonFeedbackMinAggregateOutputType | null
    _max: LessonFeedbackMaxAggregateOutputType | null
  }

  type GetLessonFeedbackGroupByPayload<T extends LessonFeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], LessonFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type LessonFeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lessonSlug?: boolean
    feedback?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lessonFeedback"]>



  export type LessonFeedbackSelectScalar = {
    id?: boolean
    lessonSlug?: boolean
    feedback?: boolean
    createdAt?: boolean
  }

  export type LessonFeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lessonSlug" | "feedback" | "createdAt", ExtArgs["result"]["lessonFeedback"]>

  export type $LessonFeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonFeedback"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lessonSlug: string
      feedback: string
      createdAt: Date
    }, ExtArgs["result"]["lessonFeedback"]>
    composites: {}
  }

  type LessonFeedbackGetPayload<S extends boolean | null | undefined | LessonFeedbackDefaultArgs> = $Result.GetResult<Prisma.$LessonFeedbackPayload, S>

  type LessonFeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonFeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonFeedbackCountAggregateInputType | true
    }

  export interface LessonFeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonFeedback'], meta: { name: 'LessonFeedback' } }
    /**
     * Find zero or one LessonFeedback that matches the filter.
     * @param {LessonFeedbackFindUniqueArgs} args - Arguments to find a LessonFeedback
     * @example
     * // Get one LessonFeedback
     * const lessonFeedback = await prisma.lessonFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonFeedbackFindUniqueArgs>(args: SelectSubset<T, LessonFeedbackFindUniqueArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonFeedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonFeedbackFindUniqueOrThrowArgs} args - Arguments to find a LessonFeedback
     * @example
     * // Get one LessonFeedback
     * const lessonFeedback = await prisma.lessonFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonFeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackFindFirstArgs} args - Arguments to find a LessonFeedback
     * @example
     * // Get one LessonFeedback
     * const lessonFeedback = await prisma.lessonFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonFeedbackFindFirstArgs>(args?: SelectSubset<T, LessonFeedbackFindFirstArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonFeedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackFindFirstOrThrowArgs} args - Arguments to find a LessonFeedback
     * @example
     * // Get one LessonFeedback
     * const lessonFeedback = await prisma.lessonFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonFeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonFeedbacks
     * const lessonFeedbacks = await prisma.lessonFeedback.findMany()
     * 
     * // Get first 10 LessonFeedbacks
     * const lessonFeedbacks = await prisma.lessonFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonFeedbackWithIdOnly = await prisma.lessonFeedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonFeedbackFindManyArgs>(args?: SelectSubset<T, LessonFeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonFeedback.
     * @param {LessonFeedbackCreateArgs} args - Arguments to create a LessonFeedback.
     * @example
     * // Create one LessonFeedback
     * const LessonFeedback = await prisma.lessonFeedback.create({
     *   data: {
     *     // ... data to create a LessonFeedback
     *   }
     * })
     * 
     */
    create<T extends LessonFeedbackCreateArgs>(args: SelectSubset<T, LessonFeedbackCreateArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonFeedbacks.
     * @param {LessonFeedbackCreateManyArgs} args - Arguments to create many LessonFeedbacks.
     * @example
     * // Create many LessonFeedbacks
     * const lessonFeedback = await prisma.lessonFeedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonFeedbackCreateManyArgs>(args?: SelectSubset<T, LessonFeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LessonFeedback.
     * @param {LessonFeedbackDeleteArgs} args - Arguments to delete one LessonFeedback.
     * @example
     * // Delete one LessonFeedback
     * const LessonFeedback = await prisma.lessonFeedback.delete({
     *   where: {
     *     // ... filter to delete one LessonFeedback
     *   }
     * })
     * 
     */
    delete<T extends LessonFeedbackDeleteArgs>(args: SelectSubset<T, LessonFeedbackDeleteArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonFeedback.
     * @param {LessonFeedbackUpdateArgs} args - Arguments to update one LessonFeedback.
     * @example
     * // Update one LessonFeedback
     * const lessonFeedback = await prisma.lessonFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonFeedbackUpdateArgs>(args: SelectSubset<T, LessonFeedbackUpdateArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonFeedbacks.
     * @param {LessonFeedbackDeleteManyArgs} args - Arguments to filter LessonFeedbacks to delete.
     * @example
     * // Delete a few LessonFeedbacks
     * const { count } = await prisma.lessonFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonFeedbackDeleteManyArgs>(args?: SelectSubset<T, LessonFeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonFeedbacks
     * const lessonFeedback = await prisma.lessonFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonFeedbackUpdateManyArgs>(args: SelectSubset<T, LessonFeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LessonFeedback.
     * @param {LessonFeedbackUpsertArgs} args - Arguments to update or create a LessonFeedback.
     * @example
     * // Update or create a LessonFeedback
     * const lessonFeedback = await prisma.lessonFeedback.upsert({
     *   create: {
     *     // ... data to create a LessonFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonFeedback we want to update
     *   }
     * })
     */
    upsert<T extends LessonFeedbackUpsertArgs>(args: SelectSubset<T, LessonFeedbackUpsertArgs<ExtArgs>>): Prisma__LessonFeedbackClient<$Result.GetResult<Prisma.$LessonFeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonFeedbacks that matches the filter.
     * @param {LessonFeedbackFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lessonFeedback = await prisma.lessonFeedback.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LessonFeedbackFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a LessonFeedback.
     * @param {LessonFeedbackAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lessonFeedback = await prisma.lessonFeedback.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LessonFeedbackAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of LessonFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackCountArgs} args - Arguments to filter LessonFeedbacks to count.
     * @example
     * // Count the number of LessonFeedbacks
     * const count = await prisma.lessonFeedback.count({
     *   where: {
     *     // ... the filter for the LessonFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends LessonFeedbackCountArgs>(
      args?: Subset<T, LessonFeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LessonFeedbackAggregateArgs>(args: Subset<T, LessonFeedbackAggregateArgs>): Prisma.PrismaPromise<GetLessonFeedbackAggregateType<T>>

    /**
     * Group by LessonFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFeedbackGroupByArgs} args - Group by arguments.
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
      T extends LessonFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: LessonFeedbackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LessonFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonFeedback model
   */
  readonly fields: LessonFeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonFeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LessonFeedback model
   */
  interface LessonFeedbackFieldRefs {
    readonly id: FieldRef<"LessonFeedback", 'String'>
    readonly lessonSlug: FieldRef<"LessonFeedback", 'String'>
    readonly feedback: FieldRef<"LessonFeedback", 'String'>
    readonly createdAt: FieldRef<"LessonFeedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LessonFeedback findUnique
   */
  export type LessonFeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * Filter, which LessonFeedback to fetch.
     */
    where: LessonFeedbackWhereUniqueInput
  }

  /**
   * LessonFeedback findUniqueOrThrow
   */
  export type LessonFeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * Filter, which LessonFeedback to fetch.
     */
    where: LessonFeedbackWhereUniqueInput
  }

  /**
   * LessonFeedback findFirst
   */
  export type LessonFeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * Filter, which LessonFeedback to fetch.
     */
    where?: LessonFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonFeedbacks to fetch.
     */
    orderBy?: LessonFeedbackOrderByWithRelationInput | LessonFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonFeedbacks.
     */
    cursor?: LessonFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonFeedbacks.
     */
    distinct?: LessonFeedbackScalarFieldEnum | LessonFeedbackScalarFieldEnum[]
  }

  /**
   * LessonFeedback findFirstOrThrow
   */
  export type LessonFeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * Filter, which LessonFeedback to fetch.
     */
    where?: LessonFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonFeedbacks to fetch.
     */
    orderBy?: LessonFeedbackOrderByWithRelationInput | LessonFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonFeedbacks.
     */
    cursor?: LessonFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonFeedbacks.
     */
    distinct?: LessonFeedbackScalarFieldEnum | LessonFeedbackScalarFieldEnum[]
  }

  /**
   * LessonFeedback findMany
   */
  export type LessonFeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * Filter, which LessonFeedbacks to fetch.
     */
    where?: LessonFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonFeedbacks to fetch.
     */
    orderBy?: LessonFeedbackOrderByWithRelationInput | LessonFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonFeedbacks.
     */
    cursor?: LessonFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonFeedbacks.
     */
    skip?: number
    distinct?: LessonFeedbackScalarFieldEnum | LessonFeedbackScalarFieldEnum[]
  }

  /**
   * LessonFeedback create
   */
  export type LessonFeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * The data needed to create a LessonFeedback.
     */
    data: XOR<LessonFeedbackCreateInput, LessonFeedbackUncheckedCreateInput>
  }

  /**
   * LessonFeedback createMany
   */
  export type LessonFeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonFeedbacks.
     */
    data: LessonFeedbackCreateManyInput | LessonFeedbackCreateManyInput[]
  }

  /**
   * LessonFeedback update
   */
  export type LessonFeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * The data needed to update a LessonFeedback.
     */
    data: XOR<LessonFeedbackUpdateInput, LessonFeedbackUncheckedUpdateInput>
    /**
     * Choose, which LessonFeedback to update.
     */
    where: LessonFeedbackWhereUniqueInput
  }

  /**
   * LessonFeedback updateMany
   */
  export type LessonFeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonFeedbacks.
     */
    data: XOR<LessonFeedbackUpdateManyMutationInput, LessonFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which LessonFeedbacks to update
     */
    where?: LessonFeedbackWhereInput
    /**
     * Limit how many LessonFeedbacks to update.
     */
    limit?: number
  }

  /**
   * LessonFeedback upsert
   */
  export type LessonFeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * The filter to search for the LessonFeedback to update in case it exists.
     */
    where: LessonFeedbackWhereUniqueInput
    /**
     * In case the LessonFeedback found by the `where` argument doesn't exist, create a new LessonFeedback with this data.
     */
    create: XOR<LessonFeedbackCreateInput, LessonFeedbackUncheckedCreateInput>
    /**
     * In case the LessonFeedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonFeedbackUpdateInput, LessonFeedbackUncheckedUpdateInput>
  }

  /**
   * LessonFeedback delete
   */
  export type LessonFeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
    /**
     * Filter which LessonFeedback to delete.
     */
    where: LessonFeedbackWhereUniqueInput
  }

  /**
   * LessonFeedback deleteMany
   */
  export type LessonFeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonFeedbacks to delete
     */
    where?: LessonFeedbackWhereInput
    /**
     * Limit how many LessonFeedbacks to delete.
     */
    limit?: number
  }

  /**
   * LessonFeedback findRaw
   */
  export type LessonFeedbackFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LessonFeedback aggregateRaw
   */
  export type LessonFeedbackAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LessonFeedback without action
   */
  export type LessonFeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonFeedback
     */
    select?: LessonFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonFeedback
     */
    omit?: LessonFeedbackOmit<ExtArgs> | null
  }


  /**
   * Model LessonNote
   */

  export type AggregateLessonNote = {
    _count: LessonNoteCountAggregateOutputType | null
    _min: LessonNoteMinAggregateOutputType | null
    _max: LessonNoteMaxAggregateOutputType | null
  }

  export type LessonNoteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    lessonSlug: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LessonNoteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    lessonSlug: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LessonNoteCountAggregateOutputType = {
    id: number
    userId: number
    lessonSlug: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LessonNoteMinAggregateInputType = {
    id?: true
    userId?: true
    lessonSlug?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LessonNoteMaxAggregateInputType = {
    id?: true
    userId?: true
    lessonSlug?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LessonNoteCountAggregateInputType = {
    id?: true
    userId?: true
    lessonSlug?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LessonNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonNote to aggregate.
     */
    where?: LessonNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonNotes to fetch.
     */
    orderBy?: LessonNoteOrderByWithRelationInput | LessonNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonNotes
    **/
    _count?: true | LessonNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonNoteMaxAggregateInputType
  }

  export type GetLessonNoteAggregateType<T extends LessonNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonNote[P]>
      : GetScalarType<T[P], AggregateLessonNote[P]>
  }




  export type LessonNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonNoteWhereInput
    orderBy?: LessonNoteOrderByWithAggregationInput | LessonNoteOrderByWithAggregationInput[]
    by: LessonNoteScalarFieldEnum[] | LessonNoteScalarFieldEnum
    having?: LessonNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonNoteCountAggregateInputType | true
    _min?: LessonNoteMinAggregateInputType
    _max?: LessonNoteMaxAggregateInputType
  }

  export type LessonNoteGroupByOutputType = {
    id: string
    userId: string
    lessonSlug: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: LessonNoteCountAggregateOutputType | null
    _min: LessonNoteMinAggregateOutputType | null
    _max: LessonNoteMaxAggregateOutputType | null
  }

  type GetLessonNoteGroupByPayload<T extends LessonNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonNoteGroupByOutputType[P]>
            : GetScalarType<T[P], LessonNoteGroupByOutputType[P]>
        }
      >
    >


  export type LessonNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lessonSlug?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lessonNote"]>



  export type LessonNoteSelectScalar = {
    id?: boolean
    userId?: boolean
    lessonSlug?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LessonNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "lessonSlug" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["lessonNote"]>

  export type $LessonNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonNote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      lessonSlug: string
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lessonNote"]>
    composites: {}
  }

  type LessonNoteGetPayload<S extends boolean | null | undefined | LessonNoteDefaultArgs> = $Result.GetResult<Prisma.$LessonNotePayload, S>

  type LessonNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonNoteCountAggregateInputType | true
    }

  export interface LessonNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonNote'], meta: { name: 'LessonNote' } }
    /**
     * Find zero or one LessonNote that matches the filter.
     * @param {LessonNoteFindUniqueArgs} args - Arguments to find a LessonNote
     * @example
     * // Get one LessonNote
     * const lessonNote = await prisma.lessonNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonNoteFindUniqueArgs>(args: SelectSubset<T, LessonNoteFindUniqueArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonNoteFindUniqueOrThrowArgs} args - Arguments to find a LessonNote
     * @example
     * // Get one LessonNote
     * const lessonNote = await prisma.lessonNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteFindFirstArgs} args - Arguments to find a LessonNote
     * @example
     * // Get one LessonNote
     * const lessonNote = await prisma.lessonNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonNoteFindFirstArgs>(args?: SelectSubset<T, LessonNoteFindFirstArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteFindFirstOrThrowArgs} args - Arguments to find a LessonNote
     * @example
     * // Get one LessonNote
     * const lessonNote = await prisma.lessonNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonNotes
     * const lessonNotes = await prisma.lessonNote.findMany()
     * 
     * // Get first 10 LessonNotes
     * const lessonNotes = await prisma.lessonNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonNoteWithIdOnly = await prisma.lessonNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonNoteFindManyArgs>(args?: SelectSubset<T, LessonNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonNote.
     * @param {LessonNoteCreateArgs} args - Arguments to create a LessonNote.
     * @example
     * // Create one LessonNote
     * const LessonNote = await prisma.lessonNote.create({
     *   data: {
     *     // ... data to create a LessonNote
     *   }
     * })
     * 
     */
    create<T extends LessonNoteCreateArgs>(args: SelectSubset<T, LessonNoteCreateArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonNotes.
     * @param {LessonNoteCreateManyArgs} args - Arguments to create many LessonNotes.
     * @example
     * // Create many LessonNotes
     * const lessonNote = await prisma.lessonNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonNoteCreateManyArgs>(args?: SelectSubset<T, LessonNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LessonNote.
     * @param {LessonNoteDeleteArgs} args - Arguments to delete one LessonNote.
     * @example
     * // Delete one LessonNote
     * const LessonNote = await prisma.lessonNote.delete({
     *   where: {
     *     // ... filter to delete one LessonNote
     *   }
     * })
     * 
     */
    delete<T extends LessonNoteDeleteArgs>(args: SelectSubset<T, LessonNoteDeleteArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonNote.
     * @param {LessonNoteUpdateArgs} args - Arguments to update one LessonNote.
     * @example
     * // Update one LessonNote
     * const lessonNote = await prisma.lessonNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonNoteUpdateArgs>(args: SelectSubset<T, LessonNoteUpdateArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonNotes.
     * @param {LessonNoteDeleteManyArgs} args - Arguments to filter LessonNotes to delete.
     * @example
     * // Delete a few LessonNotes
     * const { count } = await prisma.lessonNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonNoteDeleteManyArgs>(args?: SelectSubset<T, LessonNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonNotes
     * const lessonNote = await prisma.lessonNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonNoteUpdateManyArgs>(args: SelectSubset<T, LessonNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LessonNote.
     * @param {LessonNoteUpsertArgs} args - Arguments to update or create a LessonNote.
     * @example
     * // Update or create a LessonNote
     * const lessonNote = await prisma.lessonNote.upsert({
     *   create: {
     *     // ... data to create a LessonNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonNote we want to update
     *   }
     * })
     */
    upsert<T extends LessonNoteUpsertArgs>(args: SelectSubset<T, LessonNoteUpsertArgs<ExtArgs>>): Prisma__LessonNoteClient<$Result.GetResult<Prisma.$LessonNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonNotes that matches the filter.
     * @param {LessonNoteFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lessonNote = await prisma.lessonNote.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LessonNoteFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a LessonNote.
     * @param {LessonNoteAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lessonNote = await prisma.lessonNote.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LessonNoteAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of LessonNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteCountArgs} args - Arguments to filter LessonNotes to count.
     * @example
     * // Count the number of LessonNotes
     * const count = await prisma.lessonNote.count({
     *   where: {
     *     // ... the filter for the LessonNotes we want to count
     *   }
     * })
    **/
    count<T extends LessonNoteCountArgs>(
      args?: Subset<T, LessonNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LessonNoteAggregateArgs>(args: Subset<T, LessonNoteAggregateArgs>): Prisma.PrismaPromise<GetLessonNoteAggregateType<T>>

    /**
     * Group by LessonNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonNoteGroupByArgs} args - Group by arguments.
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
      T extends LessonNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonNoteGroupByArgs['orderBy'] }
        : { orderBy?: LessonNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LessonNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonNote model
   */
  readonly fields: LessonNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LessonNote model
   */
  interface LessonNoteFieldRefs {
    readonly id: FieldRef<"LessonNote", 'String'>
    readonly userId: FieldRef<"LessonNote", 'String'>
    readonly lessonSlug: FieldRef<"LessonNote", 'String'>
    readonly content: FieldRef<"LessonNote", 'String'>
    readonly createdAt: FieldRef<"LessonNote", 'DateTime'>
    readonly updatedAt: FieldRef<"LessonNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LessonNote findUnique
   */
  export type LessonNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * Filter, which LessonNote to fetch.
     */
    where: LessonNoteWhereUniqueInput
  }

  /**
   * LessonNote findUniqueOrThrow
   */
  export type LessonNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * Filter, which LessonNote to fetch.
     */
    where: LessonNoteWhereUniqueInput
  }

  /**
   * LessonNote findFirst
   */
  export type LessonNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * Filter, which LessonNote to fetch.
     */
    where?: LessonNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonNotes to fetch.
     */
    orderBy?: LessonNoteOrderByWithRelationInput | LessonNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonNotes.
     */
    cursor?: LessonNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonNotes.
     */
    distinct?: LessonNoteScalarFieldEnum | LessonNoteScalarFieldEnum[]
  }

  /**
   * LessonNote findFirstOrThrow
   */
  export type LessonNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * Filter, which LessonNote to fetch.
     */
    where?: LessonNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonNotes to fetch.
     */
    orderBy?: LessonNoteOrderByWithRelationInput | LessonNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonNotes.
     */
    cursor?: LessonNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonNotes.
     */
    distinct?: LessonNoteScalarFieldEnum | LessonNoteScalarFieldEnum[]
  }

  /**
   * LessonNote findMany
   */
  export type LessonNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * Filter, which LessonNotes to fetch.
     */
    where?: LessonNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonNotes to fetch.
     */
    orderBy?: LessonNoteOrderByWithRelationInput | LessonNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonNotes.
     */
    cursor?: LessonNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonNotes.
     */
    skip?: number
    distinct?: LessonNoteScalarFieldEnum | LessonNoteScalarFieldEnum[]
  }

  /**
   * LessonNote create
   */
  export type LessonNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * The data needed to create a LessonNote.
     */
    data: XOR<LessonNoteCreateInput, LessonNoteUncheckedCreateInput>
  }

  /**
   * LessonNote createMany
   */
  export type LessonNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonNotes.
     */
    data: LessonNoteCreateManyInput | LessonNoteCreateManyInput[]
  }

  /**
   * LessonNote update
   */
  export type LessonNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * The data needed to update a LessonNote.
     */
    data: XOR<LessonNoteUpdateInput, LessonNoteUncheckedUpdateInput>
    /**
     * Choose, which LessonNote to update.
     */
    where: LessonNoteWhereUniqueInput
  }

  /**
   * LessonNote updateMany
   */
  export type LessonNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonNotes.
     */
    data: XOR<LessonNoteUpdateManyMutationInput, LessonNoteUncheckedUpdateManyInput>
    /**
     * Filter which LessonNotes to update
     */
    where?: LessonNoteWhereInput
    /**
     * Limit how many LessonNotes to update.
     */
    limit?: number
  }

  /**
   * LessonNote upsert
   */
  export type LessonNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * The filter to search for the LessonNote to update in case it exists.
     */
    where: LessonNoteWhereUniqueInput
    /**
     * In case the LessonNote found by the `where` argument doesn't exist, create a new LessonNote with this data.
     */
    create: XOR<LessonNoteCreateInput, LessonNoteUncheckedCreateInput>
    /**
     * In case the LessonNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonNoteUpdateInput, LessonNoteUncheckedUpdateInput>
  }

  /**
   * LessonNote delete
   */
  export type LessonNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
    /**
     * Filter which LessonNote to delete.
     */
    where: LessonNoteWhereUniqueInput
  }

  /**
   * LessonNote deleteMany
   */
  export type LessonNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonNotes to delete
     */
    where?: LessonNoteWhereInput
    /**
     * Limit how many LessonNotes to delete.
     */
    limit?: number
  }

  /**
   * LessonNote findRaw
   */
  export type LessonNoteFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LessonNote aggregateRaw
   */
  export type LessonNoteAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LessonNote without action
   */
  export type LessonNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonNote
     */
    select?: LessonNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonNote
     */
    omit?: LessonNoteOmit<ExtArgs> | null
  }


  /**
   * Model Badge
   */

  export type AggregateBadge = {
    _count: BadgeCountAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  export type BadgeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    createdAt: Date | null
  }

  export type BadgeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    createdAt: Date | null
  }

  export type BadgeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    icon: number
    criteria: number
    createdAt: number
    _all: number
  }


  export type BadgeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    createdAt?: true
  }

  export type BadgeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    createdAt?: true
  }

  export type BadgeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    criteria?: true
    createdAt?: true
    _all?: true
  }

  export type BadgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badge to aggregate.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Badges
    **/
    _count?: true | BadgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadgeMaxAggregateInputType
  }

  export type GetBadgeAggregateType<T extends BadgeAggregateArgs> = {
        [P in keyof T & keyof AggregateBadge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadge[P]>
      : GetScalarType<T[P], AggregateBadge[P]>
  }




  export type BadgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeWhereInput
    orderBy?: BadgeOrderByWithAggregationInput | BadgeOrderByWithAggregationInput[]
    by: BadgeScalarFieldEnum[] | BadgeScalarFieldEnum
    having?: BadgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadgeCountAggregateInputType | true
    _min?: BadgeMinAggregateInputType
    _max?: BadgeMaxAggregateInputType
  }

  export type BadgeGroupByOutputType = {
    id: string
    name: string
    description: string
    icon: string
    criteria: JsonValue
    createdAt: Date
    _count: BadgeCountAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  type GetBadgeGroupByPayload<T extends BadgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadgeGroupByOutputType[P]>
            : GetScalarType<T[P], BadgeGroupByOutputType[P]>
        }
      >
    >


  export type BadgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    criteria?: boolean
    createdAt?: boolean
    users?: boolean | Badge$usersArgs<ExtArgs>
    _count?: boolean | BadgeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badge"]>



  export type BadgeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    criteria?: boolean
    createdAt?: boolean
  }

  export type BadgeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "icon" | "criteria" | "createdAt", ExtArgs["result"]["badge"]>
  export type BadgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Badge$usersArgs<ExtArgs>
    _count?: boolean | BadgeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BadgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Badge"
    objects: {
      users: Prisma.$UserBadgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      icon: string
      criteria: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["badge"]>
    composites: {}
  }

  type BadgeGetPayload<S extends boolean | null | undefined | BadgeDefaultArgs> = $Result.GetResult<Prisma.$BadgePayload, S>

  type BadgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BadgeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BadgeCountAggregateInputType | true
    }

  export interface BadgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Badge'], meta: { name: 'Badge' } }
    /**
     * Find zero or one Badge that matches the filter.
     * @param {BadgeFindUniqueArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadgeFindUniqueArgs>(args: SelectSubset<T, BadgeFindUniqueArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Badge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BadgeFindUniqueOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadgeFindUniqueOrThrowArgs>(args: SelectSubset<T, BadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Badge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadgeFindFirstArgs>(args?: SelectSubset<T, BadgeFindFirstArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Badge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadgeFindFirstOrThrowArgs>(args?: SelectSubset<T, BadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Badges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Badges
     * const badges = await prisma.badge.findMany()
     * 
     * // Get first 10 Badges
     * const badges = await prisma.badge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badgeWithIdOnly = await prisma.badge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadgeFindManyArgs>(args?: SelectSubset<T, BadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Badge.
     * @param {BadgeCreateArgs} args - Arguments to create a Badge.
     * @example
     * // Create one Badge
     * const Badge = await prisma.badge.create({
     *   data: {
     *     // ... data to create a Badge
     *   }
     * })
     * 
     */
    create<T extends BadgeCreateArgs>(args: SelectSubset<T, BadgeCreateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Badges.
     * @param {BadgeCreateManyArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadgeCreateManyArgs>(args?: SelectSubset<T, BadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Badge.
     * @param {BadgeDeleteArgs} args - Arguments to delete one Badge.
     * @example
     * // Delete one Badge
     * const Badge = await prisma.badge.delete({
     *   where: {
     *     // ... filter to delete one Badge
     *   }
     * })
     * 
     */
    delete<T extends BadgeDeleteArgs>(args: SelectSubset<T, BadgeDeleteArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Badge.
     * @param {BadgeUpdateArgs} args - Arguments to update one Badge.
     * @example
     * // Update one Badge
     * const badge = await prisma.badge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadgeUpdateArgs>(args: SelectSubset<T, BadgeUpdateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Badges.
     * @param {BadgeDeleteManyArgs} args - Arguments to filter Badges to delete.
     * @example
     * // Delete a few Badges
     * const { count } = await prisma.badge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadgeDeleteManyArgs>(args?: SelectSubset<T, BadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Badges
     * const badge = await prisma.badge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadgeUpdateManyArgs>(args: SelectSubset<T, BadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Badge.
     * @param {BadgeUpsertArgs} args - Arguments to update or create a Badge.
     * @example
     * // Update or create a Badge
     * const badge = await prisma.badge.upsert({
     *   create: {
     *     // ... data to create a Badge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Badge we want to update
     *   }
     * })
     */
    upsert<T extends BadgeUpsertArgs>(args: SelectSubset<T, BadgeUpsertArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Badges that matches the filter.
     * @param {BadgeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const badge = await prisma.badge.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BadgeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Badge.
     * @param {BadgeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const badge = await prisma.badge.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BadgeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeCountArgs} args - Arguments to filter Badges to count.
     * @example
     * // Count the number of Badges
     * const count = await prisma.badge.count({
     *   where: {
     *     // ... the filter for the Badges we want to count
     *   }
     * })
    **/
    count<T extends BadgeCountArgs>(
      args?: Subset<T, BadgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BadgeAggregateArgs>(args: Subset<T, BadgeAggregateArgs>): Prisma.PrismaPromise<GetBadgeAggregateType<T>>

    /**
     * Group by Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeGroupByArgs} args - Group by arguments.
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
      T extends BadgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadgeGroupByArgs['orderBy'] }
        : { orderBy?: BadgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Badge model
   */
  readonly fields: BadgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Badge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Badge$usersArgs<ExtArgs> = {}>(args?: Subset<T, Badge$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Badge model
   */
  interface BadgeFieldRefs {
    readonly id: FieldRef<"Badge", 'String'>
    readonly name: FieldRef<"Badge", 'String'>
    readonly description: FieldRef<"Badge", 'String'>
    readonly icon: FieldRef<"Badge", 'String'>
    readonly criteria: FieldRef<"Badge", 'Json'>
    readonly createdAt: FieldRef<"Badge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Badge findUnique
   */
  export type BadgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findUniqueOrThrow
   */
  export type BadgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findFirst
   */
  export type BadgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findFirstOrThrow
   */
  export type BadgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findMany
   */
  export type BadgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badges to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge create
   */
  export type BadgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The data needed to create a Badge.
     */
    data: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
  }

  /**
   * Badge createMany
   */
  export type BadgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
  }

  /**
   * Badge update
   */
  export type BadgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The data needed to update a Badge.
     */
    data: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
    /**
     * Choose, which Badge to update.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge updateMany
   */
  export type BadgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Badges.
     */
    data: XOR<BadgeUpdateManyMutationInput, BadgeUncheckedUpdateManyInput>
    /**
     * Filter which Badges to update
     */
    where?: BadgeWhereInput
    /**
     * Limit how many Badges to update.
     */
    limit?: number
  }

  /**
   * Badge upsert
   */
  export type BadgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The filter to search for the Badge to update in case it exists.
     */
    where: BadgeWhereUniqueInput
    /**
     * In case the Badge found by the `where` argument doesn't exist, create a new Badge with this data.
     */
    create: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
    /**
     * In case the Badge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
  }

  /**
   * Badge delete
   */
  export type BadgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter which Badge to delete.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge deleteMany
   */
  export type BadgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badges to delete
     */
    where?: BadgeWhereInput
    /**
     * Limit how many Badges to delete.
     */
    limit?: number
  }

  /**
   * Badge findRaw
   */
  export type BadgeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Badge aggregateRaw
   */
  export type BadgeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Badge.users
   */
  export type Badge$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    where?: UserBadgeWhereInput
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    cursor?: UserBadgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * Badge without action
   */
  export type BadgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Badge
     */
    omit?: BadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
  }


  /**
   * Model UserBadge
   */

  export type AggregateUserBadge = {
    _count: UserBadgeCountAggregateOutputType | null
    _min: UserBadgeMinAggregateOutputType | null
    _max: UserBadgeMaxAggregateOutputType | null
  }

  export type UserBadgeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    badgeId: string | null
    earnedAt: Date | null
  }

  export type UserBadgeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    badgeId: string | null
    earnedAt: Date | null
  }

  export type UserBadgeCountAggregateOutputType = {
    id: number
    userId: number
    badgeId: number
    earnedAt: number
    _all: number
  }


  export type UserBadgeMinAggregateInputType = {
    id?: true
    userId?: true
    badgeId?: true
    earnedAt?: true
  }

  export type UserBadgeMaxAggregateInputType = {
    id?: true
    userId?: true
    badgeId?: true
    earnedAt?: true
  }

  export type UserBadgeCountAggregateInputType = {
    id?: true
    userId?: true
    badgeId?: true
    earnedAt?: true
    _all?: true
  }

  export type UserBadgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBadge to aggregate.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBadges
    **/
    _count?: true | UserBadgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBadgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBadgeMaxAggregateInputType
  }

  export type GetUserBadgeAggregateType<T extends UserBadgeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBadge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBadge[P]>
      : GetScalarType<T[P], AggregateUserBadge[P]>
  }




  export type UserBadgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBadgeWhereInput
    orderBy?: UserBadgeOrderByWithAggregationInput | UserBadgeOrderByWithAggregationInput[]
    by: UserBadgeScalarFieldEnum[] | UserBadgeScalarFieldEnum
    having?: UserBadgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBadgeCountAggregateInputType | true
    _min?: UserBadgeMinAggregateInputType
    _max?: UserBadgeMaxAggregateInputType
  }

  export type UserBadgeGroupByOutputType = {
    id: string
    userId: string
    badgeId: string
    earnedAt: Date
    _count: UserBadgeCountAggregateOutputType | null
    _min: UserBadgeMinAggregateOutputType | null
    _max: UserBadgeMaxAggregateOutputType | null
  }

  type GetUserBadgeGroupByPayload<T extends UserBadgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBadgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBadgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBadgeGroupByOutputType[P]>
            : GetScalarType<T[P], UserBadgeGroupByOutputType[P]>
        }
      >
    >


  export type UserBadgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    badgeId?: boolean
    earnedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Badge?: boolean | BadgeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBadge"]>



  export type UserBadgeSelectScalar = {
    id?: boolean
    userId?: boolean
    badgeId?: boolean
    earnedAt?: boolean
  }

  export type UserBadgeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "badgeId" | "earnedAt", ExtArgs["result"]["userBadge"]>
  export type UserBadgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Badge?: boolean | BadgeDefaultArgs<ExtArgs>
  }

  export type $UserBadgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBadge"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
      Badge: Prisma.$BadgePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      badgeId: string
      earnedAt: Date
    }, ExtArgs["result"]["userBadge"]>
    composites: {}
  }

  type UserBadgeGetPayload<S extends boolean | null | undefined | UserBadgeDefaultArgs> = $Result.GetResult<Prisma.$UserBadgePayload, S>

  type UserBadgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserBadgeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserBadgeCountAggregateInputType | true
    }

  export interface UserBadgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBadge'], meta: { name: 'UserBadge' } }
    /**
     * Find zero or one UserBadge that matches the filter.
     * @param {UserBadgeFindUniqueArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBadgeFindUniqueArgs>(args: SelectSubset<T, UserBadgeFindUniqueArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserBadge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserBadgeFindUniqueOrThrowArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBadgeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserBadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBadge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeFindFirstArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBadgeFindFirstArgs>(args?: SelectSubset<T, UserBadgeFindFirstArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBadge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeFindFirstOrThrowArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBadgeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserBadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserBadges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBadges
     * const userBadges = await prisma.userBadge.findMany()
     * 
     * // Get first 10 UserBadges
     * const userBadges = await prisma.userBadge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userBadgeWithIdOnly = await prisma.userBadge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserBadgeFindManyArgs>(args?: SelectSubset<T, UserBadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserBadge.
     * @param {UserBadgeCreateArgs} args - Arguments to create a UserBadge.
     * @example
     * // Create one UserBadge
     * const UserBadge = await prisma.userBadge.create({
     *   data: {
     *     // ... data to create a UserBadge
     *   }
     * })
     * 
     */
    create<T extends UserBadgeCreateArgs>(args: SelectSubset<T, UserBadgeCreateArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserBadges.
     * @param {UserBadgeCreateManyArgs} args - Arguments to create many UserBadges.
     * @example
     * // Create many UserBadges
     * const userBadge = await prisma.userBadge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserBadgeCreateManyArgs>(args?: SelectSubset<T, UserBadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserBadge.
     * @param {UserBadgeDeleteArgs} args - Arguments to delete one UserBadge.
     * @example
     * // Delete one UserBadge
     * const UserBadge = await prisma.userBadge.delete({
     *   where: {
     *     // ... filter to delete one UserBadge
     *   }
     * })
     * 
     */
    delete<T extends UserBadgeDeleteArgs>(args: SelectSubset<T, UserBadgeDeleteArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserBadge.
     * @param {UserBadgeUpdateArgs} args - Arguments to update one UserBadge.
     * @example
     * // Update one UserBadge
     * const userBadge = await prisma.userBadge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserBadgeUpdateArgs>(args: SelectSubset<T, UserBadgeUpdateArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserBadges.
     * @param {UserBadgeDeleteManyArgs} args - Arguments to filter UserBadges to delete.
     * @example
     * // Delete a few UserBadges
     * const { count } = await prisma.userBadge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserBadgeDeleteManyArgs>(args?: SelectSubset<T, UserBadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBadges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBadges
     * const userBadge = await prisma.userBadge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserBadgeUpdateManyArgs>(args: SelectSubset<T, UserBadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserBadge.
     * @param {UserBadgeUpsertArgs} args - Arguments to update or create a UserBadge.
     * @example
     * // Update or create a UserBadge
     * const userBadge = await prisma.userBadge.upsert({
     *   create: {
     *     // ... data to create a UserBadge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBadge we want to update
     *   }
     * })
     */
    upsert<T extends UserBadgeUpsertArgs>(args: SelectSubset<T, UserBadgeUpsertArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserBadges that matches the filter.
     * @param {UserBadgeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userBadge = await prisma.userBadge.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserBadgeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserBadge.
     * @param {UserBadgeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userBadge = await prisma.userBadge.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserBadgeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of UserBadges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeCountArgs} args - Arguments to filter UserBadges to count.
     * @example
     * // Count the number of UserBadges
     * const count = await prisma.userBadge.count({
     *   where: {
     *     // ... the filter for the UserBadges we want to count
     *   }
     * })
    **/
    count<T extends UserBadgeCountArgs>(
      args?: Subset<T, UserBadgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBadgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBadge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserBadgeAggregateArgs>(args: Subset<T, UserBadgeAggregateArgs>): Prisma.PrismaPromise<GetUserBadgeAggregateType<T>>

    /**
     * Group by UserBadge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeGroupByArgs} args - Group by arguments.
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
      T extends UserBadgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBadgeGroupByArgs['orderBy'] }
        : { orderBy?: UserBadgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserBadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBadge model
   */
  readonly fields: UserBadgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBadge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBadgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Badge<T extends BadgeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BadgeDefaultArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserBadge model
   */
  interface UserBadgeFieldRefs {
    readonly id: FieldRef<"UserBadge", 'String'>
    readonly userId: FieldRef<"UserBadge", 'String'>
    readonly badgeId: FieldRef<"UserBadge", 'String'>
    readonly earnedAt: FieldRef<"UserBadge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserBadge findUnique
   */
  export type UserBadgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge findUniqueOrThrow
   */
  export type UserBadgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge findFirst
   */
  export type UserBadgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBadges.
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBadges.
     */
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserBadge findFirstOrThrow
   */
  export type UserBadgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBadges.
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBadges.
     */
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserBadge findMany
   */
  export type UserBadgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadges to fetch.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBadges.
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserBadge create
   */
  export type UserBadgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserBadge.
     */
    data: XOR<UserBadgeCreateInput, UserBadgeUncheckedCreateInput>
  }

  /**
   * UserBadge createMany
   */
  export type UserBadgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBadges.
     */
    data: UserBadgeCreateManyInput | UserBadgeCreateManyInput[]
  }

  /**
   * UserBadge update
   */
  export type UserBadgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserBadge.
     */
    data: XOR<UserBadgeUpdateInput, UserBadgeUncheckedUpdateInput>
    /**
     * Choose, which UserBadge to update.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge updateMany
   */
  export type UserBadgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBadges.
     */
    data: XOR<UserBadgeUpdateManyMutationInput, UserBadgeUncheckedUpdateManyInput>
    /**
     * Filter which UserBadges to update
     */
    where?: UserBadgeWhereInput
    /**
     * Limit how many UserBadges to update.
     */
    limit?: number
  }

  /**
   * UserBadge upsert
   */
  export type UserBadgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserBadge to update in case it exists.
     */
    where: UserBadgeWhereUniqueInput
    /**
     * In case the UserBadge found by the `where` argument doesn't exist, create a new UserBadge with this data.
     */
    create: XOR<UserBadgeCreateInput, UserBadgeUncheckedCreateInput>
    /**
     * In case the UserBadge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBadgeUpdateInput, UserBadgeUncheckedUpdateInput>
  }

  /**
   * UserBadge delete
   */
  export type UserBadgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter which UserBadge to delete.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge deleteMany
   */
  export type UserBadgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBadges to delete
     */
    where?: UserBadgeWhereInput
    /**
     * Limit how many UserBadges to delete.
     */
    limit?: number
  }

  /**
   * UserBadge findRaw
   */
  export type UserBadgeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserBadge aggregateRaw
   */
  export type UserBadgeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserBadge without action
   */
  export type UserBadgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBadge
     */
    omit?: UserBadgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const BlogPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tags: 'tags',
    slug: 'slug',
    image: 'image',
    isAI: 'isAI'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const TutorialPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tags: 'tags',
    difficulty: 'difficulty',
    slug: 'slug'
  };

  export type TutorialPostScalarFieldEnum = (typeof TutorialPostScalarFieldEnum)[keyof typeof TutorialPostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    authorName: 'authorName',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    postSlug: 'postSlug',
    replyingToId: 'replyingToId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sessionToken: 'sessionToken',
    thejoey: 'thejoey',
    username: 'username',
    bio: 'bio',
    website: 'website',
    twitter: 'twitter',
    github: 'github',
    linkedin: 'linkedin',
    isProfileVerified: 'isProfileVerified',
    profileImage: 'profileImage',
    currentStreak: 'currentStreak',
    longestStreak: 'longestStreak',
    lastActivityDate: 'lastActivityDate'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CourseProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    completed: 'completed',
    courseSlug: 'courseSlug'
  };

  export type CourseProgressScalarFieldEnum = (typeof CourseProgressScalarFieldEnum)[keyof typeof CourseProgressScalarFieldEnum]


  export const LessonProgressScalarFieldEnum: {
    id: 'id',
    completed: 'completed',
    lessonSlug: 'lessonSlug',
    courseProgressId: 'courseProgressId',
    userId: 'userId'
  };

  export type LessonProgressScalarFieldEnum = (typeof LessonProgressScalarFieldEnum)[keyof typeof LessonProgressScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    tags: 'tags',
    slug: 'slug',
    progressional: 'progressional',
    userId: 'userId',
    order: 'order',
    rating: 'rating',
    duration: 'duration'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const CourseTrackScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    slug: 'slug',
    courseSlugs: 'courseSlugs',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseTrackScalarFieldEnum = (typeof CourseTrackScalarFieldEnum)[keyof typeof CourseTrackScalarFieldEnum]


  export const CourseTrackEnrollmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    trackSlug: 'trackSlug',
    completed: 'completed',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type CourseTrackEnrollmentScalarFieldEnum = (typeof CourseTrackEnrollmentScalarFieldEnum)[keyof typeof CourseTrackEnrollmentScalarFieldEnum]


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    question: 'question',
    type: 'type',
    options: 'options',
    correctAnswer: 'correctAnswer',
    hint: 'hint',
    lessonSlug: 'lessonSlug'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const LessonScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    slug: 'slug',
    courseSlug: 'courseSlug',
    completed: 'completed',
    duration: 'duration'
  };

  export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum]


  export const ContactMessageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    subject: 'subject',
    message: 'message',
    createdAt: 'createdAt',
    read: 'read'
  };

  export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    description: 'description',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const LessonFeedbackScalarFieldEnum: {
    id: 'id',
    lessonSlug: 'lessonSlug',
    feedback: 'feedback',
    createdAt: 'createdAt'
  };

  export type LessonFeedbackScalarFieldEnum = (typeof LessonFeedbackScalarFieldEnum)[keyof typeof LessonFeedbackScalarFieldEnum]


  export const LessonNoteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    lessonSlug: 'lessonSlug',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LessonNoteScalarFieldEnum = (typeof LessonNoteScalarFieldEnum)[keyof typeof LessonNoteScalarFieldEnum]


  export const BadgeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    icon: 'icon',
    criteria: 'criteria',
    createdAt: 'createdAt'
  };

  export type BadgeScalarFieldEnum = (typeof BadgeScalarFieldEnum)[keyof typeof BadgeScalarFieldEnum]


  export const UserBadgeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    badgeId: 'badgeId',
    earnedAt: 'earnedAt'
  };

  export type UserBadgeScalarFieldEnum = (typeof UserBadgeScalarFieldEnum)[keyof typeof UserBadgeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: StringFilter<"BlogPost"> | string
    title?: StringFilter<"BlogPost"> | string
    description?: StringFilter<"BlogPost"> | string
    content?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    tags?: StringNullableListFilter<"BlogPost">
    slug?: StringFilter<"BlogPost"> | string
    image?: StringNullableFilter<"BlogPost"> | string | null
    isAI?: BoolNullableFilter<"BlogPost"> | boolean | null
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    slug?: SortOrder
    image?: SortOrder
    isAI?: SortOrder
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    title?: StringFilter<"BlogPost"> | string
    description?: StringFilter<"BlogPost"> | string
    content?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    tags?: StringNullableListFilter<"BlogPost">
    image?: StringNullableFilter<"BlogPost"> | string | null
    isAI?: BoolNullableFilter<"BlogPost"> | boolean | null
  }, "id" | "slug">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    slug?: SortOrder
    image?: SortOrder
    isAI?: SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlogPost"> | string
    title?: StringWithAggregatesFilter<"BlogPost"> | string
    description?: StringWithAggregatesFilter<"BlogPost"> | string
    content?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    tags?: StringNullableListFilter<"BlogPost">
    slug?: StringWithAggregatesFilter<"BlogPost"> | string
    image?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    isAI?: BoolNullableWithAggregatesFilter<"BlogPost"> | boolean | null
  }

  export type TutorialPostWhereInput = {
    AND?: TutorialPostWhereInput | TutorialPostWhereInput[]
    OR?: TutorialPostWhereInput[]
    NOT?: TutorialPostWhereInput | TutorialPostWhereInput[]
    id?: StringFilter<"TutorialPost"> | string
    title?: StringFilter<"TutorialPost"> | string
    description?: StringFilter<"TutorialPost"> | string
    content?: StringNullableFilter<"TutorialPost"> | string | null
    createdAt?: DateTimeFilter<"TutorialPost"> | Date | string
    updatedAt?: DateTimeFilter<"TutorialPost"> | Date | string
    tags?: StringNullableListFilter<"TutorialPost">
    difficulty?: StringNullableFilter<"TutorialPost"> | string | null
    slug?: StringFilter<"TutorialPost"> | string
  }

  export type TutorialPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
  }

  export type TutorialPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TutorialPostWhereInput | TutorialPostWhereInput[]
    OR?: TutorialPostWhereInput[]
    NOT?: TutorialPostWhereInput | TutorialPostWhereInput[]
    title?: StringFilter<"TutorialPost"> | string
    description?: StringFilter<"TutorialPost"> | string
    content?: StringNullableFilter<"TutorialPost"> | string | null
    createdAt?: DateTimeFilter<"TutorialPost"> | Date | string
    updatedAt?: DateTimeFilter<"TutorialPost"> | Date | string
    tags?: StringNullableListFilter<"TutorialPost">
    difficulty?: StringNullableFilter<"TutorialPost"> | string | null
  }, "id" | "slug">

  export type TutorialPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
    _count?: TutorialPostCountOrderByAggregateInput
    _max?: TutorialPostMaxOrderByAggregateInput
    _min?: TutorialPostMinOrderByAggregateInput
  }

  export type TutorialPostScalarWhereWithAggregatesInput = {
    AND?: TutorialPostScalarWhereWithAggregatesInput | TutorialPostScalarWhereWithAggregatesInput[]
    OR?: TutorialPostScalarWhereWithAggregatesInput[]
    NOT?: TutorialPostScalarWhereWithAggregatesInput | TutorialPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TutorialPost"> | string
    title?: StringWithAggregatesFilter<"TutorialPost"> | string
    description?: StringWithAggregatesFilter<"TutorialPost"> | string
    content?: StringNullableWithAggregatesFilter<"TutorialPost"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TutorialPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TutorialPost"> | Date | string
    tags?: StringNullableListFilter<"TutorialPost">
    difficulty?: StringNullableWithAggregatesFilter<"TutorialPost"> | string | null
    slug?: StringWithAggregatesFilter<"TutorialPost"> | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    authorId?: StringNullableFilter<"Comment"> | string | null
    authorName?: StringNullableFilter<"Comment"> | string | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    postSlug?: StringFilter<"Comment"> | string
    replyingToId?: StringNullableFilter<"Comment"> | string | null
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postSlug?: SortOrder
    replyingToId?: SortOrder
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    authorId?: StringNullableFilter<"Comment"> | string | null
    authorName?: StringNullableFilter<"Comment"> | string | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    postSlug?: StringFilter<"Comment"> | string
    replyingToId?: StringNullableFilter<"Comment"> | string | null
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postSlug?: SortOrder
    replyingToId?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    authorId?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    authorName?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    postSlug?: StringWithAggregatesFilter<"Comment"> | string
    replyingToId?: StringNullableWithAggregatesFilter<"Comment"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessionToken?: StringNullableFilter<"User"> | string | null
    thejoey?: BoolNullableFilter<"User"> | boolean | null
    username?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    website?: StringNullableFilter<"User"> | string | null
    twitter?: StringNullableFilter<"User"> | string | null
    github?: StringNullableFilter<"User"> | string | null
    linkedin?: StringNullableFilter<"User"> | string | null
    isProfileVerified?: BoolFilter<"User"> | boolean
    profileImage?: StringNullableFilter<"User"> | string | null
    currentStreak?: IntFilter<"User"> | number
    longestStreak?: IntFilter<"User"> | number
    lastActivityDate?: DateTimeNullableFilter<"User"> | Date | string | null
    messages?: MessageListRelationFilter
    CourseProgress?: CourseProgressListRelationFilter
    LessonProgress?: LessonProgressListRelationFilter
    badges?: UserBadgeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessionToken?: SortOrder
    thejoey?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    isProfileVerified?: SortOrder
    profileImage?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    lastActivityDate?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    CourseProgress?: CourseProgressOrderByRelationAggregateInput
    LessonProgress?: LessonProgressOrderByRelationAggregateInput
    badges?: UserBadgeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    sessionToken?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    thejoey?: BoolNullableFilter<"User"> | boolean | null
    bio?: StringNullableFilter<"User"> | string | null
    website?: StringNullableFilter<"User"> | string | null
    twitter?: StringNullableFilter<"User"> | string | null
    github?: StringNullableFilter<"User"> | string | null
    linkedin?: StringNullableFilter<"User"> | string | null
    isProfileVerified?: BoolFilter<"User"> | boolean
    profileImage?: StringNullableFilter<"User"> | string | null
    currentStreak?: IntFilter<"User"> | number
    longestStreak?: IntFilter<"User"> | number
    lastActivityDate?: DateTimeNullableFilter<"User"> | Date | string | null
    messages?: MessageListRelationFilter
    CourseProgress?: CourseProgressListRelationFilter
    LessonProgress?: LessonProgressListRelationFilter
    badges?: UserBadgeListRelationFilter
  }, "id" | "email" | "sessionToken" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessionToken?: SortOrder
    thejoey?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    isProfileVerified?: SortOrder
    profileImage?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    lastActivityDate?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    sessionToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    thejoey?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    website?: StringNullableWithAggregatesFilter<"User"> | string | null
    twitter?: StringNullableWithAggregatesFilter<"User"> | string | null
    github?: StringNullableWithAggregatesFilter<"User"> | string | null
    linkedin?: StringNullableWithAggregatesFilter<"User"> | string | null
    isProfileVerified?: BoolWithAggregatesFilter<"User"> | boolean
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    currentStreak?: IntWithAggregatesFilter<"User"> | number
    longestStreak?: IntWithAggregatesFilter<"User"> | number
    lastActivityDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CourseProgressWhereInput = {
    AND?: CourseProgressWhereInput | CourseProgressWhereInput[]
    OR?: CourseProgressWhereInput[]
    NOT?: CourseProgressWhereInput | CourseProgressWhereInput[]
    id?: StringFilter<"CourseProgress"> | string
    userId?: StringNullableFilter<"CourseProgress"> | string | null
    completed?: BoolNullableFilter<"CourseProgress"> | boolean | null
    courseSlug?: StringFilter<"CourseProgress"> | string
    Course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    lessonProgress?: LessonProgressListRelationFilter
  }

  export type CourseProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    completed?: SortOrder
    courseSlug?: SortOrder
    Course?: CourseOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
    lessonProgress?: LessonProgressOrderByRelationAggregateInput
  }

  export type CourseProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    courseSlug?: string
    AND?: CourseProgressWhereInput | CourseProgressWhereInput[]
    OR?: CourseProgressWhereInput[]
    NOT?: CourseProgressWhereInput | CourseProgressWhereInput[]
    userId?: StringNullableFilter<"CourseProgress"> | string | null
    completed?: BoolNullableFilter<"CourseProgress"> | boolean | null
    Course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    lessonProgress?: LessonProgressListRelationFilter
  }, "id" | "courseSlug">

  export type CourseProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    completed?: SortOrder
    courseSlug?: SortOrder
    _count?: CourseProgressCountOrderByAggregateInput
    _max?: CourseProgressMaxOrderByAggregateInput
    _min?: CourseProgressMinOrderByAggregateInput
  }

  export type CourseProgressScalarWhereWithAggregatesInput = {
    AND?: CourseProgressScalarWhereWithAggregatesInput | CourseProgressScalarWhereWithAggregatesInput[]
    OR?: CourseProgressScalarWhereWithAggregatesInput[]
    NOT?: CourseProgressScalarWhereWithAggregatesInput | CourseProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseProgress"> | string
    userId?: StringNullableWithAggregatesFilter<"CourseProgress"> | string | null
    completed?: BoolNullableWithAggregatesFilter<"CourseProgress"> | boolean | null
    courseSlug?: StringWithAggregatesFilter<"CourseProgress"> | string
  }

  export type LessonProgressWhereInput = {
    AND?: LessonProgressWhereInput | LessonProgressWhereInput[]
    OR?: LessonProgressWhereInput[]
    NOT?: LessonProgressWhereInput | LessonProgressWhereInput[]
    id?: StringFilter<"LessonProgress"> | string
    completed?: BoolNullableFilter<"LessonProgress"> | boolean | null
    lessonSlug?: StringFilter<"LessonProgress"> | string
    courseProgressId?: StringNullableFilter<"LessonProgress"> | string | null
    userId?: StringNullableFilter<"LessonProgress"> | string | null
    CourseProgress?: XOR<CourseProgressNullableScalarRelationFilter, CourseProgressWhereInput> | null
    Lesson?: XOR<LessonNullableScalarRelationFilter, LessonWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type LessonProgressOrderByWithRelationInput = {
    id?: SortOrder
    completed?: SortOrder
    lessonSlug?: SortOrder
    courseProgressId?: SortOrder
    userId?: SortOrder
    CourseProgress?: CourseProgressOrderByWithRelationInput
    Lesson?: LessonOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type LessonProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    lessonSlug_courseProgressId?: LessonProgressLessonSlugCourseProgressIdCompoundUniqueInput
    AND?: LessonProgressWhereInput | LessonProgressWhereInput[]
    OR?: LessonProgressWhereInput[]
    NOT?: LessonProgressWhereInput | LessonProgressWhereInput[]
    completed?: BoolNullableFilter<"LessonProgress"> | boolean | null
    lessonSlug?: StringFilter<"LessonProgress"> | string
    courseProgressId?: StringNullableFilter<"LessonProgress"> | string | null
    userId?: StringNullableFilter<"LessonProgress"> | string | null
    CourseProgress?: XOR<CourseProgressNullableScalarRelationFilter, CourseProgressWhereInput> | null
    Lesson?: XOR<LessonNullableScalarRelationFilter, LessonWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "lessonSlug_courseProgressId">

  export type LessonProgressOrderByWithAggregationInput = {
    id?: SortOrder
    completed?: SortOrder
    lessonSlug?: SortOrder
    courseProgressId?: SortOrder
    userId?: SortOrder
    _count?: LessonProgressCountOrderByAggregateInput
    _max?: LessonProgressMaxOrderByAggregateInput
    _min?: LessonProgressMinOrderByAggregateInput
  }

  export type LessonProgressScalarWhereWithAggregatesInput = {
    AND?: LessonProgressScalarWhereWithAggregatesInput | LessonProgressScalarWhereWithAggregatesInput[]
    OR?: LessonProgressScalarWhereWithAggregatesInput[]
    NOT?: LessonProgressScalarWhereWithAggregatesInput | LessonProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonProgress"> | string
    completed?: BoolNullableWithAggregatesFilter<"LessonProgress"> | boolean | null
    lessonSlug?: StringWithAggregatesFilter<"LessonProgress"> | string
    courseProgressId?: StringNullableWithAggregatesFilter<"LessonProgress"> | string | null
    userId?: StringNullableWithAggregatesFilter<"LessonProgress"> | string | null
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    title?: StringFilter<"Message"> | string
    description?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    userId?: StringNullableFilter<"Message"> | string | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    title?: StringFilter<"Message"> | string
    description?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    userId?: StringNullableFilter<"Message"> | string | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    title?: StringWithAggregatesFilter<"Message"> | string
    description?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Message"> | string | null
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    tags?: StringNullableListFilter<"Course">
    slug?: StringFilter<"Course"> | string
    progressional?: BoolFilter<"Course"> | boolean
    userId?: StringNullableFilter<"Course"> | string | null
    order?: StringNullableListFilter<"Course">
    rating?: JsonNullableFilter<"Course">
    duration?: IntNullableFilter<"Course"> | number | null
    lessons?: LessonListRelationFilter
    CourseProgress?: CourseProgressListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    slug?: SortOrder
    progressional?: SortOrder
    userId?: SortOrder
    order?: SortOrder
    rating?: SortOrder
    duration?: SortOrder
    lessons?: LessonOrderByRelationAggregateInput
    CourseProgress?: CourseProgressOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    tags?: StringNullableListFilter<"Course">
    progressional?: BoolFilter<"Course"> | boolean
    userId?: StringNullableFilter<"Course"> | string | null
    order?: StringNullableListFilter<"Course">
    rating?: JsonNullableFilter<"Course">
    duration?: IntNullableFilter<"Course"> | number | null
    lessons?: LessonListRelationFilter
    CourseProgress?: CourseProgressListRelationFilter
  }, "id" | "slug">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    slug?: SortOrder
    progressional?: SortOrder
    userId?: SortOrder
    order?: SortOrder
    rating?: SortOrder
    duration?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringWithAggregatesFilter<"Course"> | string
    tags?: StringNullableListFilter<"Course">
    slug?: StringWithAggregatesFilter<"Course"> | string
    progressional?: BoolWithAggregatesFilter<"Course"> | boolean
    userId?: StringNullableWithAggregatesFilter<"Course"> | string | null
    order?: StringNullableListFilter<"Course">
    rating?: JsonNullableWithAggregatesFilter<"Course">
    duration?: IntNullableWithAggregatesFilter<"Course"> | number | null
  }

  export type CourseTrackWhereInput = {
    AND?: CourseTrackWhereInput | CourseTrackWhereInput[]
    OR?: CourseTrackWhereInput[]
    NOT?: CourseTrackWhereInput | CourseTrackWhereInput[]
    id?: StringFilter<"CourseTrack"> | string
    title?: StringFilter<"CourseTrack"> | string
    description?: StringFilter<"CourseTrack"> | string
    slug?: StringFilter<"CourseTrack"> | string
    courseSlugs?: StringNullableListFilter<"CourseTrack">
    createdAt?: DateTimeFilter<"CourseTrack"> | Date | string
    updatedAt?: DateTimeFilter<"CourseTrack"> | Date | string
    enrollments?: CourseTrackEnrollmentListRelationFilter
  }

  export type CourseTrackOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    courseSlugs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    enrollments?: CourseTrackEnrollmentOrderByRelationAggregateInput
  }

  export type CourseTrackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CourseTrackWhereInput | CourseTrackWhereInput[]
    OR?: CourseTrackWhereInput[]
    NOT?: CourseTrackWhereInput | CourseTrackWhereInput[]
    title?: StringFilter<"CourseTrack"> | string
    description?: StringFilter<"CourseTrack"> | string
    courseSlugs?: StringNullableListFilter<"CourseTrack">
    createdAt?: DateTimeFilter<"CourseTrack"> | Date | string
    updatedAt?: DateTimeFilter<"CourseTrack"> | Date | string
    enrollments?: CourseTrackEnrollmentListRelationFilter
  }, "id" | "slug">

  export type CourseTrackOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    courseSlugs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseTrackCountOrderByAggregateInput
    _max?: CourseTrackMaxOrderByAggregateInput
    _min?: CourseTrackMinOrderByAggregateInput
  }

  export type CourseTrackScalarWhereWithAggregatesInput = {
    AND?: CourseTrackScalarWhereWithAggregatesInput | CourseTrackScalarWhereWithAggregatesInput[]
    OR?: CourseTrackScalarWhereWithAggregatesInput[]
    NOT?: CourseTrackScalarWhereWithAggregatesInput | CourseTrackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseTrack"> | string
    title?: StringWithAggregatesFilter<"CourseTrack"> | string
    description?: StringWithAggregatesFilter<"CourseTrack"> | string
    slug?: StringWithAggregatesFilter<"CourseTrack"> | string
    courseSlugs?: StringNullableListFilter<"CourseTrack">
    createdAt?: DateTimeWithAggregatesFilter<"CourseTrack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CourseTrack"> | Date | string
  }

  export type CourseTrackEnrollmentWhereInput = {
    AND?: CourseTrackEnrollmentWhereInput | CourseTrackEnrollmentWhereInput[]
    OR?: CourseTrackEnrollmentWhereInput[]
    NOT?: CourseTrackEnrollmentWhereInput | CourseTrackEnrollmentWhereInput[]
    id?: StringFilter<"CourseTrackEnrollment"> | string
    userId?: StringFilter<"CourseTrackEnrollment"> | string
    trackSlug?: StringFilter<"CourseTrackEnrollment"> | string
    completed?: BoolFilter<"CourseTrackEnrollment"> | boolean
    startedAt?: DateTimeFilter<"CourseTrackEnrollment"> | Date | string
    completedAt?: DateTimeNullableFilter<"CourseTrackEnrollment"> | Date | string | null
    track?: XOR<CourseTrackScalarRelationFilter, CourseTrackWhereInput>
  }

  export type CourseTrackEnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    trackSlug?: SortOrder
    completed?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    track?: CourseTrackOrderByWithRelationInput
  }

  export type CourseTrackEnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_trackSlug?: CourseTrackEnrollmentUserIdTrackSlugCompoundUniqueInput
    AND?: CourseTrackEnrollmentWhereInput | CourseTrackEnrollmentWhereInput[]
    OR?: CourseTrackEnrollmentWhereInput[]
    NOT?: CourseTrackEnrollmentWhereInput | CourseTrackEnrollmentWhereInput[]
    userId?: StringFilter<"CourseTrackEnrollment"> | string
    trackSlug?: StringFilter<"CourseTrackEnrollment"> | string
    completed?: BoolFilter<"CourseTrackEnrollment"> | boolean
    startedAt?: DateTimeFilter<"CourseTrackEnrollment"> | Date | string
    completedAt?: DateTimeNullableFilter<"CourseTrackEnrollment"> | Date | string | null
    track?: XOR<CourseTrackScalarRelationFilter, CourseTrackWhereInput>
  }, "id" | "userId_trackSlug">

  export type CourseTrackEnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    trackSlug?: SortOrder
    completed?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    _count?: CourseTrackEnrollmentCountOrderByAggregateInput
    _max?: CourseTrackEnrollmentMaxOrderByAggregateInput
    _min?: CourseTrackEnrollmentMinOrderByAggregateInput
  }

  export type CourseTrackEnrollmentScalarWhereWithAggregatesInput = {
    AND?: CourseTrackEnrollmentScalarWhereWithAggregatesInput | CourseTrackEnrollmentScalarWhereWithAggregatesInput[]
    OR?: CourseTrackEnrollmentScalarWhereWithAggregatesInput[]
    NOT?: CourseTrackEnrollmentScalarWhereWithAggregatesInput | CourseTrackEnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseTrackEnrollment"> | string
    userId?: StringWithAggregatesFilter<"CourseTrackEnrollment"> | string
    trackSlug?: StringWithAggregatesFilter<"CourseTrackEnrollment"> | string
    completed?: BoolWithAggregatesFilter<"CourseTrackEnrollment"> | boolean
    startedAt?: DateTimeWithAggregatesFilter<"CourseTrackEnrollment"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"CourseTrackEnrollment"> | Date | string | null
  }

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: StringFilter<"Exercise"> | string
    question?: StringFilter<"Exercise"> | string
    type?: StringFilter<"Exercise"> | string
    options?: StringNullableFilter<"Exercise"> | string | null
    correctAnswer?: StringFilter<"Exercise"> | string
    hint?: StringNullableFilter<"Exercise"> | string | null
    lessonSlug?: StringFilter<"Exercise"> | string
    Lesson?: XOR<LessonNullableScalarRelationFilter, LessonWhereInput> | null
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    hint?: SortOrder
    lessonSlug?: SortOrder
    Lesson?: LessonOrderByWithRelationInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    question?: StringFilter<"Exercise"> | string
    type?: StringFilter<"Exercise"> | string
    options?: StringNullableFilter<"Exercise"> | string | null
    correctAnswer?: StringFilter<"Exercise"> | string
    hint?: StringNullableFilter<"Exercise"> | string | null
    lessonSlug?: StringFilter<"Exercise"> | string
    Lesson?: XOR<LessonNullableScalarRelationFilter, LessonWhereInput> | null
  }, "id">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    hint?: SortOrder
    lessonSlug?: SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exercise"> | string
    question?: StringWithAggregatesFilter<"Exercise"> | string
    type?: StringWithAggregatesFilter<"Exercise"> | string
    options?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    correctAnswer?: StringWithAggregatesFilter<"Exercise"> | string
    hint?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    lessonSlug?: StringWithAggregatesFilter<"Exercise"> | string
  }

  export type LessonWhereInput = {
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    id?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    description?: StringFilter<"Lesson"> | string
    content?: StringNullableFilter<"Lesson"> | string | null
    slug?: StringFilter<"Lesson"> | string
    courseSlug?: StringFilter<"Lesson"> | string
    completed?: BoolNullableFilter<"Lesson"> | boolean | null
    duration?: IntNullableFilter<"Lesson"> | number | null
    exercises?: ExerciseListRelationFilter
    Course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    LessonProgress?: LessonProgressListRelationFilter
  }

  export type LessonOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    slug?: SortOrder
    courseSlug?: SortOrder
    completed?: SortOrder
    duration?: SortOrder
    exercises?: ExerciseOrderByRelationAggregateInput
    Course?: CourseOrderByWithRelationInput
    LessonProgress?: LessonProgressOrderByRelationAggregateInput
  }

  export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    title?: StringFilter<"Lesson"> | string
    description?: StringFilter<"Lesson"> | string
    content?: StringNullableFilter<"Lesson"> | string | null
    courseSlug?: StringFilter<"Lesson"> | string
    completed?: BoolNullableFilter<"Lesson"> | boolean | null
    duration?: IntNullableFilter<"Lesson"> | number | null
    exercises?: ExerciseListRelationFilter
    Course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    LessonProgress?: LessonProgressListRelationFilter
  }, "id" | "slug">

  export type LessonOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    slug?: SortOrder
    courseSlug?: SortOrder
    completed?: SortOrder
    duration?: SortOrder
    _count?: LessonCountOrderByAggregateInput
    _avg?: LessonAvgOrderByAggregateInput
    _max?: LessonMaxOrderByAggregateInput
    _min?: LessonMinOrderByAggregateInput
    _sum?: LessonSumOrderByAggregateInput
  }

  export type LessonScalarWhereWithAggregatesInput = {
    AND?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    OR?: LessonScalarWhereWithAggregatesInput[]
    NOT?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lesson"> | string
    title?: StringWithAggregatesFilter<"Lesson"> | string
    description?: StringWithAggregatesFilter<"Lesson"> | string
    content?: StringNullableWithAggregatesFilter<"Lesson"> | string | null
    slug?: StringWithAggregatesFilter<"Lesson"> | string
    courseSlug?: StringWithAggregatesFilter<"Lesson"> | string
    completed?: BoolNullableWithAggregatesFilter<"Lesson"> | boolean | null
    duration?: IntNullableWithAggregatesFilter<"Lesson"> | number | null
  }

  export type ContactMessageWhereInput = {
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    id?: StringFilter<"ContactMessage"> | string
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    subject?: StringNullableFilter<"ContactMessage"> | string | null
    message?: StringFilter<"ContactMessage"> | string
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
    read?: BoolFilter<"ContactMessage"> | boolean
  }

  export type ContactMessageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type ContactMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    subject?: StringNullableFilter<"ContactMessage"> | string | null
    message?: StringFilter<"ContactMessage"> | string
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
    read?: BoolFilter<"ContactMessage"> | boolean
  }, "id">

  export type ContactMessageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    _count?: ContactMessageCountOrderByAggregateInput
    _max?: ContactMessageMaxOrderByAggregateInput
    _min?: ContactMessageMinOrderByAggregateInput
  }

  export type ContactMessageScalarWhereWithAggregatesInput = {
    AND?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    OR?: ContactMessageScalarWhereWithAggregatesInput[]
    NOT?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContactMessage"> | string
    name?: StringWithAggregatesFilter<"ContactMessage"> | string
    email?: StringWithAggregatesFilter<"ContactMessage"> | string
    subject?: StringNullableWithAggregatesFilter<"ContactMessage"> | string | null
    message?: StringWithAggregatesFilter<"ContactMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
    read?: BoolWithAggregatesFilter<"ContactMessage"> | boolean
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    description?: StringNullableFilter<"ActivityLog"> | string | null
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    action?: StringFilter<"ActivityLog"> | string
    description?: StringNullableFilter<"ActivityLog"> | string | null
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    action?: StringWithAggregatesFilter<"ActivityLog"> | string
    description?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    userId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type LessonFeedbackWhereInput = {
    AND?: LessonFeedbackWhereInput | LessonFeedbackWhereInput[]
    OR?: LessonFeedbackWhereInput[]
    NOT?: LessonFeedbackWhereInput | LessonFeedbackWhereInput[]
    id?: StringFilter<"LessonFeedback"> | string
    lessonSlug?: StringFilter<"LessonFeedback"> | string
    feedback?: StringFilter<"LessonFeedback"> | string
    createdAt?: DateTimeFilter<"LessonFeedback"> | Date | string
  }

  export type LessonFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    lessonSlug?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LessonFeedbackWhereInput | LessonFeedbackWhereInput[]
    OR?: LessonFeedbackWhereInput[]
    NOT?: LessonFeedbackWhereInput | LessonFeedbackWhereInput[]
    lessonSlug?: StringFilter<"LessonFeedback"> | string
    feedback?: StringFilter<"LessonFeedback"> | string
    createdAt?: DateTimeFilter<"LessonFeedback"> | Date | string
  }, "id">

  export type LessonFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    lessonSlug?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
    _count?: LessonFeedbackCountOrderByAggregateInput
    _max?: LessonFeedbackMaxOrderByAggregateInput
    _min?: LessonFeedbackMinOrderByAggregateInput
  }

  export type LessonFeedbackScalarWhereWithAggregatesInput = {
    AND?: LessonFeedbackScalarWhereWithAggregatesInput | LessonFeedbackScalarWhereWithAggregatesInput[]
    OR?: LessonFeedbackScalarWhereWithAggregatesInput[]
    NOT?: LessonFeedbackScalarWhereWithAggregatesInput | LessonFeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonFeedback"> | string
    lessonSlug?: StringWithAggregatesFilter<"LessonFeedback"> | string
    feedback?: StringWithAggregatesFilter<"LessonFeedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LessonFeedback"> | Date | string
  }

  export type LessonNoteWhereInput = {
    AND?: LessonNoteWhereInput | LessonNoteWhereInput[]
    OR?: LessonNoteWhereInput[]
    NOT?: LessonNoteWhereInput | LessonNoteWhereInput[]
    id?: StringFilter<"LessonNote"> | string
    userId?: StringFilter<"LessonNote"> | string
    lessonSlug?: StringFilter<"LessonNote"> | string
    content?: StringFilter<"LessonNote"> | string
    createdAt?: DateTimeFilter<"LessonNote"> | Date | string
    updatedAt?: DateTimeFilter<"LessonNote"> | Date | string
  }

  export type LessonNoteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonSlug?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_lessonSlug?: LessonNoteUserIdLessonSlugCompoundUniqueInput
    AND?: LessonNoteWhereInput | LessonNoteWhereInput[]
    OR?: LessonNoteWhereInput[]
    NOT?: LessonNoteWhereInput | LessonNoteWhereInput[]
    userId?: StringFilter<"LessonNote"> | string
    lessonSlug?: StringFilter<"LessonNote"> | string
    content?: StringFilter<"LessonNote"> | string
    createdAt?: DateTimeFilter<"LessonNote"> | Date | string
    updatedAt?: DateTimeFilter<"LessonNote"> | Date | string
  }, "id" | "userId_lessonSlug">

  export type LessonNoteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonSlug?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LessonNoteCountOrderByAggregateInput
    _max?: LessonNoteMaxOrderByAggregateInput
    _min?: LessonNoteMinOrderByAggregateInput
  }

  export type LessonNoteScalarWhereWithAggregatesInput = {
    AND?: LessonNoteScalarWhereWithAggregatesInput | LessonNoteScalarWhereWithAggregatesInput[]
    OR?: LessonNoteScalarWhereWithAggregatesInput[]
    NOT?: LessonNoteScalarWhereWithAggregatesInput | LessonNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonNote"> | string
    userId?: StringWithAggregatesFilter<"LessonNote"> | string
    lessonSlug?: StringWithAggregatesFilter<"LessonNote"> | string
    content?: StringWithAggregatesFilter<"LessonNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LessonNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LessonNote"> | Date | string
  }

  export type BadgeWhereInput = {
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    id?: StringFilter<"Badge"> | string
    name?: StringFilter<"Badge"> | string
    description?: StringFilter<"Badge"> | string
    icon?: StringFilter<"Badge"> | string
    criteria?: JsonFilter<"Badge">
    createdAt?: DateTimeFilter<"Badge"> | Date | string
    users?: UserBadgeListRelationFilter
  }

  export type BadgeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    criteria?: SortOrder
    createdAt?: SortOrder
    users?: UserBadgeOrderByRelationAggregateInput
  }

  export type BadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    description?: StringFilter<"Badge"> | string
    icon?: StringFilter<"Badge"> | string
    criteria?: JsonFilter<"Badge">
    createdAt?: DateTimeFilter<"Badge"> | Date | string
    users?: UserBadgeListRelationFilter
  }, "id" | "name">

  export type BadgeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    criteria?: SortOrder
    createdAt?: SortOrder
    _count?: BadgeCountOrderByAggregateInput
    _max?: BadgeMaxOrderByAggregateInput
    _min?: BadgeMinOrderByAggregateInput
  }

  export type BadgeScalarWhereWithAggregatesInput = {
    AND?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    OR?: BadgeScalarWhereWithAggregatesInput[]
    NOT?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Badge"> | string
    name?: StringWithAggregatesFilter<"Badge"> | string
    description?: StringWithAggregatesFilter<"Badge"> | string
    icon?: StringWithAggregatesFilter<"Badge"> | string
    criteria?: JsonWithAggregatesFilter<"Badge">
    createdAt?: DateTimeWithAggregatesFilter<"Badge"> | Date | string
  }

  export type UserBadgeWhereInput = {
    AND?: UserBadgeWhereInput | UserBadgeWhereInput[]
    OR?: UserBadgeWhereInput[]
    NOT?: UserBadgeWhereInput | UserBadgeWhereInput[]
    id?: StringFilter<"UserBadge"> | string
    userId?: StringFilter<"UserBadge"> | string
    badgeId?: StringFilter<"UserBadge"> | string
    earnedAt?: DateTimeFilter<"UserBadge"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Badge?: XOR<BadgeScalarRelationFilter, BadgeWhereInput>
  }

  export type UserBadgeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
    User?: UserOrderByWithRelationInput
    Badge?: BadgeOrderByWithRelationInput
  }

  export type UserBadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_badgeId?: UserBadgeUserIdBadgeIdCompoundUniqueInput
    AND?: UserBadgeWhereInput | UserBadgeWhereInput[]
    OR?: UserBadgeWhereInput[]
    NOT?: UserBadgeWhereInput | UserBadgeWhereInput[]
    userId?: StringFilter<"UserBadge"> | string
    badgeId?: StringFilter<"UserBadge"> | string
    earnedAt?: DateTimeFilter<"UserBadge"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Badge?: XOR<BadgeScalarRelationFilter, BadgeWhereInput>
  }, "id" | "userId_badgeId">

  export type UserBadgeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
    _count?: UserBadgeCountOrderByAggregateInput
    _max?: UserBadgeMaxOrderByAggregateInput
    _min?: UserBadgeMinOrderByAggregateInput
  }

  export type UserBadgeScalarWhereWithAggregatesInput = {
    AND?: UserBadgeScalarWhereWithAggregatesInput | UserBadgeScalarWhereWithAggregatesInput[]
    OR?: UserBadgeScalarWhereWithAggregatesInput[]
    NOT?: UserBadgeScalarWhereWithAggregatesInput | UserBadgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserBadge"> | string
    userId?: StringWithAggregatesFilter<"UserBadge"> | string
    badgeId?: StringWithAggregatesFilter<"UserBadge"> | string
    earnedAt?: DateTimeWithAggregatesFilter<"UserBadge"> | Date | string
  }

  export type BlogPostCreateInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: BlogPostCreatetagsInput | string[]
    slug: string
    image?: string | null
    isAI?: boolean | null
  }

  export type BlogPostUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: BlogPostCreatetagsInput | string[]
    slug: string
    image?: string | null
    isAI?: boolean | null
  }

  export type BlogPostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: BlogPostUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isAI?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type BlogPostUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: BlogPostUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isAI?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type BlogPostCreateManyInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: BlogPostCreatetagsInput | string[]
    slug: string
    image?: string | null
    isAI?: boolean | null
  }

  export type BlogPostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: BlogPostUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isAI?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type BlogPostUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: BlogPostUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isAI?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type TutorialPostCreateInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TutorialPostCreatetagsInput | string[]
    difficulty?: string | null
    slug: string
  }

  export type TutorialPostUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TutorialPostCreatetagsInput | string[]
    difficulty?: string | null
    slug: string
  }

  export type TutorialPostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TutorialPostUpdatetagsInput | string[]
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TutorialPostUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TutorialPostUpdatetagsInput | string[]
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TutorialPostCreateManyInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TutorialPostCreatetagsInput | string[]
    difficulty?: string | null
    slug: string
  }

  export type TutorialPostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TutorialPostUpdatetagsInput | string[]
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TutorialPostUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TutorialPostUpdatetagsInput | string[]
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateInput = {
    id?: string
    authorId?: string | null
    authorName?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postSlug: string
    replyingToId?: string | null
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    authorId?: string | null
    authorName?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postSlug: string
    replyingToId?: string | null
  }

  export type CommentUpdateInput = {
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postSlug?: StringFieldUpdateOperationsInput | string
    replyingToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUncheckedUpdateInput = {
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postSlug?: StringFieldUpdateOperationsInput | string
    replyingToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentCreateManyInput = {
    id?: string
    authorId?: string | null
    authorName?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postSlug: string
    replyingToId?: string | null
  }

  export type CommentUpdateManyMutationInput = {
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postSlug?: StringFieldUpdateOperationsInput | string
    replyingToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUncheckedUpdateManyInput = {
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postSlug?: StringFieldUpdateOperationsInput | string
    replyingToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageCreateNestedManyWithoutUserInput
    CourseProgress?: CourseProgressCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutUserInput
    badges?: UserBadgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    CourseProgress?: CourseProgressUncheckedCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput
    badges?: UserBadgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUpdateManyWithoutUserNestedInput
    CourseProgress?: CourseProgressUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    CourseProgress?: CourseProgressUncheckedUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseProgressCreateInput = {
    id?: string
    completed?: boolean | null
    Course?: CourseCreateNestedOneWithoutCourseProgressInput
    User?: UserCreateNestedOneWithoutCourseProgressInput
    lessonProgress?: LessonProgressCreateNestedManyWithoutCourseProgressInput
  }

  export type CourseProgressUncheckedCreateInput = {
    id?: string
    userId?: string | null
    completed?: boolean | null
    courseSlug: string
    lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutCourseProgressInput
  }

  export type CourseProgressUpdateInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Course?: CourseUpdateOneWithoutCourseProgressNestedInput
    User?: UserUpdateOneWithoutCourseProgressNestedInput
    lessonProgress?: LessonProgressUpdateManyWithoutCourseProgressNestedInput
  }

  export type CourseProgressUncheckedUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseSlug?: StringFieldUpdateOperationsInput | string
    lessonProgress?: LessonProgressUncheckedUpdateManyWithoutCourseProgressNestedInput
  }

  export type CourseProgressCreateManyInput = {
    id?: string
    userId?: string | null
    completed?: boolean | null
    courseSlug: string
  }

  export type CourseProgressUpdateManyMutationInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type CourseProgressUncheckedUpdateManyInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseSlug?: StringFieldUpdateOperationsInput | string
  }

  export type LessonProgressCreateInput = {
    id?: string
    completed?: boolean | null
    CourseProgress?: CourseProgressCreateNestedOneWithoutLessonProgressInput
    Lesson?: LessonCreateNestedOneWithoutLessonProgressInput
    User?: UserCreateNestedOneWithoutLessonProgressInput
  }

  export type LessonProgressUncheckedCreateInput = {
    id?: string
    completed?: boolean | null
    lessonSlug: string
    courseProgressId?: string | null
    userId?: string | null
  }

  export type LessonProgressUpdateInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    CourseProgress?: CourseProgressUpdateOneWithoutLessonProgressNestedInput
    Lesson?: LessonUpdateOneWithoutLessonProgressNestedInput
    User?: UserUpdateOneWithoutLessonProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
    courseProgressId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressCreateManyInput = {
    id?: string
    completed?: boolean | null
    lessonSlug: string
    courseProgressId?: string | null
    userId?: string | null
  }

  export type LessonProgressUpdateManyMutationInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type LessonProgressUncheckedUpdateManyInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
    courseProgressId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageCreateInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
    User?: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
    userId?: string | null
  }

  export type MessageUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageCreateManyInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
    userId?: string | null
  }

  export type MessageUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseCreateInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
    lessons?: LessonCreateNestedManyWithoutCourseInput
    CourseProgress?: CourseProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
    lessons?: LessonUncheckedCreateNestedManyWithoutCourseInput
    CourseProgress?: CourseProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    lessons?: LessonUpdateManyWithoutCourseNestedInput
    CourseProgress?: CourseProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    lessons?: LessonUncheckedUpdateManyWithoutCourseNestedInput
    CourseProgress?: CourseProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
  }

  export type CourseUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseTrackCreateInput = {
    id?: string
    title: string
    description: string
    slug: string
    courseSlugs?: CourseTrackCreatecourseSlugsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: CourseTrackEnrollmentCreateNestedManyWithoutTrackInput
  }

  export type CourseTrackUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    slug: string
    courseSlugs?: CourseTrackCreatecourseSlugsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: CourseTrackEnrollmentUncheckedCreateNestedManyWithoutTrackInput
  }

  export type CourseTrackUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    courseSlugs?: CourseTrackUpdatecourseSlugsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: CourseTrackEnrollmentUpdateManyWithoutTrackNestedInput
  }

  export type CourseTrackUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    courseSlugs?: CourseTrackUpdatecourseSlugsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: CourseTrackEnrollmentUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type CourseTrackCreateManyInput = {
    id?: string
    title: string
    description: string
    slug: string
    courseSlugs?: CourseTrackCreatecourseSlugsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTrackUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    courseSlugs?: CourseTrackUpdatecourseSlugsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTrackUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    courseSlugs?: CourseTrackUpdatecourseSlugsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTrackEnrollmentCreateInput = {
    id?: string
    userId: string
    completed?: boolean
    startedAt?: Date | string
    completedAt?: Date | string | null
    track: CourseTrackCreateNestedOneWithoutEnrollmentsInput
  }

  export type CourseTrackEnrollmentUncheckedCreateInput = {
    id?: string
    userId: string
    trackSlug: string
    completed?: boolean
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CourseTrackEnrollmentUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    track?: CourseTrackUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type CourseTrackEnrollmentUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    trackSlug?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseTrackEnrollmentCreateManyInput = {
    id?: string
    userId: string
    trackSlug: string
    completed?: boolean
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CourseTrackEnrollmentUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseTrackEnrollmentUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    trackSlug?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExerciseCreateInput = {
    id?: string
    question: string
    type: string
    options?: string | null
    correctAnswer: string
    hint?: string | null
    Lesson?: LessonCreateNestedOneWithoutExercisesInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: string
    question: string
    type: string
    options?: string | null
    correctAnswer: string
    hint?: string | null
    lessonSlug: string
  }

  export type ExerciseUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
    Lesson?: LessonUpdateOneWithoutExercisesNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciseCreateManyInput = {
    id?: string
    question: string
    type: string
    options?: string | null
    correctAnswer: string
    hint?: string | null
    lessonSlug: string
  }

  export type ExerciseUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciseUncheckedUpdateManyInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
  }

  export type LessonCreateInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    completed?: boolean | null
    duration?: number | null
    exercises?: ExerciseCreateNestedManyWithoutLessonInput
    Course: CourseCreateNestedOneWithoutLessonsInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    courseSlug: string
    completed?: boolean | null
    duration?: number | null
    exercises?: ExerciseUncheckedCreateNestedManyWithoutLessonInput
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: ExerciseUpdateManyWithoutLessonNestedInput
    Course?: CourseUpdateOneRequiredWithoutLessonsNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    courseSlug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: ExerciseUncheckedUpdateManyWithoutLessonNestedInput
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type LessonCreateManyInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    courseSlug: string
    completed?: boolean | null
    duration?: number | null
  }

  export type LessonUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LessonUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    courseSlug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ContactMessageCreateInput = {
    id?: string
    name: string
    email: string
    subject?: string | null
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type ContactMessageUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    subject?: string | null
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type ContactMessageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactMessageUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactMessageCreateManyInput = {
    id?: string
    name: string
    email: string
    subject?: string | null
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type ContactMessageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactMessageUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityLogCreateInput = {
    id?: string
    action: string
    description?: string | null
    userId?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    action: string
    description?: string | null
    userId?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    action: string
    description?: string | null
    userId?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonFeedbackCreateInput = {
    id?: string
    lessonSlug: string
    feedback: string
    createdAt?: Date | string
  }

  export type LessonFeedbackUncheckedCreateInput = {
    id?: string
    lessonSlug: string
    feedback: string
    createdAt?: Date | string
  }

  export type LessonFeedbackUpdateInput = {
    lessonSlug?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonFeedbackUncheckedUpdateInput = {
    lessonSlug?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonFeedbackCreateManyInput = {
    id?: string
    lessonSlug: string
    feedback: string
    createdAt?: Date | string
  }

  export type LessonFeedbackUpdateManyMutationInput = {
    lessonSlug?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonFeedbackUncheckedUpdateManyInput = {
    lessonSlug?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonNoteCreateInput = {
    id?: string
    userId: string
    lessonSlug: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonNoteUncheckedCreateInput = {
    id?: string
    userId: string
    lessonSlug: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonNoteUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    lessonSlug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonNoteUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    lessonSlug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonNoteCreateManyInput = {
    id?: string
    userId: string
    lessonSlug: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonNoteUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    lessonSlug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonNoteUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    lessonSlug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeCreateInput = {
    id?: string
    name: string
    description: string
    icon: string
    criteria: InputJsonValue
    createdAt?: Date | string
    users?: UserBadgeCreateNestedManyWithoutBadgeInput
  }

  export type BadgeUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    icon: string
    criteria: InputJsonValue
    createdAt?: Date | string
    users?: UserBadgeUncheckedCreateNestedManyWithoutBadgeInput
  }

  export type BadgeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    criteria?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserBadgeUpdateManyWithoutBadgeNestedInput
  }

  export type BadgeUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    criteria?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserBadgeUncheckedUpdateManyWithoutBadgeNestedInput
  }

  export type BadgeCreateManyInput = {
    id?: string
    name: string
    description: string
    icon: string
    criteria: InputJsonValue
    createdAt?: Date | string
  }

  export type BadgeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    criteria?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    criteria?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeCreateInput = {
    id?: string
    earnedAt?: Date | string
    User: UserCreateNestedOneWithoutBadgesInput
    Badge: BadgeCreateNestedOneWithoutUsersInput
  }

  export type UserBadgeUncheckedCreateInput = {
    id?: string
    userId: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type UserBadgeUpdateInput = {
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutBadgesNestedInput
    Badge?: BadgeUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserBadgeUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeCreateManyInput = {
    id?: string
    userId: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type UserBadgeUpdateManyMutationInput = {
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
    isSet?: boolean
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    slug?: SortOrder
    image?: SortOrder
    isAI?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    image?: SortOrder
    isAI?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    image?: SortOrder
    isAI?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type TutorialPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
  }

  export type TutorialPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
  }

  export type TutorialPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postSlug?: SortOrder
    replyingToId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postSlug?: SortOrder
    replyingToId?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postSlug?: SortOrder
    replyingToId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type CourseProgressListRelationFilter = {
    every?: CourseProgressWhereInput
    some?: CourseProgressWhereInput
    none?: CourseProgressWhereInput
  }

  export type LessonProgressListRelationFilter = {
    every?: LessonProgressWhereInput
    some?: LessonProgressWhereInput
    none?: LessonProgressWhereInput
  }

  export type UserBadgeListRelationFilter = {
    every?: UserBadgeWhereInput
    some?: UserBadgeWhereInput
    none?: UserBadgeWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LessonProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserBadgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessionToken?: SortOrder
    thejoey?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    isProfileVerified?: SortOrder
    profileImage?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    lastActivityDate?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    currentStreak?: SortOrder
    longestStreak?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessionToken?: SortOrder
    thejoey?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    isProfileVerified?: SortOrder
    profileImage?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    lastActivityDate?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessionToken?: SortOrder
    thejoey?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    twitter?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    isProfileVerified?: SortOrder
    profileImage?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    lastActivityDate?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    currentStreak?: SortOrder
    longestStreak?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type CourseNullableScalarRelationFilter = {
    is?: CourseWhereInput | null
    isNot?: CourseWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CourseProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    completed?: SortOrder
    courseSlug?: SortOrder
  }

  export type CourseProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    completed?: SortOrder
    courseSlug?: SortOrder
  }

  export type CourseProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    completed?: SortOrder
    courseSlug?: SortOrder
  }

  export type CourseProgressNullableScalarRelationFilter = {
    is?: CourseProgressWhereInput | null
    isNot?: CourseProgressWhereInput | null
  }

  export type LessonNullableScalarRelationFilter = {
    is?: LessonWhereInput | null
    isNot?: LessonWhereInput | null
  }

  export type LessonProgressLessonSlugCourseProgressIdCompoundUniqueInput = {
    lessonSlug: string
    courseProgressId: string
  }

  export type LessonProgressCountOrderByAggregateInput = {
    id?: SortOrder
    completed?: SortOrder
    lessonSlug?: SortOrder
    courseProgressId?: SortOrder
    userId?: SortOrder
  }

  export type LessonProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    completed?: SortOrder
    lessonSlug?: SortOrder
    courseProgressId?: SortOrder
    userId?: SortOrder
  }

  export type LessonProgressMinOrderByAggregateInput = {
    id?: SortOrder
    completed?: SortOrder
    lessonSlug?: SortOrder
    courseProgressId?: SortOrder
    userId?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type LessonListRelationFilter = {
    every?: LessonWhereInput
    some?: LessonWhereInput
    none?: LessonWhereInput
  }

  export type LessonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    slug?: SortOrder
    progressional?: SortOrder
    userId?: SortOrder
    order?: SortOrder
    rating?: SortOrder
    duration?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    progressional?: SortOrder
    userId?: SortOrder
    duration?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    progressional?: SortOrder
    userId?: SortOrder
    duration?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    duration?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type CourseTrackEnrollmentListRelationFilter = {
    every?: CourseTrackEnrollmentWhereInput
    some?: CourseTrackEnrollmentWhereInput
    none?: CourseTrackEnrollmentWhereInput
  }

  export type CourseTrackEnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseTrackCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    courseSlugs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseTrackMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseTrackMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseTrackScalarRelationFilter = {
    is?: CourseTrackWhereInput
    isNot?: CourseTrackWhereInput
  }

  export type CourseTrackEnrollmentUserIdTrackSlugCompoundUniqueInput = {
    userId: string
    trackSlug: string
  }

  export type CourseTrackEnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackSlug?: SortOrder
    completed?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type CourseTrackEnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackSlug?: SortOrder
    completed?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type CourseTrackEnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackSlug?: SortOrder
    completed?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    hint?: SortOrder
    lessonSlug?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    hint?: SortOrder
    lessonSlug?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    hint?: SortOrder
    lessonSlug?: SortOrder
  }

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput
    some?: ExerciseWhereInput
    none?: ExerciseWhereInput
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LessonCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    slug?: SortOrder
    courseSlug?: SortOrder
    completed?: SortOrder
    duration?: SortOrder
  }

  export type LessonAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type LessonMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    slug?: SortOrder
    courseSlug?: SortOrder
    completed?: SortOrder
    duration?: SortOrder
  }

  export type LessonMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    slug?: SortOrder
    courseSlug?: SortOrder
    completed?: SortOrder
    duration?: SortOrder
  }

  export type LessonSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type ContactMessageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type ContactMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type ContactMessageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    lessonSlug?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    lessonSlug?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    lessonSlug?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonNoteUserIdLessonSlugCompoundUniqueInput = {
    userId: string
    lessonSlug: string
  }

  export type LessonNoteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonSlug?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonSlug?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonNoteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonSlug?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type BadgeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    criteria?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BadgeScalarRelationFilter = {
    is?: BadgeWhereInput
    isNot?: BadgeWhereInput
  }

  export type UserBadgeUserIdBadgeIdCompoundUniqueInput = {
    userId: string
    badgeId: string
  }

  export type UserBadgeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
  }

  export type UserBadgeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
  }

  export type UserBadgeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
  }

  export type BlogPostCreatetagsInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BlogPostUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
    unset?: boolean
  }

  export type TutorialPostCreatetagsInput = {
    set: string[]
  }

  export type TutorialPostUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MessageCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type CourseProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<CourseProgressCreateWithoutUserInput, CourseProgressUncheckedCreateWithoutUserInput> | CourseProgressCreateWithoutUserInput[] | CourseProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutUserInput | CourseProgressCreateOrConnectWithoutUserInput[]
    createMany?: CourseProgressCreateManyUserInputEnvelope
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
  }

  export type LessonProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[]
    createMany?: LessonProgressCreateManyUserInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type UserBadgeCreateNestedManyWithoutUserInput = {
    create?: XOR<UserBadgeCreateWithoutUserInput, UserBadgeUncheckedCreateWithoutUserInput> | UserBadgeCreateWithoutUserInput[] | UserBadgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutUserInput | UserBadgeCreateOrConnectWithoutUserInput[]
    createMany?: UserBadgeCreateManyUserInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type CourseProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CourseProgressCreateWithoutUserInput, CourseProgressUncheckedCreateWithoutUserInput> | CourseProgressCreateWithoutUserInput[] | CourseProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutUserInput | CourseProgressCreateOrConnectWithoutUserInput[]
    createMany?: CourseProgressCreateManyUserInputEnvelope
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
  }

  export type LessonProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[]
    createMany?: LessonProgressCreateManyUserInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type UserBadgeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserBadgeCreateWithoutUserInput, UserBadgeUncheckedCreateWithoutUserInput> | UserBadgeCreateWithoutUserInput[] | UserBadgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutUserInput | UserBadgeCreateOrConnectWithoutUserInput[]
    createMany?: UserBadgeCreateManyUserInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type MessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type CourseProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<CourseProgressCreateWithoutUserInput, CourseProgressUncheckedCreateWithoutUserInput> | CourseProgressCreateWithoutUserInput[] | CourseProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutUserInput | CourseProgressCreateOrConnectWithoutUserInput[]
    upsert?: CourseProgressUpsertWithWhereUniqueWithoutUserInput | CourseProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CourseProgressCreateManyUserInputEnvelope
    set?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    disconnect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    delete?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    update?: CourseProgressUpdateWithWhereUniqueWithoutUserInput | CourseProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CourseProgressUpdateManyWithWhereWithoutUserInput | CourseProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CourseProgressScalarWhereInput | CourseProgressScalarWhereInput[]
  }

  export type LessonProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutUserInput | LessonProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LessonProgressCreateManyUserInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutUserInput | LessonProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutUserInput | LessonProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type UserBadgeUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserBadgeCreateWithoutUserInput, UserBadgeUncheckedCreateWithoutUserInput> | UserBadgeCreateWithoutUserInput[] | UserBadgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutUserInput | UserBadgeCreateOrConnectWithoutUserInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutUserInput | UserBadgeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserBadgeCreateManyUserInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutUserInput | UserBadgeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutUserInput | UserBadgeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type CourseProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CourseProgressCreateWithoutUserInput, CourseProgressUncheckedCreateWithoutUserInput> | CourseProgressCreateWithoutUserInput[] | CourseProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutUserInput | CourseProgressCreateOrConnectWithoutUserInput[]
    upsert?: CourseProgressUpsertWithWhereUniqueWithoutUserInput | CourseProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CourseProgressCreateManyUserInputEnvelope
    set?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    disconnect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    delete?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    update?: CourseProgressUpdateWithWhereUniqueWithoutUserInput | CourseProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CourseProgressUpdateManyWithWhereWithoutUserInput | CourseProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CourseProgressScalarWhereInput | CourseProgressScalarWhereInput[]
  }

  export type LessonProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutUserInput | LessonProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LessonProgressCreateManyUserInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutUserInput | LessonProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutUserInput | LessonProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type UserBadgeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserBadgeCreateWithoutUserInput, UserBadgeUncheckedCreateWithoutUserInput> | UserBadgeCreateWithoutUserInput[] | UserBadgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutUserInput | UserBadgeCreateOrConnectWithoutUserInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutUserInput | UserBadgeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserBadgeCreateManyUserInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutUserInput | UserBadgeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutUserInput | UserBadgeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutCourseProgressInput = {
    create?: XOR<CourseCreateWithoutCourseProgressInput, CourseUncheckedCreateWithoutCourseProgressInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseProgressInput
    connect?: CourseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCourseProgressInput = {
    create?: XOR<UserCreateWithoutCourseProgressInput, UserUncheckedCreateWithoutCourseProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutCourseProgressInput
    connect?: UserWhereUniqueInput
  }

  export type LessonProgressCreateNestedManyWithoutCourseProgressInput = {
    create?: XOR<LessonProgressCreateWithoutCourseProgressInput, LessonProgressUncheckedCreateWithoutCourseProgressInput> | LessonProgressCreateWithoutCourseProgressInput[] | LessonProgressUncheckedCreateWithoutCourseProgressInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutCourseProgressInput | LessonProgressCreateOrConnectWithoutCourseProgressInput[]
    createMany?: LessonProgressCreateManyCourseProgressInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type LessonProgressUncheckedCreateNestedManyWithoutCourseProgressInput = {
    create?: XOR<LessonProgressCreateWithoutCourseProgressInput, LessonProgressUncheckedCreateWithoutCourseProgressInput> | LessonProgressCreateWithoutCourseProgressInput[] | LessonProgressUncheckedCreateWithoutCourseProgressInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutCourseProgressInput | LessonProgressCreateOrConnectWithoutCourseProgressInput[]
    createMany?: LessonProgressCreateManyCourseProgressInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type CourseUpdateOneWithoutCourseProgressNestedInput = {
    create?: XOR<CourseCreateWithoutCourseProgressInput, CourseUncheckedCreateWithoutCourseProgressInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseProgressInput
    upsert?: CourseUpsertWithoutCourseProgressInput
    disconnect?: boolean
    delete?: CourseWhereInput | boolean
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutCourseProgressInput, CourseUpdateWithoutCourseProgressInput>, CourseUncheckedUpdateWithoutCourseProgressInput>
  }

  export type UserUpdateOneWithoutCourseProgressNestedInput = {
    create?: XOR<UserCreateWithoutCourseProgressInput, UserUncheckedCreateWithoutCourseProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutCourseProgressInput
    upsert?: UserUpsertWithoutCourseProgressInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCourseProgressInput, UserUpdateWithoutCourseProgressInput>, UserUncheckedUpdateWithoutCourseProgressInput>
  }

  export type LessonProgressUpdateManyWithoutCourseProgressNestedInput = {
    create?: XOR<LessonProgressCreateWithoutCourseProgressInput, LessonProgressUncheckedCreateWithoutCourseProgressInput> | LessonProgressCreateWithoutCourseProgressInput[] | LessonProgressUncheckedCreateWithoutCourseProgressInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutCourseProgressInput | LessonProgressCreateOrConnectWithoutCourseProgressInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutCourseProgressInput | LessonProgressUpsertWithWhereUniqueWithoutCourseProgressInput[]
    createMany?: LessonProgressCreateManyCourseProgressInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutCourseProgressInput | LessonProgressUpdateWithWhereUniqueWithoutCourseProgressInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutCourseProgressInput | LessonProgressUpdateManyWithWhereWithoutCourseProgressInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type LessonProgressUncheckedUpdateManyWithoutCourseProgressNestedInput = {
    create?: XOR<LessonProgressCreateWithoutCourseProgressInput, LessonProgressUncheckedCreateWithoutCourseProgressInput> | LessonProgressCreateWithoutCourseProgressInput[] | LessonProgressUncheckedCreateWithoutCourseProgressInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutCourseProgressInput | LessonProgressCreateOrConnectWithoutCourseProgressInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutCourseProgressInput | LessonProgressUpsertWithWhereUniqueWithoutCourseProgressInput[]
    createMany?: LessonProgressCreateManyCourseProgressInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutCourseProgressInput | LessonProgressUpdateWithWhereUniqueWithoutCourseProgressInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutCourseProgressInput | LessonProgressUpdateManyWithWhereWithoutCourseProgressInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type CourseProgressCreateNestedOneWithoutLessonProgressInput = {
    create?: XOR<CourseProgressCreateWithoutLessonProgressInput, CourseProgressUncheckedCreateWithoutLessonProgressInput>
    connectOrCreate?: CourseProgressCreateOrConnectWithoutLessonProgressInput
    connect?: CourseProgressWhereUniqueInput
  }

  export type LessonCreateNestedOneWithoutLessonProgressInput = {
    create?: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>
    connectOrCreate?: LessonCreateOrConnectWithoutLessonProgressInput
    connect?: LessonWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLessonProgressInput = {
    create?: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutLessonProgressInput
    connect?: UserWhereUniqueInput
  }

  export type CourseProgressUpdateOneWithoutLessonProgressNestedInput = {
    create?: XOR<CourseProgressCreateWithoutLessonProgressInput, CourseProgressUncheckedCreateWithoutLessonProgressInput>
    connectOrCreate?: CourseProgressCreateOrConnectWithoutLessonProgressInput
    upsert?: CourseProgressUpsertWithoutLessonProgressInput
    disconnect?: boolean
    delete?: CourseProgressWhereInput | boolean
    connect?: CourseProgressWhereUniqueInput
    update?: XOR<XOR<CourseProgressUpdateToOneWithWhereWithoutLessonProgressInput, CourseProgressUpdateWithoutLessonProgressInput>, CourseProgressUncheckedUpdateWithoutLessonProgressInput>
  }

  export type LessonUpdateOneWithoutLessonProgressNestedInput = {
    create?: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>
    connectOrCreate?: LessonCreateOrConnectWithoutLessonProgressInput
    upsert?: LessonUpsertWithoutLessonProgressInput
    disconnect?: boolean
    delete?: LessonWhereInput | boolean
    connect?: LessonWhereUniqueInput
    update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutLessonProgressInput, LessonUpdateWithoutLessonProgressInput>, LessonUncheckedUpdateWithoutLessonProgressInput>
  }

  export type UserUpdateOneWithoutLessonProgressNestedInput = {
    create?: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutLessonProgressInput
    upsert?: UserUpsertWithoutLessonProgressInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLessonProgressInput, UserUpdateWithoutLessonProgressInput>, UserUncheckedUpdateWithoutLessonProgressInput>
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type CourseCreatetagsInput = {
    set: string[]
  }

  export type CourseCreateorderInput = {
    set: string[]
  }

  export type LessonCreateNestedManyWithoutCourseInput = {
    create?: XOR<LessonCreateWithoutCourseInput, LessonUncheckedCreateWithoutCourseInput> | LessonCreateWithoutCourseInput[] | LessonUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutCourseInput | LessonCreateOrConnectWithoutCourseInput[]
    createMany?: LessonCreateManyCourseInputEnvelope
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
  }

  export type CourseProgressCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseProgressCreateWithoutCourseInput, CourseProgressUncheckedCreateWithoutCourseInput> | CourseProgressCreateWithoutCourseInput[] | CourseProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutCourseInput | CourseProgressCreateOrConnectWithoutCourseInput[]
    createMany?: CourseProgressCreateManyCourseInputEnvelope
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
  }

  export type LessonUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<LessonCreateWithoutCourseInput, LessonUncheckedCreateWithoutCourseInput> | LessonCreateWithoutCourseInput[] | LessonUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutCourseInput | LessonCreateOrConnectWithoutCourseInput[]
    createMany?: LessonCreateManyCourseInputEnvelope
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
  }

  export type CourseProgressUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseProgressCreateWithoutCourseInput, CourseProgressUncheckedCreateWithoutCourseInput> | CourseProgressCreateWithoutCourseInput[] | CourseProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutCourseInput | CourseProgressCreateOrConnectWithoutCourseInput[]
    createMany?: CourseProgressCreateManyCourseInputEnvelope
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
  }

  export type CourseUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CourseUpdateorderInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type LessonUpdateManyWithoutCourseNestedInput = {
    create?: XOR<LessonCreateWithoutCourseInput, LessonUncheckedCreateWithoutCourseInput> | LessonCreateWithoutCourseInput[] | LessonUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutCourseInput | LessonCreateOrConnectWithoutCourseInput[]
    upsert?: LessonUpsertWithWhereUniqueWithoutCourseInput | LessonUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: LessonCreateManyCourseInputEnvelope
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    update?: LessonUpdateWithWhereUniqueWithoutCourseInput | LessonUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: LessonUpdateManyWithWhereWithoutCourseInput | LessonUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[]
  }

  export type CourseProgressUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseProgressCreateWithoutCourseInput, CourseProgressUncheckedCreateWithoutCourseInput> | CourseProgressCreateWithoutCourseInput[] | CourseProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutCourseInput | CourseProgressCreateOrConnectWithoutCourseInput[]
    upsert?: CourseProgressUpsertWithWhereUniqueWithoutCourseInput | CourseProgressUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseProgressCreateManyCourseInputEnvelope
    set?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    disconnect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    delete?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    update?: CourseProgressUpdateWithWhereUniqueWithoutCourseInput | CourseProgressUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseProgressUpdateManyWithWhereWithoutCourseInput | CourseProgressUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseProgressScalarWhereInput | CourseProgressScalarWhereInput[]
  }

  export type LessonUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<LessonCreateWithoutCourseInput, LessonUncheckedCreateWithoutCourseInput> | LessonCreateWithoutCourseInput[] | LessonUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutCourseInput | LessonCreateOrConnectWithoutCourseInput[]
    upsert?: LessonUpsertWithWhereUniqueWithoutCourseInput | LessonUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: LessonCreateManyCourseInputEnvelope
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    update?: LessonUpdateWithWhereUniqueWithoutCourseInput | LessonUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: LessonUpdateManyWithWhereWithoutCourseInput | LessonUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[]
  }

  export type CourseProgressUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseProgressCreateWithoutCourseInput, CourseProgressUncheckedCreateWithoutCourseInput> | CourseProgressCreateWithoutCourseInput[] | CourseProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseProgressCreateOrConnectWithoutCourseInput | CourseProgressCreateOrConnectWithoutCourseInput[]
    upsert?: CourseProgressUpsertWithWhereUniqueWithoutCourseInput | CourseProgressUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseProgressCreateManyCourseInputEnvelope
    set?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    disconnect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    delete?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    connect?: CourseProgressWhereUniqueInput | CourseProgressWhereUniqueInput[]
    update?: CourseProgressUpdateWithWhereUniqueWithoutCourseInput | CourseProgressUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseProgressUpdateManyWithWhereWithoutCourseInput | CourseProgressUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseProgressScalarWhereInput | CourseProgressScalarWhereInput[]
  }

  export type CourseTrackCreatecourseSlugsInput = {
    set: string[]
  }

  export type CourseTrackEnrollmentCreateNestedManyWithoutTrackInput = {
    create?: XOR<CourseTrackEnrollmentCreateWithoutTrackInput, CourseTrackEnrollmentUncheckedCreateWithoutTrackInput> | CourseTrackEnrollmentCreateWithoutTrackInput[] | CourseTrackEnrollmentUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: CourseTrackEnrollmentCreateOrConnectWithoutTrackInput | CourseTrackEnrollmentCreateOrConnectWithoutTrackInput[]
    createMany?: CourseTrackEnrollmentCreateManyTrackInputEnvelope
    connect?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
  }

  export type CourseTrackEnrollmentUncheckedCreateNestedManyWithoutTrackInput = {
    create?: XOR<CourseTrackEnrollmentCreateWithoutTrackInput, CourseTrackEnrollmentUncheckedCreateWithoutTrackInput> | CourseTrackEnrollmentCreateWithoutTrackInput[] | CourseTrackEnrollmentUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: CourseTrackEnrollmentCreateOrConnectWithoutTrackInput | CourseTrackEnrollmentCreateOrConnectWithoutTrackInput[]
    createMany?: CourseTrackEnrollmentCreateManyTrackInputEnvelope
    connect?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
  }

  export type CourseTrackUpdatecourseSlugsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CourseTrackEnrollmentUpdateManyWithoutTrackNestedInput = {
    create?: XOR<CourseTrackEnrollmentCreateWithoutTrackInput, CourseTrackEnrollmentUncheckedCreateWithoutTrackInput> | CourseTrackEnrollmentCreateWithoutTrackInput[] | CourseTrackEnrollmentUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: CourseTrackEnrollmentCreateOrConnectWithoutTrackInput | CourseTrackEnrollmentCreateOrConnectWithoutTrackInput[]
    upsert?: CourseTrackEnrollmentUpsertWithWhereUniqueWithoutTrackInput | CourseTrackEnrollmentUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: CourseTrackEnrollmentCreateManyTrackInputEnvelope
    set?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    disconnect?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    delete?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    connect?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    update?: CourseTrackEnrollmentUpdateWithWhereUniqueWithoutTrackInput | CourseTrackEnrollmentUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: CourseTrackEnrollmentUpdateManyWithWhereWithoutTrackInput | CourseTrackEnrollmentUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: CourseTrackEnrollmentScalarWhereInput | CourseTrackEnrollmentScalarWhereInput[]
  }

  export type CourseTrackEnrollmentUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: XOR<CourseTrackEnrollmentCreateWithoutTrackInput, CourseTrackEnrollmentUncheckedCreateWithoutTrackInput> | CourseTrackEnrollmentCreateWithoutTrackInput[] | CourseTrackEnrollmentUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: CourseTrackEnrollmentCreateOrConnectWithoutTrackInput | CourseTrackEnrollmentCreateOrConnectWithoutTrackInput[]
    upsert?: CourseTrackEnrollmentUpsertWithWhereUniqueWithoutTrackInput | CourseTrackEnrollmentUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: CourseTrackEnrollmentCreateManyTrackInputEnvelope
    set?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    disconnect?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    delete?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    connect?: CourseTrackEnrollmentWhereUniqueInput | CourseTrackEnrollmentWhereUniqueInput[]
    update?: CourseTrackEnrollmentUpdateWithWhereUniqueWithoutTrackInput | CourseTrackEnrollmentUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: CourseTrackEnrollmentUpdateManyWithWhereWithoutTrackInput | CourseTrackEnrollmentUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: CourseTrackEnrollmentScalarWhereInput | CourseTrackEnrollmentScalarWhereInput[]
  }

  export type CourseTrackCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<CourseTrackCreateWithoutEnrollmentsInput, CourseTrackUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseTrackCreateOrConnectWithoutEnrollmentsInput
    connect?: CourseTrackWhereUniqueInput
  }

  export type CourseTrackUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<CourseTrackCreateWithoutEnrollmentsInput, CourseTrackUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseTrackCreateOrConnectWithoutEnrollmentsInput
    upsert?: CourseTrackUpsertWithoutEnrollmentsInput
    connect?: CourseTrackWhereUniqueInput
    update?: XOR<XOR<CourseTrackUpdateToOneWithWhereWithoutEnrollmentsInput, CourseTrackUpdateWithoutEnrollmentsInput>, CourseTrackUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type LessonCreateNestedOneWithoutExercisesInput = {
    create?: XOR<LessonCreateWithoutExercisesInput, LessonUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: LessonCreateOrConnectWithoutExercisesInput
    connect?: LessonWhereUniqueInput
  }

  export type LessonUpdateOneWithoutExercisesNestedInput = {
    create?: XOR<LessonCreateWithoutExercisesInput, LessonUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: LessonCreateOrConnectWithoutExercisesInput
    upsert?: LessonUpsertWithoutExercisesInput
    disconnect?: boolean
    delete?: LessonWhereInput | boolean
    connect?: LessonWhereUniqueInput
    update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutExercisesInput, LessonUpdateWithoutExercisesInput>, LessonUncheckedUpdateWithoutExercisesInput>
  }

  export type ExerciseCreateNestedManyWithoutLessonInput = {
    create?: XOR<ExerciseCreateWithoutLessonInput, ExerciseUncheckedCreateWithoutLessonInput> | ExerciseCreateWithoutLessonInput[] | ExerciseUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutLessonInput | ExerciseCreateOrConnectWithoutLessonInput[]
    createMany?: ExerciseCreateManyLessonInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type CourseCreateNestedOneWithoutLessonsInput = {
    create?: XOR<CourseCreateWithoutLessonsInput, CourseUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutLessonsInput
    connect?: CourseWhereUniqueInput
  }

  export type LessonProgressCreateNestedManyWithoutLessonInput = {
    create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[]
    createMany?: LessonProgressCreateManyLessonInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutLessonInput = {
    create?: XOR<ExerciseCreateWithoutLessonInput, ExerciseUncheckedCreateWithoutLessonInput> | ExerciseCreateWithoutLessonInput[] | ExerciseUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutLessonInput | ExerciseCreateOrConnectWithoutLessonInput[]
    createMany?: ExerciseCreateManyLessonInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type LessonProgressUncheckedCreateNestedManyWithoutLessonInput = {
    create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[]
    createMany?: LessonProgressCreateManyLessonInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type ExerciseUpdateManyWithoutLessonNestedInput = {
    create?: XOR<ExerciseCreateWithoutLessonInput, ExerciseUncheckedCreateWithoutLessonInput> | ExerciseCreateWithoutLessonInput[] | ExerciseUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutLessonInput | ExerciseCreateOrConnectWithoutLessonInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutLessonInput | ExerciseUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: ExerciseCreateManyLessonInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutLessonInput | ExerciseUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutLessonInput | ExerciseUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type CourseUpdateOneRequiredWithoutLessonsNestedInput = {
    create?: XOR<CourseCreateWithoutLessonsInput, CourseUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutLessonsInput
    upsert?: CourseUpsertWithoutLessonsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutLessonsInput, CourseUpdateWithoutLessonsInput>, CourseUncheckedUpdateWithoutLessonsInput>
  }

  export type LessonProgressUpdateManyWithoutLessonNestedInput = {
    create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutLessonInput | LessonProgressUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: LessonProgressCreateManyLessonInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutLessonInput | LessonProgressUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutLessonInput | LessonProgressUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: XOR<ExerciseCreateWithoutLessonInput, ExerciseUncheckedCreateWithoutLessonInput> | ExerciseCreateWithoutLessonInput[] | ExerciseUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutLessonInput | ExerciseCreateOrConnectWithoutLessonInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutLessonInput | ExerciseUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: ExerciseCreateManyLessonInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutLessonInput | ExerciseUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutLessonInput | ExerciseUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type LessonProgressUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutLessonInput | LessonProgressUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: LessonProgressCreateManyLessonInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutLessonInput | LessonProgressUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutLessonInput | LessonProgressUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type UserBadgeCreateNestedManyWithoutBadgeInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type UserBadgeUncheckedCreateNestedManyWithoutBadgeInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type UserBadgeUpdateManyWithoutBadgeNestedInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutBadgeInput | UserBadgeUpsertWithWhereUniqueWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutBadgeInput | UserBadgeUpdateWithWhereUniqueWithoutBadgeInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutBadgeInput | UserBadgeUpdateManyWithWhereWithoutBadgeInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type UserBadgeUncheckedUpdateManyWithoutBadgeNestedInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutBadgeInput | UserBadgeUpsertWithWhereUniqueWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutBadgeInput | UserBadgeUpdateWithWhereUniqueWithoutBadgeInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutBadgeInput | UserBadgeUpdateManyWithWhereWithoutBadgeInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBadgesInput = {
    create?: XOR<UserCreateWithoutBadgesInput, UserUncheckedCreateWithoutBadgesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBadgesInput
    connect?: UserWhereUniqueInput
  }

  export type BadgeCreateNestedOneWithoutUsersInput = {
    create?: XOR<BadgeCreateWithoutUsersInput, BadgeUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BadgeCreateOrConnectWithoutUsersInput
    connect?: BadgeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBadgesNestedInput = {
    create?: XOR<UserCreateWithoutBadgesInput, UserUncheckedCreateWithoutBadgesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBadgesInput
    upsert?: UserUpsertWithoutBadgesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBadgesInput, UserUpdateWithoutBadgesInput>, UserUncheckedUpdateWithoutBadgesInput>
  }

  export type BadgeUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<BadgeCreateWithoutUsersInput, BadgeUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BadgeCreateOrConnectWithoutUsersInput
    upsert?: BadgeUpsertWithoutUsersInput
    connect?: BadgeWhereUniqueInput
    update?: XOR<XOR<BadgeUpdateToOneWithWhereWithoutUsersInput, BadgeUpdateWithoutUsersInput>, BadgeUncheckedUpdateWithoutUsersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type MessageCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutUserInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageCreateManyUserInputEnvelope = {
    data: MessageCreateManyUserInput | MessageCreateManyUserInput[]
  }

  export type CourseProgressCreateWithoutUserInput = {
    id?: string
    completed?: boolean | null
    Course?: CourseCreateNestedOneWithoutCourseProgressInput
    lessonProgress?: LessonProgressCreateNestedManyWithoutCourseProgressInput
  }

  export type CourseProgressUncheckedCreateWithoutUserInput = {
    id?: string
    completed?: boolean | null
    courseSlug: string
    lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutCourseProgressInput
  }

  export type CourseProgressCreateOrConnectWithoutUserInput = {
    where: CourseProgressWhereUniqueInput
    create: XOR<CourseProgressCreateWithoutUserInput, CourseProgressUncheckedCreateWithoutUserInput>
  }

  export type CourseProgressCreateManyUserInputEnvelope = {
    data: CourseProgressCreateManyUserInput | CourseProgressCreateManyUserInput[]
  }

  export type LessonProgressCreateWithoutUserInput = {
    id?: string
    completed?: boolean | null
    CourseProgress?: CourseProgressCreateNestedOneWithoutLessonProgressInput
    Lesson?: LessonCreateNestedOneWithoutLessonProgressInput
  }

  export type LessonProgressUncheckedCreateWithoutUserInput = {
    id?: string
    completed?: boolean | null
    lessonSlug: string
    courseProgressId?: string | null
  }

  export type LessonProgressCreateOrConnectWithoutUserInput = {
    where: LessonProgressWhereUniqueInput
    create: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput>
  }

  export type LessonProgressCreateManyUserInputEnvelope = {
    data: LessonProgressCreateManyUserInput | LessonProgressCreateManyUserInput[]
  }

  export type UserBadgeCreateWithoutUserInput = {
    id?: string
    earnedAt?: Date | string
    Badge: BadgeCreateNestedOneWithoutUsersInput
  }

  export type UserBadgeUncheckedCreateWithoutUserInput = {
    id?: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type UserBadgeCreateOrConnectWithoutUserInput = {
    where: UserBadgeWhereUniqueInput
    create: XOR<UserBadgeCreateWithoutUserInput, UserBadgeUncheckedCreateWithoutUserInput>
  }

  export type UserBadgeCreateManyUserInputEnvelope = {
    data: UserBadgeCreateManyUserInput | UserBadgeCreateManyUserInput[]
  }

  export type MessageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
  }

  export type MessageUpdateManyWithWhereWithoutUserInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    title?: StringFilter<"Message"> | string
    description?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    userId?: StringNullableFilter<"Message"> | string | null
  }

  export type CourseProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: CourseProgressWhereUniqueInput
    update: XOR<CourseProgressUpdateWithoutUserInput, CourseProgressUncheckedUpdateWithoutUserInput>
    create: XOR<CourseProgressCreateWithoutUserInput, CourseProgressUncheckedCreateWithoutUserInput>
  }

  export type CourseProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: CourseProgressWhereUniqueInput
    data: XOR<CourseProgressUpdateWithoutUserInput, CourseProgressUncheckedUpdateWithoutUserInput>
  }

  export type CourseProgressUpdateManyWithWhereWithoutUserInput = {
    where: CourseProgressScalarWhereInput
    data: XOR<CourseProgressUpdateManyMutationInput, CourseProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type CourseProgressScalarWhereInput = {
    AND?: CourseProgressScalarWhereInput | CourseProgressScalarWhereInput[]
    OR?: CourseProgressScalarWhereInput[]
    NOT?: CourseProgressScalarWhereInput | CourseProgressScalarWhereInput[]
    id?: StringFilter<"CourseProgress"> | string
    userId?: StringNullableFilter<"CourseProgress"> | string | null
    completed?: BoolNullableFilter<"CourseProgress"> | boolean | null
    courseSlug?: StringFilter<"CourseProgress"> | string
  }

  export type LessonProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: LessonProgressWhereUniqueInput
    update: XOR<LessonProgressUpdateWithoutUserInput, LessonProgressUncheckedUpdateWithoutUserInput>
    create: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput>
  }

  export type LessonProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: LessonProgressWhereUniqueInput
    data: XOR<LessonProgressUpdateWithoutUserInput, LessonProgressUncheckedUpdateWithoutUserInput>
  }

  export type LessonProgressUpdateManyWithWhereWithoutUserInput = {
    where: LessonProgressScalarWhereInput
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type LessonProgressScalarWhereInput = {
    AND?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
    OR?: LessonProgressScalarWhereInput[]
    NOT?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
    id?: StringFilter<"LessonProgress"> | string
    completed?: BoolNullableFilter<"LessonProgress"> | boolean | null
    lessonSlug?: StringFilter<"LessonProgress"> | string
    courseProgressId?: StringNullableFilter<"LessonProgress"> | string | null
    userId?: StringNullableFilter<"LessonProgress"> | string | null
  }

  export type UserBadgeUpsertWithWhereUniqueWithoutUserInput = {
    where: UserBadgeWhereUniqueInput
    update: XOR<UserBadgeUpdateWithoutUserInput, UserBadgeUncheckedUpdateWithoutUserInput>
    create: XOR<UserBadgeCreateWithoutUserInput, UserBadgeUncheckedCreateWithoutUserInput>
  }

  export type UserBadgeUpdateWithWhereUniqueWithoutUserInput = {
    where: UserBadgeWhereUniqueInput
    data: XOR<UserBadgeUpdateWithoutUserInput, UserBadgeUncheckedUpdateWithoutUserInput>
  }

  export type UserBadgeUpdateManyWithWhereWithoutUserInput = {
    where: UserBadgeScalarWhereInput
    data: XOR<UserBadgeUpdateManyMutationInput, UserBadgeUncheckedUpdateManyWithoutUserInput>
  }

  export type UserBadgeScalarWhereInput = {
    AND?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
    OR?: UserBadgeScalarWhereInput[]
    NOT?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
    id?: StringFilter<"UserBadge"> | string
    userId?: StringFilter<"UserBadge"> | string
    badgeId?: StringFilter<"UserBadge"> | string
    earnedAt?: DateTimeFilter<"UserBadge"> | Date | string
  }

  export type CourseCreateWithoutCourseProgressInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
    lessons?: LessonCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutCourseProgressInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
    lessons?: LessonUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutCourseProgressInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCourseProgressInput, CourseUncheckedCreateWithoutCourseProgressInput>
  }

  export type UserCreateWithoutCourseProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutUserInput
    badges?: UserBadgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCourseProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput
    badges?: UserBadgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCourseProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCourseProgressInput, UserUncheckedCreateWithoutCourseProgressInput>
  }

  export type LessonProgressCreateWithoutCourseProgressInput = {
    id?: string
    completed?: boolean | null
    Lesson?: LessonCreateNestedOneWithoutLessonProgressInput
    User?: UserCreateNestedOneWithoutLessonProgressInput
  }

  export type LessonProgressUncheckedCreateWithoutCourseProgressInput = {
    id?: string
    completed?: boolean | null
    lessonSlug: string
    userId?: string | null
  }

  export type LessonProgressCreateOrConnectWithoutCourseProgressInput = {
    where: LessonProgressWhereUniqueInput
    create: XOR<LessonProgressCreateWithoutCourseProgressInput, LessonProgressUncheckedCreateWithoutCourseProgressInput>
  }

  export type LessonProgressCreateManyCourseProgressInputEnvelope = {
    data: LessonProgressCreateManyCourseProgressInput | LessonProgressCreateManyCourseProgressInput[]
  }

  export type CourseUpsertWithoutCourseProgressInput = {
    update: XOR<CourseUpdateWithoutCourseProgressInput, CourseUncheckedUpdateWithoutCourseProgressInput>
    create: XOR<CourseCreateWithoutCourseProgressInput, CourseUncheckedCreateWithoutCourseProgressInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutCourseProgressInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutCourseProgressInput, CourseUncheckedUpdateWithoutCourseProgressInput>
  }

  export type CourseUpdateWithoutCourseProgressInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    lessons?: LessonUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutCourseProgressInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    lessons?: LessonUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserUpsertWithoutCourseProgressInput = {
    update: XOR<UserUpdateWithoutCourseProgressInput, UserUncheckedUpdateWithoutCourseProgressInput>
    create: XOR<UserCreateWithoutCourseProgressInput, UserUncheckedCreateWithoutCourseProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCourseProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCourseProgressInput, UserUncheckedUpdateWithoutCourseProgressInput>
  }

  export type UserUpdateWithoutCourseProgressInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCourseProgressInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LessonProgressUpsertWithWhereUniqueWithoutCourseProgressInput = {
    where: LessonProgressWhereUniqueInput
    update: XOR<LessonProgressUpdateWithoutCourseProgressInput, LessonProgressUncheckedUpdateWithoutCourseProgressInput>
    create: XOR<LessonProgressCreateWithoutCourseProgressInput, LessonProgressUncheckedCreateWithoutCourseProgressInput>
  }

  export type LessonProgressUpdateWithWhereUniqueWithoutCourseProgressInput = {
    where: LessonProgressWhereUniqueInput
    data: XOR<LessonProgressUpdateWithoutCourseProgressInput, LessonProgressUncheckedUpdateWithoutCourseProgressInput>
  }

  export type LessonProgressUpdateManyWithWhereWithoutCourseProgressInput = {
    where: LessonProgressScalarWhereInput
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutCourseProgressInput>
  }

  export type CourseProgressCreateWithoutLessonProgressInput = {
    id?: string
    completed?: boolean | null
    Course?: CourseCreateNestedOneWithoutCourseProgressInput
    User?: UserCreateNestedOneWithoutCourseProgressInput
  }

  export type CourseProgressUncheckedCreateWithoutLessonProgressInput = {
    id?: string
    userId?: string | null
    completed?: boolean | null
    courseSlug: string
  }

  export type CourseProgressCreateOrConnectWithoutLessonProgressInput = {
    where: CourseProgressWhereUniqueInput
    create: XOR<CourseProgressCreateWithoutLessonProgressInput, CourseProgressUncheckedCreateWithoutLessonProgressInput>
  }

  export type LessonCreateWithoutLessonProgressInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    completed?: boolean | null
    duration?: number | null
    exercises?: ExerciseCreateNestedManyWithoutLessonInput
    Course: CourseCreateNestedOneWithoutLessonsInput
  }

  export type LessonUncheckedCreateWithoutLessonProgressInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    courseSlug: string
    completed?: boolean | null
    duration?: number | null
    exercises?: ExerciseUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonCreateOrConnectWithoutLessonProgressInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>
  }

  export type UserCreateWithoutLessonProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageCreateNestedManyWithoutUserInput
    CourseProgress?: CourseProgressCreateNestedManyWithoutUserInput
    badges?: UserBadgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLessonProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    CourseProgress?: CourseProgressUncheckedCreateNestedManyWithoutUserInput
    badges?: UserBadgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLessonProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>
  }

  export type CourseProgressUpsertWithoutLessonProgressInput = {
    update: XOR<CourseProgressUpdateWithoutLessonProgressInput, CourseProgressUncheckedUpdateWithoutLessonProgressInput>
    create: XOR<CourseProgressCreateWithoutLessonProgressInput, CourseProgressUncheckedCreateWithoutLessonProgressInput>
    where?: CourseProgressWhereInput
  }

  export type CourseProgressUpdateToOneWithWhereWithoutLessonProgressInput = {
    where?: CourseProgressWhereInput
    data: XOR<CourseProgressUpdateWithoutLessonProgressInput, CourseProgressUncheckedUpdateWithoutLessonProgressInput>
  }

  export type CourseProgressUpdateWithoutLessonProgressInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Course?: CourseUpdateOneWithoutCourseProgressNestedInput
    User?: UserUpdateOneWithoutCourseProgressNestedInput
  }

  export type CourseProgressUncheckedUpdateWithoutLessonProgressInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseSlug?: StringFieldUpdateOperationsInput | string
  }

  export type LessonUpsertWithoutLessonProgressInput = {
    update: XOR<LessonUpdateWithoutLessonProgressInput, LessonUncheckedUpdateWithoutLessonProgressInput>
    create: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>
    where?: LessonWhereInput
  }

  export type LessonUpdateToOneWithWhereWithoutLessonProgressInput = {
    where?: LessonWhereInput
    data: XOR<LessonUpdateWithoutLessonProgressInput, LessonUncheckedUpdateWithoutLessonProgressInput>
  }

  export type LessonUpdateWithoutLessonProgressInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: ExerciseUpdateManyWithoutLessonNestedInput
    Course?: CourseUpdateOneRequiredWithoutLessonsNestedInput
  }

  export type LessonUncheckedUpdateWithoutLessonProgressInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    courseSlug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: ExerciseUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type UserUpsertWithoutLessonProgressInput = {
    update: XOR<UserUpdateWithoutLessonProgressInput, UserUncheckedUpdateWithoutLessonProgressInput>
    create: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLessonProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLessonProgressInput, UserUncheckedUpdateWithoutLessonProgressInput>
  }

  export type UserUpdateWithoutLessonProgressInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUpdateManyWithoutUserNestedInput
    CourseProgress?: CourseProgressUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLessonProgressInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    CourseProgress?: CourseProgressUncheckedUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    CourseProgress?: CourseProgressCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutUserInput
    badges?: UserBadgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    CourseProgress?: CourseProgressUncheckedCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput
    badges?: UserBadgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    CourseProgress?: CourseProgressUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    CourseProgress?: CourseProgressUncheckedUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput
    badges?: UserBadgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LessonCreateWithoutCourseInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    completed?: boolean | null
    duration?: number | null
    exercises?: ExerciseCreateNestedManyWithoutLessonInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateWithoutCourseInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    completed?: boolean | null
    duration?: number | null
    exercises?: ExerciseUncheckedCreateNestedManyWithoutLessonInput
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonCreateOrConnectWithoutCourseInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutCourseInput, LessonUncheckedCreateWithoutCourseInput>
  }

  export type LessonCreateManyCourseInputEnvelope = {
    data: LessonCreateManyCourseInput | LessonCreateManyCourseInput[]
  }

  export type CourseProgressCreateWithoutCourseInput = {
    id?: string
    completed?: boolean | null
    User?: UserCreateNestedOneWithoutCourseProgressInput
    lessonProgress?: LessonProgressCreateNestedManyWithoutCourseProgressInput
  }

  export type CourseProgressUncheckedCreateWithoutCourseInput = {
    id?: string
    userId?: string | null
    completed?: boolean | null
    lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutCourseProgressInput
  }

  export type CourseProgressCreateOrConnectWithoutCourseInput = {
    where: CourseProgressWhereUniqueInput
    create: XOR<CourseProgressCreateWithoutCourseInput, CourseProgressUncheckedCreateWithoutCourseInput>
  }

  export type CourseProgressCreateManyCourseInputEnvelope = {
    data: CourseProgressCreateManyCourseInput | CourseProgressCreateManyCourseInput[]
  }

  export type LessonUpsertWithWhereUniqueWithoutCourseInput = {
    where: LessonWhereUniqueInput
    update: XOR<LessonUpdateWithoutCourseInput, LessonUncheckedUpdateWithoutCourseInput>
    create: XOR<LessonCreateWithoutCourseInput, LessonUncheckedCreateWithoutCourseInput>
  }

  export type LessonUpdateWithWhereUniqueWithoutCourseInput = {
    where: LessonWhereUniqueInput
    data: XOR<LessonUpdateWithoutCourseInput, LessonUncheckedUpdateWithoutCourseInput>
  }

  export type LessonUpdateManyWithWhereWithoutCourseInput = {
    where: LessonScalarWhereInput
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyWithoutCourseInput>
  }

  export type LessonScalarWhereInput = {
    AND?: LessonScalarWhereInput | LessonScalarWhereInput[]
    OR?: LessonScalarWhereInput[]
    NOT?: LessonScalarWhereInput | LessonScalarWhereInput[]
    id?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    description?: StringFilter<"Lesson"> | string
    content?: StringNullableFilter<"Lesson"> | string | null
    slug?: StringFilter<"Lesson"> | string
    courseSlug?: StringFilter<"Lesson"> | string
    completed?: BoolNullableFilter<"Lesson"> | boolean | null
    duration?: IntNullableFilter<"Lesson"> | number | null
  }

  export type CourseProgressUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseProgressWhereUniqueInput
    update: XOR<CourseProgressUpdateWithoutCourseInput, CourseProgressUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseProgressCreateWithoutCourseInput, CourseProgressUncheckedCreateWithoutCourseInput>
  }

  export type CourseProgressUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseProgressWhereUniqueInput
    data: XOR<CourseProgressUpdateWithoutCourseInput, CourseProgressUncheckedUpdateWithoutCourseInput>
  }

  export type CourseProgressUpdateManyWithWhereWithoutCourseInput = {
    where: CourseProgressScalarWhereInput
    data: XOR<CourseProgressUpdateManyMutationInput, CourseProgressUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseTrackEnrollmentCreateWithoutTrackInput = {
    id?: string
    userId: string
    completed?: boolean
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CourseTrackEnrollmentUncheckedCreateWithoutTrackInput = {
    id?: string
    userId: string
    completed?: boolean
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CourseTrackEnrollmentCreateOrConnectWithoutTrackInput = {
    where: CourseTrackEnrollmentWhereUniqueInput
    create: XOR<CourseTrackEnrollmentCreateWithoutTrackInput, CourseTrackEnrollmentUncheckedCreateWithoutTrackInput>
  }

  export type CourseTrackEnrollmentCreateManyTrackInputEnvelope = {
    data: CourseTrackEnrollmentCreateManyTrackInput | CourseTrackEnrollmentCreateManyTrackInput[]
  }

  export type CourseTrackEnrollmentUpsertWithWhereUniqueWithoutTrackInput = {
    where: CourseTrackEnrollmentWhereUniqueInput
    update: XOR<CourseTrackEnrollmentUpdateWithoutTrackInput, CourseTrackEnrollmentUncheckedUpdateWithoutTrackInput>
    create: XOR<CourseTrackEnrollmentCreateWithoutTrackInput, CourseTrackEnrollmentUncheckedCreateWithoutTrackInput>
  }

  export type CourseTrackEnrollmentUpdateWithWhereUniqueWithoutTrackInput = {
    where: CourseTrackEnrollmentWhereUniqueInput
    data: XOR<CourseTrackEnrollmentUpdateWithoutTrackInput, CourseTrackEnrollmentUncheckedUpdateWithoutTrackInput>
  }

  export type CourseTrackEnrollmentUpdateManyWithWhereWithoutTrackInput = {
    where: CourseTrackEnrollmentScalarWhereInput
    data: XOR<CourseTrackEnrollmentUpdateManyMutationInput, CourseTrackEnrollmentUncheckedUpdateManyWithoutTrackInput>
  }

  export type CourseTrackEnrollmentScalarWhereInput = {
    AND?: CourseTrackEnrollmentScalarWhereInput | CourseTrackEnrollmentScalarWhereInput[]
    OR?: CourseTrackEnrollmentScalarWhereInput[]
    NOT?: CourseTrackEnrollmentScalarWhereInput | CourseTrackEnrollmentScalarWhereInput[]
    id?: StringFilter<"CourseTrackEnrollment"> | string
    userId?: StringFilter<"CourseTrackEnrollment"> | string
    trackSlug?: StringFilter<"CourseTrackEnrollment"> | string
    completed?: BoolFilter<"CourseTrackEnrollment"> | boolean
    startedAt?: DateTimeFilter<"CourseTrackEnrollment"> | Date | string
    completedAt?: DateTimeNullableFilter<"CourseTrackEnrollment"> | Date | string | null
  }

  export type CourseTrackCreateWithoutEnrollmentsInput = {
    id?: string
    title: string
    description: string
    slug: string
    courseSlugs?: CourseTrackCreatecourseSlugsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTrackUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    title: string
    description: string
    slug: string
    courseSlugs?: CourseTrackCreatecourseSlugsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTrackCreateOrConnectWithoutEnrollmentsInput = {
    where: CourseTrackWhereUniqueInput
    create: XOR<CourseTrackCreateWithoutEnrollmentsInput, CourseTrackUncheckedCreateWithoutEnrollmentsInput>
  }

  export type CourseTrackUpsertWithoutEnrollmentsInput = {
    update: XOR<CourseTrackUpdateWithoutEnrollmentsInput, CourseTrackUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<CourseTrackCreateWithoutEnrollmentsInput, CourseTrackUncheckedCreateWithoutEnrollmentsInput>
    where?: CourseTrackWhereInput
  }

  export type CourseTrackUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: CourseTrackWhereInput
    data: XOR<CourseTrackUpdateWithoutEnrollmentsInput, CourseTrackUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseTrackUpdateWithoutEnrollmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    courseSlugs?: CourseTrackUpdatecourseSlugsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTrackUncheckedUpdateWithoutEnrollmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    courseSlugs?: CourseTrackUpdatecourseSlugsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateWithoutExercisesInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    completed?: boolean | null
    duration?: number | null
    Course: CourseCreateNestedOneWithoutLessonsInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateWithoutExercisesInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    courseSlug: string
    completed?: boolean | null
    duration?: number | null
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonCreateOrConnectWithoutExercisesInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutExercisesInput, LessonUncheckedCreateWithoutExercisesInput>
  }

  export type LessonUpsertWithoutExercisesInput = {
    update: XOR<LessonUpdateWithoutExercisesInput, LessonUncheckedUpdateWithoutExercisesInput>
    create: XOR<LessonCreateWithoutExercisesInput, LessonUncheckedCreateWithoutExercisesInput>
    where?: LessonWhereInput
  }

  export type LessonUpdateToOneWithWhereWithoutExercisesInput = {
    where?: LessonWhereInput
    data: XOR<LessonUpdateWithoutExercisesInput, LessonUncheckedUpdateWithoutExercisesInput>
  }

  export type LessonUpdateWithoutExercisesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    Course?: CourseUpdateOneRequiredWithoutLessonsNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateWithoutExercisesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    courseSlug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type ExerciseCreateWithoutLessonInput = {
    id?: string
    question: string
    type: string
    options?: string | null
    correctAnswer: string
    hint?: string | null
  }

  export type ExerciseUncheckedCreateWithoutLessonInput = {
    id?: string
    question: string
    type: string
    options?: string | null
    correctAnswer: string
    hint?: string | null
  }

  export type ExerciseCreateOrConnectWithoutLessonInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutLessonInput, ExerciseUncheckedCreateWithoutLessonInput>
  }

  export type ExerciseCreateManyLessonInputEnvelope = {
    data: ExerciseCreateManyLessonInput | ExerciseCreateManyLessonInput[]
  }

  export type CourseCreateWithoutLessonsInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
    CourseProgress?: CourseProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutLessonsInput = {
    id?: string
    title: string
    description: string
    tags?: CourseCreatetagsInput | string[]
    slug: string
    progressional: boolean
    userId?: string | null
    order?: CourseCreateorderInput | string[]
    rating?: InputJsonValue | null
    duration?: number | null
    CourseProgress?: CourseProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutLessonsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutLessonsInput, CourseUncheckedCreateWithoutLessonsInput>
  }

  export type LessonProgressCreateWithoutLessonInput = {
    id?: string
    completed?: boolean | null
    CourseProgress?: CourseProgressCreateNestedOneWithoutLessonProgressInput
    User?: UserCreateNestedOneWithoutLessonProgressInput
  }

  export type LessonProgressUncheckedCreateWithoutLessonInput = {
    id?: string
    completed?: boolean | null
    courseProgressId?: string | null
    userId?: string | null
  }

  export type LessonProgressCreateOrConnectWithoutLessonInput = {
    where: LessonProgressWhereUniqueInput
    create: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput>
  }

  export type LessonProgressCreateManyLessonInputEnvelope = {
    data: LessonProgressCreateManyLessonInput | LessonProgressCreateManyLessonInput[]
  }

  export type ExerciseUpsertWithWhereUniqueWithoutLessonInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutLessonInput, ExerciseUncheckedUpdateWithoutLessonInput>
    create: XOR<ExerciseCreateWithoutLessonInput, ExerciseUncheckedCreateWithoutLessonInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutLessonInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutLessonInput, ExerciseUncheckedUpdateWithoutLessonInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutLessonInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutLessonInput>
  }

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    OR?: ExerciseScalarWhereInput[]
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    id?: StringFilter<"Exercise"> | string
    question?: StringFilter<"Exercise"> | string
    type?: StringFilter<"Exercise"> | string
    options?: StringNullableFilter<"Exercise"> | string | null
    correctAnswer?: StringFilter<"Exercise"> | string
    hint?: StringNullableFilter<"Exercise"> | string | null
    lessonSlug?: StringFilter<"Exercise"> | string
  }

  export type CourseUpsertWithoutLessonsInput = {
    update: XOR<CourseUpdateWithoutLessonsInput, CourseUncheckedUpdateWithoutLessonsInput>
    create: XOR<CourseCreateWithoutLessonsInput, CourseUncheckedCreateWithoutLessonsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutLessonsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutLessonsInput, CourseUncheckedUpdateWithoutLessonsInput>
  }

  export type CourseUpdateWithoutLessonsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    CourseProgress?: CourseProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutLessonsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: CourseUpdatetagsInput | string[]
    slug?: StringFieldUpdateOperationsInput | string
    progressional?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: CourseUpdateorderInput | string[]
    rating?: InputJsonValue | InputJsonValue | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    CourseProgress?: CourseProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type LessonProgressUpsertWithWhereUniqueWithoutLessonInput = {
    where: LessonProgressWhereUniqueInput
    update: XOR<LessonProgressUpdateWithoutLessonInput, LessonProgressUncheckedUpdateWithoutLessonInput>
    create: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput>
  }

  export type LessonProgressUpdateWithWhereUniqueWithoutLessonInput = {
    where: LessonProgressWhereUniqueInput
    data: XOR<LessonProgressUpdateWithoutLessonInput, LessonProgressUncheckedUpdateWithoutLessonInput>
  }

  export type LessonProgressUpdateManyWithWhereWithoutLessonInput = {
    where: LessonProgressScalarWhereInput
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutLessonInput>
  }

  export type UserBadgeCreateWithoutBadgeInput = {
    id?: string
    earnedAt?: Date | string
    User: UserCreateNestedOneWithoutBadgesInput
  }

  export type UserBadgeUncheckedCreateWithoutBadgeInput = {
    id?: string
    userId: string
    earnedAt?: Date | string
  }

  export type UserBadgeCreateOrConnectWithoutBadgeInput = {
    where: UserBadgeWhereUniqueInput
    create: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput>
  }

  export type UserBadgeCreateManyBadgeInputEnvelope = {
    data: UserBadgeCreateManyBadgeInput | UserBadgeCreateManyBadgeInput[]
  }

  export type UserBadgeUpsertWithWhereUniqueWithoutBadgeInput = {
    where: UserBadgeWhereUniqueInput
    update: XOR<UserBadgeUpdateWithoutBadgeInput, UserBadgeUncheckedUpdateWithoutBadgeInput>
    create: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput>
  }

  export type UserBadgeUpdateWithWhereUniqueWithoutBadgeInput = {
    where: UserBadgeWhereUniqueInput
    data: XOR<UserBadgeUpdateWithoutBadgeInput, UserBadgeUncheckedUpdateWithoutBadgeInput>
  }

  export type UserBadgeUpdateManyWithWhereWithoutBadgeInput = {
    where: UserBadgeScalarWhereInput
    data: XOR<UserBadgeUpdateManyMutationInput, UserBadgeUncheckedUpdateManyWithoutBadgeInput>
  }

  export type UserCreateWithoutBadgesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageCreateNestedManyWithoutUserInput
    CourseProgress?: CourseProgressCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBadgesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionToken?: string | null
    thejoey?: boolean | null
    username?: string | null
    bio?: string | null
    website?: string | null
    twitter?: string | null
    github?: string | null
    linkedin?: string | null
    isProfileVerified?: boolean
    profileImage?: string | null
    currentStreak?: number
    longestStreak?: number
    lastActivityDate?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    CourseProgress?: CourseProgressUncheckedCreateNestedManyWithoutUserInput
    LessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBadgesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBadgesInput, UserUncheckedCreateWithoutBadgesInput>
  }

  export type BadgeCreateWithoutUsersInput = {
    id?: string
    name: string
    description: string
    icon: string
    criteria: InputJsonValue
    createdAt?: Date | string
  }

  export type BadgeUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description: string
    icon: string
    criteria: InputJsonValue
    createdAt?: Date | string
  }

  export type BadgeCreateOrConnectWithoutUsersInput = {
    where: BadgeWhereUniqueInput
    create: XOR<BadgeCreateWithoutUsersInput, BadgeUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutBadgesInput = {
    update: XOR<UserUpdateWithoutBadgesInput, UserUncheckedUpdateWithoutBadgesInput>
    create: XOR<UserCreateWithoutBadgesInput, UserUncheckedCreateWithoutBadgesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBadgesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBadgesInput, UserUncheckedUpdateWithoutBadgesInput>
  }

  export type UserUpdateWithoutBadgesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUpdateManyWithoutUserNestedInput
    CourseProgress?: CourseProgressUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBadgesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionToken?: NullableStringFieldUpdateOperationsInput | string | null
    thejoey?: NullableBoolFieldUpdateOperationsInput | boolean | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileVerified?: BoolFieldUpdateOperationsInput | boolean
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    CourseProgress?: CourseProgressUncheckedUpdateManyWithoutUserNestedInput
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BadgeUpsertWithoutUsersInput = {
    update: XOR<BadgeUpdateWithoutUsersInput, BadgeUncheckedUpdateWithoutUsersInput>
    create: XOR<BadgeCreateWithoutUsersInput, BadgeUncheckedCreateWithoutUsersInput>
    where?: BadgeWhereInput
  }

  export type BadgeUpdateToOneWithWhereWithoutUsersInput = {
    where?: BadgeWhereInput
    data: XOR<BadgeUpdateWithoutUsersInput, BadgeUncheckedUpdateWithoutUsersInput>
  }

  export type BadgeUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    criteria?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeUncheckedUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    criteria?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyUserInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
  }

  export type CourseProgressCreateManyUserInput = {
    id?: string
    completed?: boolean | null
    courseSlug: string
  }

  export type LessonProgressCreateManyUserInput = {
    id?: string
    completed?: boolean | null
    lessonSlug: string
    courseProgressId?: string | null
  }

  export type UserBadgeCreateManyUserInput = {
    id?: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type MessageUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseProgressUpdateWithoutUserInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Course?: CourseUpdateOneWithoutCourseProgressNestedInput
    lessonProgress?: LessonProgressUpdateManyWithoutCourseProgressNestedInput
  }

  export type CourseProgressUncheckedUpdateWithoutUserInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseSlug?: StringFieldUpdateOperationsInput | string
    lessonProgress?: LessonProgressUncheckedUpdateManyWithoutCourseProgressNestedInput
  }

  export type CourseProgressUncheckedUpdateManyWithoutUserInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseSlug?: StringFieldUpdateOperationsInput | string
  }

  export type LessonProgressUpdateWithoutUserInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    CourseProgress?: CourseProgressUpdateOneWithoutLessonProgressNestedInput
    Lesson?: LessonUpdateOneWithoutLessonProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateWithoutUserInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
    courseProgressId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUncheckedUpdateManyWithoutUserInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
    courseProgressId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserBadgeUpdateWithoutUserInput = {
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Badge?: BadgeUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserBadgeUncheckedUpdateWithoutUserInput = {
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUncheckedUpdateManyWithoutUserInput = {
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonProgressCreateManyCourseProgressInput = {
    id?: string
    completed?: boolean | null
    lessonSlug: string
    userId?: string | null
  }

  export type LessonProgressUpdateWithoutCourseProgressInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Lesson?: LessonUpdateOneWithoutLessonProgressNestedInput
    User?: UserUpdateOneWithoutLessonProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateWithoutCourseProgressInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUncheckedUpdateManyWithoutCourseProgressInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonSlug?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonCreateManyCourseInput = {
    id?: string
    title: string
    description: string
    content?: string | null
    slug: string
    completed?: boolean | null
    duration?: number | null
  }

  export type CourseProgressCreateManyCourseInput = {
    id?: string
    userId?: string | null
    completed?: boolean | null
  }

  export type LessonUpdateWithoutCourseInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: ExerciseUpdateManyWithoutLessonNestedInput
    LessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateWithoutCourseInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: ExerciseUncheckedUpdateManyWithoutLessonNestedInput
    LessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateManyWithoutCourseInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseProgressUpdateWithoutCourseInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    User?: UserUpdateOneWithoutCourseProgressNestedInput
    lessonProgress?: LessonProgressUpdateManyWithoutCourseProgressNestedInput
  }

  export type CourseProgressUncheckedUpdateWithoutCourseInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    lessonProgress?: LessonProgressUncheckedUpdateManyWithoutCourseProgressNestedInput
  }

  export type CourseProgressUncheckedUpdateManyWithoutCourseInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type CourseTrackEnrollmentCreateManyTrackInput = {
    id?: string
    userId: string
    completed?: boolean
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CourseTrackEnrollmentUpdateWithoutTrackInput = {
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseTrackEnrollmentUncheckedUpdateWithoutTrackInput = {
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseTrackEnrollmentUncheckedUpdateManyWithoutTrackInput = {
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExerciseCreateManyLessonInput = {
    id?: string
    question: string
    type: string
    options?: string | null
    correctAnswer: string
    hint?: string | null
  }

  export type LessonProgressCreateManyLessonInput = {
    id?: string
    completed?: boolean | null
    courseProgressId?: string | null
    userId?: string | null
  }

  export type ExerciseUpdateWithoutLessonInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciseUncheckedUpdateWithoutLessonInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciseUncheckedUpdateManyWithoutLessonInput = {
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctAnswer?: StringFieldUpdateOperationsInput | string
    hint?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUpdateWithoutLessonInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    CourseProgress?: CourseProgressUpdateOneWithoutLessonProgressNestedInput
    User?: UserUpdateOneWithoutLessonProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateWithoutLessonInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseProgressId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUncheckedUpdateManyWithoutLessonInput = {
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    courseProgressId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserBadgeCreateManyBadgeInput = {
    id?: string
    userId: string
    earnedAt?: Date | string
  }

  export type UserBadgeUpdateWithoutBadgeInput = {
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutBadgesNestedInput
  }

  export type UserBadgeUncheckedUpdateWithoutBadgeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUncheckedUpdateManyWithoutBadgeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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