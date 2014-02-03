var PostIt = function(data) {
  this.header = data.header
  this.content = data.content
  var id = data.id

  this.getId = function(){ return id }

  this.update = function(new_data){
    this.header = new_data.header;
    this.content = new_data.content;
  }
};