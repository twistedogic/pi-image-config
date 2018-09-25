# pi-image-config

## Build
`docker build -t pi-image-config .`

## Getting Started
```sh
Usage: pi-image-config [options]

Options:

  -V, --version                output the version number
  -i, --image <image>          filepath to rpi image to be patched
  -t, --template <template>    filepath to dir of files/template to patch
  -e, --env [env]              filepath to dir of environment variables for the templates (use template directly if not provided)
  -p, --partition [partition]  partition to write (default:1)
  -h, --help                   output usage information
```
