<script lang="ts">
	let { data } = $props();
</script>

<h1>About {data.shopInfo?.shop_name ?? 'Us'}</h1>

{#if data.shopInfo?.about_text}
	<p>{data.shopInfo.about_text}</p>
{:else}
	<p>More about our shop coming soon.</p>
{/if}
