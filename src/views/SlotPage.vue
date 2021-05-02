<template>
  <div class="slot-page">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <Card>
            <Title>History</Title>
          </Card>
        </div>
        <div class="col-6">
          <Card>
            <Title>Slot Machine</Title>
            <Button :type="getBtnDisplay.type">{{ getBtnDisplay.text }}</Button>
          </Card>
        </div>
        <div class="col-3">
          <div class="row">
            <Card>
              <Title>Rewards</Title>
            </Card>
          </div>
          <div class="row">
            <h1>Rules & rewards</h1>
            <p>
              You will get a award only if your all slots are not different, but
              the rewards are not equal in each picture. So the rewards are
              shown below:
            </p>
          </div>
          <div class="rules">
            <div class="row">
              <div class="col-2">
                <img src="../assets/currency/btc.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/btc.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/btc.png" alt="" />
              </div>
              <div class="col-6">1,000,000 WTF</div>
            </div>
            <div class="row">
              <div class="col-2">
                <img src="../assets/currency/eth2.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/eth2.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/eth2.png" alt="" />
              </div>
              <div class="col-6">456 WTF</div>
            </div>
            <div class="row">
              <div class="col-2">
                <img src="../assets/currency/bnb.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/bnb.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/bnb.png" alt="" />
              </div>
              <div class="col-6">83 WTF</div>
            </div>
            <div class="row">
              <div class="col-2">
                <img src="../assets/currency/cake.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/cake.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/cake.png" alt="" />
              </div>
              <div class="col-6">46 WTF</div>
            </div>
            <div class="row">
              <div class="col-2">
                <img src="../assets/currency/doge.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/doge.png" alt="" />
              </div>
              <div class="col-2">
                <img src="../assets/currency/doge.png" alt="" />
              </div>
              <div class="col-6">24 WTF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/common/Card.vue";
import Title from "../components/common/Title.vue";
import Button from "../components/common/Button.vue";

export default {
  components: { Card, Title, Button },
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