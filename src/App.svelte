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

	{#each Array(avatars) as _, i}
		<Avatar index={i}/>
	{/each}

	<button on:click={addAvatar}>+</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
