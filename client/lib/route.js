Accounts.onLogin(function(){
  FlowRouter.go('home');
});

Accounts.onLogout(function(){
  FlowRouter.go('login');
});
FlowRouter.triggers.enter([function(context,redirect){
  if(!Meteor.userId()){
    FlowRouter.go('login');
    // var body = document.getElementsByTagName('body')[0];
    // body.style.backgroundImage = "url(public\images\DSCddddddddh_5723ascasc.jpg)";
  }
}]);

FlowRouter.route('/',{
	name: 'login',
	action() {
    if(Meteor.userId()){
      FlowRouter.go('home');
    }
	   BlazeLayout.render('login_first');
   }
});


FlowRouter.route('/home',{
	name: 'home',
	action() {
	   BlazeLayout.render('login_test',{main: 'login_main'});
    //  document.body.style.backgroundColor = "#f2f2f2";
}
});
FlowRouter.route('/profile',{
	name: 'profile',
	action() {
	   BlazeLayout.render('login_test',{main: 'profile'});
    //  document.body.style.backgroundColor = "#f2f2f2";
}
});
