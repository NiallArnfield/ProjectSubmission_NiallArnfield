#pragma strict

// If the player collides with an object with this script attached to it
function OnCollisionEnter(collision : Collision)
{
	if(collision.gameObject.tag == "Player")
	{
		PlayerStats.totalCoinsCollected++; // Add 1 to the value of total coins collected
		DestroyCoin(); // call the destroy coin method
	}
}

// Destroys the object with this script attached to it
function DestroyCoin()
{
	Destroy (gameObject);
}