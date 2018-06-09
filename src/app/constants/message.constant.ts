/**
 * Map success/failure names to their messages.
 */
export const messages = {
  NoDefaultAccount: 'Please unlock your account through Metamask/other Ethereum wallets first.',
  GetTransactionReceiptFailed: 'Failed to get transaction receipt. Are you connected?',
  GetBalanceFailed: 'We failed to get your balance.',
  GetStakeBalanceFailed: 'We failed to get your staking balance.',
  GetStakeDurationFailed: 'We failed to get your staking duration.',
  GetStakeStartTimeFailed: 'We failed to get your staking start time.',
  TransferSucceeded: 'Successfully sent tokens!',
  TransferFailed: 'The tokens failed to reach its recipient.',
  DepositStakeFailed: 'The tokens failed to be deposit.',
  WithdrawStakeFailed: 'The tokens failed to be withdrawn.',
  UpdateStakeBalanceFailed: 'The tokens failed to be restaked.',
  CalculateInterestFailed: 'We failed to calculate your staking interest.',
  UnknownProblem: 'Thank you for finding an unknown problem. ' +
    'Please submit this issue at https://github.com/Exodia-World/exodia.world-web-client/issues'
};
