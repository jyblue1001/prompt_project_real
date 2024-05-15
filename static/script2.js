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

function uploadImage() {
  var imageData = document.getElementById('photo').src; // Get the src attribute of the <img> element

  // Convert base64 image data to a Blob object
  var byteString = atob(imageData.split(',')[1]);
  var mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], { type: mimeString });

  // Create a new FormData object
  var formData = new FormData();

  // Append the image file to the FormData object with the key 'imagefile'
  formData.append('imagefile', blob, 'image.png');

  // Send a POST request to the Flask backend
  fetch('/', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      // Handle response from the server
      // For example, you can display the result returned by the server
      return response.text();
  })
  .then(data => {
      // 필요한 경우 서버 응답 처리
      console.log(data); // 이 줄은 딱히 필요한 부분은 아닙니다.

      // emojiResult div 표시 및 예측 텍스트 설정
      var emojiResultPredict = document.getElementById('emojiResult');
      var predictionElement = document.getElementById('prediction');
      predictionElement.innerText = data; // 데이터가 예측 결과라고 가정

      emojiResultPredict.style.display = 'block'; // emojiResult div 표시
  })
  .catch(error => {
      // Handle errors
      console.error('Error:', error);
  });
}



(() => {
// The width and height of the captured photo. We will set the
// width to the value defined here, but the height will be
// calculated based on the aspect ratio of the input stream.

const width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream

// |streaming| indicates whether or not we're currently streaming
// video from the camera. Obviously, we start at false.

let streaming = false;

// The various HTML elements we need to configure or control. These
// will be set by the startup() function.

let video = null;
let canvas = null;
let photo = null;
let startbutton = null;

function showViewLiveResultButton() {
  if (window.self !== window.top) {
    // Ensure that if our document is in a frame, we get the user
    // to first open it in its own tab or window. Otherwise, it
    // won't be able to request permission for camera access.
    document.querySelector(".contentarea").remove();
    const button = document.createElement("button");
    button.textContent = "View live result of the example code above";
    document.body.append(button);
    button.addEventListener("click", () => window.open(location.href));
    return true;
  }
  return false;
}

function startup() {
  if (showViewLiveResultButton()) {
    return;
  }
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  photo = document.getElementById("photo");
  startbutton = document.getElementById("startbutton");

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });

  video.addEventListener(
    "canplay",
    (ev) => {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false,
  );

  startbutton.addEventListener(
    "click",
    (ev) => {
      takepicture();
      ev.preventDefault();
    },
    false,
  );

  clearphoto();
}

// Fill the photo with an indication that none has been
// captured.

function clearphoto() {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.

function takepicture() {
  const context = canvas.getContext("2d");
  if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data); // Update the photo element with the captured image
      console.log(photo.src)
  } else {
      clearphoto();
  }
}


// Set up our event listener to run the startup process
// once loading is complete.
window.addEventListener("load", startup, false);
})();
