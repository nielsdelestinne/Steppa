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

	Height <input bind:value={canvasHeight}>
	Width <input bind:value={canvasWidth}>
	cellSize <input bind:value={cellSize} type="number" min="1" max="100">
	amountOfGenerations <input bind:value={amountOfGenerations} type="number" min="1" max="100">

	<div class="avatars-container">
	{#each Array(avatars) as _, i}
		<Avatar {canvasHeight} {canvasWidth} {cellSize} {amountOfGenerations}/>
	{/each}
	</div>

	<button on:click={addAvatar}>+</button>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		max-width: 1400px;
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
