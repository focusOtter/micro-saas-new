# Fullstack MicroSaaS: Customer Solutions Notes

This is picking up from the [main architecture notes](./main-architecture.md).

As mentioned at the end of that section, this project will forgoe the use of managing customer subscriptions via webhooks, and instead use the Stripe API directly via the [`use-stripe-subscription`](https://github.com/clerkinc/use-stripe-subscription) package offered by Clerk.

To accomplish this, I'll update my [original `postConfirmation trigger`](https://github.com/focusOtter/microsaas-backend/blob/main/lib/functions/addUserPostConfirmation/main.ts) to also create a Stripe customer.

I convention I use is to create a `lib/functions` folder and put all of my functions there. So:`lib/functions/addUserPostConfirmation/construct.ts`.

I copied over the files and installed the dependencies. In my previous repo, I had a [`prospective` value.](https://github.com/focusOtter/microsaas-backend/blob/main/lib/functions/addUserPostConfirmation/main.ts#L19). I won't be needing that anymore since my customers will be managed purely by stripe. However, in this file, I will need to create the customer. I'll add the following:
