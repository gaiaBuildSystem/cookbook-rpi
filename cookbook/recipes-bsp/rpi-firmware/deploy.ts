#!/opt/bun/bin/bun

import PATH from "path"
import FS from "fs"
import logger from "node-color-log"
import { execSync } from "child_process"

// run update in the chroot
logger.info("deploy os-release ...")

const ARCH = process.env.ARCH as string
const MACHINE = process.env.MACHINE as string
const MAX_IMG_SIZE = process.env.MAX_IMG_SIZE as string
const BUILD_PATH = process.env.BUILD_PATH as string
const DISTRO_MAJOR = process.env.DISTRO_MAJOR as string
const DISTRO_MINOR = process.env.DISTRO_MINOR as string
const DISTRO_PATCH = process.env.DISTRO_PATCH as string
const USER_PASSWD = process.env.USER_PASSWD as string

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
    `echo ${USER_PASSWD} | sudo -k -E -S ` +
    `tar -xv --strip-components=1 -f ${filePath} -C ${untarPath}`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })

// copy the boot/ files to the boot partition
execSync(
    `echo ${USER_PASSWD} | sudo -k -E -S ` +
    `cp -r ${untarPath}/boot/* ${IMAGE_MNT_BOOT}/`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })

// overwrite the config.txt
execSync(
    `echo ${USER_PASSWD} | sudo -k -E -S ` +
    `cp -f ${_path}/${MACHINE}/config.txt ${IMAGE_MNT_BOOT}/config.txt`,
    {
        shell: "/bin/bash",
        stdio: "inherit",
        encoding: "utf-8",
        env: process.env
    })
logger.success("ok, rpi-firmware is ok")
