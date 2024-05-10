// script.js

function displayRandomEmoji() {
    var emojis = ['😊', '😄', '😁', '😆', '😅', '🤣', '😂', '😇', '😍', '😘'];
    var randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
    var emojiResultElement = document.getElementById('randomEmoji'); // 이모지를 표시할 요소 선택
    emojiResultElement.innerText = "랜덤 이모지는 " + randomEmoji + "입니다.";
}
  
window.onload = function() {
    displayRandomEmoji();
};

// 이미지 미리보기 함수
function previewImage(event) {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();
    
    reader.onload = function() {
        var output = document.getElementById('imagePreview');
        output.innerHTML = '<img src="' + reader.result + '" style="max-width: 300px; max-height: 300px;">';
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}



// 새로 추가된 함수입니다!!

// 이미지 업로드 함수
function uploadImage() {
    var formElement = document.getElementById('uploadForm');
    var formData = new FormData(formElement);

    // 서버로 POST 요청 보내기
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // 필요한 경우 서버 응답 처리
        console.log(data); // 이 줄은 딱히 필요한 부분은 아닙니다.

        // emojiResult div 표시 및 예측 텍스트 설정
        var emojiResultPredict = document.getElementById('emojiResult');
        var predictionElement = document.getElementById('prediction');
        predictionElement.innerText = data; // 데이터가 예측 결과라고 가정

        emojiResultPredict.style.display = 'block'; // emojiResult div 표시
    })
    .catch(error => { // 이 catch도 기능적으로 딱히 필요한 부분은 아닙니다.
        // 발생한 오류 처리
        console.error('에러:', error);
    });
}

/* 혹시나 해서 gpt로 뽑은 설명을 첨부해놓을게요

The "POST" method is used in the context of HTTP requests, particularly when sending data to a server to create or update a resource. In your code, the "POST" method is being used in the following scenario:

When the user interacts with the web page, specifically when they upload an image file using the form and click the "Predict Image" button.

In the JavaScript function uploadImage(), which is triggered when the user clicks the "Predict Image" button, a POST request is made to the server.


Here's a breakdown of the process:

1. The user selects an image file using the file input field in the form.

2. When the user clicks the "Predict Image" button, the uploadImage() function is called.

3. Inside the uploadImage() function, a FormData object is created from the form containing the selected image file.

4. This FormData object is then sent as the body of a POST request to the server using the Fetch API.

5. On the server side, the Flask route decorator @app.route('/', methods=['POST']) specifies that the predict() function in app.py should handle POST requests to the root URL ("/").

6. Therefore, when the server receives the POST request with the image data, it triggers the predict() function in app.py.

7. Inside the predict() function, the server processes the image data, performs any necessary operations (such as running the image through a machine learning model), and generates a response containing the prediction result.


Finally, the response with the prediction result is sent back to the client, where it can be processed and displayed to the user.

So, the "POST" method is happening when the user submits the form by clicking the "Predict Image" button, triggering the uploadImage() function, and sending the image data to the server for processing.

*/