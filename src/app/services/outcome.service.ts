import { Injectable } from '@angular/core';
import { errors } from '../constants/error.constant';
import { Outcome, OutcomeType } from '../models/outcome.model';

/**
 * Abstracts the usage of Outcome class.
 */
@Injectable()
export class OutcomeService {
  /**
   * Create a successful outcome.
   *
   * @param {any} data The data to be included in outcome
   * @param {string} msg Message to be shown to users
   * @returns Outcome
   */
  succeed(data: any = null, msg: string = ''): Outcome {
    return new Outcome(OutcomeType.Success, data, msg);
  }

  /**
   * Create an unsuccessful outcome.
   *
   * @param {string} errName Error/Failure's name
   * @param {any} data The data to be included in outcome
   * @returns Outcome
   */
  fail(errName: string, data: any = null): Outcome {
    console.log(errName, data);
    return new Outcome(OutcomeType.Failure, data, this.getErrMsg(errName));
  }

  /**
   * Retrieve an error message based on its name.
   *
   * @param {string} errName Error/Failure's name
   * @returns Error message
   */
  getErrMsg(errName: string): string {
    return errors[errName] ? errors[errName] : errors.Unknown;
  }
}
