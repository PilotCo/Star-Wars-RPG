/* 
	Title - Star Wars RPG
	Created By: Cody Pilot
	
*/

//initialize and declare variables
var turn = 1; //this will keep track of the current turn in the game
var userChar = {};
var enemyChar = {};
var userBaseAttack = 0;
var lose = false;

//initialize the character objects
var chewbacca = {
	name: "chewbacca",
	health: 200,
	attack: 5,
	cntAttack: 10
};
var boba = {
	name: "boba",
	health: 125,
	attack: 8,
	cntAttack: 25
};
var stormTrooper = {
	name: "stormTrooper",
	health: 125,
	attack: 9,
	cntAttack: 15
};
var r2d2 = {
	name: "r2d2",
	health: 100,
	attack: 12,
	cntAttack:25
};


//set up the base game
function setup(){
	document.getElementById("alertUser").innerHTML = "Choose your character young padiwan.";
	document.getElementById("chewyHealth").innerHTML = chewbacca.health;
	document.getElementById("bobaHealth").innerHTML = boba.health;
	document.getElementById("stormTrooperHealth").innerHTML = stormTrooper.health;
	document.getElementById("r2d2Health").innerHTML = r2d2.health;
}

//this function will run for every attack made.
function attack(){
	//only attack if the opponent has health remaining.
	if(enemyChar.health > 0){
		//the enemies health will be equal to their health minus the attack of the user.
		enemyChar.health = enemyChar.health - userChar.attack;
		console.log(enemyChar.health)
		if(enemyChar.name == "boba"){
			boba = enemyChar;
			//this will redisplay the enemies health.
			document.getElementById("bobaHealth").innerHTML = boba.health;
		}else if(enemyChar.name == "chewbacca"){
			chewbacca = enemyChar;
			document.getElementById("chewyHealth").innerHTML = chewbacca.health;
		}else if(enemyChar.name == "stormTrooper"){
			stormTrooper = enemyChar;
			document.getElementById("stormTrooperHealth").innerHTML = stormTrooper.health;
		}else if(enemyChar.name == "r2d2"){
			r2d2 = enemyChar;
			document.getElementById("r2d2Health").innerHTML = r2d2.health;
		}
		//the users character will have an attack increase equal to their base attack.
		userChar.attack = userChar.attack + userBaseAttack;
	}
}

function counterAttk(){
	userChar.health = userChar.health - enemyChar.cntAttack;
	if(userChar.name == "chewbacca"){
		document.getElementById("chewyHealth").innerHTML = userChar.health;
	}else if(userChar.name == "boba"){
		document.getElementById("bobaHealth").innerHTML = userChar.health;
	}else if(userChar.name == "stormTrooper"){
		document.getElementById("stormTrooperHealth").innerHTML = userChar.health;
	}else if(userChar.name == "r2d2"){
		document.getElementById("r2d2Health").innerHTML = userChar.health;
	}
}

//reset the webpage on the click of a button.
$("#resetBtn").click(function(){
	location.reload();
});

setup();

//what to do if a character picture is selected
$(".character").click(function(event){
	if(turn == 1){
		//check to see which character was selected and move to turn 2.
		if(this.id == "chewbacca"){
			turn = 2;
			$('#chewbacca').contents().appendTo('#userFighter');
			userChar = chewbacca;
			userBaseAttack = chewbacca.attack;
			//$('#chewbacca').addClass("character");
		}else if(this.id == "boba"){
			turn = 2;
			$('#boba').contents().appendTo('#userFighter');
			userChar = boba;
			userBaseAttack = boba.attack;
		}else if(this.id == "stormTrooper"){
			turn = 2;
			$('#stormTrooper').contents().appendTo('#userFighter');
			userChar = stormTrooper;
			userBaseAttack = stormTrooper.attack;
		}else if(this.id == "r2d2"){
			turn = 2;
			$('#r2d2').contents().appendTo('#userFighter');
			userChar = r2d2;
			userBaseAttack = r2d2.attack;
		}
		document.getElementById("alertUser").innerHTML = "Select your first opponent in the Battlegrounds!";
	// if we are on an even turn add the character to the enemy side, odd turns are used for attacking.
	}else if(turn == 2 || turn == 4 || turn == 6){
		if(this.id == "boba"){
			turn++;
			$('#boba').contents().appendTo('#enemyFighter');
			enemyChar = boba;
		}else if(this.id == "chewbacca"){
			turn++;
			$('#chewbacca').contents().appendTo('#enemyFighter');
			enemyChar = chewbacca;
		}else if(this.id == "stormTrooper"){
			turn++;
			$('#stormTrooper').contents().appendTo('#enemyFighter');
			enemyChar = stormTrooper;
		}else if(this.id == "r2d2"){
			turn++;
			$('#r2d2').contents().appendTo('#enemyFighter');
			enemyChar = r2d2;
		}
		if(turn == 7){
			document.getElementById("alertUser").innerHTML = "BEGIN THE FINAL BATTLE!!";
		}else{
			document.getElementById("alertUser").innerHTML = "ATTACK!!";
		}	
	}
});

//what to do if the attack button is pressed
$("#attackBtn").click(function(){
	//odd turns are reserved for attacking.
	if(turn == 3 || turn == 5 || turn == 7){
		attack();
		//if the attack defeated the enemy attacker.
		if(enemyChar.health <= 0){
			$('#enemyFighter').empty().appendTo('#enemyFighter');
			document.getElementById("alertUser").innerHTML = "You defeated your opponent, select your next victim!";
			turn++; //first will be 4 then will be 6
		}else{ //if the enemy does not die, they will counter attack
			counterAttk();
			if(userChar.health <= 0){
				lose = true;
			}
		}
		//always check too see if the user won or lost after every attack.
		if(lose == true){
			document.getElementById("alertUser").innerHTML = "You are not strong with the force, you died in the Battlegrounds.";
			turn = 10;
			//turn will only equal 8 if the user beats the last opponent and still has life remaining.
		}else if(turn == 8){
			document.getElementById("alertUser").innerHTML = "You are strong with the force, you conquered the Battlegrounds!!";
		}
	}

});