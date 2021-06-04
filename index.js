const http = require('http')
const path = require('path')
const fs = require('fs')
const { type } = require('os');
const { extname } = require('path');

const server = http.createServer((req,res)=>{
    
// build a file path     
    
let filePath = path.join(__dirname,'public',req.url === '/' ? 'index.html' : req.url)
let extename = path.extname(filePath)
// init typeContent 
let contentType = 'text/html'

// check the extension and change 
switch (extename) {
    case '.json':
        contentType = 'application/json' 
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.jpg':
        contentType = 'image/jpg';
        break;
    default:
        break;
}
fs.readFile(filePath,(err,content)=>{
    if(err){
        if(err.code == 'ENOENT') {
            // PAGE NOT FOUND
            fs.readFile(path.join(__dirname,'public','404.html') ,(err,content)=>{
                if(err) throw err;
                res.writeHead(200,{'Content-type' : 'text/html'});
                res.end(content);
            })
        } else {
            // server erreur
            res.writeHead(500);
            res.end(`server erreur ${err.code}`)
        }
    } else {
        // Success 
        res.writeHead(200,{'Content-type':contentType})
        res.end(content,'utf8')
    }
})



    
    
    
    
    
    
    
    
    
    
    
    
    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
    //         if(err) throw err;

    //         res.writeHead(200,{'Content-type': 'text/html' })
    //         res.end(content)
    //     })
    // }
    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         if(err) throw err;
    //         res.writeHead(200,{'Content-type': 'text/html' })
    //         res.end(content)

    //     })
    // }
    // if(req.url === '/api/users'){
    //     const users = [
    //         {name :'Bob Smith',age :30},
    //         {name :'haytham bammou',age :20},
    //     ];
    //     res.writeHead(203,{'Content-type' : 'application/json'});
    //     res.end(JSON.stringify(users))
    // }


});

const PORT = process.env.PORT || 5000
server.listen(PORT,()=> console.log(`server runniing on port : ${PORT} ...`))