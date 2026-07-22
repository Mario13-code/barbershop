<script lang="ts">
	let { data } = $props();
</script>

<h1>Frequently Asked Questions</h1>

{#if data.faqs.length === 0}
	<p>No FAQs yet.</p>
{:else}
	{#each data.faqs as faq (faq.id)}
		<div class="faq-item">
			<h2>{faq.question}</h2>
			<p>{faq.answer}</p>
		</div>
	{/each}
{/if}

<style>
	.faq-item {
		margin-bottom: 1.5rem;
	}
</style>
