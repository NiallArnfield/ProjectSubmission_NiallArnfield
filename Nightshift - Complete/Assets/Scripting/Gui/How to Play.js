#pragma strict

// Declare the use of a GUI skin
var nightshiftGUISkin : GUISkin[];

// Declare normal textures and sizes
var controlsRulesTexture = Resources.Load("Controls and Rules", Texture2D);
var controlsRulesHeight : int = 500;
var controlsRulesWidth : int = 800;

var returnToMainMenuTexture = Resources.Load("Return to Main Menu", Texture2D);
var returnToMainMenuHeight : int = 100;
var returnToMainMenuWidth : int = 500;

function OnGUI()
{
	GUI.skin = Resources.Load("NightshiftSkin", GUISkin);
	
	GUI.DrawTexture(Rect(Screen.width / 2 - (800 / 2), Screen.height / 2 - (500 / 1.7), 800, 500), controlsRulesTexture); // How to play picture
	
	if (GUI.Button(Rect(Screen.width / 2 - (500 / 2), Screen.height / 2 - (100 - 310), 500, 100), returnToMainMenuTexture)) // Return to Main Menu button
	{
		Application.LoadLevel("Splash Screen");
	}
}