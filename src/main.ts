import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: getName()
	}
});

function getName(): string {
	return 'Steppa';
}

export default app;
