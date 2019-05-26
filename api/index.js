import express from 'express';
import data from '../src/testData';


const router= express.Router();

router.get('/contests',(req,res)=>{
	res.send({contestsList : data.contests});
})

export default router;