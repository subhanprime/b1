/* eslint-disable @typescript-eslint/comma-dangle */
import { SUBSCRIPTIONS } from "../models/index";

const SubscriptionRepository = {
  addSubscription: (body: Object) => SUBSCRIPTIONS.create(body),
};

export default SubscriptionRepository;
