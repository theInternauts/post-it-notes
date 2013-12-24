var post_group = function(options){
  /*
  This will contain ONLY the id strings of the posts. 
  This will allow for a single post to be in more than one group...eventually
  */
  var list = []
  var id = "group" + Date.now()

  this.name = options.name
  this.getId = function(){ return id }
  this.getList = function(){ return list }
  this.addPost = function(post){
    list.push(post.getId())
  }
  this.removePost = function(post){
    remove_reflow(post.getId(),list)
  }

  function remove_reflow(id, collection){
    var isFound = false;
    var pid
    for(var i=0; i<collection.length; i++){
      pid = collection[i]
      if(pid == id && !isFound){
        isFound = true;
        pid.destroy;
      }

      if(isFound){
        collection[i] = collection[i+1];
      }
    }
    if(isFound){
      collection.pop();
    }
    return isFound;
  };
};