const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion  = async (q) => {
    return new Promise((resolve,reject)=>{
    readline.question(q, answer => {
        console.log(`Answer: ${answer}!`);
        readline.close();
        resolve(answer);
      });
  })
}

const readProjectSettings = async () =>{
    const app_name = await askQuestion('Application Name?');
    const description = await askQuestion('Do you want to add description? <Enter to leave it blank');
    const git_hub_url = await askQuestion('git hub Url? <Enter to leave it blank');
    const author = await askQuestion('Author? <Enter to leave it blank');
    console.log('askAllQs  resp',resp);
}

readProjectSettings();


