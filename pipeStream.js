/**
 * @fileOverview This file demonstrates how to use piping in Node.js to transfer data from a readable stream to a writable stream.
 * It creates a readable stream from a file named 'task2.json' and a writable stream to a file named 'task2.txt'.
 * The readable stream is piped directly into the writable stream, allowing data to flow from the source file to the destination file efficiently.
 */
const fs= require('fs');
const readableStream = fs.createReadStream('task2.json',{encoding:'utf8',highWaterMark:16});
const writeStream= fs.createWriteStream('task2.txt',{encoding:'utf8',highWaterMark:16});
readableStream.pipe(writeStream);

writeStream.on('finish',()=>{
    console.log('All data written to file.');
});

/**
 * Piping in Node.js is a mechanism that allows you to connect a readable stream to a writable stream, enabling data to flow from the source to the destination automatically.
 * The pipe() method is used to set up this connection.
 * When you call readableStream.pipe(writableStream), it takes care of reading data from the readable stream and writing it to the writable stream in chunks, managing backpressure and flow control for you.
 * Common events associated with piping include:
 * - 'finish': Emitted when all data has been flushed to the writable stream after the end() method is called.
 * - 'error': Emitted if an error occurs in either the readable or writable stream during the piping process.
 * Piping is particularly useful for handling large amounts of data efficiently, as it allows for non-blocking I/O operations and automatic management of data flow between streams.
 */