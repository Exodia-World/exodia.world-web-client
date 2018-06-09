import { Injectable } from '@angular/core';
import { messages } from '../constants/message.constant';
import { Outcome, OutcomeType } from '../models/outcome.model';

/**
 * Abstracts the usage of Outcome class.
 */
@Injectable()
export class OutcomeService {
  /**
   * Create a successful outcome.
   *
   * @param {string} msgName Success' name
   * @param {any} data The data to be included in outcome
   * @returns Outcome
   */
  succeed(msgName: string, data: any = null): Outcome {
    return new Outcome(OutcomeType.Success, data, this.getMessage(msgName));
  }

  /**
   * Create an unsuccessful outcome.
   *
   * @param {string} msgName Failure's name
   * @param {any} data The data to be included in outcome
   * @returns Outcome
   */
  fail(msgName: string, data: any = null): Outcome {
    console.log(msgName, data);
    return new Outcome(OutcomeType.Failure, data, this.getMessage(msgName));
  }

  /**
   * Retrieve a message based on its name.
   *
   * @param {string} msgName Success/Failure's name
   * @returns Message text
   */
  getMessage(msgName: string): string {
    return messages[msgName] ? messages[msgName] : messages.UnknownProblem;
  }
}
