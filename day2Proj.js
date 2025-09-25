/**
 * Streams in Node.js
 * This code demonstrates how to use streams in Node.js to read data from a file in chunks and write it to another file.
 * It creates a readable stream from 'task2.json' and a writable stream to 'taskLog.txt', both with UTF-8 encoding and a highWaterMark of 16 bytes.
 * As data is read in chunks, it is logged to the console and written to the writable stream.
 * When the end of the readable stream is reached, a message is logged and the writable stream is closed.
 * Additionally, the code shows how to pipe the readable stream directly to another writable stream that creates a backup file 'task2_backup.json'.
 * Event listeners are set up to log messages when all data has been written to the backup file.
 * Streams are essential for handling large amounts of data efficiently in Node.js applications, allowing for non-blocking I/O operations and effective memory management.
 * More about streams: https://nodejs.org/api/stream.html
 */

const fs = require('fs');
const readStream = fs.createReadStream('task2.json', { encoding: 'utf8', highWaterMark: 16 });
const writeStream = fs.createWriteStream('taskLog.txt', { encoding: 'utf8', highWaterMark: 16 });
readStream.on('data', (chunk) => {
    console.log('New chunk received:', chunk);
    writeStream.write(chunk);
});

readStream.on('end', () => {
    console.log('No more data to read.');
    writeStream.end();
});
const writeStreamBackup = fs.createWriteStream('task2_backup.json', { encoding: 'utf8', highWaterMark: 16, flush: false });

readStream.pipe(writeStreamBackup);
writeStreamBackup.on('finish', () => {
    console.log('All data written to file.');
});

/**
 * Streams in Node.js are used to handle reading and writing data in a continuous flow, allowing for efficient processing of large files or data sources without loading everything into memory at once.
 * There are four main types of streams:
 * - Readable: Used for reading data from a source (e.g., file, network).
 * - Writable: Used for writing data to a destination (e.g., file, network).
 * - Duplex: A combination of both readable and writable streams (e.g., TCP sockets).
 * - Transform: A type of duplex stream that can modify or transform the data as it is read or written (e.g., zlib compression).
 * Common methods for streams include:
 * - pipe(destination, options): Pipes the readable stream to a writable stream, allowing data to flow from one to the other.
 * - write(chunk, encoding, callback): Writes a chunk of data to a writable stream.
 * - end(chunk, encoding, callback): Signals that no more data will be written to the writable stream.
 * - read(size): Reads up to 'size' bytes of data from a readable stream.
 * Common events include:
 * - 'data': Emitted when a chunk of data is available to read from a readable stream.
 * - 'end': Emitted when there is no more data to read from a readable stream.
 * - 'finish': Emitted when all data has been flushed to the writable stream after end() is called.
 * - 'error': Emitted if an error occurs while reading or writing data.
 * - 'close': Emitted when the stream is closed and no more events will be emitted.
 * Streams are essential for handling large amounts of data efficiently, as they allow for backpressure management and non-blocking I/O operations.
 * encoding option specifies the character encoding for string data read from or written to the stream.
 * highWaterMark option sets the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
 * more about streams: https://nodejs.org/api/stream.html
 * 
 */

/**
 * Streams vs Buffers
 * Buffers are used to handle binary data directly,
 *  while streams provide a way to read or write data in chunks over time.
 * Buffers are fixed-size memory allocations,
 *  whereas streams can handle data of arbitrary size by processing it in smaller pieces.
 * Buffers are suitable for small amounts of data that can fit into memory, 
 * while streams are ideal for large files or data sources that may not fit into memory all at once.
 * Buffers are mutable and can be modified after creation, while streams are event-driven 
 * and operate asynchronously.
 * Buffers are typically used for low-level data manipulation, 
 * while streams are used for high-level data processing and I/O operations.
 * More about Buffers: https://nodejs.org/api/buffer.html
 */