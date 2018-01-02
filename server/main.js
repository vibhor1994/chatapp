import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {
  // code to run on server at startup


  Meteor.publish('postgroup',function() {
      return Postgroup.find();
    });
  Meteor.publish("clone", function(){
    return Clone.find();
  });

  Meteor.publish('privategroup',function(){
  	return Privategroup.find({chatIds:{$exists:true,$in:[this.userId]}});
  });



  Meteor.publish('onlusers',function(){
    return Meteor.users.find({'status.online':true},{fields:{emails: 0}});
  }),
Privategroup.allow({
	'insert':function(userId,doc){
		return true;
	},
	'update':function(userId,doc,fieldNames,modifier){
		return true;
	},
	'remove':function(userId,doc){
		return false;
	}
});
//   Meteor.publish("users", function(){
//   return Meteor.users.find();
// })

ProfileImages.allow({
    'insert':function(userId,doc){
    return true;
  },
  'update':function(userId,doc,fieldNames,modifier){
    return true;
  },
  'download':function(){
    return true;
  }
  });
UserImages.allow({
  'insert':function(userId,doc){
    return true;
  },
  'update':function(userId,doc,fieldNames,modifier){
    return true;
  }
});
Meteor.publish('Profileimages',function(){
	return ProfileImages.find();
});
Meteor.publish('Userimages',function(){
	return UserImages.find();
});


});
