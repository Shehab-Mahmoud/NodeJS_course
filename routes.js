const fs = require('fs');
const requestHandler = (req,res) =>{
    const url = req.url
    const method = req.method
    if(url=='/'){
        res.write('<html>')
        res.write('<head><title> Response </title></head>')
        res.write('<body><form action = "/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>')
        res.write('</html>')
        return res.end()
    }


    if (url==='/message' && method === 'POST') {
        console.log("entered message")
        const body = [];

        req.on('data',(chunk) => {
            console.log('recived chunk:',chunk)
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('messageFile.txt',message,(err) => {
                console.log('write')
                res.statusCode = 302;
                res.setHeader('Location','/')
                return res.end()
            })
            console.log(parsedBody)
        });
        return
    }

    //res.setHeader('Content-Type','text/html');
    console.log('default')
    res.write('<html>')
    res.write('<head><title> Response </title></head>')
    res.write('<body> response from node </body>')
    res.write('</html>')
    res.end()
    
}

module.exports = requestHandler;
