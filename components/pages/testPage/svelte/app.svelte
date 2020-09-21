<script lang="typescript">
  import range from 'lodash/range';
  import { onMount } from 'svelte';
  import Item from './item.svelte';

  let count: number = 1000;

  $: things = range(0, count);
  onMount(() => {
    console.log('yoo!!!');
  });
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
