// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SlotMachine {
  string public name = "WTF Slot Machine";

  uint256 public contractBalance;
  uint256 public pricePerSlot;
  uint256[] public rewardsPerRank = [0, 45455, 456, 83, 46, 28];
  uint[] public coins = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

  IERC20 internal wtf_;

  mapping (address => uint256) playerRewards;
  mapping (address => SlotInfo[]) playerHistory;

  event ResultOne(
    SlotInfo slot,
    uint256 reward
  );

  event ResultBatch(
    SlotInfo[] slots,
    uint256[] rewards,
    uint256 totalReward
  );

  event ClaimRewards(
    address to,
    uint256 rewards
  );

  constructor(
    uint256 _pricePerSlot,
    uint256[] memory _rewardsPerRank,
    address _token
  ) {
    contractBalance = msg.sender.balance;
    pricePerSlot = _pricePerSlot;
    rewardsPerRank = _rewardsPerRank;
    wtf_ = IERC20(_token);
  }

  enum SlotType {
    BTC,
    ETH,
    DOGE,
    BNB,
    CAKE
  }

  struct SlotInfo {
    SlotType slot1;
    SlotType slot2;
    SlotType slot3;
  }


  function slotOne() public payable {
    uint256 balnace = wtf_.balanceOf(msg.sender);
    require(balnace >= pricePerSlot, "Amount too low");
    require(pricePerSlot > 0);

    wtf_.transferFrom(msg.sender, address(this), pricePerSlot);

    SlotType slot1 = randomSlot();
    SlotType slot2 = randomSlot();
    SlotType slot3 = randomSlot();

    SlotInfo memory newOneSlot = SlotInfo(
      slot1,
      slot2,
      slot3
    );

    uint256 reward = calculateReward(newOneSlot);

    playerRewards[msg.sender] += reward;
    playerHistory[msg.sender].push(newOneSlot);

    emit ResultOne(newOneSlot, reward);
  }

  function slotTen() public payable {
    uint256 totalPaid = 10 * pricePerSlot;
    uint256 balnace = wtf_.balanceOf(msg.sender);
    require(balnace >= totalPaid, "Amount too low");
    require(pricePerSlot > 0);

    wtf_.transferFrom(msg.sender, address(this), totalPaid);

    SlotInfo[] memory slotBatch = new SlotInfo[](10);
    uint256[] memory rewards = new uint256[](10);
    uint256 rewardBatch = 0;

    for (uint256 i = 0; i < 10; i++) {
      SlotType slot1 = randomSlot();
      SlotType slot2 = randomSlot();
      SlotType slot3 = randomSlot();

      SlotInfo memory newOneSlot = SlotInfo(
        slot1,
        slot2,
        slot3
      );

      uint256 reward = calculateReward(newOneSlot);

      slotBatch[i] = newOneSlot;
      rewards[i] = reward;
      rewardBatch += reward;

      playerHistory[msg.sender].push(newOneSlot);
    }

    playerRewards[msg.sender] += rewardBatch;

    emit ResultBatch(slotBatch, rewards, rewardBatch);

  }

  function rewardOf(address tokenOwner) public view returns(uint256) {
    return playerRewards[tokenOwner];
  }

  function historyOf(address tokenOwner) public view returns(SlotInfo[] memory) {
    return playerHistory[tokenOwner];
  }

  function calculateReward(SlotInfo memory slots) public view returns (uint256) {
    if (slots.slot1 == slots.slot2 && slots.slot2 == slots.slot3) {
      if (slots.slot1 == SlotType.BTC) return rewardsPerRank[1];
      if (slots.slot1 == SlotType.ETH) return rewardsPerRank[2];
      if (slots.slot1 == SlotType.BNB) return rewardsPerRank[3];
      if (slots.slot1 == SlotType.CAKE) return rewardsPerRank[4];
      if (slots.slot1 == SlotType.DOGE) return rewardsPerRank[5];
    }
    return rewardsPerRank[0];
  }
  
  function randomSelect() internal view returns (uint) {
    uint select = uint(keccak256(abi.encodePacked(block.timestamp / block.difficulty))) % 99;
    uint random;
    if (select % 2 == 0) {
        random = uint(keccak256(abi.encodePacked(block.timestamp + block.difficulty + block.number))) % 99;
    }
    else {
        random = uint(keccak256(abi.encodePacked(block.timestamp +  block.number))) % 99;
    }
    return random;
  }

  function randomSlot() internal view returns (SlotType) {
    // TODO: logic to random slot with probability
    uint index = randomSelect();
    uint result = coins[index];
    
    if(result == 1) {
      return SlotType.BTC;
    }
    else if(result == 2) {
      return SlotType.ETH;
    }
    else if(result == 3) {
      return SlotType.BNB;
    }
    else if(result == 4) {
      return SlotType.CAKE;
    }
    else {
      return SlotType.DOGE;
    }
    
  }

  function claimRewards() public {
    uint256 rewards = rewardOf(msg.sender);
    require(rewards > 0, "no reward");

    wtf_.transfer(msg.sender, rewards*(10**18));

    emit ClaimRewards(msg.sender, rewards);
  }
}