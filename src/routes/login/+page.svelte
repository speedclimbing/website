<script lang="ts">
	import { Alert, Button, Card, Input, Label } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { API_URL } from '../../api';

	let password = '';
	let error = false;

	const login = async () => {
		const res = await fetch(`${API_URL}/auth/password`, {
			method: 'POST',
			body: JSON.stringify({ ['password']: password })
		});

		if (res.status != 200) {
			error = true;
			return;
		}

		const data = await res.json();
		error = false;
		document.cookie = `session=${data.token};samesite=strict`;
		goto('/');
	};
</script>

<div class="center-container">
	<Card img="/images/banner.png" size="md">
		<h1>Login</h1>
		<form on:submit={login}>
			<div class="grid grid-cols-1 gap-4 pt-6">
				{#if error}
					<Alert color="red">
						<span class="font-medium">Login failed!</span> Change a few things up and try submitting
						again.
					</Alert>
				{/if}
				<Label>
					<span>Password</span>
					<Input type="password" placeholder="Password" size="sm" bind:value={password} />
				</Label>
				<Button size="sm" type="submit">Login</Button>
			</div>
		</form>
	</Card>
</div>

<style>
	.center-container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
