import { format } from 'date-fns';

import { Currency } from '&shared/enum/Currency';

export class ConversationFailedException extends Error {
  public constructor(
    public readonly from: Currency,
    public readonly to: Currency,
    public readonly at: Date,
  ) {
    super(
      `Currency conversation from ${from} to ${to} failed for ${format(
        at,
        'YYYY-MM-DD',
      )}`,
    );
  }
}
