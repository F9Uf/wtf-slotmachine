<template>
  <div class="slot-page grid grid-cols-12 gap-8">
    <!-- Rewards Modal -->
    <Modal :title="modalDetail.title" v-if="isShowModal && modalDetail.type === 'REWARD'" @close="closeModal">
      <div class="flex flex-col space-y-5 px-5">
        <div
          class="flex justify-between"
          :key="index"
          v-for="(slot, index) in results.slot" 
        >
          <div class="slot-result flex flex-row space-x-16">
            <img :src="require('@/assets/currency/' + pics[slot.slot1])" alt="" />
            <img :src="require('@/assets/currency/' + pics[slot.slot2])" alt="" />
            <img :src="require('@/assets/currency/' + pics[slot.slot3])" alt="" />
          </div>
          <div class="slot-reward">
            {{ results.rewards[index] }} WTF
          </div>
        </div>
      </div>
      <div class="mt-6"><b>Total rewards:</b> {{ results.totalRewards }} WTF</div>
    </Modal>
    <!-- Claim Modal -->
    <Modal :title="modalDetail.title" v-if="isShowModal && modalDetail.type === 'CLAIM'" @close="closeModal">
      <div>Total rewards: {{ computedRewards }} WTF</div>
    </Modal>
    <div class="history col-start-1 col-span-3">
      <Card>
        <Title>History</Title>
        <div class="grid grid-flow-row auto-rows-max overflow-y-auto history-body">
          <div
            class="history my-4"
            v-for="(history, index) in histories"
            :key="index"
          >
            <div class="grid grid-cols-4 gap-2">
              <div>#{{ histories.length - index }}</div>
              <div>
                <img
                  :src="
                    require('@/assets/currency/' + pics[history.slot1])
                  "
                  alt=""
                />
              </div>
              <div>
                <img
                  :src="
                    require('@/assets/currency/' + pics[history.slot2])
                  "
                  alt=""
                />
              </div>
              <div>
                <img
                  :src="
                    require('@/assets/currency/' + pics[history.slot3])
                  "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="slot-machine col-start-4 col-span-6">
      <Card class="flex flex-col">
        <Title class="mb-10">Slot Machine</Title>
        <SlotMachine
          :isSpin="isSpin"
          :slots="displaySlot"
          @stop="stopSpin"
        />
        <div class="bottom mt-10">
          <div class="float-right mb-5">Balance: {{ computedBalance }} WTF</div>
          <div class="button space-y-6" v-if="isApprove">
            <Button :type="getBtnDisplay[0].type" @click="playOnce()">
              {{ getBtnDisplay[0].text }}
            </Button>
            <Button :type="getBtnDisplay[1].type" @click="playTen()">
              {{ getBtnDisplay[1].text }}
            </Button>
          </div>
          <Button
            :type="getBtnDisplay.type"
            @click="approveContract()"
            v-if="!isApprove"
          >
            {{ getBtnDisplay.text }}
          </Button>
        </div>
      </Card>
    </div>
    <div class="claim-and-rules col-start-10 col-span-3">
      <div class="claim">
        <Card>
          <div class="mb-10">
            <Description>Your rewards:</Description>
            <Title>{{ computedRewards }} WTF</Title>
          </div>
          <Button
            :type="getBtnDisplay.type"
            @click="approveContract()"
            v-if="!isApprove"
          >
            {{ getBtnDisplay.text }}
          </Button>
          <div class="button" v-if="isApprove">
            <Button :type="getBtnDisplay[2].type" @click="claimRewards(); openClaimModal();">
              {{ getBtnDisplay[2].text }}
            </Button>
          </div>
        </Card>
      </div>
      <div class="rules my-5">
        <h1>Rules & rewards</h1>
        <p>
          You will get a award only if your all slots are not different, but the
          rewards are not equal in each picture. So the rewards are shown below:
        </p>
      </div>
      <div class="rewards grid grid-flow-row auto-rows-max gap-2">
        <div class="grid grid-cols-6 gap-2">
          <div class="col-start-1 col-span-1">
            <img src="../assets/currency/btc.png" alt="" />
          </div>
          <div class="col-start-2 col-span-1">
            <img src="../assets/currency/btc.png" alt="" />
          </div>
          <div class="col-start-3 col-span-1">
            <img src="../assets/currency/btc.png" alt="" />
          </div>
          <div class="col-start-4 col-span-3">45,455 WTF</div>
        </div>
        <div class="grid grid-cols-6 gap-2">
          <div class="col-start-1 col-span-1">
            <img src="../assets/currency/eth2.png" alt="" />
          </div>
          <div class="col-start-2 col-span-1">
            <img src="../assets/currency/eth2.png" alt="" />
          </div>
          <div class="col-start-3 col-span-1">
            <img src="../assets/currency/eth2.png" alt="" />
          </div>
          <div class="col-start-4 col-span-3">456 WTF</div>
        </div>
        <div class="grid grid-cols-6 gap-2">
          <div class="col-start-1 col-span-1">
            <img src="../assets/currency/bnb.png" alt="" />
          </div>
          <div class="col-start-2 col-span-1">
            <img src="../assets/currency/bnb.png" alt="" />
          </div>
          <div class="col-start-3 col-span-1">
            <img src="../assets/currency/bnb.png" alt="" />
          </div>
          <div class="col-start-4 col-span-3">83 WTF</div>
        </div>
        <div class="grid grid-cols-6 gap-2">
          <div class="col-start-1 col-span-1">
            <img src="../assets/currency/cake.png" alt="" />
          </div>
          <div class="col-start-2 col-span-1">
            <img src="../assets/currency/cake.png" alt="" />
          </div>
          <div class="col-start-3 col-span-1">
            <img src="../assets/currency/cake.png" alt="" />
          </div>
          <div class="col-start-4 col-span-3">46 WTF</div>
        </div>
        <div class="grid grid-cols-6 gap-2">
          <div class="col-start-1 col-span-1">
            <img src="../assets/currency/doge.png" alt="" />
          </div>
          <div class="col-start-2 col-span-1">
            <img src="../assets/currency/doge.png" alt="" />
          </div>
          <div class="col-start-3 col-span-1">
            <img src="../assets/currency/doge.png" alt="" />
          </div>
          <div class="col-start-4 col-span-3">28 WTF</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/common/Card.vue";
