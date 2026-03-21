<?php
  $donnees = json_decode(file_get_contents("php://input"));
  //var_dump($donnees);


  echo json_encode(
    [
      "succes" => true,
      "donnees" => $donnees
    ]
  );
?>