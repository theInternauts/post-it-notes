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

    $('#btn-new-group').on('click' , function(event){
      pos = {top: 62, left: 10};
      group_create({ name: "" }, pos)
    });
    
    // $().on('blur', function(){});

  };

  function retrieve(id, collection){
    var target
    for(var i = 0; i<collection.length; i++){
      if(collection[i].getId() == id){
        target = collection[i]
      }
    }
    return target
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
    remove_reflow(item.getId(), list);
  };

  /*
  A method to find and destroy an instance of the PostIt model 
  AND shift the items in the containing array
  */
  function remove_reflow(id, collection){
    var isFound = false;
    var post
    for(var i=0; i<collection.length; i++){
      post = collection[i]
      if(post.getId() == id && !isFound){
        isFound = true;
        post.destroy;
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
    var item = new post_group(options)
    test_group = item
    console.log(item.getId())
    groups.push(item);
    var $group = $('#master-post-it-group').clone().css({display:'block'}).css(position).attr('id',item.getId()).appendTo($elem);
    $group.draggable({handle: '.header'});
    $group.children('.content').droppable({ 
      accept: ".post-it",
      drop: function(event, ui){
        group_drop_handler(event, ui)
      }
    })
    
    $group.find('.header-label').on('click', function(event){
      $(this).focus()
    }).on('keydown', function(event){
      event.stopPropagation()
      var buttonCode = event.which || event.keyCode;
      console.log("btn: ", buttonCode)
      if(buttonCode == 13){
        event.preventDefault()
        update_group(item)
      }
    });

    $group.find('.header a').on('click', function(event){
      event.stopPropagation()
      group_delete(item)
    });

    $group.find('.header-label').on('blur', function(){
      update_group(item)
    });
   
  };
  
  function group_delete(group){
    console.log(group.getId());
    $('#' + group.getId()).remove();
    remove_reflow(group.getId(), groups);
  };
  
  function group_count(){ return groups.length }
  function group_list(){ return groups; }
  function group_id_list(){
    id_list = ""
    for(var i = 0;i<groups.length; i++){
      id_list += " " + groups[i].getId()
    }
    return id_list
  }

  function group_drop_handler(event, ui){
    var node = ui.draggable
    var nodeID = node.attr('id')
    var groupNodeID = event.target.parentNode.id
    tempGroup = retrieve(groupNodeID, groups)
    x = tempGroup.getList().length 
    offset = 30 + (x*10 + x*110)
    node.css({left:'20px',top: offset})
    $('#' + groupNodeID +' .content.ui-droppable').height(offset+85).append(node)
    tempGroup.addPost(retrieve(nodeID, list)) //update the model
  }

  function update_group(model_group){
    var gid = model_group.getId()
    temp_name = $('#' + gid).find('.header-label').html()
    model_group.name = temp_name
  }
  
  initialize();

  return {
    post_count: post_count,
    post_list: post_list,
    post_id_list: post_id_list,
    group_create: group_create,
    group_count: group_count,
    group_list: group_list,
    group_id_list: group_id_list
  }
};

