


Template.onlineUsers.helpers({
  online:function () {

    var names=[];
    var i=0;
    var lengthof= Meteor.users.find({'status.online':true,_id:{$ne:Meteor.userId()}}).fetch().length;
      for(i=0;i<lengthof;i++)
      {
        var id=Meteor.users.find({'status.online':true,_id:{$ne:Meteor.userId()}}).fetch()[i]._id;
          var fname= Clone.find({_id:id}).fetch()[0].first_name;
          names.push({fname,id});
        }
    return names;
  }
});


Template.onlineUsers.events({
  'click .online-user-name':function(){
    if (document.documentElement.clientWidth < 786) {
      var name=this.fname;
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

    }else {
      var name=this.fname;
     //  document.getElementById('messages-list-sec').style.display="none";
      document.getElementById('lgroup-chat-sec').style.display="block";
      document.getElementById('pirvate-post-box').style.display="block";

      document.getElementById('lmain-private-name').innerHTML=name;
       console.log(this.id);
       Session.set('currentId',this.id);
       var res=Privategroup.findOne({chatIds:{$all:[this.id,Meteor.userId()]}});
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

        Tracker.afterFlush(function () {
    $('#lgroup-chat-sec').animate({scrollTop: $('#lgroup-chat-sec').prop('scrollHeight')}, 500);
  });

  }
});
