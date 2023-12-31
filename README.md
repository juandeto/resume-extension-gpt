# resume-extension-gpt

## Description

An extension that scrapes the article of the current tab the user is on and with the Chat Gpt API it creates a summary of the content in different formats the user can select: in paragraphs, tweets, bullets. The user also can choose the length of the resume.

## 1. How to start collaborating:
     
a. open a terminal and clone the repo: git clone https://github.com/juandeto/resume-extension-gpt.git
     
b. go into the folder of the project and create a new branch: git checkout -b MYNAME-task-i-am-working-on
     
c. after you finish the task: add the changes you want to save, make a commit and then push the branch to the remote.
     
  
## 2. Structure of the project.
 
      <root>
        ├── client          => this is the extension
        ├── api             => this is the python api
        ├── nfp-deploy      => some bash commands to dpeloy
        
## 3. How to test and develop the extensión.
  
a. open the Chrome browser and click on the *Menu options* (the three points at the right in the bar)
      
b. Go to *Settings*
      
c. Go to *Extensions*
      
d. Make sure *developer mode* is active
      
c. Then grab the folder src and drag it into the browser.
      
d. After this,you will see the extension listed in the *Extensions* menu.

e. Now every time you make a change, you will go back to Settings > Extensions and *reload* the extension. (You will see there's a reload button in the extension block)
      

## 4. To run the API locally

First, make sure you have installed python3 (v. 3.8) and pipenv. 
  - For Windows: https://www.youtube.com/watch?v=l2_5wiYg5dY&ab_channel=CodingEntrepreneurs
  - For MacOs: https://www.youtube.com/watch?v=VdKqxxjUGhQ&ab_channel=CodingEntrepreneurs

a. Open a terminal and navigate to the root/gptapi folder
b. Create a file .env ann add the variable OPENAI_API_KEY. There's a -env-example if you want to checkout.
c. Run the command: pipenv shell
d. Then run the command: uvicorn main:app --reload
e. In your browser go to http://localhost:8000/docs to see the project documentation
