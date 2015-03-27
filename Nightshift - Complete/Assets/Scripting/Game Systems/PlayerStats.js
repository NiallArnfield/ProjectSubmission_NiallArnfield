#pragma strict

// Declare the use of a GUI skin
var nightshiftGUISkin : GUISkin[];

// Player ended level?
static var playerEndedLevel : boolean = false;

// Health variables
static var playerHealth : int = 5;


// Coin variables
var coinCollected : boolean;
static var totalCoinsCollected : int = 0;
static var currentCoinsCollected : int = 0;

// Time variables
static var timeLeft : float = 600.00;
static var timeOver : boolean = false;

// Battery variables
var reduceBatteryNow : boolean = false;
var callItOnce : boolean = false;
static var currentBatteryRemaining = ShineLight.batteryRemaining;

function Update()
{
	// Once the value of total coins chaged it triggers its value to be stored in the variable current coins collected
	if(totalCoinsCollected > currentCoinsCollected)
	{
		coinCollected = true;
		if (coinCollected == true)
		{
			currentCoinsCollected = totalCoinsCollected;
			coinCollected = false;
		}
	}
	
	// Once time runs out it triggers the game over screen with the out of time scenario
	if (timeLeft < 0)
	{
		timeOver = true;
	}
	if (timeOver == true)
	{
		Application.LoadLevel("Game Over Screen");
	}
}

