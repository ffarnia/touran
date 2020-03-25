import express from 'express';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import config from '../Config';

let mdb;
MongoClient.connect(config.mongodbUri,{useNewUrlParser: true},(err,client)=>{
  assert.equal(null,err);
  mdb = client.db('test');
});

const router= express.Router();


router.get('/contests',(req,res)=>{
  let contests = {};
  mdb.collection('contests').find({})
    .project({
      id:1,
      categoryName:1,
      contestName:1
    })
    .each((err,contest)=>{
      assert.equal(null,err);
      if (!contest) {
        res.send({contests});
        return;
      }

      contests[contest.id] = contest;

    });

});


router.get('/names/:nameIds',(req,res)=>{
  const nameIdList = req.params.nameIds.split(',').map(Number);
  let names = {};
  mdb.collection('names').find({id: {$in: nameIdList}})
    .each((err,name)=>{
      assert.equal(null,err);
      if (!name) {
        res.send({names});
        return;
      }

      names[name.id] = name;

    });

});


router.get('/contests/:contestId',(req,res)=>{
  mdb.collection('contests').findOne({id: Number(req.params.contestId)})
    .then(contest => res.send(contest))
    .catch(console.err);
});


router.post('/names',(req,res)=>{
  const newName=req.body.newName;
  const newId=req.body.newId;
  const contestId = req.body.contestId;

  mdb.collection('names').insertOne({name:newName,id:newId})
    .then(result => {
      mdb.collection('contests').findAndModify(
		
        {id: contestId},
        [['id','asc']],
        {$push: {nameIds: newId}},
        {new: true}
      ).then(doc =>{
        res.send({
          updatedContest: doc.value,
          insertedName: {_id:result.insertedId,newName}
        });
      })
        .catch(err => {
          console.error(err);
        });
    });	
});

export default router;