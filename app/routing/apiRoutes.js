var friends	= require('../data/friends.js');
var path = require('path');



var totalDifference = 0;

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});



	app.post('/api/friends', function(req, res){

		var bestMatch = {
			name: "",
			photo: "",
			matchDifference: 100
		};

	
		var userData = req.body;
		var userName = userData.name;
		var userImage = userData.photo;
		var userScores = userData.scores;

		var totalDifference = 0;

		//loop through each friend object in the friends array
		for(var i = 0; i < friends.length; i++){

			console.log(friends[i]);
			totalDifference = 0;

			for(var j = 0; j < 10; j++){
				// for each number in the scores array subtract it to get the difference from user
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				console.log(totalDifference);

				if(j === 9){
					if (totalDifference < bestMatch.matchDifference){ // if it the lowest match set the bestMatch to that Friend
						bestMatch.matchDifference = totalDifference;
						bestMatch.name = friends[i].name;
						bestMatch.photo = friends[i].photo;
						console.log(bestMatch.matchDifference)
					}
				}
			
			}
			
		}
		console.log(bestMatch); //console.log best match
		friends.push(userData);
 
		res.json(bestMatch); //make the pop up of the modal of the best match
	});
};