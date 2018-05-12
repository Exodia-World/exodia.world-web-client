export enum OutcomeType {
  Success,
  Failure
}

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
