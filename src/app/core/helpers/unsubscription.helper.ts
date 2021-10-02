import {Subscription} from 'rxjs';

export class UnsubscriptionHelper {
  static unsubscribeAll(...subscriptions: Subscription[]): void {
    subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
