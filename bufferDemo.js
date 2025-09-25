const fs = require('fs');

const data=Buffer.from('Hello Buffer','utf8');
console.log('Buffer data:',data);
console.log('Buffer length:',data.length);
console.log('Buffer toString:',data.toString('utf8'));
console.log('Buffer Slice:',data.slice(1,3).toString());

/**
 * Buffer is a global object in Node.js that provides a way to work with binary data directly.
 * Buffers are instances of the Buffer class, which is a subclass of Uint8Array.
 * They are used to handle raw binary data, such as reading from files or network streams.
 * Buffers can be created from strings, arrays, or by allocating a specific size.
 * Buffers are mutable, meaning their contents can be changed after creation.
 * Common methods include:
 * - Buffer.from(string, encoding): Creates a buffer from a string with the specified encoding.
 * - buf.toString(encoding): Converts the buffer back to a string using the specified encoding.
 * - buf.slice(start, end): Creates a new buffer that references the same memory as the original, but offset and cropped by the start and end indices.
 * - buf.length: Returns the size of the buffer in bytes.
 * Buffers are essential for handling binary data efficiently in Node.js applications, especially for I/O operations.
 * 
 */
//read partial file using buffer

//read 10 bytes from offset 5
const fd = fs.openSync('data1.txt','r');//open file in read mode 
const buffer =Buffer.alloc(5); //allocate a buffer of 50 bytes
fs.readSync(fd,buffer,0,5,5); //read 5 bytes from offset 5 in file to buffer starting at position 0
console.log('Read from file:',buffer.toString('utf8',0,5)); //read 10 bytes from offset 5
console.log('Read from file:',buffer.toString('hex')); //read 10 bytes from offset 5

fs.closeSync(fd);


/**
 * This code demonstrates how to use Node.js Buffers to read a specific portion of a file.
 * It opens a file named 'data1.txt' in read mode, allocates a buffer of 50 bytes, and reads 10 bytes starting from the 5th byte of the file into the buffer.
 * The read data is then converted to a UTF-8 string and printed to the console.
 * Finally, the file descriptor is closed to free up system resources.
 * This approach is useful for efficiently handling binary data and performing partial reads from files in Node.js applications.
 */