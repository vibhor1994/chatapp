


  Meteor.subscribe("postgroup");
  Meteor.subscribe("privategroup");
  Meteor.subscribe("onlusers");
  Meteor.subscribe("clone");
  Meteor.subscribe("Profileimages");
  Meteor.subscribe("Userimages");


Template.sign_up.helpers({
  currentDate:function(){

  }
})

Template.sign_up.events({
'submit form': function(event,template){
    event.preventDefault();
    var name = template.find('#profile-name').value;
    var var_email = template.find('#email-id').value;
    var var_pass = template.find('#profile-pass').value;

  Accounts.createUser({
      email: var_email,
      password: var_pass,
      profile:
      {
        name:name
      }
    },




    function(error){
    // code for account already exist....
    document.getElementById("error-exist").style.display = "block";
  },

);




  document.getElementById("profile-name").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })
  document.getElementById("profile-name-last").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })
  document.getElementById("profile-birthday").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })
  document.getElementById("gender").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })
  document.getElementById("email-id").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })
  document.getElementById("profile-pass").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })
  document.getElementById("college-name").addEventListener("click", function(){
      document.getElementById("error-exist").style = "hidden";
  })

},

'click #sign-up-div':function(){
  document.getElementById('right_panel').style.display = "none";
  document.getElementById('left_panel').style.marginTop = "50px";
  document.getElementById('signup-form').style.display= "block";
}
});






Template.sign_in.events({
  'submit form': function(event,template){
    event.preventDefault();
    var var_email = template.find('#login-email-id').value;
    var var_pass = template.find('#login-profile-pass').value;
     Meteor.loginWithPassword(var_email,var_pass,function(error){
     if(error.reason=='Incorrect password'){
       document.getElementById("error-pass").style.display = "block";}
       else{
         document.getElementById("error-email").style.display = "block";
       }
     })

     document.getElementById('login-email-id').addEventListener("click", function(){
         document.getElementById("error-email").style = "hidden";
         document.getElementById("error-pass").style = "hidden";
     })
     document.getElementById('login-profile-pass').addEventListener("click", function(){
         document.getElementById("error-email").style = "hidden";
         document.getElementById("error-pass").style = "hidden";
     })
  },

  'click #sign-in-div':function(){
    document.getElementById('left_panel').style.display = "none";
    document.getElementById('signin-form').style.display= "block";
  }



});

Template.logout_link.events({
  'click.logout':function(event){
    event.preventDefault();
    Meteor.logout();
  }

});
