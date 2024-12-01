import read from "readline-sync";
import fs from "fs/promises";

async function registerTheUser() {
  let dbRead = await fs.readFile("./db.json", "utf-8");

  let finalDb = JSON.parse(dbRead);

  let userInp = read.question("enter the username: ");
  let userPass = read.question("enter a password: ");

  let check = finalDb.users.some(
    (x) => x.username === userInp || x.paassword === userPass
  );
  if (check) {
    console.log("username or password already exists");
  } else {
    console.log("your account has been created successfully!");
  }

  let obj = {
    username: userInp,
    paassword: userPass,
  };

  finalDb.users.push(obj);

  let convertDb = JSON.stringify(finalDb);

  await fs.writeFile("./db.json", convertDb);
}

async function loggingInUser() {
  let dbRead = await fs.readFile("./db.json", "utf-8");
  let finalDb = JSON.parse(dbRead);

  let userInp = read.question("Enter the username: ");
  let userPass = read.question("enter the password: ");

  let check = finalDb.users.find(
    (x) => x.username === userInp && x.userPass === userPass
  );
  if (check) {
    console.log("Logged in successfully!");
    let userTask = read.question("Add a new task: ");

    let obj = {
      username: userInp,
      paassword: userPass,
      AddedTask: userTask,
    };
  
    finalDb.users.push(obj);
  
    let convertDb = JSON.stringify(finalDb);
  
    await fs.writeFile("./db.json", convertDb);
    console.log('Your new task is added successfully!');
  
    
  } else {
    console.log("Wrong username or password!");
  }

 
}

export { registerTheUser, loggingInUser };
