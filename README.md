# Cookbook for Raspberry Pi Machines

<p align="center">
    <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/46/23551-Raspberry-Pi-5-8G_%28cropped%29.jpg"
        alt="Rpi Logo"
        width="300" />
</p>

This cookbook provides a collection of recipes to help you get started with DeimOS for Raspberry Pi 4b/5b.

## Supported Boards -> Machines

| Board                      | Gaia Machine Name   |
|----------------------------|---------------------|
| Raspberry Pi 5B            | rpi5b               |
| Raspberry Pi 4B            | rpi4b               |

## Prerequisites

- [Gaia project Gaia Core](https://github.com/gaiaBuildSystem/gaia);

<p align="center">
    <img
        src="https://github.com/gaiaBuildSystem/.github/raw/main/profile/GaiaBuildSystemLogoDebCircle.png"
        alt="This is a Gaia Project based cookbook"
        width="170" />
</p>

## Build an Image

```bash
./gaia/scripts/bitcook/gaia.ts --buildPath /home/user/workdir --distro ./cookbook-rpi/distro-ref-rpi4b.json
```

This will build DeimOS for Synaptics Astra sl1680.
