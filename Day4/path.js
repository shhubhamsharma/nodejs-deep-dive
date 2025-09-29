const path = require('path');// Import the path module
//Benefit of path module
//1. Cross-Platform Compatibility: The path module handles differences in file path formats across operating systems (e.g., Windows vs. Unix-based systems).
//2. Path Manipulation: It provides methods to easily manipulate file and directory paths, such as joining, resolving, and normalizing paths.
//3. File Extension Handling: The module includes functions to extract file extensions and base names from file paths.
//4. Directory Traversal: It helps in navigating through directory structures by providing methods to get parent directories and relative paths.

// const filePath = path.join(__dirname, 'task2.json'); // task2.json doesnt exist in this directory
const filePath = path.join(__dirname, '..', '../task2.json');


// Create a file path by joining the current directory with 'task2.json'
/**
 * __dirname: This is a Node.js global variable that contains the directory name of the current module. 
 * It provides the absolute path to the directory where the currently executing script resides.
 * path.join(): This method from the path module is used to join multiple path segments into a single path. 
 * It takes care of inserting the appropriate path separators based on the operating system (e.g., '/' for Unix-based systems and '\' for Windows).
 * 'task2.json': This is the name of the file we want to create a path for. By joining it with __dirname, 
 * we ensure that the resulting filePath points to 'task2.json' located in the same directory as the 
 * current script.
 */
console.log('File Path:', filePath);

const baseName = path.basename(filePath);
console.log('Base Name:', baseName);

const extName = path.extname(filePath);
console.log('Extension:', extName);

const dirName = path.dirname(filePath);
console.log('Directory:', dirName);

/**
 * This code demonstrates the use of the Node.js path module to manipulate and extract information from file paths.
 * It constructs a file path to 'task2.json' located in the parent directory of the current script's directory.
 * The code then extracts and logs the base name (file name with extension), file extension, and directory name from the constructed file path.
 */

/**
 * | Method            | Description                        | Example                                                    |
| ----------------- | ---------------------------------- | ---------------------------------------------------------- |
| `path.join()`     | Join multiple path segments        | `path.join(__dirname, 'logs', 'taskLog.txt')`              |
| `path.resolve()`  | Converts relative path to absolute | `path.resolve('logs', 'taskLog.txt')`                      |
| `path.basename()` | Get filename from path             | `path.basename('/home/user/taskLog.txt') // 'taskLog.txt'` |
| `path.dirname()`  | Get directory name                 | `path.dirname('/home/user/taskLog.txt') // '/home/user'`   |
| `path.extname()`  | Get file extension                 | `path.extname('taskLog.txt') // '.txt'`                    |
| `path.parse()`    | Parse path into object             | `path.parse('/home/user/taskLog.txt')`                     |

 */