function OnGUI()
{
	// Use skin
	GUI.skin = Resources.Load("NightshiftSkin", GUISkin);
	
	// LIFE BAR
	// Label size
	var lifeBarLabelHeight : int = 100;
	var lifeBarLabelWidth : int = 100;
	
	// Place label
	GUI.Label(Rect(Screen.width / 2 - (lifeBarLabelWidth / 2 + 800), Screen.height / 2 - (lifeBarLabelHeight / 2 + 430), lifeBarLabelWidth, lifeBarLabelHeight), "Life :");
	
	// Life bars textures
	// Black and white heart size
	var heartBWTexture = Resources.Load("HeartBW", Texture2D);
	var heartBWHeight : int = 60;
	var heartBWWidth : int = 44;
	
	// Red heart size
	var heartTexture = Resources.Load("Heart", Texture2D);
	var heartHeight : int = 60;
	var heartWidth : int = 44;
	
	// Place black lifes
	GUI.DrawTexture(Rect(Screen.width / 2 - (heartBWWidth / 2 + 730), Screen.height / 2 - (heartBWHeight / 2 + 460), heartBWWidth, heartBWHeight), heartBWTexture); 
	GUI.DrawTexture(Rect(Screen.width / 2 - (heartBWWidth / 2 + 680), Screen.height / 2 - (heartBWHeight / 2 + 460), heartBWWidth, heartBWHeight), heartBWTexture); 
	GUI.DrawTexture(Rect(Screen.width / 2 - (heartBWWidth / 2 + 630), Screen.height / 2 - (heartBWHeight / 2 + 460), heartBWWidth, heartBWHeight), heartBWTexture); 
	GUI.DrawTexture(Rect(Screen.width / 2 - (heartBWWidth / 2 + 580), Screen.height / 2 - (heartBWHeight / 2 + 460), heartBWWidth, heartBWHeight), heartBWTexture); 
	GUI.DrawTexture(Rect(Screen.width / 2 - (heartBWWidth / 2 + 530), Screen.height / 2 - (heartBWHeight / 2 + 460), heartBWWidth, heartBWHeight), heartBWTexture); 
	
	// Place filled lifes depending on current player health
	if(playerHealth == 5)
	{
		// When the players on 5 lifes
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 730), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 680), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 630), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 580), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 530), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		
	}
	if(playerHealth == 4)
	{
		// When the players on 4 lifes
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 730), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 680), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 630), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 580), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture);
	}
	if(playerHealth == 3)
	{
		// When the players on 3 lifes
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 730), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 680), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 630), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
	}
	if(playerHealth == 2)
	{
		// When the players on 2 lifes
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 730), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 680), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
	}
	if(playerHealth == 1)
	{
		// When the players on 1 lifes
		GUI.DrawTexture(Rect(Screen.width / 2 - (heartWidth / 2 + 730), Screen.height / 2 - (heartHeight / 2 + 460), heartWidth, heartHeight), heartTexture); 
	}
	if(playerHealth == 0)
	{
		// When the players on 0 lifes
		Application.LoadLevel("Game Over Screen");
	}
	
	// COIN BAR
	// Label size for coins collected
	var coinsCollectedLabelHeight : int = 100;
	var coinsCollectedLabelWidth : int = 100;
	
	// Place label for coins collected
	GUI.Label(Rect(Screen.width / 2 - (coinsCollectedLabelWidth / 2 - 810), Screen.height / 2 - (coinsCollectedLabelHeight / 2 - 460), coinsCollectedLabelWidth, coinsCollectedLabelHeight), currentCoinsCollected.ToString());
	
	// Label size for total coins
	var totalCoinsLabelHeight : int = 100;
	var totalCoinsLabelWidth : int = 100;
	
	// Place label for total coins
	GUI.Label(Rect(Screen.width / 2 - (totalCoinsLabelWidth / 2 - 850), Screen.height / 2 - (totalCoinsLabelHeight / 2 - 460), 100, totalCoinsLabelHeight), "/ 65");
	
	// Coins icon texture
	var coinsTexture = Resources.Load("Coins", Texture2D);
	var coinsHeight : int = 64;
	var coinsWidth : int = 64;
	
	// Place coin icon
	GUI.DrawTexture(Rect(Screen.width / 2 - (coinsWidth / 2 - 710), Screen.height / 2 - (coinsHeight / 2 - 430), coinsWidth, coinsHeight), coinsTexture);

	
	// TIME BAR
	// Label size for timer countdown
	var timerLabelHeight : int = 100;
	var timerLabelWidth : int = 200;
	
	// Place label for timer countdown
	GUI.Label(Rect(Screen.width / 2 - (timerLabelWidth / 2 - 500), Screen.height / 2 - (timerLabelHeight / 2 - 460), timerLabelWidth, timerLabelHeight), timeLeft.ToString("F2") + " Secs");
	
	// Timer icon texture
	var timerTexture = Resources.Load("Timer", Texture2D);
	var timerHeight : int = 100;
	var timerWidth : int = 100;
	
	// Place timer icon
	GUI.DrawTexture(Rect(Screen.width / 2 - (timerWidth / 2 - 370), Screen.height / 2 - (timerHeight / 2 - 430), timerWidth, timerHeight), timerTexture); 
	
	// BATTERY / FLASHLIGHT BAR
	// Label size for battery left
	var batteryLeftLabelHeight : int = 100;
	var batteryLeftLabelWidth : int = 100;
	
	// Place label for battery left
	GUI.Label(Rect(Screen.width / 2 - (batteryLeftLabelWidth / 2 + 700), Screen.height / 2 - (batteryLeftLabelHeight / 2 - 450), batteryLeftLabelWidth, batteryLeftLabelHeight), currentBatteryRemaining.ToString() + "%");
	
	// Flashlight bar textures
	// Battery icon texture
	var batteryTexture = Resources.Load("Battery", Texture2D);
	var batteryHeight : int = 128;
	var batteryWidth : int = 96;
	
	// Flashlight on icon texture
	var flashlightOnTexture = Resources.Load("Flashlight On", Texture2D);
	var flashlightOnHeight : int = 85;
	var flashlightOnWidth : int = 85;
	
	// Flashlight off icon texture
	var flashlightOffTexture = Resources.Load("Flashlight Off", Texture2D);
	var flashlightOffHeight : int = 85;
	var flashlightOffWidth : int = 85;
	
	// Place battery icon
	GUI.DrawTexture(Rect(Screen.width / 2 - (batteryWidth / 2 + 800), Screen.height / 2 - (batteryHeight / 2 - 410), batteryWidth, batteryHeight), batteryTexture);
	
	// If the flashlight is turned on place the flashlight on icon
	if (ShineLight.flashlightOn == true)
	{
		GUI.DrawTexture(Rect(Screen.width / 2 - (flashlightOnWidth / 2 + 800), Screen.height / 2 - (flashlightOnHeight / 2 - 410), flashlightOnWidth, flashlightOnHeight), flashlightOnTexture); // flashlight On
		reduceBatteryNow = true;
		if (callItOnce == false)
		{
			callReduceBattery();
		}
	}
	// If the flashlight is turned off place the flashlight off icon
	if (ShineLight.flashlightOn == false)
	{
		GUI.DrawTexture(Rect(Screen.width / 2 - (flashlightOffWidth / 2 + 800), Screen.height / 2 - (flashlightOffHeight / 2 - 410), flashlightOffWidth, flashlightOffHeight), flashlightOffTexture); // flashlight Off
		CancelInvoke("reduceBattery");
		callItOnce = false;
	}
}

// Extra timer function - manually counts down time 
function countdownTimer()
{
	timeLeft = timeLeft - 0.1;	
}
InvokeRepeating("countdownTimer", 0, 0.1);

// Extra battery functions - calls the count down of the batterys value when triggered
function callReduceBattery()
{
	if (reduceBatteryNow == true)
	{
		InvokeRepeating("reduceBattery", 1, 1);
		callItOnce = true;
	}
}
// manually counts down the batteries value when called
function reduceBattery()
{
	currentBatteryRemaining = currentBatteryRemaining - 1;
}