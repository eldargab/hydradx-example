import { SumReward } from '../generated/model'
import { Staking } from '../types/index' // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js'
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common'


export async function handleBond({
  store,
  event,
  block,
  extrinsic,
}: EventContext & StoreContext) {

  const [account, balance] = new Staking.BondedEvent(event).params

  const e = await store.get(SumReward, {where: {id: account.toString()}})
  if (e == null) {
    store.save(createSumReward(account.toString()))
  }
}


function createSumReward(accountId: string): SumReward {
  const entity = new SumReward()
  entity.id = accountId
  entity.accountReward = new BN(0)
  entity.accountSlash = new BN(0)
  entity.accountTotal = new BN(0)
  return entity;
}