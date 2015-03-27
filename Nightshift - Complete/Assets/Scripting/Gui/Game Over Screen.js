#pragma strict

// Declare the use of a GUI skin
var nightshiftGUISkin : GUISkin[];

// Game Over Banner
var gameOverTexture = Resources.Load("Game Over", Texture2D);
var gameOverHeight : int = 100;
var gameOverWidth : int = 512;

// Go to summary button
var summaryButtonHeight : int = 100;
var summaryButtonWidth : int = 600;

function OnGUI()
{
	// Use skin
	GUI.skin = Resources.Load("NightshiftSkin", GUISkin);
	
	// Player Dies
	// Player dies label
	var playerDiesLabelHeight : int = 100;
	var playerDiesLabelWidth : int = 500;

	if (PlayerStats.playerHealth == 0)
	{
		// Place the game over banner texture
		GUI.DrawTexture(Rect(Screen.width / 2 - (gameOverWidth / 2), Screen.height / 2 - (gameOverHeight / 2), gameOverWidth, gameOverHeight), gameOverTexture); 
		
		// Set font color to red
		GUI.contentColor = Color.red;
		
		// Place the player dies label
		GUI.Label(Rect(Screen.width / 2 - (playerDiesLabelWidth / 2 - 160), Screen.height / 2 - (playerDiesLabelHeight / 2 - 100), playerDiesLabelWidth, playerDiesLabelHeight), "You Died!"); 
		
		// Set font color to white
		GUI.contentColor = Color.white;
		
		// Place the proceed to summary screen button
		if (GUI.Button(Rect(Screen.width / 2 - (summaryButtonWidth / 2), Screen.height / 2 - (summaryButtonHeight / 2 - 400), summaryButtonWidth, summaryButtonHeight), "Proceed to Summary Screen"))	
		{
			Application.LoadLevel("Summary Screen");
		}
	}
	
	// Player runs out of time
	// Out of time label
	var outOfTimeLabelHeight : int = 100;
	var outOfTimeLabelWidth : int = 500;

	if (PlayerStats.timeOver == true)
	{
		// Place the game over banner texture
		GUI.DrawTexture(Rect(Screen.width / 2 - (gameOverWidth / 2), Screen.height / 2 - (gameOverHeight / 2), gameOverWidth, gameOverHeight), gameOverTexture);
		
		// Set font color to red
		GUI.contentColor = Color.red;
		
		// Place the out of time label
		GUI.Label(Rect(Screen.width / 2 - (outOfTimeLabelWidth / 2 - 170), Screen.height / 2 - (outOfTimeLabelHeight / 2 - 100), outOfTimeLabelWidth, outOfTimeLabelHeight), "Time up!");
		
		// Set font color to white
		GUI.contentColor = Color.white;
		
		// Place the proceed to summary screen button
		if (GUI.Button(Rect(Screen.width / 2 - (summaryButtonWidth / 2), Screen.height / 2 - (summaryButtonHeight / 2 - 400), summaryButtonWidth, summaryButtonHeight), "Proceed to Summary Screen")) // Summary Screen button	
		{
			Application.LoadLevel("Summary Screen");
		}
	}
	
	// Player completes the level
	// Level complete label
	var levelCompleteLabelHeight : int = 100;
	var levelCompleteLabelWidth : int = 500;

	if (PlayerStats.playerEndedLevel == true)
	{
		// Place the game over banner texture
		GUI.DrawTexture(Rect(Screen.width / 2 - (levelCompleteLabelWidth / 2), Screen.height / 2 - (levelCompleteLabelHeight / 2), levelCompleteLabelWidth, levelCompleteLabelHeight), gameOverTexture);
		
		// Set font color to green
		GUI.contentColor = Color.green;
		
		// Place the level complete label
		GUI.Label(Rect(Screen.width / 2 - (levelCompleteLabelWidth / 2 - 100), Screen.height / 2 - (levelCompleteLabelWidth / 2 - 300), levelCompleteLabelWidth, levelCompleteLabelWidth), "Level Complete!");
		
		// Set font color to white
		GUI.contentColor = Color.white;
		
		// Place the proceed to summary screen button
		if (GUI.Button(Rect(Screen.width / 2 - (summaryButtonWidth / 2), Screen.height / 2 - (summaryButtonHeight / 2 - 400), summaryButtonWidth, summaryButtonHeight), "Proceed to Summary Screen")) // Summary Screen button	
		{
			Application.LoadLevel("Summary Screen");
		}
	}
}