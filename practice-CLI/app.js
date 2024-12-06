import read from "readline-sync";
import {registerUser, loginUser, addTask, editTask, deleteTask} from "./users.js"

async function main(){
  
    let loggedInUser = null;

    while(true){

    const options = [
        'exit',
        'Register',
        'Login',
        'Add task',
        'Edit task',
        'Delete a task'
    ]

    options.map((x, Index)=> {
        console.log(`${Index} ${x}`);
    })

    let userInp = read.questionInt("select an option: ")

    switch(userInp){

        case 0: console.log('Exiting');
        process.exit(0);

        case 1: await registerUser()
        break; 
        case 2: loggedInUser = await loginUser()
        break;
        case 3: await addTask(loggedInUser);
        break;
        case 4: await editTask(loggedInUser)
        break;
        case 5: await deleteTask(loggedInUser);
        break;
        default: console.log('Invalid option');
        break;
    }

   read.question('enter a key to continue..')

    }



}
main()