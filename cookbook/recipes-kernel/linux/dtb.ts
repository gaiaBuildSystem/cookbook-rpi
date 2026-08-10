#!/usr/bin/env -S deno run --allow-all

import PATH from "node:path"
import logger from "node-color-log"
import { execSync } from "node:child_process"

// run update in the chroot
logger.info("deploy Linux kernel device tree ...")

const MACHINE = process.env.MACHINE as string
const BUILD_PATH = process.env.BUILD_PATH as string

// get the actual script path, not the process.cwd
const _path = PATH.dirname(process.argv[1])

const IMAGE_MNT_BOOT = `${BUILD_PATH}/tmp/${MACHINE}/mnt/boot`
const IMAGE_MNT_ROOT = `${BUILD_PATH}/tmp/${MACHINE}/mnt/root`
process.env.IMAGE_MNT_BOOT = IMAGE_MNT_BOOT
process.env.IMAGE_MNT_ROOT = IMAGE_MNT_ROOT

if (MACHINE === "rpi5b") {
    execSync(
        `sudo -k ` +
        `cp -f ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/broadcom/bcm2712-rpi-5-b.dtb ${IMAGE_MNT_BOOT}/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree for kernel ok")

    execSync(
        `sudo -k ` +
        `mkdir -p ${IMAGE_MNT_BOOT}/overlays`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })

    execSync(
        `sudo -k ` +
        `cp ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/overlays/*.dtbo ${IMAGE_MNT_BOOT}/overlays/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree overlaysfor kernel ok")

} else if (MACHINE === "cm5") {
    execSync(
        `sudo -k ` +
        `cp -f ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/broadcom/bcm2712-rpi-cm5-cm4io.dtb ${IMAGE_MNT_BOOT}/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree for kernel ok")

    execSync(
        `sudo -k ` +
        `mkdir -p ${IMAGE_MNT_BOOT}/overlays`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })

    execSync(
        `sudo -k ` +
        `cp ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/overlays/*.dtbo ${IMAGE_MNT_BOOT}/overlays/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree overlaysfor kernel ok")

} else if (MACHINE === "rpi4b") {
    execSync(
        `sudo -k ` +
        `cp -f ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/broadcom/bcm2711-rpi-4-b.dtb ${IMAGE_MNT_BOOT}/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree for kernel ok")

    execSync(
        `sudo -k ` +
        `mkdir -p ${IMAGE_MNT_BOOT}/overlays`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })

    execSync(
        `sudo -k ` +
        `cp ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/overlays/*.dtbo ${IMAGE_MNT_BOOT}/overlays/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree overlaysfor kernel ok")

} else if (MACHINE === "cm4") {
    execSync(
        `sudo -k ` +
        `cp -f ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/broadcom/bcm2711-rpi-cm4-io.dtb ${IMAGE_MNT_BOOT}/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree for kernel ok")

    execSync(
        `sudo -k ` +
        `mkdir -p ${IMAGE_MNT_BOOT}/overlays`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })

    execSync(
        `sudo -k ` +
        `cp ${BUILD_PATH}/tmp/${MACHINE}/linux/arch/arm64/boot/dts/overlays/*.dtbo ${IMAGE_MNT_BOOT}/overlays/`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8",
            env: process.env
        })
    logger.success("ok, deploy device tree overlaysfor kernel ok")

} else {
    logger.warn(`no device tree for linux kernel for ${MACHINE}`)
}
