'use strict'

const { spawn, exec } = require('child_process')
const {join} = require('path');
const {mkdirSync} = require('fs');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

function makeWin32TmpDir() {
    const winTmpPath = process.env.TEMP || process.env.TMP ||
        (process.env.SystemRoot || process.env.windir) + '\\temp';
    const randomNumber = Math.floor(Math.random() * 9e7 + 1e7);
    const tmpdir = join(winTmpPath, 'lighthouse.' + randomNumber);

    mkdirSync(tmpdir, {recursive: true});
    return tmpdir;
}

// (async () => {
    // https://stackoverflow.com/questions/56449752/how-to-kill-child-process-close-chrome
    const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
            '--app=http://localhost:8000',
            // '--disable-translate',
            // '--disable-extensions',
            // '--disable-background-networking',
            // '--safebrowsing-disable-auto-update',
            // '--disable-sync',
            // '--metrics-recording-only',
            // '--disable-default-apps',
            // '--mute-audio',
            // '--no-first-run',
            '--user-data-dir='+makeWin32TmpDir(),
        ], {detached: true, stdio: 'ignore'})

    // await sleep(5000);

    // edge.kill();

    try {
        // process.kill(-edge.pid);
        // exec('taskkill /PID ' + edge.pid + ' /T /F', function (error, stdout, stderr) {
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //     if(error !== null) {
        //         console.log('exec error: ' + error);
        //     }
        // });
    } catch (e) {
        console.log(e);
    }
// })();

process.on('SIGINT', function() {
    console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");

    edge.kill();

    console.log("Exiting...");
    process.exit();
});

