let Router = require('express').Router;
const {configYoutubeClient, initTokenManager} = require('../services/youtube-oauth-client.js');
const google = require('googleapis');
const OAuth2Client = google.auth.OAuth2;

/*
 * NOTE: the model for the data-table should not have the name 'SomeModel'
 */

let youtube_clientId
let youtube_clientSecret
let youtube_clientRedirect


if(process.env.NODE_ENV === 'production'){
	youtube_clientId = process.env['YOUTUBE_OAUTH__CLIENT_ID']
	youtube_clientSecret = process.env['YOUTUBE_OAUTH__CLIENT_SECRET']
	youtube_clientRedirect = process.env['YOUTUBE_OAUTH__CLIENT_REDIRECT']
} else {
	const secrets = require('../../secrets.js') 
	youtube_clientId = secrets.youTubeOAuth.clientID,
	youtube_clientSecret = secrets.youTubeOAuth.clientSecret,
	youtube_clientRedirect = secrets.youTubeOAuth.clientRedirect
}

const oAuth2Client = new OAuth2Client(
	youtube_clientId,
	youtube_clientSecret,
	youtube_clientRedirect
)

const oAuthRouter = Router()
let tokenManager = initTokenManager()

oAuthRouter
	.get('/youtube/initialize', configYoutubeClient(oAuth2Client), function(req, res, next){
		// console.log('USER????', req.user)
		if(typeof req.user === 'undefined' || typeof req.user._id === 'undefined'){
			return res.status(403).json({msg: 'no user!'})
		} 
		
		// console.log('expecting user token...')
		tokenManager.expectUserToken(req.user._id)
		return res.json({ 
			youtubeAuthUrl: req.googleAuthUrl,
		})	
	})
	.get('/youtube/redirect-callback', function(req, res, next){
	   // console.log(req.query.code)
	   // console.log(req.user)
		
		oAuth2Client.getToken(req.query.code, function (err, tokenData) {
		   if (err) {
	 	     return res.send(err);
		   }
	      // set tokens to the client
		   oAuth2Client.setCredentials(tokenData);
				// console.log('TOKENS!')
				// console.log(tokenData)
				//SAVE TOKEN to recordId
				// console.log('setting user token....')
		  	   tokenManager.setUserToken(req.user._id, tokenData)
		     	return res.send('<h1>THANK YOU GO BACK TO APP</h1>')
	      });
	})
	.get('/youtube/get-token', function(req,res){
	if(typeof req.user === 'undefined' || typeof req.user._id === 'undefined'){
		return res.json({msg: 'no user authenticated'}).status(403)
	}
	
	let tokenVal = tokenManager.getUserToken(req.user._id)
	console.log(tokenVal)

	if(!tokenVal || !tokenVal.access_token){
		return res.json({})
	}
	
	tokenManager.deleteUserToken(req.user._id)
	return res.json({token: tokenVal.access_token})
})

module.exports = oAuthRouter