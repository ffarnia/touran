import config,{nodeEnv,logStar} from './config';
import http from 'http';
import https from 'https';
import express from 'express';
import routerApi from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
/*
console.log(config,nodeEnv);
logStar('salam');

https.get('https://www.gmail.com',res =>{console.log('Status is: ',res.statusCode)});

const server = http.createServer((req,res) =>{res.write('Hello world')
setTimeout(()=>{res.end()},3000)});
server.listen(8081);*/

const server = express();
server.use(bodyParser.json());

//import './serverRender';
server.listen(config.port,config.host,()=>{
	console.info('Express server is ready on port: ',config.port);
});

server.get('/',(req,res)=>{
	// res.send('Hello world refigh');
	res.render('index',{
		content : 'Hi EJS template'
	})
});

server.get('/a',(req,res)=>{
	res.send('Hi Dear');
});

server.use(express.static('public'));
server.use('/api',routerApi);
server.use(sassMiddleware({
	src:path.join(__dirname,'sass'),
	dest:path.join(__dirname,'public')
}));

server.set('view engine','ejs');

