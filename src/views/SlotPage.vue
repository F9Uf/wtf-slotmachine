<template>
  <div class="slot-page grid grid-cols-12 gap-8">
    <div class="history col-start-1 col-span-3">
      <Card>
        <Title>History</Title>
        <div class="grid grid-flow-row auto-rows-max">
          <div class="history my-4" v-for="history in histories" :key="history.n">
            <div class="grid grid-cols-4 gap-2">
              <div>#{{history.n}}</div>
              <div>{{history.c1}}</div>
              <div>{{history.c2}}</div>
              <div>{{history.c3}}</div>
            </div> 
          </div>
        </div>
      </Card>
    </div>
    <div class="slot-machine col-start-4 col-span-6">
      <Card class="grid grid-rows-3 grid-flow-col">
        <Title>Slot Machine</Title>
        <div class="slot grid grid-cols-11">
          <div :class="setLayout(index)" v-for="(slotPic, index) in slotPics" :key="index">
            <img :src="getSlotCoinPics(slotPic)" alt="" />
          </div>
          <!-- <div
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
          </div> -->
        </div>
        <div class="bottom mt-10">
          <div class="float-right mb-5">
            Balance: 10 WTF (~10,000$)
          </div>
          <Button :type="getBtnDisplay.type">{{
            getBtnDisplay.text
          }}</Button>
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
          <Button :type="getBtnDisplay.type">{{ getBtnDisplay.text }}</Button>
        </Card>
      </div>
      <div class="rules my-5">
        <h1>Rules & rewardss</h1>
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
          <div class="col-start-4 col-span-3">1,000,000 WTF</div>
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
          <div class="col-start-4 col-span-3">24 WTF</div>
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

export default {
  components: { Card, Title, Button, Description },
  data() {
    return {
      histories: [
        {
          n: 1,
          c1: "btc",
          c2: "btc",
          c3: "btc"
        },
        {
          n: 2,
          c1: "btc",
          c2: "btc",
          c3: "btc"
        }
      ],
      slotPics : [
        "btc_slot",
        "btc_slot",
        "btc_slot"
      ]
        
    }
  },
  computed: {
    getBtnDisplay() {
      if (this.web3Type === "OK") return { type: "primary", text: "Swap" };
      if (this.web3Type === "WRONG-NET")
        return { type: "danger", text: "Wrong Network" };
      return { type: "dark", text: "Connect Wallet" };
    },
    getSlotCoinPics(pic) {
      return require('../assets/currency/'+ pic + '.png')
    },
    setLayout(index) {
      let start = 4*index + 1;
      start = start.toString()
      return 'col-start-'+ start +'col-span-3 grid place-items-center bg-blue-900 h-40 rounded-lg'
    }
  },
};
</script>

<style>
</style>