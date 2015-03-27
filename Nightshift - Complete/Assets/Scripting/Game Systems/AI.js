#pragma strict

var enemyTarget : Transform; //the enemy's target 
var myTransform : Transform; //current transform data of this enemy
var aggroRange : int;
static var enemyMoveSpeed = 3; //move speed 
var enemyRotationSpeed = 3; //speed of turning

static var dazed : boolean;
var chasePlayer : boolean;
var hitPlayer : boolean;
var playerImmune : boolean;
static var dazedByFlashlight : boolean = false;
var targetTag = "Player";

function Awake() 
{ 
	myTransform = transform; 
}

function Start() 
{ 
	enemyTarget = GameObject.FindWithTag("Player").transform; //target the player
}

function Update() 
{ 
	var distanceFromPlayer = Vector3.Distance(transform.position, enemyTarget.position);
    if(distanceFromPlayer < aggroRange)
    {
    	chasePlayer = true;
    	if(chasePlayer == true)
    	{
			ChasePlayer();
		}
		else
		{	
			chasePlayer = false;
			Idle();
		}
	}
	
	if (dazedByFlashlight == true)
	{
		enemyMoveSpeed = 0;
		dazed = true;
	}
	restartAfterDaze();
}

function ChasePlayer()
{
	myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(enemyTarget.position - myTransform.position), enemyRotationSpeed * Time.deltaTime); //rotate to look at the player 
	myTransform.position += myTransform.forward * enemyMoveSpeed * Time.deltaTime; //move towards the player
}



function Idle()
{
}

function OnCollisionEnter(collision : Collision)
{
	if(collision.gameObject.tag == targetTag)
	{
		hitPlayer = true;
		if (hitPlayer == true)
		{
			PlayerStats.playerHealth--;
			hitPlayer = false;
			playerImmune = true;
			if (playerImmune == true)
			{
				targetTag = "empty";
				yield WaitForSeconds(2);
				targetTag = "Player";
			}
		}
	}
}

function restartAfterDaze()
{
	if(dazed == true)
	{
		yield WaitForSeconds(5);
		dazed = false;
		enemyMoveSpeed = 3;
		dazedByFlashlight = false;
	}
}