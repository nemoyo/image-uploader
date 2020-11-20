<?php
// console.log($_POST['file']);
// error_log('error_log ERROR', 0);
// error_log($_POST['image'] ,0);
// error_log($_FILES['file'] ,0);

// データベースへの接続
$user = 'root';
$password = 'Root#123';
$pdo = new PDO('mysql:host=127.0.0.1;dbname=image_uploader;charset=utf8',$user,$password);
// $sql = 'select * from image_data';
// $stmt = $pdo->prepare($sql);
// $stmt->execute();


$fileName = $_FILES['image']['name'];
$fileType = $_FILES['image']['type'];
$fileContent = $_FILES['image']['tmp_name'];
$fileContent2 = file_get_contents($_FILES['image']['tmp_name']);
error_log($fileContent);
error_log($fileContent2);
// error_log($fileContent2);
if (!file_exists('upload')) {
    mkdir('upload');
}
move_uploaded_file($fileContent, 'upload/' . $fileName);
// $encode = base64_encode($fileContent);

$sql = 'INSERT INTO image_data (img,img_name) VALUES (:img_data, :img_name)';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':img_data', $fileContent2);
$stmt->bindValue(':img_name', $fileName);
$stmt->execute();
// $stmt->debugDumpParams();

// error_log($sql);

$domain = $_SERVER['HTTP_HOST'];
echo json_encode('https://'. $domain .'/upload/'.$fileName);
// error_log(json_encode('https://'. $domain .'/upload/'.$fileName))

// error_log(print_r($_FILES['file']."\n",true),"3","./error.log");
?>

