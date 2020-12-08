<?php
header('Content-Type: text/plain; charset=utf-8');
// console.log($_POST['file']);
// error_log('error_log ERROR', 0);
// error_log($_POST['image'] ,0);
// error_log($_FILES['file'] ,0);

error_log('foooo'."\n");
// // データベースへの接続
try {
    $user = 'root';
    $password = 'Root#123';
    $pdo = new PDO('mysql:host=db;dbname=imageuploader;charset=utf8',$user,$password);
    error_log('connect success' . "\n");
} catch (PDOException $e) {
    error_log('connect failed: '. $e->getMessage() . "\n");
}

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
    // 保存したpathをデータベースに保存する
    $create_date = new DateTime();
    $create_date = $create_date->format('Y-m-d H:i:s');
    error_log('create_date: ' .$create_date ."\n");

    $sql = 'INSERT INTO images (upload_path,create_date) VALUES (:upload_path, :create_date)';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':upload_path', $path);
    $stmt->bindValue(':create_date', $create_date);
    $stmt->execute();

    // HTTPかHTTPSはアクセスしてきたブラウザによって変更したい_
    $url = (empty($_SERVER["HTTPS"]) ? "http://" : "https://"). $_SERVER['HTTP_HOST']  . mb_substr($path,1);
    error_log('image upload success : upload path is :' .$url ."\n");
    $errorCode["message"] = $url;
    echo json_encode($errorCode);    

} catch (RuntimeException $e) {
    //throw $th;
    $errorCode["status"] = "NG";
    $errorCode["message"] = $e->getMessage();
    echo json_encode($errorCode);
} catch (PDOException $e) {
    error_log('insert failed: '. $e->getMessage() . "\n");
}

?>

