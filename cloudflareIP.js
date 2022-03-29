const range_check = require("range_check");

module.exports = class cloudflareIP {
    constructor(range) {
        if (!range) range = require('./defaultCloudflareIP.json')
        this.range = range;
    }

    isCloudflareIP(req) {
        let headerIP = req.headers['cf-connecting-ip'];
        if (!headerIP) return false;

        let IP = req.connection.remoteAddress || req.remoteAddress;
        if (!range_check.isIP(IP)) return false;
        let IPver = range_check.version(IP);
        if (IPver === 4) return range_check.inRange(IP, this.range.v4);
        if (IPver === 6) return range_check.inRange(IP, this.range.v6);
        return false;

    }

    getRealIP(req) {
        let headerIP = req.headers['cf-connecting-ip'];
        let IP = req.connection.remoteAddress || req.remoteAddress;
        if (!headerIP) return IP;
        return headerIP;
    }
}