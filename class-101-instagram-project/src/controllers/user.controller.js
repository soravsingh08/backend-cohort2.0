const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username; //jisko follow kia jaa rha hai                    



   //follow record create krna hai
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })


  //user khud ko follow nhi kr skta
    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    //follower and followee exists hai ya nhi
    const isFollowerExists = await userModel.findOne({
        username: followerUsername
    })
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })
    if (!isFollowerExists || !isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    //already follow kr rha hai ya nhi
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if (isAlreadyFollowing) {
        return res.status(400).json({
            message: "You are already following this user"
        })
    }
    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })


}

async function unfollowUserController(req,res){
     const followerUsername = req.user.username;
     const followeeUsername = req.params.username;

     const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
     })

     if(!isUserFollowing){
        return res.status(404).json({
            message: "You are not following this user"
        })
     }

     await followModel.deleteOne({
        follower: followerUsername,
        followee: followeeUsername
     })

     res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
     })

     
}

module.exports = { followUserController,unfollowUserController }
