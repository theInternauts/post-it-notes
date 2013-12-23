var Board = function( selector ) {
  var list = [];
  var groups = []
  var $elem = $( selector );

  function initialize() {
    $elem.on('dblclick' , function(event){
      pos = {top: event.pageY, left: event.pageX};
      console.log(event.timeStamp);
      add_post(new PostIt({ id: event.timeStamp}),pos);
    });

    // $().on('blur', function(){});

  };

  /****  Post functions ****/

  function add_post(item, position) {
    list.push(item);
    var $post_it = $('#master-post-it').clone().css({display:'block'}).css(position).attr('id',item.getId()).appendTo($elem);
    $post_it.draggable({handle: '.header'});

    $post_it.find('.header-label').on('click', function(){
      $(this).focus();
    });

    $post_it.find('.content').on('click', function(){
      $(this).focus();
    });

    $post_it.find('.header a').on('click', function(event){
      event.stopPropagation();
      delete_post(item)
    });

    $post_it.find('.header-label').on('blur', function(){
      update_post(item)
    });

    $post_it.find('.content').on('blur', function(){
     update_post(item)
    });
  };

  function update_post(model_post){
    var pid = model_post.getId()
    var temp = {}
    temp.header = $('#' + pid).find('.header-label').html()
    temp.content = $('#' + pid).find('.content').html()
    model_post.update(temp)
  }

  function delete_post(item) {
    console.log('#' + item.getId());
    $('#' + item.getId()).remove();
    remove_reflow(item.getId());
  };

  //a method to find and destroy an instance of the PostIt model AND shift the items in the containing array
  function remove_reflow(id){
    var found = false;
    var post
    for(var i=0; i<list.length; i++){
      post = list[i]
      if(post.getId() == id && !found){
        found = true;
        post.destroy;
      }

      if(found){
        list[i] = list[i+1];
      }
    }
    if(found){
      list.pop();
    }
    return found;
  };

  function post_count(){ return list.length; };
  function post_list(){ return list; };
  function post_id_list(){
    id_list = ""
    for(var i = 0;i<list.length; i++){
      id_list += " " + list[i].getId()
    }
    return id_list
  }

  /***** Groups functions  *****/

  function group_create(options, position) {
    item = new post_group(options)
    console.log("group: ", item.getId())
    groups.push(item);
  };

  return {
    post_count: post_count,
    post_list: post_list,
    post_id_list: post_id_list,
    group_create: group_create
  }
};

