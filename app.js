import read from "readline-sync"
import chalk from "chalk"
import {registerTheUser, loggingInUser} from "./users/index.js";

async function toDoCli(){
 
    console.clear();
    console.log(chalk.bgBlueBright('************'));
    console.log(chalk.bgCyanBright('----todo----'));
    console.log(chalk.bgGreenBright('***********'));
    
    const options = ['exit', 'Register', 'Login', 'Add a task']
    
    options.map((x, indexVal)=> {
        console.log(`${indexVal}.${x}`);
    })

    let userOption = read.questionInt("Enter Any Option: ");

    switch(userOption){
        case 1: await registerTheUser()
        break;
        case 2: await loggingInUser()
        break;
        case 3: await addTask();
        break;
    }

}
toDoCli()