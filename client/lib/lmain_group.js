Template.chat_list.helpers({
  showFriends:function(){
     // $('#lgroup-chat-sec').animate({scrollTop: $('#lgroup-chat-sec').prop('scrollHeight')}, 500);
   return Privategroup.find({_id:Session.get('roomid')}).fetch()[0].messages;
},

equals:function ( a) {
  // return (a===b);
  var b = Meteor.userId();
  return (a===b);
  // console.log(a===b);
}
});


Template.lpost.events({

'keypress textarea#private-message':function(evt,template){
  if (evt.which === 13) {
    var content= document.getElementById('private-message').value;
    if (content=="") {
      document.getElementById('private-message').value = "";
      document.getElementById('private-message').blur();
      alert("Noting to Send. PLease write the message")
    }
    else {
      var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
      var RequestingUser = userProfile[0]._id;
      var reqUserFname = userProfile[0].first_name;
      // var reqUserLname = userProfile[0].last_name;
      var reqUserFullname = reqUserFname ;

        var a=Privategroup.update({'_id':Session.get('roomid')},{$push:{messages:{
          name:reqUserFullname,
          content:content,
          cretedAt:moment().format(),
          createdBy:RequestingUser
        }}});
          var objDiv = document.getElementById("rgroup-chat-sec");
          // var height = objDiv.scrollHeight+objDiv.clientHeight;
          document.getElementById('private-message').value = "";
          document.getElementById('private-message').blur();

          // window.scrollTop();
    }
    Tracker.afterFlush(function () {
$('#lgroup-chat-sec').animate({scrollTop: $('#lgroup-chat-sec').prop('scrollHeight')}, 500);
});
    // document.getElementById('private-message').focus();
  }
},

  'submit form': function(event){
    event.preventDefault();
  //  scrollTo(0,1000);
    var content= document.getElementById('private-message').value;
    if (content=="") {
      alert("Noting to Send. PLease write the message")
    }
    else {
      var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
      var RequestingUser = userProfile[0]._id;
      var reqUserFname = userProfile[0].first_name;
      // var reqUserLname = userProfile[0].last_name;
      var reqUserFullname = reqUserFname ;

        var a=Privategroup.update({'_id':Session.get('roomid')},{$push:{messages:{
          name:reqUserFullname,
          content:content,
          cretedAt:moment().format(),
          createdBy:RequestingUser
        }}});
          var objDiv = document.getElementById("rgroup-chat-sec");
          // var height = objDiv.scrollHeight+objDiv.clientHeight;
          event.target.reset();
          // objDiv.scrollTop = 0;
    }

    Tracker.afterFlush(function () {
$('#lgroup-chat-sec').animate({scrollTop: $('#lgroup-chat-sec').prop('scrollHeight')}, 500);
});

        // console.log(objDiv.scrollHeight);
        // console.log(objDiv.clientHeight);

  }



})

Template.lmain_group.events({

'click #back-btn':function(event){
  if (document.documentElement.clientWidth < 786) {
    document.getElementById("chat-area-right").style.display = "block";
        document.getElementById("chat-area-rightb").style.display = 'none';
  }else {
    
  }
}



})
