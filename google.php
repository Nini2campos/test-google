<?php

header('Content-Type: application/json');

require_once 'vendor/autoload.php';

$clientId = '820539662856-njlnjf3un54ajsi7vlpap3511iebnpfd.apps.googleusercontent.com';

$idToken = isset($_POST['id_token']) ? (string) $_POST['id_token'] : null;

if(!$idToken){
  http_response_code(406); // erreur client (400) requête pas acceptable
  echo json_encode([
    'error' => "Le token n'existe pas !",
  ]);
  die;
}

$client = new Google_Client([
  'client_id' => $clientId
]);

try { // verifie si le token existe
  $playload = $client->verifyIdToken($idToken);

} catch (Exception $e) { // si ça ne marche pas Google envoie une exception
  http_response_code(401);
  echo json_encode([
    'error' => "Token invalide !",
  ]);
  die;
}

$userId = $playload['sub'];
echo json_encode($playload)



 ?>
