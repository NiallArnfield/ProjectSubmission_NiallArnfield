#pragma strict

function Update()
{	
	// Show object with this script attached to it if its hit by the flashlights raycast
	if (AI.dazedByFlashlight == true)
	{
		renderer.enabled = true;
	}
	// Otherwise keep it invisable
	else 
	{
		renderer.enabled = false;
	}
}
