# Wundergraph Plugins example with Nuxt 3

## Setup

Make sure to install the dependencies:

### pnpm

```
pnpm install
```

## Development

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Using Wundergraph

```vue
<script setup>
const {
  $wgraph: { useQuery },
} = useNuxtApp();

const dragons = useQuery({
  operationName: 'Dragons',
});
</script>
```

## Using Vue Query directly

```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const fetcher = async () =>
  await fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json());

const { data, suspense } = useQuery({ queryKey: ['test'], queryFn: fetcher });

await suspense();
</script>
```

## Nuxt Caveats

- Wundergraph has to be deployed separately from Nuxt as it's a go server and not a js based server.
- Some dependencies can be removed from package.json once pnpm is 100% [supported](https://github.com/nuxt/nuxt/issues/14146)
