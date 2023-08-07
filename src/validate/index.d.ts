import { AnyObject, ArraySchema, Maybe } from 'yup';
declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    regexMatch(message: string): StringSchema<TType, TContext>;
    checkLength(message: string): StringSchema<TType, TContext>;
    checkEmpty(message: string): StringSchema<TType, TContext>;
    typeError(message: string): StringSchema<TType, TContext>;
  }

  interface ArraySchema<
    TType extends Array<any> = Array<any>,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    typeError(message: string): ArraySchema<TType, TContext>;
  }
}
