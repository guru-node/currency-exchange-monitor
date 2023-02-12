import { numberInString } from 'binance/lib/types/shared';
import { WithdrawTransferType } from 'binance/lib/types/spot';

export class WithdrawOutput {
  id: string;
}

export class DepositHistoryOutput {
  amount: numberInString;
  coin: string;
  network: string;
  status: number;
  address: string;
  addressTag: string;
  txId: string;
  insertTime: number;
  transferType: number;
  confirmTimes: string;
}

export class DepositAddressOutput {
  address: string;
  coin: string;
  tag: string;
  url: string;
}

export class WithdrawHistoryOutput {
  address: string;
  amount: numberInString;
  applyTime: string;
  coin: string;
  id: string;
  withdrawOrderId: string;
  network: string;
  transferType: WithdrawTransferType;
  status: number;
  transactionFee: numberInString;
  txId: string;
}
