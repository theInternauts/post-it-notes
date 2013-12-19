

var Board = function( selector ) {
  var list = [];
  var $elem = $( selector );

  function initialize() {
    $elem.on('dblclick' , function(event){
      pos = {top: event.pageY, left: event.pageX};
      console.log(event.timeStamp);
      add_post(new PostIt({ id: event.timeStamp}),pos);
    });

    // $().on('blur', function(){});

  };

  function add_post(item, position) {
    list.push(item);
    var $post_it = $('#master-post-it').clone().css({display:'block'}).css(position).attr('id',item.id).appendTo($elem);
    $post_it.draggable({handle: '.header'});

    $post_it.find('.header-label').on('click',function(){
      $(this).focus();
    });

    $post_it.find('.header a').on('click', function(event){
      event.stopPropagation();
      delete_post(item)
    });

  };

  function delete_post(item) {
    console.log('#' + item.id);
    $('#' + item.id).remove();
    // need method/logic to find and destroy the corresponding PostIt in the board.list array
    remove_reflow(item.id);
  };

  function remove_reflow(id){
    var found = false;
    var post
    for(var i=0; i<list.length; i++)
    {
      post = list[i]
      if(post.id == id && !found){
        found = true;
        post.destroy;
      }

      if(found){
        list[i] = list[i+1];
      }
    }
    if(found){
        //BUG: this deletes the LAST item in the array NOT the one I just searched for!
        list.pop();
    }
    return found;
  };

  post_count = function(){ return list.length; };
  post_list = function(){ return list; };
  initialize();

  return {
    post_count: post_count,
    post_list: post_list
  }
};

var PostIt = function(data) {
  this.header = data.header;
  this.content = data.content;
  this.id = data.id;
};

$(function() {
  // This code will run when the DOM has finished loading
  b = new Board('#board');
});

