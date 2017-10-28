var express = require('express');
var router = express.Router();
var multer = require('multer');

var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/Chat.js');
var User = require('../models/User.js');
var IndividualChat = require('../models/individualChat.js');
var Group = require('../models/Group.js');
var Addfriends = require('../models/addFriends');
var fileDetails = require('../models/fileDetails');

server.listen(3001);

// socket io
io.on('connection', function (socket) {
  /*console.log('User connected');*/
  socket.on('disconnect', function() {
    /* console.log('User disconnected');*/
  });

  socket.on('typing-message',function (data) {
    console.log("typing -message",data);
    io.emit('typing', { message: data });
  });

  socket.on('group-typing-message',function (data) {
    console.log("group-typing-message",data);
    io.emit('group-typing', { message: data });
  });

  socket.on('save-message', function (data) {
     console.log('save-message data', data);
    io.emit('new-message', { message: data });
  });

  socket.on('user-message', function (data) {
    console.log("user data emit",data);
    io.emit('add-message', { message: data });
  });

  socket.on('group-message', function (data) {
    console.log("group data emit",data);
    io.emit('add-GroupMessage', { message: data });
  });
});


var DIR = './uploads/';
var upload = multer({dest: DIR}).single('file');

var profileDir = './profiles/';
var profileUpload = multer({dest: profileDir}).single('file');


/* SAVE CHAT */
router.post('/', function(req, res, next) {
  /*console.log('req', req);*/
  Chat.create(req.body, function (err, post) {
    console.log("req.body",req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/*router.post('/signup', function(req, res, next) {
  var path = '';
  profileUpload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }

    User.findOne({username: req.body.username}, function (err, success) {
      if (err) return next(err);
      if (success !== null) {
        var errorMessage = {};
        errorMessage.message = "username already exists";
        res.json({obj: {}, objValue: errorMessage});
      } else {
        User.create(req.body, function (err, post) {
          console.log("profilr Post", post);
          if (err) return next(err);
          var responseMessage = {};
          responseMessage.message = 'success';
          res.json({obj: post, objValue: responseMessage});
        })
      }
    })
  });
});*/

router.post('/login', function(req, res, next) {
  console.log('req', req.body);
  User.findOne({username: req.body.username, password: req.body.password}, function (err, user, post) {
    console.log("post login", post);
    console.log("User login", user);
    console.log("Err login", err);
    if (err) return next(err);
    if(user!== null){
      user.status = 'Online';
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('login User', user);
          var response = {};
          console.log('user.status', user.status);
          response.message = 'success';
          console.log("post after", response);
          console.log('res obj',user);
          res.json({obj: user, objValue: response});
        }
      });
    }else{
      var response = {}, value = {};
      value.message = 'failure';
      response.obj = {};
      response.objValue = value;
      console.log("else post", response);
      res.json(response);
    }
  });
});

router.post('/googleLogin', function(req, res, next) {
  console.log('req', req.body);
  User.findOne({username: req.body.username, password: req.body.password}, function (err, user, post) {
    console.log("post googlelogin", post);
    console.log("User googlelogin", user);
    console.log("Err googlelogin", err);
    if (err) return next(err);
    if(user!== null){
      user.status = 'Online';
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('googlelogin User', user);
          var response = {};
          console.log('user.status', user.status);
          response.message = 'success';
          console.log("post after", response);
          console.log('res obj',user);
          res.json({obj: user, objValue: response});
        }
      });
    }else{
      var response = {}, value = {};
      value.message = 'failure';
      response.obj = {};
      response.objValue = value;
      console.log("else post", response);
      res.json(response);
    }
  });
});



/*LogOut Chat*/


router.post('/logout', function(req, res, next) {
  console.log('req LogOut', req.body);
  // currently authenticated user is still in req.user
  /* var username = req.user.name;*/
  User.findOne({username: req.body.username}, function(err, user, post) {
    console.log('user LogOut', user);
    if(err) res.send(err);
    user.status = 'Offline';
    user.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('res LogOut');
        console.log('logout', user);
        user.message = 'Logout Successfully';
        console.log('userMessage', user.message);
        /*success.message = 'Logout Successfully';*/
        res.json(user);
      }
    });
  });
});




