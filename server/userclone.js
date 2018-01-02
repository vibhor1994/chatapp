Accounts.onCreateUser(function(options, user) {

  user._id = Random.id(20);

  Clone.insert({
    _id:user._id,

            first_name: options.profile.name,


    createdAT:new Date(),
    friends:[],
    Requests:[],
    requestTo:[]
  });
  return user;
});
