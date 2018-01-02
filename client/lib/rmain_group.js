





Template.messages_list.helpers({
  list:function(){
  var len = Privategroup.find().fetch().length;
  var names = [];
  // console.log(len);
  for(i=0;i<len;i++){
    var chatids = Privategroup.find().fetch()[i].chatIds;
    var b = Privategroup.find().fetch()[i]._id;
      var mlen=Privategroup.find().fetch()[i].messages.length;
      if( mlen==null){
        var latest = {content:"user typing.."};
      }else {
        var latest=Privategroup.find().fetch()[i].messages[mlen-1];
      }

    if(chatids[0]==Meteor.userId()){
      var otherUser = chatids[1];
      var a = Clone.find({_id:otherUser}).fetch()[0];
      var fullname =a.first_name;
      var id = a._id;
      names.push({fullname:fullname,roomid:b,content:latest.content,createdBy:latest.cretedAt,id:id});
    }
    else{
      var otherUser = chatids[0];
      var a = Clone.find({_id:otherUser}).fetch()[0];
      var fullname =a.first_name;
      // console.log(fullname);
      names.push({fullname:fullname,roomid:b,content:latest.content,createdBy:latest.cretedAt,id:a._id});
    }
  }
  // console.log(names);
  return names;
}
});

Template.messages_list.events({
  'click .messages-list-item':function(){
    if (document.documentElement.clientWidth < 786) {
      var name=this.fullname;
      document.getElementById("chat-area-right").style.display = "none";
          document.getElementById("chat-area-rightb").style.display = 'block';
        
         //  document.getElementById('messages-list-sec').style.display="none";
          document.getElementById('lgroup-chat-sec').style.display="block";
          document.getElementById('pirvate-post-box').style.display="block";

          document.getElementById('lmain-private-name').innerHTML=name;
           // console.log(this.id);
           Session.set('currentId',this.id);
           var res=Privategroup.findOne({chatIds:{$all:[this.id,Meteor.userId()]}});
           // console.log(res);
           if(res)
           {
             Session.set('roomid',res._id);
           }
           else
             {
               var newRoom=Privategroup.insert({chatIds:[this.id,Meteor.userId()],messages:[]});
               Session.set('roomid',newRoom);

             }

    }
    // Meteor.call('privateChat',this);
    // console.log('you clicked!!');
     var name=this.fullname;
    //  document.getElementById('messages-list-sec').style.display="none";
     document.getElementById('lgroup-chat-sec').style.display="block";
     document.getElementById('pirvate-post-box').style.display="block";

     document.getElementById('lmain-private-name').innerHTML=name;
      // console.log(this.id);
      Session.set('currentId',this.id);
      var res=Privategroup.findOne({chatIds:{$all:[this.id,Meteor.userId()]}});
      console.log(this.id,Meteor.userId());
      console.log(res);
      if(res)
      {
        Session.set('roomid',res._id);
      }
      else
        {
          var newRoom=Privategroup.insert({chatIds:[this.id,Meteor.userId()],messages:[]});
          Session.set('roomid',newRoom);

        }


      Tracker.afterFlush(function () {
  $('#lgroup-chat-sec').animate({scrollTop: $('#lgroup-chat-sec').prop('scrollHeight')}, 500);
});
  }

});