/*Get All User*/

router.post('/userlist', function(req, res, next) {
  User.find({}, function (err, Users) {
    if (err) return next(err);
    res.json(Users);
  });
});

/*singal User Message*/

router.post('/singleUserMessage', function(req, res, next) {
  console.log('req', req);
  IndividualChat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


var fs = require('fs');


router.post('/googleSignup', function(req, res, next) {
  /*if(req.body.type === 'account'){*/
    console.log('type Account', req.body);
    User.findOne({mailId: req.body.mailId}, function (err, success) {
      console.log('req.body.mailId', req.body.mailId);
      console.log('success', success);
      if (err) return next(err);
      if (success!== null) {
        User.findOne({mailId: req.body.mailId}, function (err, success) {
          if (err) return next(err);
          res.json(success);
        });
       /* console.log('req.body.mailId succwess', req.body.mailId);
        console.log('success mail', success.mailId);
        var errorMessage = {};
        errorMessage.message = "mailId already exists";
        res.json(success);*/
      } else {
        console.log('req.body.mailId else', req.body.mailId);
        User.create(req.body, function (err, post) {
          console.log("profilr Post", post);
          if (err) return next(err);
          res.json(post);
        })
      }
    })
  });




router.post('/signup', function(req, res, next) {
    console.log('type mail', req.body);
    var path = '';
    profileUpload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      console.log('req signUp', req.body);
      console.log('req signUp file', req.file);
      var profile = {
        username: req.body.username,
        password: req.body.password,
        mailId: req.body.mailId,
        status: req.body.status,
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      };
      User.findOne({username: req.body.username}, function (err, success) {
        if (err) return next(err);
        if (success !== null) {
          var errorMessage = {};
          errorMessage.message = "username already exists";
          res.json({obj: {}, objValue: errorMessage});
        } else {
          User.create(profile, function (err, post) {
            console.log("profilr Post", post);
            if (err) return next(err);
            var responseMessage = {};
            responseMessage.message = 'success';
            res.json({obj: post, objValue: responseMessage});
          })
        }
      })
    });
});


router.post('/upload', function(req, res) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    console.log('req filesUpload', req.body);
    // No error occured.
    var uploadDetails = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      senderName: req.body.senderName,
      type: req.body.type,
      message:req.body.message,
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      senderProfile: req.body.senderProfile
    };
    console.log('uploadDetails', uploadDetails);
    IndividualChat.create(uploadDetails, function (err, post) {
      console.log("req file create",post);
      if (err)
        res.sent();
      res.json(post);
    });
    path = req.file.path;
  });

});

/*Get singal User message*/


router.post('/singleUser', function(req, res, next) {
  console.log('req', req.body.senderId);
  console.log('req', req.body.receiverId);
  IndividualChat.find({$or: [{senderId:req.body.senderId,receiverId:req.body.receiverId},{senderId:req.body.receiverId,receiverId:req.body.senderId}]}, function (err, chats) {
    if (err) return next(err);
    console.log('chat', chats);
    res.json(chats);
  });
});


/*router.post('/signup', function(req, res, next) {
  var path = '';
  profileUpload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    console.log('req signUp', req.body);
    console.log('req signUp file', req.file);
    var profile = {
      username: req.body.username,
      password: req.body.password,
      mailId: req.body.mailId,
      status: req.body.status,
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    };
    User.findOne({username: req.body.username}, function (err, success) {
      if (err) return next(err);
      if (success !== null) {
        var errorMessage = {};
        errorMessage.message = "username already exists";
        res.json({obj: {}, objValue: errorMessage});
      } else {
        User.create(profile, function (err, post) {
          console.log("profilr Post", post);
          if (err) return next(err);
          var responseMessage = {};
          responseMessage.message = 'success';
          res.json({obj: post, objValue: responseMessage});
        })
      }
    })
  });
});*/



/*Create Group*/

