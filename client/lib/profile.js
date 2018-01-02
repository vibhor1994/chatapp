Template.profile.events({
  'click #change':function(){
    document.getElementById("pic-change-box").style.display = 'block';
  },

  'click .picture':function(){
    document.getElementById("pro-picModal").style.display = 'block';
  },
  'click #remove':function(){
    var img=UserImages.find({userID:Meteor.userId()}).fetch();
    var imgid = img[0]._id;
    UserImages.update(
      {_id:imgid},
      {$unset:
        {
          image:""
        }
      });
  }


});

Template.profileSet.events({
  'click':function(event){
    var modal = document.getElementById("pic-change-box")
    // console.log(modal);
    if (event.target == modal) {
        modal.style.display = "none";
    }
    // console.log(event.target);
  },
  "submit .editprofile":function(event){
	event.preventDefault();
	// console.log(document.getElementById("profileImage").value);
	var file=$('#profileImage').get(0).files[0];
	var userProfile=Clone.find({_id:Meteor.user()._id}).fetch();
	var reqUserFname = userProfile[0].first_name;
    var reqUserLname = userProfile[0].last_name;
    var reqUserFullname = reqUserFname + " " + reqUserLname;
	 if(file){
	 	fsFile=new FS.File(file);
	  ProfileImages.insert(fsFile,function(err,result){
	  	if(err)
	  	{
	  		throw new Meteor.Error(err);
	  	}
	  	else {
        var imageLoc='/cfs/files/Profileimages/'+result._id;
        var id = Meteor.userId();
        // console.log(UserImages.find().fetch().findIndex(x => x.userID == id ));
          if (UserImages.find().fetch().findIndex(x => x.userID == id ) ==-1){
              UserImages.insert({
              userID:Meteor.userId(),
              username:reqUserFullname,
              image:imageLoc,
              pics:[imageLoc]
            });
          }
          else{
            // console.log(UserImages.find({userID:id}).fetch());
            var img=UserImages.find({userID:id}).fetch();
            var imgid = img[0]._id;
            // console.log(imgid);
            UserImages.update(
              {_id:imgid},
              {$set:
                {
                  image:imageLoc
                }
              });
            UserImages.update(
              {_id:imgid},
              {$push:{'pics':imageLoc}}
            );
          }

         Bert.alert("Profile updated succesfull!","success","growl-top-right");

	  	}
	  });
	 }
 },

 'click .close':function(){
   var modal = document.getElementById("pic-change-box")
   modal.style.display = "none";
 }

  });

Template.imageModal.events({
  'click':function(event){
    var modal = document.getElementById("pro-picModal")
    // console.log(modal);
    if (event.target == modal) {
        modal.style.display = "none";
    }
    // console.log(event.target);
  },
  'click .close':function(){
    var modal = document.getElementById("pro-picModal")
    modal.style.display = "none";
  }
});

Template.profile_main.helpers({
UserImages: function(){
var object = Clone.find({_id:Meteor.userId()}).fetch()[0];
var fname = object.first_name;
var lname = object.last_name;
var flname = fname+' '+lname;
var username=flname;
var Id=Meteor.userId();
var URL=UserImages.findOne({username:username},{userID:Id});
var u=UserImages.find({userID:Id}).fetch()[0];
// console.log(u);
return u;
},
name:function(){
  var object = Clone.find({_id:Meteor.userId()}).fetch()[0];
  var fname = object.first_name;
  var lname = object.last_name;
  var flname = fname+' '+lname;
  return flname;
},
email:function(){
  var object = Meteor.user().emails[0].address;
  return object;
}
});
Template.imageModal.helpers({
UserImages: function(){
var object = Clone.find({_id:Meteor.userId()}).fetch()[0];
var fname = object.first_name;
var lname = object.last_name;
var flname = fname+' '+lname;
var username=flname;
var Id=Meteor.userId();
var URL=UserImages.findOne({username:username},{userID:Id});
var u=UserImages.find({userID:Id}).fetch()[0];
// console.log(u);
return u;
}
});

Template.user_info.helpers({
  data:function(){
    // console.log(Clone.find({_id:Meteor.userId()}).fetch());
    return Clone.find({_id:Meteor.userId()}).fetch();
  }
});

Template.user_info.events({
'click #edit':function(){
  console.log(this);
}
});
