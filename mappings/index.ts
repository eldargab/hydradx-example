import { SumReward, NoBondRecordAccount, StakingReward, StakingSlash } from '../generated/model'
import { Staking } from '../types/index' // import via index.ts, this is a workaround related to ts-node
import BN from 'bn.js'
import {
  ExtrinsicContext,
  EventContext,
  StoreContext,
} from '@subsquid/hydra-common'


export async function handleBond({
  store,
  event
}: EventContext & StoreContext) {

  const [account, balance] = new Staking.BondedEvent(event).params

  const e = await get(store, SumReward, account.toString())
  if (e == null) {
    store.save(createSumReward(account.toString()))
  }
}


export async function handleReward({
  store,
  event,
  block
}: EventContext & StoreContext) {
  const [account, newReward] = new Staking.RewardEvent(event).params

  let sumReward = await get(store, SumReward, account.toString());
  if (sumReward == null){
      // in early stage of kusama, some validators didn't need to bond to start staking
      // to not break our code, we will create a SumReward record for them and log them in NoBondRecordAccount
      sumReward = createSumReward(account.toString());
      const errorRecord = new NoBondRecordAccount();
      errorRecord.id = account.toString()
      errorRecord.firstRewardAt = block.height
      store.save(errorRecord)
  }

  sumReward.accountReward = sumReward.accountReward.add(new BN(newReward.toString()))
  sumReward.accountTotal = sumReward.accountReward.sub(sumReward.accountSlash)
  store.save(sumReward)

  const reward = new StakingReward()
  reward.id = `${block.height}-${event.indexInBlock}`
  reward.address = account.toString()
  reward.balance = new BN(newReward.toString())
  reward.date = new Date(event.blockTimestamp)
  store.save(reward)
}


export async function handleSlash({
  store,
  event,
  block,
}: EventContext & StoreContext): Promise<void> {

  const [account, newSlash] = new Staking.SlashEvent(event).params

  let sumReward = await get(store, SumReward, account.toString())
  if (sumReward == null){
      // in early stage of kusama, some validators didn't need to bond to start staking
      // to not break our code, we will create a SumReward record for them and log them in NoBondRecordAccount
      sumReward = createSumReward(account.toString());
      const errorRecord = new NoBondRecordAccount()
      errorRecord.id = account.toString()
      errorRecord.firstRewardAt = block.height
      store.save(errorRecord)
  }
  sumReward.accountSlash = sumReward.accountSlash.add(new BN(newSlash.toString()))
  sumReward.accountTotal = sumReward.accountReward.sub(sumReward.accountSlash)
  store.save(sumReward)

  const slash = new StakingSlash()
  slash.id = `${block.height}-${event.indexInBlock}`
  slash.address = account.toString();
  slash.balance = new BN(newSlash.toString())
  slash.date = new Date(block.timestamp)
  store.save(slash)
}


function createSumReward(accountId: string): SumReward {
  const entity = new SumReward()
  entity.id = accountId
  entity.accountReward = new BN(0)
  entity.accountSlash = new BN(0)
  entity.accountTotal = new BN(0)
  return entity;
}

type EntityType<T> = {
  new (...args: any[]): T
}

function get<T>(store: StoreContext['store'], entityType: EntityType<T>, id: string): Promise<T | undefined> {
  return store.get(entityType, {where: {id}})
}