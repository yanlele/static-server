const chalk = require('chalk');
const moment = require('moment');
const now = moment(new Date()).format('YYYY-MM-DD HH:ss:mm');
const month = moment(new Date()).format('YYYY-MM');
const fs = require('fs');
const path = require('path');

// 日志类型文件
const logTypeList = [
    {
        'type': 'info',
        'color': 'gray',
        'icon': '>'
    },
    {
        'type': 'error',
        'color': 'red',
        'icon': '✗'
    },
    {
        'type': 'success',
        'color': 'green',
        'icon': '✔'
    },
    {
        'type': 'trace',
        'color': 'dim',
        'icon': '*'
    },
    {
        'type': 'debug',
        'color': 'blue',
        'icon': '*'
    },
    {
        'type': 'warn',
        'color': 'yellow',
        'icon': '!'
    },
    {
        'type': 'fatal',
        'color': 'bgRed',
        'icon': '✗'
    }
];

// 写入日志
function writeLogFile(options) {
    let filePath = path.resolve(options.defaultPath, options.applicationName + '_' + month + '_' + options.type + '.log');
    fs.writeFile(filePath, options.writeMessage, {
        'flag': 'a'
    }, function (err) {
        if(err) {
            throw new Error('写入文件失败')
        }
    })
}

/**
 * 日志核心类
 * @param options
 * @returns {log} 必须要包含 defaultPath 和 applicationName
 * @constructor
 */
function KoaLog(options) {
    let defaultOptions = {
        defaultPath: __dirname
    };
    let logger = {};                // storage warehouse
    // get package.json name
    try {
        const pkg = require('./package.json');
        if(pkg && pkg.name) {
            defaultOptions.applicationName = pkg.name;
        }
    } catch(e) {
        defaultOptions.applicationName = ''
    }
    options = Object.assign(defaultOptions, options);

    logTypeList.forEach(function (logType) {
        logger[logType.type] = function () {
            let args = Array.prototype.slice.call(arguments, 0);
            let writeMessage = `[${now} - ${logType.type}] ${args}` + '\n';
            if (logType.icon) args = [logType.icon].concat(args);
            let message = `[${now} - ${logType.type}] ${chalk[logType.color].apply(global.console, args)}`;
            global.console.log(message);
            if (logType.type === 'info' || logType.type === 'error' || logType.type === 'fatal') {
                // 如果是这三种情况的日志，就需要输入 到日志文件夹

                fs.exists(options.defaultPath, function (filePathErrorMsg) {
                    if (filePathErrorMsg) {
                        // 文件夹存在 直接写入日志
                        writeLogFile(Object.assign(options, {type: logType.type, writeMessage}));
                    } else {
                        throw new Error('your folder does not exist, create your folder first.');
                    }
                })
            }
        };
    });

    // 异步抛出日志，绑定到 koa ctx 上面
    async function log(ctx, next) {
        ctx.logger = logger;
        await next();
    }
    return log;
}

module.exports = KoaLog;