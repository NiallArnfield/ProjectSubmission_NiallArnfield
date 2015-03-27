#pragma strict

// Textures
var defaultReticleTexture : Texture; // Default reticle texture
var hitReticleTexture : Texture; // Hit reticle texture only appears if hit returns true
var bulletHole : GameObject;
var showDefaultCrosshair : boolean = true;

// Positions (Transforms)
var thePlayer : Transform; // The position of the player
var availableFirearm : Transform; // The position of the available firearms
var activeFirearm : Transform; // The position of the active firearm
var unactiveFirearm : Transform; // The position of an unactive firearm

// Sets the parent gameobject
var parent : GameObject;

// Creates value for targetDetach
var targetDetach;

// True / Falses
static var didItHit : boolean = false; // Did the bullet hit on object?
var isClicked : boolean = false; // Is the Left mouse button clicked?
var isThereAmmo : boolean = true; // Is there ammo still available?
var hasChildren : boolean = false; // Does the parent have children?
var firearmIsClose : boolean = false; // Is there an available firearm within a set distance?
var rightClickActive : boolean = false; // Is right click held down?
var player : Camera;
var scopeCamera : Camera;
var holdDuration : float = 0;
// Weapon details
var clipSize : int = 5; // The current clip size is 5
var ammoAmount : int = clipSize; // The amount of ammo the clip could have
var ammoRemaining : int = 5; // The amount of ammo remaining in the clip
var bulletTravelDistance : int = 20; // The distance the raycast/bullet travels in units

var timeBetweenShot : float = 0.2; // The time between each shot when the left mouse button is held down
var drawRayTime : float = 0.5; // The amount of time the Drawray function is called after clicking
var impactForce: float = 1.0; // The amount of force the bullet applies to a ridgedbody object
var firearmDistance : float; // The distance between the player and an available weapon

private var nextFire : float = 0.0; // A meter to determine whether time has exceeded the value for firerate

function Awake()
{
	thePlayer = GameObject.FindGameObjectWithTag("Player").transform;
}

function Update()
{	
	firearmDistance = Vector3.Distance(thePlayer.transform.position, availableFirearm.transform.position); // Returns the distance between the player and the closest available firearm
	checkSwap(); // Checks and returns result for function checkSwap() every frame
	
	if (parent.transform.childCount == 1) // If the GameObject defined as Parent has a child
	{
		hasChildren = true; 
	}
	else if (parent.transform.childCount == 0) // If the GameObject defined as Parent does not have a child
	{
		hasChildren = false;
	}
	
	if (ammoRemaining == 0) // If there is no more ammo available
	{
		isThereAmmo = false;
	}
	
	if(hasChildren == true) // If parent has a child
	{
		if (Input.GetKeyDown ("r")) // and they press the "r" key
		{
			ammoRemaining = 20; 
			isThereAmmo = true;
		}
	}
	
	if(hasChildren == true) // If the parent has a child
	{
		if (Input.GetKeyDown ("f")) // and they press the "f" key
		{	
			targetDetach = GameObject.Find("Player").transform; // target the gameobject "Player" 
			transform.DetachChildren(); // remove all children from the object
			hasChildren = false;
		}
	}
	
	if (Input.GetKeyDown ("g")) // if the key "g" is pressed
	{	
		if(firearmIsClose == true) // and there is an available weapon close
		{
			unactiveFirearm.parent = transform; //
			unactiveFirearm.localPosition = Vector3(0.45, -0.15, 0.65); 
			unactiveFirearm.localRotation = Quaternion.Euler(0, 90, 0);
			unactiveFirearm.LookAt(transform);
		}
	}
	
	if(hasChildren == true) // If the parent has a child
	{		
		if (Input.GetButton("Fire1") && Time.time > nextFire) // and the press "Left Click" 
		{	
			var fireRate : float = 0.1;
			nextFire = Time.time + fireRate; 
			DetectEnemy(); // call this method
		}
		if (Input.GetButton("Fire2")) // and the press "Right Click" 
		{	
			showDefaultCrosshair = false;
			rightClickActive = true;
			switchCameraZoom();
		}
		if (Input.GetButtonUp("Fire2")) // and the press "Right Click" 
		{
			showDefaultCrosshair = true;
			player.enabled = true;
			scopeCamera.enabled = false;
		}
	}
}	

