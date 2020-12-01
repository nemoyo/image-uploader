<?php
header('Content-Type: text/plain; charset=utf-8');
// console.log($_POST['file']);
// error_log('error_log ERROR', 0);
// error_log($_POST['image'] ,0);
// error_log($_FILES['file'] ,0);

// データベースへの接続
// $user = 'root';
// $password = 'Root#123';
// $pdo = new PDO('mysql:host=127.0.0.1;dbname=image_uploader;charset=utf8',$user,$password);
// $sql = 'select * from image_data';
// $stmt = $pdo->prepare($sql);
// $stmt->execute();

// if (!isset($_FILES['image']['error'])) || (!is_int($_FILES['image']['error'])) {
//     error_log('errorcheck',3,"./error.log");
// }

try {
    $errorCode = array("status"=>"OK","message"=>"");
    // 未定義である・複数ファイルである・$_FILES Corruption 攻撃を受けた
    // どれかに該当していれば不正なパラメータとして処理する
    if (!isset($_FILES['image']['error']) || !is_int($_FILES['image']['error'])){
        throw new RuntimeException('errortest');
    }

    // $_FILES['image']['type']の値はブラウザ側で偽装可能なので
    // MIMEタイプに対応する拡張子を自前で取得する
    if (
        !$ext = array_search(
            mime_content_type($_FILES['image']['tmp_name']),
            array(
                'gif' => 'image/gif',
                'jpg' => 'image/jpeg',
                'png' => 'image/png',
            ),
            true
        )
    ) {
        throw new RuntimeException('ファイル形式が無効です');
    }

    // ファイルデータからSHA-1ハッシュを取ってファイル名を決定し，保存する
    if (
        !move_uploaded_file(
            $_FILES['image']['tmp_name'],
            $path = sprintf(
                './upload/%s.%s',
                sha1_file($_FILES['image']['tmp_name']),
                $ext
            )
        )
    ) {
        throw new RuntimeException('ファイル保存時にエラーが発生しました');
    }

    // 保存したURLを返す
    $domain = $_SERVER['HTTP_HOST'];
    // echo json_encode('https://'. $domain . str_replace('.','',$path) );
    

} catch (RuntimeException $e) {
    //throw $th;
    $errorCode["status"] = "NG";
    $errorCode["message"] = $e->getMessage();
    echo json_encode($errorCode);
}

// error_log($fileContent2);

// $sql = 'INSERT INTO image_data (img,img_name) VALUES (:img_data, :img_name)';
// $stmt = $pdo->prepare($sql);
// $stmt->bindValue(':img_data', $fileContent2);
// $stmt->bindValue(':img_name', $fileName);
// $stmt->execute();
// $stmt->debugDumpParams();

// error_log($sql);


?>

