const {
  readFile,
  writeTask,
  handleError,
  writeFile,
} = require("../taskUtility");
const EventEmitter = require("events");
const fs = require("fs");
const taskEvents = new EventEmitter();

/**
 * 
 * @param {*} name 
 * @param {*} duration 
 * @param {*} fileName 
 * @param {*} callback 
 * // Using Callbacks
 * This function adds a task to a JSON file, measures the time taken for the operation, and emits an event upon successful addition.
 * It reads the existing tasks from the specified file, appends the new task, and writes the updated list back to the file.
 * If any error occurs during the process, it is handled by the handleError function.  
 */
function addTask(name, duration, fileName, callback) {
  try {
    const start = process.hrtime.bigint();
    if (!name || typeof duration !== "number") {
      throw new Error("Invalid task data");
    }
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) return callback(err);
      const tasks = JSON.parse(data);
      fs.writeFile(name, JSON.stringify(tasks), (err, result) => {
        const end = process.hrtime.bigint();
        console.log(`Task addition took ${(end - start) / BigInt(1e6)} ms`);
        taskEvents.emit("taskAdded", { name, duration });
        callback(null, `Task "${name}" with duration ${duration}ms added.`);
      });
    });
  } catch (err) {
    handleError(err, name, duration, fileName);
  }
}
addTask("Sample Task 2042", 2100, "task2.json", (err, result) => {
  if (err) console.error(err);
  else console.log(result);
});

taskEvents.on("taskAdded", taskAddedListener);
async function taskAddedListener(task) {
  try {
    await writeFile(
      "taskLog.txt",
      `Event received: Task "${task.name}" added with duration ${task.duration}ms\n`,
      "append"
    );
    console.log(
      `Event received: Task "${task.name}" added with duration ${task.duration}ms`
    );
    // process.emit('SIGINT',true); // Simulate SIGINT for testing
  } catch (err) {
    console.error("Error logging task event:", err);
  }
}

handleEvent = async () => {
  console.log("Received SIGTERM. Gracefully shutting down...");
  await writeFile(
    "taskLog.txt",
    `Received SIGTERM. Gracefully shutting down...\n`,
    "append"
  );
  process.exit(0);
};
process.on("SIGINT", handleEvent);

process.on("SIGTERM", handleEvent);

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await writeFile("taskLog.txt", `'Uncaught Exception:', ${err}`, "append");
  // Optionally log the error to a file or monitoring service
  process.exit(1); // Exit the process to avoid undefined state
});

const nFs = require("fs").promises;

//With Promise
/**
 * 
 * @param {*} name 
 * @param {*} duration 
 * @param {*} fileName 
 * @returns
 * // Using Promises
 * This function adds a task to a JSON file, measures the time taken for the operation, and emits an event upon successful addition.
 * It reads the existing tasks from the specified file, appends the new task, and writes the updated list back to the file.
 * If any error occurs during the process, it is handled by the handleError function.
 */
function addTaskPromise(name, duration, fileName) {
  const start = process.hrtime.bigint();
  if (!name || typeof duration !== "number") {
    throw new Error("Invalid task data");
  }
  nFs
    .readFile(fileName, "utf8")
    .then((data) => {
      const tasks = JSON.parse(data);
      return nFs.writeFile(fileName, JSON.stringify(tasks));
    })
    .then((data) => {
      const end = process.hrtime.bigint();
      console.log(`Task addition took ${(end - start) / BigInt(1e6)} ms`);
      taskEvents.emit("taskAdded", { name, duration });
      console.log(`Task "${name}" with duration ${duration}ms added.`);
    })
    .catch((err) => {
      handleError(err);
    });
}

addTaskPromise("Sample Task 2042", 2100, "task2.json");
