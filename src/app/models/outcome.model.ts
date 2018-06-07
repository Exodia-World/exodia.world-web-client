export enum OutcomeType {
  Success,
  Failure
}

/**
 * Contain the type, data, and message of an action's outcome.
 */
export class Outcome {
  constructor(
    private type: OutcomeType,
    private data: any = {},
    private message: string = '',
  ) {
  }

  getType(): OutcomeType {
    return this.type;
  }

  getMessage(): string {
    return this.message;
  }

  getData(): any {
    return this.data;
  }
}
