Template.side_nav.helpers({
  Showname:function(){
  var object = Clone.find({_id:Meteor.userId()}).fetch()[0];
  console.log(object.first_name);
  var fname = object.first_name;
  return fname;
  }
});
