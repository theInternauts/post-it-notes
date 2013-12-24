var post_group = function(options){
	/*
		This will contain ONLY the id strings of the posts. 
		This will allow for a single post to be in more than one group
	*/
	var list = []
	var id = "group" + Date.now()

	this.name = options.name
	this.getId = function(){ return id }
	this.getList = function(){ return list }
	this.addPost = function(post){
		list.push(post.id)
	}
};