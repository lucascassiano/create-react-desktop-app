#!/usr/bin/env node

var shell = require("shelljs");
var path = require("path");
var fs = require("fs");
var ncp = require('ncp').ncp;
var colors = require('colors');

const commandLineArgs = require('command-line-args')

const optionDefinitions = [
    { name: 'directory', alias: 'd', type: String, defaultOption: true },
    { name: 'latest', alias: 'l', type: Boolean },
    { name: 'python', alias: 'p', type: Boolean },
];

const options = commandLineArgs(optionDefinitions);

var workingDirectory = path.resolve("./");
var templateDirectory = path.join(__dirname, "template");

var directoryName = process.argv[2];
var directory = path.join(workingDirectory, directoryName);


console.clear();
console.log(`🚀 [---] Creating App: ${directoryName}`.cyan);
console.log("📁 [#--] Creating directory ${directory".green);

fs.mkdirSync(directory);

/*
if (options.latest) {
    CloneFromGit();
}

else {
    CloneFromTemplate();
}
*/

CloneFromTemplate();

function CloneFromGit() {
    var command = `git clone https://github.com/lucascassiano/react-electron-parcel/ ${directoryName}
    cd ${directoryName}
    npm install 
    npm start
    `
    shell.exec(command);
}

function CloneFromTemplate() {
    ncp.limit = 20;
    ncp(templateDirectory, directory, function (err) {
        if (err) {
            return console.error(err.toString().red);
        }
        
        console.log('🚀 [##-] Installing npm Dependencies and rebuilding native modules... this may take couple minutes'.green);

        shell.exec(`cd ${directoryName}
            npm install
        `);
        
        console.log(`🚀 [###] App Created ✅ `.green);
        console.log("to run the app:");

        console.log(`
            \n
            \ncd ${options.directory}
npm start
`);
    });
}

