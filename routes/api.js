
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.use(function(req, res, next){

	if(req.method === 'GET'){
		return next();
	}

	if(!req.isAuthenticated()){
		return res.redirect('/#login');
	}

	//user authenticated, continue to next middleware
	return next();
});

router.route('/posts')
.get(function(req, res){
	Post.find(function(err, posts){
		if(err){
			return res.send(500,err);
		}
		return res.json(posts);
	});
})
.post(function(req, res){
	console.log(req.body);
	console.log(req.body.text+","+req.body.username)
	var newPost = new Post();
	newPost.text = req.body.text;
	newPost.username = req.body.username;
	newPost.save(function(err, post){
		if(err){
			res.send(500, err);
		}
		res.json(post);
	});
});


router.route('/posts/:id')
.get(function(req, res){
	Post.findById(req.params.id, function(err, data){
		if(err){
			res.send(err);
		}
		res.json(data);
	});
})
.put(function(req, res){
	console.log(req.body);
	Post.findById(req.params.id, function(err, post){
		if(err){
			res.send(err);
		}
		post.username = req.body.username;
		post.text = req.body.text;
		post.save(function(err, data){
			if(err){
				res.send(err);
			}
			res.json(err); 
		});
	})
})
.delete(function(req, res){
	Post.remove({_id: req.params.id}, function(err, data){
		if(err){
			res.send(err);
		}
		res.send("Deleted...");
	})
});

module.exports = router;