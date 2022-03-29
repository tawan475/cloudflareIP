const range_check = require("range_check");
const ipaddr = require("ipaddr.js");

module.exports = class cloudflareIP {
    constructor(range) {
        if (!range) range = require('./defaultCloudflareIP.json')
        this.range = range;
    }

    isCloudflareIP(req) {
        let ip = req.socket.remoteAddress || req.remoteAddress;
        if (!ipaddr.isValid(ip)) return false;
        let processedIp = ipaddr.process(ip);

        if (processedIp instanceof ipaddr.IPv4) {
            return range_check.inRange(processedIp.toString(), range.v4)
        }

        if (processedIp instanceof ipaddr.IPv6) {
            return range_check.inRange(processedIp.toString(), range.v6)
        }

        return false;
    }
}