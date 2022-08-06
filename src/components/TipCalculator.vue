<template>
<div class="container mt-3 mt-sm-5" id="app">
  <div class="row justify-content-center mb-4">
    <div class="col-md-4">
      <div class="input-group">
        <div class="input-group-addon">$</div>
        <input class="form-control" type="number" v-model="input"/>
      </div>
    </div>
  </div>
  <div class="row justify-content-center" v-if="input">
    <div class="col-md-6">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>15%</th>
            <th>18%</th>
            <th>20%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Tip</th>
            <td>${{ fifteen }}</td>
            <td>${{ eighteen }}</td>
            <td>${{ twenty }}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>${{ tFifteen }}</td>
            <td>${{ tEighteen }}</td>
            <td>${{ tTwenty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script setup>
import { computed, ref } from 'vue';
const input = ref(null);
const fifteen = computed(() => {
    return (input.value * .15).toFixed(2);
});
const eighteen = computed(() => {
    return (input.value * .18).toFixed(2);
});
const twenty = computed(() => {
    return (input.value * .20).toFixed(2);
});

const tFifteen = computed(() => {
    return (input.value + +fifteen.value ).toFixed(2);
});
const tEighteen = computed(() => {
    return (input.value + +eighteen.value).toFixed(2);
});
const tTwenty = computed(() => {
    return (input.value + +twenty.value ).toFixed(2);
});
</script>