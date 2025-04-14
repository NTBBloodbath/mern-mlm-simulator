# MERN MLM Simulator

Commission simulator for MLM systems with crypto payment integration, for full-stack developer technical testing.

**Stack**: React (+ TailwindCSS), Express.js, TypeScript, NodeJS (Bun).

> [!IMPORTANT]
>
> Both the [frontend](./frontend) and [backend](./backend) also have their own README with instructions for running the projects and their unit tests.

## Installation

### Requirements

- [Bun](https://bun.sh/) (**RECOMMENDED**, v1.1+) - The [backend test suite](./backend/tests)
  is built with [`bun test`](https://bun.sh/docs/cli/test), which is a Jest-compatible testing library that performs better than Jest.

- Node.js (v20+)

```bash
# Clone repository
git clone https://github.com/NTBBloodbath/mern-mlm-simulator
cd mern-mlm-simulator

# Install dependencies (backend and frontend)
pushd frontend \
    && bun install \
    && popd
pushd backend \
    && bun install \
    && popd
```

### Configuration

1. Create `.env` in the project root:

```bash
cp .env.example .env
```

2. Replace the `CLIENT_API_KEY` and `CONTRACT_ADDRESS` values ​​with those provided in the test document.

### Using [devenv](https://devenv.sh) (optional)

```bash
# Install devenv using Nix (if not already installed)
#
# devenv will automatically install frontend and backend dependencies if not already installed
nix-env -iA nixpkgs.devenv

# Run environment (frontend and backend)
devenv up
```

## License

This project is licensed under [GPL-3.0](./LICENSE).
