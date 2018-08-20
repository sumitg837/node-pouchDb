const db = require('../../db').db
const remoteDB = require('../../db').remoteDB
const config = require('../../config')

exports.index = (req, res)=>{
    res.render('index', {env: config.EnvConfig})
}

exports.show = (req, res)=>{
  db.allDocs({
      include_docs: true,
      descending:true
    }).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    res.send(error);
  })
}

exports.store = (req, res)=>{
  try{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var now = Date.now();
    db.put({
      _id : now.toString(),
      name : name,
      email: email,
      password: password
    }).then((result)=>{
      res.send({status: '200', data:result, error: false});
    }).catch((error)=>{
      res.send({status: '400', data:{}, error: true});
    })
  }catch(error){
    res.send({status: '500', data:{}, error: true});
  }
}

exports.edit = (req, res)=>{
  try{
    var _id = req.params.id;
    db.get(_id).then((doc)=>{
      res.send({status: '200', data:doc, error: false});
    }).catch((error)=>{
      res.send({status: '400', data:{}, error: true});
    })
  }catch(error){
    res.send({status: '500', data:{}, error: true});
  }
}

exports.update = (req, res)=>{
  try{
    var _id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    db.get(_id).then((doc)=>{
      doc.name = name;
      doc.email = email;
      doc.password = password;
      db.put(doc).then((result)=>{
        res.send({status: '200', data:result, error: false});
      }).catch((error)=>{
        res.send({status: '400', data:{}, error: true});
      })
    }).catch((error)=>{
      res.send({status: '500', data:{}, error: true});
    })
  }catch(error){
    console.log(error);
  }
}

exports.destroy = (req, res)=>{
  try{
    var _id = req.params.id;
    db.get(_id).then(function (doc) {
          return db.remove(doc);
      }).then(function (result) {
        res.send({status: '200', data:result, error: false});
      }).catch(function (err) {
        res.send({status: '400', data:{}, error: true});
      });
  }catch(error){
    res.send({status: '500', data:{}, error: true});
  }
}
