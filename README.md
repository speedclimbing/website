<h1 align="center">
    <img src="https://github.com/speedclimbing/website/blob/dev/static/favicon.png?raw=true" height="45px"/>
    <p>speedclimbing.org</p>
</h1>

<p align="center">
    <a href="https://codeclimate.com/github/speedclimbing/website/maintainability">
        <img src="https://api.codeclimate.com/v1/badges/a05c0a1ffdfbe3ad38b4/maintainability" />
    </a>
</p>

speedclimbing.org aims to be a central place to get information about speedclimbing for everyone - from newbies to professionals.
The [main branch](https://github.com/speedclimbing/website/tree/main) is available directly at [speedclimbing.org](https://speedclimbing.org), whereas the [dev branch](https://github.com/speedclimbing/website/tree/dev) is available on [dev.speedclimbing.org](https://dev.speedclimbing.org).

Data about competitions and athletes (and all statistics in gerneral) comes from [api.speedclimbing.org/v1](https://api.speedclimbing.org/v1). This data is based on official results from various federations.

## Contributing

Contributions of any kind are very welcome! Just make sure to always [open an issue](https://github.com/speedclimbing/website/issues) before you start working on something. Feel free to work on any [open and unassigned](https://github.com/speedclimbing/website/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee) issue.
Please always base PRs on the dev branch.

## Developing

Once you've colned this repo and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
