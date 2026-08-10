#!/usr/bin/env -S deno run --allow-all

import PATH from "node:path"
import logger from "node-color-log"
import { execSync } from "node:child_process"

// run update in the chroot
logger.info("patch u-boot common/splash.c ...")

const MACHINE = process.env.MACHINE as string
const BUILD_PATH = process.env.BUILD_PATH as string

// // read the meta data
// const meta = JSON.parse(process.env.META as string)

// get the actual script path, not the process.cwd
const _path = PATH.dirname(process.argv[1])

const IMAGE_MNT_BOOT = `${BUILD_PATH}/tmp/${MACHINE}/mnt/boot`
const IMAGE_MNT_ROOT = `${BUILD_PATH}/tmp/${MACHINE}/mnt/root`
process.env.IMAGE_MNT_BOOT = IMAGE_MNT_BOOT
process.env.IMAGE_MNT_ROOT = IMAGE_MNT_ROOT

if (MACHINE === "rpi4b" || MACHINE === "rpi5b" || MACHINE === "cm5" || MACHINE === "cm4") {
    // apply the splash.c
    execSync(
    `sudo -k ` +
    `cp -f ${_path}/${MACHINE}/splash.c ${BUILD_PATH}/tmp/${MACHINE}/u-boot/common/splash.c`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })
    logger.success("ok, u-boot common/splash.c patched")
} else {
    logger.warn(`no patch for ${MACHINE}`)
}
