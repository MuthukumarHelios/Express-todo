//using exports we can access the files in the

var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
mongoose.Promise = global.Promise;

exports.create = function(req, res){
    console.log("create function")
  new Todo({
     content   : req.body.content,
     updated_at: Date.now()
      }).save(function(err, todo, count){
            //res.json(todo);
            res.redirect('/');
    });
};

exports.destroy = function(req, res){
  console.log("delete function");
  Todo.findById(req.params.id, function (err, todo){
    todo.remove( function (err, todo){
        res.redirect('/');
    });
  });
};

exports.edit = function(req, res){
  console.log("edit function");
  Todo.find(function (err, todos){
      //res.json(todos);
    res.render('edit', {
       title:  "express todod",
       todos: todos,
       current: req.params.id
     });
  });
};
 exports.update = function(req, res){
              console.log("update function");
   Todo.findById( req.params.id, function (err, todo, count ){
         todo.content = req.body.content;
          todo.updated_at = Date.now();
            todo.save(function (err, todo, count){
                res.redirect( '/' );
     });
   });
 };

exports.index = function(req, res){
   Todo.find( function (err, todos, count){
          res.render('index', {
              title: "express todo list",
                  todos : todos
              });
    });
};

exports.todo = function(req, res){
       res.render('todo');
};
