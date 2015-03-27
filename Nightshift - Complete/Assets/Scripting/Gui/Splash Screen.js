#pragma strict

// Declare the use of a GUI skin
var nightshiftGUISkin : GUISkin[];

// Declare normal textures and sizes
var bannerTexture = Resources.Load("Banner", Texture2D);
var bannerHeight : int = 100;
var bannerWidth : int = 512;

var startTexture = Resources.Load("Start", Texture2D);
var startHeight : int = 100;
var startWidth : int = 150;

var howToPlayTexture = Resources.Load("How to Play", Texture2D);
var howToPlayHeight : int = 100;
var howToPlayWidth : int = 300;

var quitTexture = Resources.Load("Quit", Texture2D);
var quitHeight : int = 100;
var quitWidth : int = 150;
	
function OnGUI()
{
	GUI.skin = Resources.Load("NightshiftSkin", GUISkin);
	
	GUI.DrawTexture(Rect(Screen.width / 2 - (512 / 2), Screen.height / 2 - (100 * 2), 512, 100), bannerTexture); // Banner 
	
	if (GUI.Button(Rect(Screen.width / 2 - (150 / 2), Screen.height / 2 - (100 * 0.8), 150, 100), startTexture)) // Start Button 
	{
		Application.LoadLevel("Loading Screen");
	}
	
	if (GUI.Button(Rect(Screen.width / 2 - (300 / 2), Screen.height / 2 - (100 * -0.3), 300, 100), howToPlayTexture)) // How to Play Button 
	{
		Application.LoadLevel("How to Play");
	}
	
	if (GUI.Button(Rect(Screen.width / 2 - (150 / 2), Screen.height / 2 - (100 * -1.4), 150, 100), quitTexture)) // Quit Button 
	{
		Application.Quit();
	}
}