import read from "readline-sync";
import fs from "fs/promises";

async function registerUser() {
  let dbRead = await fs.readFile("db.json", "utf-8");

  let convertDb = JSON.parse(dbRead);

  let userInp = read.question("enter a username: ");
  let userPass = read.question("enter a password: ");

  let check = convertDb.users.some((x) => {
    x.username === userInp;
  });

  if (check) {
    console.log("Username already exists!");
  } else {
    console.log("Account created!");
  }

  let newObj = {
    username: userInp,
    password: userPass,
    todos: [],
  };

  convertDb.users.push(newObj);

  let revert = JSON.stringify(convertDb);

  await fs.writeFile("db.json", revert);
}

async function loginUser() {
  let dbRead = await fs.readFile("db.json", "utf-8");

  let convert = JSON.parse(dbRead);

  let userInp = read.question("enter a username: ");
  let userPass = read.question("enter a password: ");

  let check = convert.users.find((x) => {
    return x.username == userInp && x.password === userPass;
  });

  if (check) {
    console.log("Logged in successfully!");
    return check;
  } else {
    console.log("invalid username or pass!");
    return null;
  }
}

async function addTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("login krke aa pehle");
    return;
  }

  let dbRead = await fs.readFile("db.json", "utf-8");

  let finalDb = JSON.parse(dbRead);

  let userTitle = read.question("add a title: ");
  let userDesc = read.question("add a desc: ");

  let check = finalDb.users.find((x) => {
    return x.username === loggedInUser.username;
  });

  let newTask = {
    id: Date.now(),
    Title: userTitle,
    Description: userDesc,
  };

  check.todos.push(newTask);

  let convertBack = JSON.stringify(finalDb);

  await fs.writeFile("db.json", convertBack);

  console.log("Task added successfully!");
}

async function editTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("LOGIN KRKE AA PEHLE!");
    return;
  }

  let dbRead = await fs.readFile("db.json", "utf-8");

  let finalDb = JSON.parse(dbRead);

  let check = finalDb.users.find((x) => {
    return x.username === loggedInUser.username;
  });

  if (check.todos.length === 0) {
    console.log("Task not found!");
  }

  console.log("Your tasks: ");
  check.todos.find((x) => {
    console.log(`${x.id} ${x.Title}`);
  });

  let userInpId = read.questionInt("enter an id: ");
  let task = check.todos.find((x) => {
    return x.id === userInpId;
  });

  if (task) {
    let newTitle = read.question("enter a new title: ");
    let newDes = read.question("enter a new desc: ");
    task.Title = newTitle || task.Title;
    task.Description = newDes || task.Description;

    let convertBack = JSON.stringify(finalDb);
    await fs.writeFile("db.json", convertBack);

    console.log("Task updated successfully!");
  } else {
    console.log("no taks found");
  }
}

async function deleteTask(loggedInUser){
    if(!loggedInUser){
        console.log('Login toh krle pehle!!!');
        return
    }
    let dbRead = await fs.readFile("db.json", "utf-8");
    let finalDb = JSON.stringify(dbRead);

    let check = finalDb.users.find((x)=> {
       return x.username === loggedInUser.username
    });

    if(check.todos.length === 0){
        console.log('No tasks found!');
    }

    console.log('Your tasks: ');
    check.todos.find((x)=> console.log(`${x.id} ${x.Title}`));

    let userInpid = read.questionInt("enter a id: ")
    let task = check.todos.findIndex((x)=> x.id === userInpid)

    if(task> -1){
        check.todos.splice(task, 1);
        let convertBack = JSON.stringify(finalDb);
        await fs.writeFile("db.json", convertBack)
        console.log('Task deleted successfully!');
        
    } else {
        console.log('No taks found!');
        
    }
    
}

export { registerUser, loginUser, addTask, editTask, deleteTask };
