/**
 * Demonstrates reading a file stream in chunks using async/await and for-await-of loop.
 * This approach allows handling large files efficiently without loading the entire file into memory.
 * The code reads from 'task2.json' in 16-byte chunks and logs each chunk to the console.
 * It also includes error handling to catch and log any issues that occur during the read process.
 * More about async iteration: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
 * More about fs.createReadStream: https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
 */

const fs = require('fs');

async function readStreamInChunk(filePath, chunkSize = 16) {

    const readStream = await fs.createReadStream(filePath, { highWaterMark: chunkSize, encoding: 'utf8' });
    try {
        for await (const chunk of readStream) {
            console.log('New chunk received:', chunk);
        }
        console.log('Finished reading file with async iterator.');
    }

    catch (err) {
        console.error('Error:', err);
    }
}
readStreamInChunk('task2.json', 16);

/**
 * This code defines an asynchronous function `readStreamInChunk` that reads a file in specified chunk sizes using a readable stream.
 * It utilizes the `for-await-of` loop to asynchronously iterate over the chunks of data as they are read from the stream.
 * The function takes two parameters: `filePath`, which is the path to the file to be read, 
 * and `chunkSize`, which specifies the size of each chunk in bytes (default is 16 bytes).
 * The function creates a readable stream with the specified chunk size and UTF-8 encoding.
 * It then logs each chunk to the console as it is received.
 * Error handling is included to catch and log any issues that occur during the reading process.
 * This approach is efficient for handling large files, as it avoids loading the entire file into memory at once.
 * 
 * 
 * async streams and for-await-of loop:
 * The `for-await-of` loop is a special type of loop in JavaScript that allows you to iterate over asynchronous 
 * iterables, such as streams.
 * When used with a readable stream, it waits for each chunk of data to be available before 
 * proceeding to the next iteration. 
 * 
 * Why useful?
 * This is particularly useful for handling large files or data sources, as it allows you to process data in manageable chunks without blocking the event loop or consuming excessive memory.
 * The loop automatically handles the asynchronous nature of streams, making it easier to work with them in an async/await context.
 * 
 * Common errors:
 * - 'error': Emitted if an error occurs while reading data from the stream.
 * - 'close': Emitted when the stream is closed and no more events will be emitted.
 * 
 * How to handle end of stream?
 * The `for-await-of` loop automatically handles the end of the stream.
 * When the stream has no more data to read, the loop will exit gracefully.
 * You can also listen for the 'end' event on the stream if you need to perform additional actions when the stream ends.
 * how?
 * readStream.on('end', () => {
 *     console.log('No more data to read.');
 * }
 * 
 * anyother way to read stream in chunks?
 * Yes, you can also use the 'data' event to read chunks of data from a readable stream.
 * This approach involves setting up an event listener for the 'data' event, which is emitted whenever a chunk of data is available to read.
 * Here is an example:
 * const readStream = fs.createReadStream('task2.json', { encoding: 'utf8', highWaterMark: 16 });
 * readStream.on('data', (chunk) => {
 *     console.log('New chunk received:', chunk);
 * });
 * readStream.on('end', () => {
 *     console.log('No more data to read.');
 * });
 * readStream.on('error', (err) => {
 *  console.error('Error reading file:', err);
 * });
 * 
 * This method is more traditional and gives you more control over the stream events
 * cons of this method?
 * However, it can be more complex to manage, especially when dealing with backpressure and flow control.
 * The `for-await-of` loop simplifies this by handling the asynchronous iteration for you.
*/



/**
 * tutorial about streams and event emitter
 * Streams in Node.js are built on the EventEmitter class, which allows them to emit and listen for events.
 * Streams are instances of EventEmitter and can emit various events during their lifecycle.
 * Common events emitted by streams include:
 * - 'data': Emitted when a chunk of data is available to read from a readable stream.
 * - 'end': Emitted when there is no more data to read from a readable stream.
 * - 'finish': Emitted when all data has been flushed to the writable stream after end() is called.
 * - 'error': Emitted if an error occurs while reading or writing data.
 * - 'close': Emitted when the stream is closed and no more events will be emitted.
 * Streams use these events to manage the flow of data and handle asynchronous operations efficiently.
 * For example, when reading data from a file using a readable stream, the 'data' event is emitted each time a chunk of data is available, allowing you to process it immediately.
 * When the end of the file is reached, the 'end' event is emitted, signaling that there is no more data to read.
 * Writable streams emit the 'finish' event when all data has been written and the stream is closed.
 * Error handling is also facilitated through the 'error' event, allowing you to respond to issues that may arise during stream operations.
 * Overall, the EventEmitter class provides the foundation for the event-driven architecture of streams in Node.js, enabling efficient and responsive data processing.
 * More about EventEmitter: https://nodejs.org/api/events.html
 */