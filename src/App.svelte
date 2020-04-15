<script lang="typescript">
	import Avatar from "./Avatar.svelte";
	export let name: string;

	let canvasHeight = 600;
	let canvasWidth = 600;
	let cellSize = 10;
	let amountOfGenerations = 10;

	let avatars = 0;

	function addAvatar(): void {
		avatars += 1;
	}

</script>

<main>
	<h1>{name}</h1>

	<ul>
		<li>Height: <input bind:value={canvasHeight} type="number" min="100" max="800" disabled="{avatars > 0}"></li>
		<li>Width: <input bind:value={canvasWidth} type="number" min="100" max="800" disabled="{avatars > 0}"></li>
		<li>Size of Cell: <input bind:value={cellSize} type="number" min="1" max="100"></li>
		<li>Generations: <input bind:value={amountOfGenerations} type="number" min="1" max="100"></li>
	</ul>
	<br>
	<button on:click={addAvatar}>Generate</button>


	<div class="avatars-container">
	{#each Array(avatars) as _, i}
		<Avatar {canvasHeight} {canvasWidth} {cellSize} {amountOfGenerations}/>
	{/each}
	</div>

	{#if avatars > 0}
		<button on:click={addAvatar}>Generate</button>
	{/if}

</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		max-width: 1400px;
	}

	ul li{
		display: inline;
	}

	li {
		margin-left: 5px;
	}

	.avatars-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
