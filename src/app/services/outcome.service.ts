import { Injectable } from '@angular/core';
import { errors } from '../constants/error.constant';
import { Outcome, OutcomeType } from '../models/outcome.model';

@Injectable()
export class OutcomeService {
  succeed(data: any = null, msg: string = ''): Outcome {
    return new Outcome(OutcomeType.Success, data, msg);
  }

  fail(errName: string, data: any = null): Outcome {
    console.log(errName, data);
    return new Outcome(OutcomeType.Failure, data, this.getErrMsg(errName));
  }

  getErrMsg(errName: string): string {
    return errors[errName] ? errors[errName] : errors.Unknown;
  }
}
