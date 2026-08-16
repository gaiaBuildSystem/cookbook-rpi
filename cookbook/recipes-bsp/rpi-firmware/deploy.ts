#!/usr/bin/env -S deno run --allow-all

import PATH from "node:path"
import logger from "node-color-log"
import { execSync } from "node:child_process"

// run update in the chroot
logger.info("deploy rpi-firmware ...")

const MACHINE = process.env.MACHINE as string
const BUILD_PATH = process.env.BUILD_PATH as string

// read the meta data
const meta = JSON.parse(process.env.META as string)

// get the actual script path, not the process.cwd
const _path = PATH.dirname(process.argv[1])
const filePath = `${BUILD_PATH}/tmp/${MACHINE}/rpi-firmware/${meta.name}-${MACHINE}.tar.xz`
const untarPath = `${BUILD_PATH}/tmp/${MACHINE}/rpi-firmware/`

const IMAGE_MNT_BOOT = `${BUILD_PATH}/tmp/${MACHINE}/mnt/boot`
const IMAGE_MNT_ROOT = `${BUILD_PATH}/tmp/${MACHINE}/mnt/root`
process.env.IMAGE_MNT_BOOT = IMAGE_MNT_BOOT
process.env.IMAGE_MNT_ROOT = IMAGE_MNT_ROOT

// decompress the tarball to the boot partition
execSync(
    `sudo -k ` +
    `tar -xv --strip-components=1 -f ${filePath} -C ${untarPath}`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })

// copy the boot/ files to the boot partition
execSync(
    `sudo -k ` +
    `cp -r ${untarPath}/boot/* ${IMAGE_MNT_BOOT}/`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })

// overwrite the config.txt
execSync(
    `sudo -k ` +
    `cp -f ${_path}/${MACHINE}/config.txt ${IMAGE_MNT_BOOT}/config.txt`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })

// overwrite the config.txt.bak
execSync(
    `sudo -k ` +
    `cp -f ${_path}/${MACHINE}/config.txt.bak ${IMAGE_MNT_BOOT}/config.txt.bak`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })
logger.success("ok, rpi-firmware is ok")
