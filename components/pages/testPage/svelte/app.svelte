<script lang="typescript">
  import range from 'lodash/range';
  import { onDestroy, onMount } from 'svelte';
  import Item from './item.svelte';
  import logger from '../logger';

  let count: number = 100;

  $: things = range(0, count);
  $: logger.log('count: ', count);
  $: logger.log('hi');

  const onInterval = (func, time) => {
    let interval;
    onMount(() => {
      interval = setInterval(func, time);
    });
    onDestroy(() => {
      clearInterval(interval);
    });
  };

  // onInterval(() => {
  //   console.log('interval!!!');
  // }, 1000);
</script>

<style>
  main {
    font-family: sans-serif;
    color: red;
  }
</style>

<main>
  <input
    type="number"
    on:change={(e) => {
      count = Number(e.target.value);
    }}
    bind:value={count} />
  <div>there are {count} things</div>
  <div>
    {#each things as thing}
      <Item content={String(thing)} />
    {/each}
  </div>
</main>
