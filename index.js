const inquirer = require('inquirer');
const fs = require('fs');


inquirer.prompt([
    {
       type: 'input',
        message: 'Please enter your GitHub profile URL:',
        name: 'github',
    },
    {
       type: 'input',
        message:'Please enter an email to contact you at:',
        name: 'email',
    },
    {
       type: 'input',
        message: 'Title of Project:',
        name: 'title',
    },
    {
       type: 'input',
        message: 'Description:',
        name: 'description',
    },
    {
       type: 'checkbox',
        message: 'Click those that apply:',
        choices: ["Installation", "License","Usage", "Contributing", "Testing Instructions", "Questions"],
        checked: 'true',
        name: 'toc',
    },
    {
       type: 'list',
        message: 'Choose license:',
        choices: ["Gitlab", "Apache", "GitHub"],
        name: 'license',
    },
    {
       type: 'input',
        message: 'Installation details:',
        name: 'install',
    },
    {
       type: 'input',
        message: 'Usage details:',
        name: 'usage',
    },
    {
       type: 'input',
        message: 'How can others contribute:',
        name: 'contribute',
    },
    {
       type: 'input',
        message: 'Test instructions:',
        name: 'test'
    },
])
.then((ans)=>{

    console.log(JSON.stringify(ans));
    
//function to generate README according to user input
function generateReadMe(){
    return  `# ${ans.title}
${(()=>{
    //generating badge section
    
        if(ans.license == "Gitlab"){
           var badge = `![Badge License](https://img.shields.io/static/v1?label=License&message=GitLab&color=brightgreen)`
        } else if(ans.license == "GitHub"){
          badge = `![Badge License](https://img.shields.io/static/v1?label=license&message=GitHub&color=brightgreen)`
        } else if(ans.license == "Apache"){
           badge =`![Badge License](https://img.shields.io/static/v1?label=license&message=Apache&color=brightgreen)`
        }
        console.log(badge);
        return `${badge}`;
    
})()}

## Description
${ans.description}
               
${(()=>{
    //table of contents section
    var item = `\n - [${ans.toc[0]}](#ans.toc[0])`
    var i =1;
    //while loop to access the choices array and print them in the return statement
    while(i<6){
        if(ans.toc[i]){
            
           item = item + `\n - [${ans.toc[i]}](#ans.toc[i])`
            
        }
        i+=1;
    }return `## Table of Contents` + `${item}`
})()}

${(()=>{
    //installation section
if(ans.install !== ''){
return`## [Install](#install) 
${ans.install}`
} else{return `${ans.install}`}
})()}

${(()=>{
    //license section
    
if(ans.license == "Gitlab"){
return`## [License](#license) 
This project is covered by the Gitlab license.`
} else if(ans.license == "GitHub"){
return`## [License](#license)
This project is covered by the Github license.`
} else if(ans.license == "Apache"){
return`## [License](#license)
This project is covered by the Apache license.`
}
})()}
          
${(()=>{
    //usage section
if(ans.usage !== ''){
return`## [Usage](#usage) 
${ans.usage}`
} else{return `${ans.usage}`}
})()}
        
${(()=>{
    //contribute section
if(ans.contribute !== ''){
return`## [Contribute](#contribute) 
${ans.contribute}`
} else{return `${ans.contribute}`}
})()}

${(()=>{
    //testing instructions section
if(ans.test !== ''){
return`## [Test](#test) 
${ans.test}`
} else{return `${ans.test}`}
})()}
          
## [Questions](#question)
Please contact me for further questions:
[My GitHub](${ans.github})

[${ans.email}](${ans.email})
`
};

    

    const content = generateReadMe(ans);
    
    //generate README file
    fs.writeFile('user.md', content, (error, data)=>{
        if(error){
            console.log(error);
        } else {
            console.log('yay');
        }
    })


    
})