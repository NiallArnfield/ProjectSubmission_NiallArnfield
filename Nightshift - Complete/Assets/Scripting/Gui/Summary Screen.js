#pragma strict

var totalScore : int;

// Declare the use of a GUI skin
var nightshiftGUISkin : GUISkin[];

// Declare normal textures and sizes
var heartTexture = Resources.Load("Heart", Texture2D);
var heartHeight : int = 64;
var heartWidth : int = 48;

var heartBWTexture = Resources.Load("HeartBW", Texture2D);
var heartBWHeight : int = 64;
var heartBWWidth : int = 48;

var coinsTexture = Resources.Load("Coins", Texture2D);
var coinsHeight : int = 256;
var coinsWidth : int = 256;

var timerTexture = Resources.Load("Timer", Texture2D);
var timerHeight : int = 256;
var timerWidth : int = 256;

var summaryFormatTexture = Resources.Load("Summary Format", Texture2D);
var summaryFormatHeight : int = 374;
var summaryFormatWidth : int = 512;

var playAgainTexture = Resources.Load("Summary Format", Texture2D);
var playAgainHeight : int = 256;
var playAgainWidth : int = 128;

function Start()
{
	totalScoreIs();
}

function OnGUI()
{
	GUI.skin = Resources.Load("NightshiftSkin", GUISkin);
	
	// Coin count, time left and total labels
	GUI.Label(Rect(Screen.width / 2 - (heartWidth / 2 - 240), Screen.height / 2 - (heartHeight / 2 + 40), 100, 100), PlayerStats.currentCoinsCollected.ToString() + "/65");
	GUI.Label(Rect(Screen.width / 2 - (heartWidth / 2 - 130), Screen.height / 2 - (heartHeight / 2 + 100), 100, 100), PlayerStats.playerHealth.ToString());
	GUI.Label(Rect(Screen.width / 2 - (heartWidth / 2 - 210), Screen.height / 2 - (heartHeight / 2 - 22), 200, 100), PlayerStats.timeLeft.ToString("F0") + " Secs");
	GUI.contentColor = Color.yellow;
	GUI.Label(Rect(Screen.width / 2 - (heartWidth / 2 - 110), Screen.height / 2 - (heartHeight / 2 - 130), 200, 200), totalScore.ToString());
	GUI.contentColor = Color.white;
	GUI.DrawTexture(Rect(Screen.width / 2 - (summaryFormatWidth / 2 - 200 + 450), Screen.height / 2 - (summaryFormatHeight / 2 + 300), 512, 374), summaryFormatTexture); // Heart
	
	if (GUI.Button(Rect(Screen.width / 2 - (150 / 2 + 40), Screen.height / 2 - (100 * -1.7), 250, 125), playAgainTexture)) // Start Button 
	{
		PlayerStats.currentCoinsCollected = 0;
		PlayerStats.totalCoinsCollected = 0;
		PlayerStats.playerHealth = 5;
		PlayerStats.timeLeft = 600;
		Application.LoadLevel("Splash Screen");
	}
}

function totalScoreIs()
{
	for(var i = 0; i < PlayerStats.currentCoinsCollected; i++)
	{
		totalScore = totalScore + 100;
	}

	for(var n = 0; i < PlayerStats.playerHealth; n++)
	{
		totalScore = totalScore + 1000;
	}
	
	for(var o : float = 0; o < PlayerStats.timeLeft; o++)
	{
		totalScore = totalScore + 10;
	}

}