#!/opt/bun/bin/bun

import * as FS from "fs"
import * as CRYPTO from "crypto"

import logger from "node-color-log"
import fetch from "node-fetch"

// gaia need to previously set arhitecture and machine
const ARCH = process.env.ARCH as string
const MACHINE = process.env.MACHINE as string
const BUILD_PATH = process.env.BUILD_PATH as string

// read the meta data
const meta = JSON.parse(process.env.META as string)

// parse the url
const distroURL = `${meta.source}/${meta.ref[ARCH]}/${meta.file}`
const filePath = `${BUILD_PATH}/tmp/${MACHINE}/rpi-firmware/${meta.name}-${MACHINE}.tar.xz`

// if clean we clean
if (process.env.CLEAN_IMAGE === "true") {
    logger.debug("cleaning ...")
    if (FS.existsSync(filePath)) {
        FS.unlinkSync(filePath)
    }
}


// check if the file exists
if (FS.existsSync(filePath)) {
    logger.info(`file ${filePath} already exists`)
} else {
    // if the file does not exists, also the directory must not exists
    if (!FS.existsSync(`${BUILD_PATH}/tmp/${MACHINE}/rpi-firmware`)) {
        FS.mkdirSync(`${BUILD_PATH}/tmp/${MACHINE}/rpi-firmware`, { recursive: true })
    }

    // download the firmware tar.gz
    logger.info(`downloading ${distroURL} ...`)

    const res = await fetch(distroURL)
    const buffer = await res.arrayBuffer()

    // write the file
    FS.writeFileSync(filePath, Buffer.from(buffer))
}
