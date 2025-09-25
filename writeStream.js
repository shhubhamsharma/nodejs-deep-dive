/**
 * Create a writable stream to a file named 'task2Log.txt' with UTF-8 encoding and a highWaterMark of 16 bytes.
 * Write multiple lines of text to the stream, ending with a final line.
 * Set up event listeners to log messages when all data has been written or if an error occurs during writing.
 * This code demonstrates how to use Node.js writable streams for efficient file writing operations.
 * 
 */
const fs= require('fs');

const writeStream= fs.createWriteStream('task2Log.txt',{encoding:'utf8',highWaterMark:16});
writeStream.write('First line\n');
writeStream.write('Second line\n');
writeStream.write('Third line\n');
writeStream.end('Last line\n');

writeStream.on('finish',()=>{
    console.log('All data written to file.');
});
writeStream.on('error',(err)=>{
    console.error('Error writing to file:',err);
});

/**
 * Writable streams in Node.js are used to write data to a destination, such as a file or network socket.
 * They are instances of the Writable class from the 'stream' module.
 * Common methods include:
 * - write(chunk, encoding, callback): Writes a chunk of data to the stream. The encoding is optional and defaults to 'utf8' for string data. The callback is called when the data has been flushed.
 * - end(chunk, encoding, callback): Signals that no more data will be written to the stream. Optionally, a final chunk can be written before ending.
 * - cork(): Temporarily stops the flow of data, allowing multiple writes to be buffered and sent in a single operation when uncork() is called.
 * - uncork(): Resumes the flow of data after a cork() call, flushing any buffered writes.
 * Common events include:
 * - 'finish': Emitted when all data has been flushed to the underlying system after end() is called.
 * - 'error': Emitted if an error occurs during writing.
 * - 'drain': Emitted when the internal buffer is emptied, indicating it's safe to write more data.
 * Writable streams are essential for handling large amounts of data efficiently, as they allow for backpressure management and non-blocking I/O operations.
 * encoding option specifies the character encoding for string data written to the stream.
 * highWaterMark option sets the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
 * more about writable
 */
