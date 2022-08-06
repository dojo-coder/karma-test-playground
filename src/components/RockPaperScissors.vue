<template>
    <div class="rock-paper-scissors-game">
        <div class="players">
            <div>
                <h4>Player 1</h4>
                <i class="fa fa-2x fa-fw" v-bind:class="computedUser"></i>
            </div>
            <div>
                <h4>Computer</h4>
                <i class="fa fa-2x fa-fw" v-bind:class="computedRand"></i>
            </div>
        </div>
        
        <div>
            <button @click="choose('rock')">
                <i class="fa fa-hand-rock-o"></i>
            </button>

            <button @click="choose('paper')">
                <i class="fa fa-hand-paper-o"></i>
            </button>
            <button @click="choose('scissors')">
                <i class="fa fa-hand-scissors-o"></i>
            </button>
        </div>
        <h1>{{ userScore }} - {{ computerScore }}</h1>
    </div>
</template>

<script setup>
import { toRefs, reactive, computed } from 'vue';
const data = reactive({
    userPick: null,
    randPick: null,
    userScore: 0,
    computerScore: 0
});
const { userScore, computerScore } = toRefs(data);
const setScore = function () {
    if (data.userPick == 'rock') {
        if (data.randPick == 'paper') {
            console.log('Computer wins');
            data.computerScore++;
        } else if (data.randPick == 'scissors') {
            console.log('User wins');
            data.userScore++;
        } else {
            console.log('Draw');
        }
    } else if (data.userPick == 'paper') {
        if (data.randPick == 'rock') {
            console.log('User wins');
            data.userScore++;
        } else if (data.randPick == 'scissors') {
            console.log('Computer wins');
            data.computerScore++;
        } else {
            console.log('Draw');
        }
    } else {
        if (data.randPick == 'rock') {
            console.log('Computer wins');
            data.computerScore++;
        } else if (data.randPick == 'paper') {
            console.log('User wins');
            data.userScore++;
        } else {
            console.log('Draw');
        }
    }
}
const choose = function (pick) {
    data.userPick = pick;
    const picks = ['rock', 'paper', 'scissors'];
    data.randPick = picks[Math.floor(Math.random() * picks.length)];
    setScore();
};

const computedUser = computed(() => {
    return {
        "fa-circle-o-notch": data.userPick === null,
        "fa-hand-rock-o": data.userPick === "rock",
        "fa-hand-paper-o": data.userPick === "paper",
        "fa-hand-scissors-o": data.userPick === "scissors"
    };
});

const computedRand = computed(() => {
    return {
        "fa-circle-o-notch": data.randPick === null,
        "fa-hand-rock-o": data.randPick === "rock",
        "fa-hand-paper-o": data.randPick === "paper",
        "fa-hand-scissors-o": data.randPick === "scissors"
    };
});
</script>
<style scoped>
.rock-paper-scissors-game {
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: "Open Sans", sans-serif;
}
button {
    margin: 5px;
}

.players {
    display: flex;
}

.players > div {
    text-align: center;
    padding: 5px;
}
</style>