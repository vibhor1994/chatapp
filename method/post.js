




Postgroup = new Mongo.Collection('postgroup');

Clone = new Mongo.Collection('clone');

Privategroup = new Mongo.Collection('privategroup');

ProfileImages = new FS.Collection("Profileimages", {
  stores: [new FS.Store.GridFS("Profileimages")]
});

UserImages = new Mongo.Collection("Userimages");



Meteor.methods({
  addPost: function(content){
    if(!Meteor.userId())
    {
      throw new Meteor.Error('not-authorized','you are not signed in');
    }
    var date= new Date();
    // h=(date.getHours()<10?'0':'')+date.getHours(),
    // m=(date.getMinutes()<10?'0':'')+date.getMinutes();
    var time = moment().format();


    var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
    var name = userProfile[0].first_name+" "+userProfile[0].last_name;
    //var firstname=;
    //var lastname=Meteor.user().profile.name.last_name;
    Postgroup.insert({
      content:content,
      created:date,
      time:time,
      fullname:name,
      createdBy:Meteor.user()._id,
       likes:[],
       comments:[]
    });

  },


  friendRequest:function(post){
    if(!Meteor.userId())
    {
      throw new Meteor.Error('not-authorized','you are not signed in');
    }
    //console.log(post);
    var userProfile=Clone.find({_id:Meteor.user()._id}).fetch()[0];

    var RequestingUser = userProfile._id;
    var RequestedUser = post.createdBy;
    var name = post.fullname;
    var reqUserFname = userProfile.first_name;
    var reqUserLname = userProfile.last_name;
    var reqUserFullname = reqUserFname + " " + reqUserLname;
    //var check = Clone.find({profileOfuser:RequestingUser}).fetch();
    //console.log(userProfile.Requests.findIndex(x => x.id == RequestedUser) );

    //if(RequestingUser!=RequestedUser && check)
    if (RequestingUser!=RequestedUser &&
      userProfile.requestTo.findIndex(x => x.id == RequestedUser) ==-1  &&
      userProfile.Requests.findIndex(x => x.id == RequestedUser) == -1 &&
      userProfile.friends.findIndex(x => x.id == RequestedUser) == -1 ){

      Clone.update({_id:RequestingUser},
      {$push:{'requestTo':{id:RequestedUser,name:name}}});

      Clone.update({_id:RequestedUser},
      {$push:{'Requests':{id:RequestingUser,name:reqUserFullname}}});
    }


    /*if(RequestingUser!=RequestedUser &&
      check.requested.findIndex(x => x.id==RequestedUser) ==-1 &&
      check.requests.findIndex(x => x.id==RequestedUser) == -1 &&
      check.friends.findIndex(x => x.id==RequestedUser) == -1){

      Clone.update({profileOfuser:RequestingUser},
      {$push:{'requested':{id:RequestedUser,name:name}}});

    Clone.update({profileOfuser:RequestedUser},
      {$push:{'requests':{id:RequestingUser,name:reqUserFullname}}});

    }*/


  },


  accept_request:function(requID){

    if(!Meteor.userId())
    {
      throw new Meteor.Error('not-authorized','you are not signed in');
    }
    var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
    var RequestingUser = userProfile[0]._id;
    var RequestedUser = requID.id;
    var name =requID.name;
    var reqUserFname = userProfile[0].first_name;
    var reqUserLname = userProfile[0].last_name;
    var reqUserFullname = reqUserFname + " " + reqUserLname;

    Clone.update({_id:RequestingUser},
    {$push:{'friends':{id:RequestedUser,name:name}}});

    Clone.update({_id:RequestedUser},
    {$push:{'friends':{id:RequestingUser,name:reqUserFullname}}});
    Clone.update({_id:RequestingUser},
    {$pull:{'Requests':{id:RequestedUser,name:name}}});

    Clone.update({_id:RequestedUser},
    {$pull:{'requesto':{id:RequestingUser,name:reqUserFullname}}});



  },


 delete_request:function(requID){

    if(!Meteor.userId())
    {
      throw new Meteor.Error('not-authorized','you are not signed in');
    }
    var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
    var RequestingUser = userProfile[0]._id;
    var RequestedUser = requID.id;
    var name =requID.name;
    var reqUserFname = userProfile[0].first_name;
    var reqUserLname = userProfile[0].last_name;
    var reqUserFullname = reqUserFname + " " + reqUserLname;


    Clone.update({_id:RequestingUser},
    {$pull:{'Requests':{id:RequestedUser,name:name}}});

    Clone.update({_id:RequestedUser},
    {$pull:{'requesto':{id:RequestingUser,name:reqUserFullname}}});



  },

    addComment:function(a,b){
      if (!Meteor.userId()) {
        throw new Meteor.error('not-authorized','you are not signed in');
      }
      var createdBy = Meteor.userId();
      var time = moment().format();
      var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
      var name = userProfile[0].first_name+" "+userProfile[0].last_name;
      // console.log(a);
       Postgroup.update({_id:b._id},
       {$push:{'comments':{
         createdBy:createdBy,
         time:time,
         content:a,
         name:name
       }}});
    },

    addLike:function(a){

      var createdBy = Meteor.userId();
      var time = moment().format();
      var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
      var name = userProfile[0].first_name+" "+userProfile[0].last_name;
      if (a.likes.findIndex(x => x.By == createdBy) ==-1) {
      Postgroup.update({_id:a._id},
      {$push:{'likes':{
        By:createdBy,
        time:time,
        name:name
      }}});
      }
      else{
      // console.log(a);
      Postgroup.update({_id:a._id},
      {$pull:{'likes':{
        By:createdBy
      }}});
      }
    }




  //,
  // addMessage:function(toUser){
  //   if(!Meteor.userId())
  //   {
  //     throw new Meteor.Error('not-authorized','you are not signed in');
  //   }
  //   var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
  //   var recieverUsername=toUser.fullname;
  //   var recieverId=toUser.createdBy;
  //   var senderId = userProfile[0]._id;
  //   var senderFname = userProfile[0].first_name;
  //   var senderLname = userProfile[0].last_name;
  //   var senderFullname = reqUserFname + " " + reqUserLname;
  //
  // }
// privateChat:function(post){
//   Session.set('currentId',this._id);
//   var res=Privategroup.findOne({chatId:{$all:[post._id,Meteor.userId()]}});
//   if(res)
//   {
//     Session.set('roomid',res._id);
//   }
//   else
//     {
//       var newRoom=Privategroup.findOne({chatId:[post._id,Meteor.userId()],messages:[]});
//       Session.set('roomid',newRoom);
//
//     }
//     console.log(roomid);
//   },
  // addPostPrivate:function(content){

  // }



});
