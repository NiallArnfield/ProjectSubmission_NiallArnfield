#pragma strict

var raycastCamera : Camera; // Camera the raycast will be sent from

var flashlight : Light;
static var flashlightOn : boolean = false;
static var batteryRemaining : int = 100; // The amount of battery left
var isThereBattery : boolean = true; // Is there battery still available?
var flashlightTravelDistance : int = 20; // The distance the raycast/light travels in units
var drawRayTime : int = 1; // The amount of time the Drawray function is called after clicking
var showNoBatteryGUI : boolean = false;

var leftClickClosed : boolean = false;
var rightClickClosed : boolean = true;

function Update() 
{
	if (isThereBattery == true)
	{
		if (Input.GetMouseButtonDown(0) && leftClickClosed == false) // Left click
		{
			flashlight.enabled = !flashlight.enabled;
			InvokeRepeating("DetectEnemy", 0, 0.1);	
			leftClickClosed = true;
			rightClickClosed = false;
			flashlightOn = true;
		}
		
		if (Input.GetMouseButtonDown(1) && rightClickClosed == false) // Right click
		{
			flashlight.enabled = !flashlight.enabled;
			CancelInvoke();
			leftClickClosed = false;
			rightClickClosed = true;
			flashlightOn = false;
		}
	}
	
	//if (PlayerStats.currentBatteryRemaining == 0)
	//{
	//	isThereBattery = false;
		//PlayerStats.currentBatteryRemaining = 0;
	//}
	
	if (isThereBattery == false)
	{
		leftClickClosed = true;
		rightClickClosed = true;
		flashlightOn = false;
		canTurnOff = true;
		if (canTurnOff == true)
		{
			turnLightOff();
			canTurnOff = false;
		}	
	}
}

var canTurnOff : boolean = false;

function turnLightOff()
{
	flashlight.enabled = !flashlight.enabled;	
	canTurnOff = false;
}

function DetectEnemy()
{
	if(isThereBattery == true) // If there is still battery available
	{
		var hit : RaycastHit;
		var ray : Ray = raycastCamera.ViewportPointToRay(Vector3(0.5, 0.5, 0)); // shoot a ray to the center of the camera perspective
		if (Physics.Raycast (ray, hit)) // if it hits an object with a collider
		{		
			Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * flashlightTravelDistance, Color.red, drawRayTime); // draw the ray show the path
			
			if (hit.collider.tag == "Enemy")
			{
				Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * flashlightTravelDistance, Color.green, drawRayTime); 
				AI.dazedByFlashlight = true;
			}
		}
	}
}