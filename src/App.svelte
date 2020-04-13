<script lang="typescript">
	import Avatar from "./Avatar.svelte";
	export let name: string;

	let avatars = 0;

	function addAvatar(): void {
		avatars += 1;
	}

</script>

<main>
	<h1>{name}</h1>

	<div class="avatars-container">
	{#each Array(avatars) as _, i}
		<Avatar index={i}/>
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
