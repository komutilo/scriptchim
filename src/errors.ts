class InvalidTypeError extends Error {
  /**
  * An error to be raised when a property has an invalid type.
  *
  * @param {string} name The name of the property.
  * @param {any} value The invalid value.
  * @param {string} typeName The name of the valid type.
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name: string, value: any, typeName: string) {
    const msg = `type of ${name} "${typeof value}" is not a valid type. Should be of type ${typeName}.`;
    super(msg);
  }
}

export { InvalidTypeError };