import Title from "../components/common/Title.vue";
import Button from "../components/common/Button.vue";
import Description from "../components/common/Description.vue";
import Modal from "../components/common/Modal.vue";
import SlotMachine from '../components/slot/SlotMachine.vue'

import { numberToMoney } from "../utils/moneyFormat";

export default {
  components: { Card, Title, Button, Description, Modal, SlotMachine },
  data() {
    return {
      histories: [],
      pics: ["btc.png", "eth2.png", "bnb.png", "cake.png", "doge.png"],
      slotPics: ["btc_slot", "btc_slot", "btc_slot"],
      isApprove: false,
      wtfBalance: 0,
      rewards: 0,
      results: {
        slot: [],
        rewards: [],
        totalRewards: 0,
      },
      currentAddress: null,
      isSpin: false,
      displaySlot: {
        slot1: 1,
        slot2: 2,
        slot3: 3
      },
      currentSlot: null
    };
  },
  computed: {
    web3Type() {
      return this.$store.getters["getWeb3Type"];
    },
    getBtnDisplay() {
      if (this.web3Type === "OK") {
        if (!this.isApprove) return { type: "dark", text: "Approve Contract" };
        else {
          if (this.rewards > 0) {
            return [
              { type: "secondary", text: "Play once" },
              { type: "primary", text: "Play 10 times" },
              { type: "primary", text: "Claim" },
            ];
          } else {
            return [
              { type: "secondary", text: "Play once" },
              { type: "primary", text: "Play 10 times" },
              { type: "disabled", text: "Claim" },
            ];
          }
        }
      }
      if (this.web3Type === "WRONG-NET")
        return { type: "danger", text: "Wrong Network" };
      return { type: "dark", text: "Connect Wallet" };
    },
    getSlotCoinPics(pic) {
      return require("../assets/currency/" + pic + ".png");
    },
    setLayout(index) {
      let start = 4 * index + 1;
      start = start.toString();
      return (
        "col-start-" +
        start +
        "col-span-3 grid place-items-center bg-blue-900 h-40 rounded-lg"
      );
    },
    accountDetail() {
      return this.$store.getters["getAccountDetail"];
    },
    computedBalance() {
      return numberToMoney(this.wtfBalance, 2);
    },
    computedRewards() {
      return numberToMoney(this.rewards, 2);
    },
    isShowModal() {
      return this.$store.getters['getModalShow']
    },
    modalDetail() {
      return this.$store.getters['getModalDetail']
    }
  },
  methods: {
    async stopSpin() {
      this.isSpin = false
      await this.rewardsOf();
      await this.historyOf();
      this.openRewardModal()
    },
    closeModal() {
      this.$store.dispatch('closeModal')
    },
    openClaimModal() {
      this.$store.dispatch('openModalClaim');
    },
    openRewardModal() {
      this.$store.dispatch('openModalReward');
    },
    async approveContract() {
      await this.$store.dispatch("approveSlotMachineContract");
    },
    async setIsApprove() {
      const allowance = await this.$store.dispatch(
        "slotMachineContractAllowance"
      );
      this.isApprove = !!allowance.toNumber();
    },
    async playOnce() {
      const res = await this.$store.dispatch("playOnce");
      this.results.slot = [
        {
          slot1: res.returnValues.slot.slot1,
          slot2: res.returnValues.slot.slot2,
          slot3: res.returnValues.slot.slot3
        }
      ]
      this.displaySlot = {
        slot1: Number(this.results.slot[0].slot1),
        slot2: Number(this.results.slot[0].slot2),
        slot3: Number(this.results.slot[0].slot3)
      }
      this.isSpin = true
      this.results.rewards = [res.returnValues.reward]
      this.results.totalRewards = res.returnValues.reward
    },
    async playTen() {
      const res = await this.$store.dispatch("playTen");
      this.results.slot = res.returnValues.slots.map(e => ({ slot1: e.slot1, slot2: e.slot2, slot3: e.slot3}));
      this.results.rewards = res.returnValues.rewards;
      this.results.totalRewards = res.returnValues.totalReward;
      // fetch new rewards and history
      await this.rewardsOf();
      await this.historyOf();
      this.openRewardModal()
    },
    async rewardsOf() {
      this.rewards = await this.$store.dispatch("rewardsOf");
    },
    async claimRewards() {
      await this.$store.dispatch("claimRewards");
      await this.rewardsOf();
    },
    async historyOf() {
      let tempHist = await this.$store.dispatch("historyOf");
      tempHist = tempHist.map(e => ({ slot1: e.slot1, slot2: e.slot2, slot3: e.slot3 }))
      this.histories = tempHist.reverse()
    },
    async initial() {
      await this.setIsApprove();
      await this.rewardsOf();
      await this.historyOf();
    }
  },
  watch: {
    async accountDetail(newV) {
      this.wtfBalance = newV.wtfBalance;
      await this.setIsApprove();
      // fetch reward & history only first time
      if (this.currentAddress !== newV.address) {
        this.currentAddress = newV.address
        await this.rewardsOf();
        await this.historyOf();
      }
    },
  },
  mounted() {
    this.wtfBalance = this.accountDetail.wtfBalance;
    if (this.accountDetail.address !== null) {
      this.initial()
    }
  },
};
</script>

<style scoped>
.history-body {
  height: 519.13px;
}
</style>