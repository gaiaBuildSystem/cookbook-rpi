# Cookbook for Raspberry Pi Machines

<p align="center">
    <img
        src=".assets/cover.png"
        alt="Rpi Logo"
        width="400" />
</p>

This cookbook provides a collection of recipes to help you get started with DeimOS for Raspberry Pi 4b/5b.

## Supported Boards -> Machines

| Board                      | Gaia Machine Name   |
|----------------------------|---------------------|
| Raspberry Pi 5B            | rpi5b               |
| Raspberry Pi 4B            | rpi4b               |

## Prerequisites

- [Gaia project Gaia Core](https://github.com/gaiaBuildSystem/gaia);

## Build an Image

```bash
./gaia/scripts/bitcook/gaia.ts --buildPath /home/user/workdir --distro ./cookbook-rpi/distro-ref-rpi4b.json
```

This will build DeimOS for Raspberry Pi 4B.
