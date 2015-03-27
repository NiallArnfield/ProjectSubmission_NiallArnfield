#pragma strict

// Declare the use of a GUI skin
var nightshiftGUISkin : GUISkin[];

// Declare normal textures and sizes
var bannerTexture = Resources.Load("Banner", Texture2D);
var bannerHeight : int = 100;
var bannerWidth : int = 512;

var loadingBarHolderTexture = Resources.Load("Loading Bar Holder", Texture2D);
var loadingBarHolderHeight : int = 128;
var loadingBarHolderWidth : int = 512;

var loadingBarTexture = Resources.Load("Loading Bar", Texture2D);
var loadingBarHeight : int = 25;
var loadingBarWidth : float = 5.12;

var scale : int = 1;
var currentLoadingBarWidth;
var showPreloadMessage : boolean = false;

InvokeRepeating("scaleTexture", 2, 0.1);


function OnGUI()
{
	GUI.skin = Resources.Load("NightshiftSkin", GUISkin);
	
	GUI.DrawTexture(Rect(Screen.width / 2 - (bannerWidth / 2), Screen.height / 2 - (bannerHeight * 1), bannerWidth, bannerHeight), bannerTexture); // Banner
	
	GUI.DrawTexture(Rect(Screen.width / 2 - (loadingBarHolderWidth / 2), Screen.height / 2 - (loadingBarHolderHeight * 0), loadingBarHolderWidth, loadingBarHolderHeight), loadingBarHolderTexture); // Loading Bar Holder
	
	GUI.DrawTexture(Rect(Screen.width / 2 - 252, Screen.height / 2 - (loadingBarHeight * -0.1 + 2), currentLoadingBarWidth, loadingBarHeight * 1.2), loadingBarTexture); // Loading Bar
	
	GUI.Label(Rect(Screen.width / 2 - 25, Screen.height / 2 + 40, 100, 50), scale + "%");
	
	if (showPreloadMessage == true)
	{
		GUI.Label(Rect(Screen.width / 2 - 150, Screen.height / 2 + 120, 600, 50), "Preloading Level...");
	}
}

function scaleTexture()
{
	currentLoadingBarWidth = loadingBarWidth * scale;
	scale++;
	
	if (scale == 100)
	{
		showPreloadMessage = true;
		Application.LoadLevel("Level");
	}
}