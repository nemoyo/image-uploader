// import 'whatwg-fetch';
// import '@babel/polyfill';
import { displayMessage} from "./base.js";

const fileSelect = document.getElementById('file-select');
const copylinkButton = document.getElementById('copylink-button');

// const uploadImage = (inputFile)  => {
async function uploadImage(inputFile) {
	const formData = new FormData();
	formData.append('image',inputFile);

	// Uploadingを表示する
	const main = document.getElementById('main');
	main.style.display = "none";
	const loader = document.querySelector('.loader');
	loader.style.display = "block";

	try {
		const response = await window.fetch('upload.php', {method: 'POST', body:formData});
		const responseText = await response.json();
		if (responseText['status'] == "NG") {
			displayMessage(responseText['message']);
			throw responseText['message'];
		}
		// 連想配列のjsonデータをfor .. in で取得する方法
		// for(let key in json) {
		// 	 console.log(key + ':' + json[key]);
		// }

		// XMLで非同期処理を書く場合
		// const xhr = new XMLHttpRequest();
		// // 以下を記載すると「Missing boundary in multipart/form-data POST data in Unknown」エラーになる
		// // xhr.setRequestHeader("Content-Type", "multipart/form-data");
		
		// // 進捗情報を表示するバーを作りたかったが、event.lengthComputable が trueにならず、配下の処理が行われない
		// // xhr.onprogress = function(event) {
		// // 	if (event.lengthComputable) {
		// // 		const complete = (event.loaded / event.total * 100 | 0);
		// // 		console.log(complete);
		// // 	}
	
		// xhr.open('POST', 'upload.php', true);
		// xhr.onload = function() {
		// 	if (xhr.status === 200) {
			
		// サーバから取得したpathの画像を表示する
		const filePath = responseText['message'];
		const preview = document.getElementById('preview');
		const img = document.createElement('img');
		img.src = filePath;
		img.setAttribute("width","400px");
		preview.appendChild(img);


		// input=fileで指定した画像を表示する
		// const preview = document.getElementById('preview');
		// const reader = new FileReader();
		// reader.onload = function(e) {
		// 	const imageUrl = e.target.result;
		// 	const img = document.createElement('img');
		// 	img.setAttribute("width","400px");
		// 	img.src = imageUrl;
		// 	preview.appendChild(img);
		// }
		// reader.readAsDataURL(inputFile);

	// 		console.log('xhr.status = ' + xhr.status);
	// 		console.log('xhr.responseText = ' + xhr.responseText);
		const copylink = document.getElementsByName('copylink');
		// copylink.item(0).value = JSON.parse(xhr.responseText);
		copylink.item(0).value = filePath;
		
		const resultStatus = document.getElementById('result-status');
		resultStatus.textContent = "Upload SuccessFully!";
		
		// 	} else {
		// 		console.log('error');
		// 	}
		// };
		// 結果領域の表示
		main.style.display = "";
		document.getElementById('file-input').style.display = "none";
		document.getElementById('result').style.display = "block";
		loader.style.display = "none";
		// xhr.send(formData);
	} catch(err) {
		console.log(err);
		main.style.display = "";
		loader.style.display = "none";
	}
}

const handleFileSelect = () => {
	uploadImage(fileSelect.files[0]);
};

// イベント系の処理は後半の行にした方がよい
fileSelect.addEventListener('change', handleFileSelect);

//コピーリンクボタンを押したときにテキスト内容をコピーする
copylinkButton.addEventListener('click', () => {
	const copylink = document.getElementsByName('copylink');
	copylink.item(0).select();
	document.execCommand("copy");
});

// ドラッグアンドドロップで画像ファイルを指定した時の処理
document.addEventListener('DOMContentLoaded',() => {
	const uploadArea = document.getElementById('uploadArea');
	uploadArea.addEventListener('dragover',(event) => {
		event.preventDefault();
		event.target.classList.add('drag');
	});
	uploadArea.addEventListener('dragleave', (event) => {
		event.target.classList.remove('drag');	
	});
	uploadArea.addEventListener('drop',(event) => {
		//下記のコードを記載するとファイルドロップ時に別タブがひらかない
		event.preventDefault();

		const input = document.querySelectorAll('input[name="file"]');
		input.files = event.dataTransfer.files;
		uploadImage(input.files[0]);
		
	});
});


