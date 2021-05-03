<template>
  <div class="slot-page grid grid-cols-12 gap-8">
    <div class="history col-start-1 col-span-3">
      <Card>
        <Title>History</Title>
      </Card>
    </div>
    <div class="slot-machine col-start-4 col-span-6">
      <Card class="grid grid-rows-3 grid-flow-col">
        <Title>Slot Machine</Title>
        <div class="slot grid grid-cols-5 gap-1 justify-items-center bg-blue-900 h-40">
          <img
            class="col-start-2 col-span-1"
            src="../assets/currency/btc_slot.png"
            alt=""
            style="align"
          />
          <img
            class="col-start-3 col-span-1"
            src="../assets/currency/btc_slot.png"
            alt=""
          />
          <img
            class="col-start-4 col-span-1"
            src="../assets/currency/btc_slot.png"
            alt=""
          />
        </div>
        <Button :type="getBtnDisplay.type">{{ getBtnDisplay.text }}</Button>
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
  computed: {
    getBtnDisplay() {
      if (this.web3Type === "OK") return { type: "primary", text: "Swap" };
      if (this.web3Type === "WRONG-NET")
        return { type: "danger", text: "Wrong Network" };
      return { type: "dark", text: "Connect Wallet" };
    },
  },
};
</script>

<style>
</style>