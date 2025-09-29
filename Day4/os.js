/**
| Method          | Description              | Example                            |
| --------------- | ------------------------ | ---------------------------------- |
| `os.platform()` | Operating system         | `'win32'`, `'linux'`, `'darwin'`   |
| `os.type()`     | OS name                  | `'Windows_NT'`, `'Linux'`          |
| `os.cpus()`     | CPU info                 | Returns array of CPU cores         |
| `os.freemem()`  | Free memory (bytes)      | `os.freemem() / 1024 / 1024` → MB  |
| `os.totalmem()` | Total memory (bytes)     | `os.totalmem() / 1024 / 1024` → MB |
| `os.homedir()`  | Home directory           | `C:\Users\User`                    |
| `os.uptime()`   | System uptime in seconds | 5400 → 1.5 hours                   |
 */

const os = require('os');

console.log('Platform:', os.platform());
console.log('CPU Cores:', os.cpus().length);
console.log('Free Memory (MB):', (os.freemem() / 1024 / 1024).toFixed(2));
console.log('Total Memory (MB):', (os.totalmem() / 1024 / 1024).toFixed(2));
console.log('Home Directory:', os.homedir());
console.log('System Uptime (Hours):', (os.uptime() / 3600).toFixed(2));
/**
 * This code demonstrates the use of the Node.js os module to retrieve and display various system-related information.
 * It logs the operating system platform, number of CPU cores, free and total memory in megabytes, home directory path, and system uptime in hours.
 * The os module provides a simple way to access operating system details, which can be useful for monitoring system performance or adapting application behavior based on the environment.
 */