router.post('/createGroup', function(req, res, next) {
  var path = '';
  profileUpload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    console.log('req createGroup', req.body);
    console.log('req createGroup file', req.file);
    /*console.log('req createGroup', req.body);*/
    /* console.log('next createGroup', next);
     console.log('res createGroup', res);*/
    var groupNameWithProfile = {
      groupAdmin: req.body.groupAdmin,
      groupName: req.body.groupName,
      /* groupId: req.body.groupId,*/
      groupAdminId: req.body.groupAdminId,
      groupMember: JSON.parse(req.body.groupMember),
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    };
    Group.create(groupNameWithProfile, function (err, post) {
      console.log("req.body", req.body);
      console.log('post create', post);
      if (err) return next(err);
      res.json(post);
    });
  });
});


/* Get All Group */

router.post('/grouplist', function(req, res, next) {
  console.log('grouplist UserId', req.body);
  Group.find({ groupMember: { $elemMatch: {userId:req.body.userId } }}, function (err, Groups) {
    if (err) return next(err);
    res.json(Groups);
  });
});


/* Get single Group */

router.post('/groupTotalMessage', function(req, res, next) {
  console.log('groupTotalMessage', req);
  Chat.find({ groupId: req.body.groupId }, function (err, chats) {
    console.log('chat in groupTotalMessage', chats);
    if (err) return next(err);
    res.json(chats);
  });
});

/*router.get('/:room', function(req, res, next) {
  console.log('room', req);
  Chat.find({ room: req.params.room }, function (err, chats) {
    if (err) return next(err); ObjectId(req.body.groupId)
    res.json(chats);
  });
});*/


/* Get Message From Group */

router.post('/groupMessage', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    console.log("req.body",req.body);
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/groupUpload', function(req, res) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    console.log('req filesUpload', req.body);
    // No error occured.
    var groupUploadDetails = {
      nickname: req.body.nickname,
      room: req.body.room,
      type: req.body.type,
      message:req.body.message,
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      groupId: req.body.groupId,
      profilePic: req.body.profilePic,
    };
    console.log('groupUploadDetails', groupUploadDetails);
    Chat.create(groupUploadDetails, function (err, post) {
      console.log("req file create",post);
      if (err)
        res.sent();
      res.json(post);
    });
    path = req.file.path;
  });

});





/*IndividualChat.find({$or: [{senderId:req.body.senderId,receiverId:req.body.receiverId},{senderId:req.body.receiverId,receiverId:req.body.senderId}]}, function (err, chats);*/

/*Add Friends in Group*/

router.post('/addFriends', function(req, res, next) {
  console.log('req addFriends', req.body);
  Group.findOne({$and:[{ groupMember: { $elemMatch: {userName:req.body.groupMember.username }}},{ _id:req.body.groupId}]},function (err, success) {
    console.log('success addFriend',success);
    if(err) return next(err);
    if(success !== null){
      var errorMessage = {};
      errorMessage.message = "username already exists";
      res.json({obj: {}, objValue: errorMessage});
    }else{
      Group.update({_id : req.body.groupId},{ $push: { "groupMember" : { userId: req.body.groupMember.userId, userName: req.body.groupMember.username, path:req.body.groupMember.path } } }, function (err, post) {
        console.log("post addFriends",post);
        if (err) return next(err);
        var responseMessage = {};
        responseMessage.message = 'added successfully';
        res.json({obj: post, objValue: responseMessage});
      });
    }
  });
});

/*Get All Friends*/

router.post('/friendsList', function(req, res, next) {
  console.log('req friendsName', req.body);
  Addfriends.find({}, function (err, Groups) {
    if (err) return next(err);
    res.json(Groups);
  });
});


router.post('/groupMember', function(req, res, next) {
  console.log('req groupMember', req.body);
  Group.find({groupName:req.body.groupName}, function (err, Groups) {
    console.log('Groups', Groups);
    if (err) return next(err);
    const groupMember = Groups[0].groupMember;
   /* Groups[0].groupMember.path =  Groups[0].path;
    console.log('Groups[0].groupMember.path', Groups[0].groupMember.path);*/
    console.log('groupMember', groupMember);
    res.json(groupMember);
  });
});








module.exports = router;
