const http = require('http')
const express =require('express')

// server configs
const port = 3001
const app = express();
app.use(express.urlencoded({ extended: false }));

// assignment variables 
const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Greeting</title>
            </head>
            <body>
                <h1>Hello, welcome to my page!</h1>
                <p>Have a great day 😊</p>

                <h2>Users</h2>
                <ul>
                {{USER_LIST}}
                </ul>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <button type="submit">Create user</button>
                </form>
            </body>
            </html>
        `
const users = ['user1','user2','user3','user4']


app.post('/create-user',(req,res,next)=>{
    console.log("at create user")
    console.log('Submitted username:', req.body.username);
    if(req.body.username){
        users.push(req.body.username)
    }
    res.redirect('/')
})

app.use('/',(req,res,next)=>{
    console.log('at home')
    const usersHtml = `${users.map(user => `<li>${user}</li>`).join(' ')}` 
    const updatedHtml = html.replace('{{USER_LIST}}',usersHtml)

    res.send(updatedHtml)
    next();

})



//Create server
const server = http.createServer((req,res)=>{
    const url = req.url
    const method = req.method

    if(url === '/'){
        res.setHeader('Content-Type','text/html')
        const usersHtml = `${users.map(user => `<li>${user}</li>`).join(' ')}` 
        var updatedHtml = html.replace('{{USER_LIST}}',usersHtml)
        res.write(updatedHtml)
        return res.end()
    }
    if(url ==='/create-user' && method === 'POST'){
        const body =[]
        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        
        req.on('end',()=>{
            const userName = body.toString().split('=')[1]
            users.push(userName)
            res.statusCode = 302
            res.setHeader('Location','/')
            return res.end()
        })
        return
    }

})

app.listen(3001)