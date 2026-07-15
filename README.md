# Runner Training Load Calculator

A dependency-free browser tool for estimating session training load from duration and session RPE.

## Use

Open `index.html`, enter duration in minutes and an RPE from 1 to 10, then select **Calculate load**.

`Session training load = duration × RPE`

The result is an arbitrary-unit workload estimate. It is not medical advice or a stand-alone training prescription.

## Test

Run `node test.js`. No package installation is required.

## Privacy

The tool has no accounts, analytics, storage, external dependencies, or network requests. Inputs remain in the browser.

## Contributing

Open an issue describing the problem before proposing a larger feature. Keep changes dependency-free unless a measurable need justifies otherwise.

## License

MIT
