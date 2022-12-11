
var Userdb = require('../model/model');


// create and save new user

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }

    // neew user

    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in database

    user
    .save(user)
    .then(data =>{
        // res.send(data);
        res.redirect("/add-user")
    })
    .catch(err=>{
        res.status(500).send({
           message: err.message || "some errror occured ediot" 
        });
    });

}

// retrieve and return all users and return a single  user

exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `cannot find user with id = ${id}`})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message: "error retrieving user with id=" + id})
        })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "error occured while retrieving"})
        })
    }

}

// update a new identified user by user id

exports.update = (req,res) =>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"data to update cannot be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update user with ${id}.`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message: "error Update user information"})
    })
}

// delete a user with specified user id 

exports.delete = (req,res) =>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot delete with id ${id}.maybe id is wrong.`})
        }else{
            res.send({
                message:"user was deleted succesfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "could no be deleted with user id =" + id
        });
    });
}