function switchCameraZoom()
{
	if (rightClickActive == true)
	{
		player.enabled = false;
		scopeCamera.enabled = true;
	}
}

function DetectEnemy()
{
	if(isThereAmmo == true) // If there is still ammo available
	{
		var hit : RaycastHit;
		var ray : Ray = camera.ViewportPointToRay (Vector3(0.5,0.5,0)); // shoot a ray to the center of the camera perspective
		if (Physics.Raycast (ray, hit)) // if it hits an object with a collider
		{		
			Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * bulletTravelDistance, Color.green, drawRayTime); // draw the ray show the velocity
			var hitRotation = Quaternion.FromToRotation(Vector3.up, hit.normal);
			Instantiate(bulletHole, hit.point, hitRotation);
			didItHit  = true; 
			yield WaitForSeconds(0.01);
			didItHit  = false;
			ammoRemaining--; 
			audio.Play();
			//hit.rigidbody.AddForceAtPosition(ray.direction * impactForce, hit.point);
		}
		else
		{
			Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * bulletTravelDistance, Color.red, drawRayTime); 
			ammoRemaining--;
		}
	}
}

function OnGUI() 
{	
	var ammoWidth = 300;
  	var ammoHeight = 30;
  	
  	if(hasChildren == true) // If the parent has a child
	{
		// Show these messages
		GUI.Label (Rect(Screen.width / 2 - ammoWidth / 2.5, Screen.height / 2.2 - ammoHeight / 2, ammoWidth, ammoHeight), ammoRemaining.ToString()); 
		GUI.Label (Rect(Screen.width / 5 - ammoWidth / 2, Screen.height / 1.05 - ammoHeight / 2, ammoWidth, ammoHeight), "Press F to throw weapon away."); 
	}
	
	var defaultReticleWidth = 32;
  	var defaultReticleHeight = 32;
  	
	if(hasChildren == true) // If the parent has a child
	{
		if(showDefaultCrosshair == true)
		{
			// Render this texture to screen
			GUI.DrawTexture(Rect(Screen.width / 2 - defaultReticleWidth / 2, Screen.height / 2 - defaultReticleHeight / 2, defaultReticleWidth, defaultReticleHeight), defaultReticleTexture);
		}
	}
	
	if(didItHit  == true) // If the bullet hits an object with a collider
	{	
		var hitReticleWidth = 64;
  		var hitReticleHeight = 64;
  		
  		// Render this texutre to the screen
		GUI.DrawTexture(Rect(Screen.width / 2 - hitReticleWidth / 2, Screen.height / 2 - hitReticleHeight / 2, hitReticleWidth, hitReticleHeight), hitReticleTexture);
	}
	
	if(isThereAmmo == false) // if there is no more ammo
	{
		var reloadWidth = 200;
  		var reloadHeight = 20;
  		
  		// Show this message
		GUI.Label (Rect(Screen.width / 2 - reloadWidth / 1.3, Screen.height / 2 - reloadHeight / 2, reloadWidth, reloadHeight), "Press R to Reload");
	}
	
	if (firearmIsClose == true) // If there is an available firearm close
	{	
		var swapWidth = 200;
  		var swapHeight = 20;
  		
  		if (parent.transform.childCount > 0) // and the parent does not have a child
  		{
  			// Show this message
			GUI.Label (Rect(Screen.width / 2 - swapWidth / 2, Screen.height / 1.5 - swapHeight / 2, swapWidth, swapHeight), "Press G to swap weapons.");
		}
		else // otherwise
		{
			// Show this message
			GUI.Label (Rect(Screen.width / 2 - swapWidth / 2, Screen.height / 1.5 - swapHeight / 2, swapWidth, swapHeight), "Press G to pick up weapon");
		}
	}
}	

function checkSwap()
{	
	if (firearmDistance <= 2.0f) // If there is an available weapon within 2 less than or equal to 2 units
	{
		firearmIsClose = true;
		yield WaitForSeconds(2.0);
		firearmIsClose = false;
	}
}
