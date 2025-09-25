const fs= require('fs');
const readStream = fs.createReadStream('task2.json',{encoding:'utf8',highWaterMark:16});

readStream.on('data',(chunk)=>{
    console.log('New chunk received:',chunk);
});

readStream.on('end',()=>{
    console.log('No more data to read.');
});

readStream.on('error',(err)=>{
    console.error('Error reading file:',err);
});

/**
 * Readable streams in Node.js are used to read data from a source, such as a file or network socket.
 * They are instances of the Readable class from the 'stream' module.
 * Common methods include:
 * - read(size): Reads up to 'size' bytes of data from the stream. If no size is specified, it reads all available data.
 * - setEncoding(encoding): Sets the character encoding for the stream, allowing data to be read as strings instead of Buffers.
 * - pause(): Pauses the flow of data, preventing 'data' events from being emitted.
 * - resume(): Resumes the flow of data after a pause, allowing 'data' events to be emitted again.
 * - pipe(destination, options): Pipes the readable stream to a writable stream, allowing data to flow from one to the other.
 * Common events include:
 * - 'data': Emitted when a chunk of data is available to read.
 * - 'end': Emitted when there is no more data to read.
 * - 'error': Emitted if an error occurs while reading data.
 * - 'close': Emitted when the stream is closed and no more events will be emitted.
 * Readable streams are essential for handling large amounts of data efficiently, as they allow for backpressure management and non-blocking I/O operations.
 * encoding option specifies the character encoding for string data read from the stream.
 * highWaterMark option sets the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
 * more about readable streams: https://nodejs.org/api/stream.html#stream_readable_streams
 */