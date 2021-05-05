<template>
  <div class="slot-page grid grid-cols-12 gap-8">
    <div class="history col-start-1 col-span-3">
      <Card>
        <Title>History</Title>
        <div class="grid grid-flow-row auto-rows-max">
          <div
            class="history my-4"
            v-for="history in histories"
            :key="history.n"
          >
            <div class="grid grid-cols-4 gap-2">
              <div>#{{ history.n }}</div>
              <div>{{ history.c1 }}</div>
              <div>{{ history.c2 }}</div>
              <div>{{ history.c3 }}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="slot-machine col-start-4 col-span-6">
      <Card class="grid grid-rows-3 grid-flow-col">
        <Title>Slot Machine</Title>
        <div class="slot grid grid-cols-11">
          <!-- <div :class="setLayout(index)" v-for="(slotPic, index) in slotPics" :key="index">
            <img :src="getSlotCoinPics(slotPic)" alt="" />
          </div> -->
          <div
            class="col-start-1 col-span-3 grid place-items-center bg-blue-900 h-40 rounded-lg"
          >
            <img src="../assets/currency/btc_slot.png" alt="" />
          </div>
          <div
            class="col-start-5 col-span-3 grid place-items-center bg-blue-900 h-40 rounded-lg"
          >
            <img src="../assets/currency/btc_slot.png" alt="" />
          </div>
          <div
            class="col-start-9 col-span-3 grid place-items-center bg-blue-900 h-40 rounded-lg"
          >
            <img src="../assets/currency/btc_slot.png" alt="" />
          </div>
        </div>
        <div class="bottom mt-10">
          <div class="float-right mb-5">Balance: {{ computedBalance }} WTF</div>
          <div class="button" v-if="isApprove">
            <Button :type="getBtnDisplay[0].type" @click="playOnce()">{{
              getBtnDisplay[0].text
            }}</Button>
            <Button :type="getBtnDisplay[1].type" @click="playTen()">{{
              getBtnDisplay[1].text
            }}</Button>
          </div>
          <Button
            :type="getBtnDisplay.type"
            @click="approveContract()"
            v-if="!isApprove"
            >{{ getBtnDisplay.text }}</Button
          >
        </div>
      </Card>
    </div>
    <div class="claim-and-rules col-start-10 col-span-3">
      <div class="claim">
        <Card>
          <div class="mb-10">
            <Description>Your rewards:</Description>
            <Title>1000000 WTF</Title>
            <Description>~500$</Description>
          </div>
          <Button
            :type="getBtnDisplay.type"
            @click="approveContract()"
            v-if="!isApprove"
            >{{ getBtnDisplay.text }}</Button
          >
          <div class="button" v-if="isApprove">
            <Button :type="getBtnDisplay.type">{{ getBtnDisplay.text }}</Button>
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
import { numberToMoney } from "../utils/moneyFormat";

export default {
  components: { Card, Title, Button, Description },
  data() {
    return {
      histories: [
        {
          n: 1,
          c1: "btc",
          c2: "btc",
          c3: "btc",
        },
        {
          n: 2,
          c1: "btc",
          c2: "btc",
          c3: "btc",
        },
      ],
      slotPics: ["btc_slot", "btc_slot", "btc_slot"],
      isApprove: false,
      wtfBalance: 0,
    };
  },
  computed: {
    web3Type() {
      return this.$store.getters["getWeb3Type"];
    },
    getBtnDisplay() {
      console.log(this.web3Type);
      if (this.web3Type === "OK") {
        if (!this.isApprove) return { type: "dark", text: "Approve Contract" };
        else
          return [
            { type: "secondary", text: "Play once" },
            { type: "primary", text: "Play 10 times" },
          ];
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
  },
  methods: {
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
      console.log(res)
    },
    async playTen() {
      const res = await this.$store.dispatch("playTen");
    },
  },
  watch: {
    accountDetail(newV) {
      this.wtfBalance = newV.wtfBalance;
      this.setIsApprove();
    },
  },
  created() {
    this.wtfBalance = this.accountDetail.wtfBalance;
    this.setIsApprove();
  },
};
</script>

<style>
</style>