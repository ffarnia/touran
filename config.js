
const env=process.env;

export default {
	mongodbUri: 'mongodb://localhost:27017/test',
	port: env.PORT || 8081,
	host: env.HOST || '0.0.0.0',
	get serverUrl(){
		return `http://${this.host}:${this.port}`;
	}
};

export const nodeEnv= env.NODE_ENV || 'development';

export const logStar = function(message){
	console.log(message);
};