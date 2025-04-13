# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
# Use bun run dev for development environments
bun run start
```

> [!IMPORTANT]
>
> 1. Check out `/docs` endpoint to read the Swagger documentation.
> 2. This backend makes proper use of the `nodeEnv` environment variable. That means, you should set
>    it to something else than `development` to disable Swagger documentation.

To run tests:

```bash
bun run test
```

This project was created using `bun init` in bun v1.2.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
