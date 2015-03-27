#pragma strict

function OnCollisionEnter(collision : Collision)
{
	if(collision.gameObject.tag == "Player")
	{
		PlayerStats.playerEndedLevel = true;
		Application.LoadLevel("Game Over Screen");
	}
}