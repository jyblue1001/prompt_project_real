---
### 12:15 PM 5/10/2024
### - 기존: 주어진 이미지에 대해 [예측 표정, 확률]이 여러개 나타남.
### - 수정: 주어진 이미지에 대한 [예측 표정, 확률] 중 제일 큰 확률을 가진 것만 나타남
---
<br/><br/>

---
### 8:04 PM 5/13/2024
### - app.py에서 return 구문 수정
### - "script.js" 파일에서 새로운 함수 추가
### - 그 외(index.html 등등)는 변경 사함 없습니다
---

<br/><br/><br/><br/>



아래의 유튜브 비디오를 참고해서 웹페이지를 만들었습니다.
https://www.youtube.com/watch?v=0nr6TPKlrN0

유튜브 해당 코드의 깃허브 리포지포리
https://github.com/JayMehtaUK/image-classifier/tree/main



제 깃허브를 clone해서 VScode에서 사용하시면 되시고,
구체적인 방법은,

1. 제 깃허브 리포지토리를 본인의 컴퓨터의 VScode에서 clone하고,

2. 불러오신 리포지토리 경로 안에 파이썬 가상환경을 만들어주시고,(해도 되고 안해도 되긴 해요)

3. 터미널을 키시고 아래에 나와있는 pip를 설치해주세요.
<br/>
pip install -r requirements.txt (아마 이 pip는 다 설치가 안될 수도 있는데 상관없고, 되는데 까지만 설치해도 프로그램이 실행 돼요)
<br/><br/>
pip install flask
<br/>
pip install keras
<br/>
pip install rmn
<br/><br/>

5. 위의 pip 설치가 다 끝나고 나면, 다시 터미널에 "python app.py"를 입력해서 실행하면,

6. 아래와 같은 문구들이 뜰텐데 알아서 설치가 됩니다.
pretrained_ckpt does not exists!
deploy.prototxt.txt does not exists!
res10_300x300_ssd_iter_140000.caffemodel does not exists!

7. 위의 설치까지 끝나면 진짜 다 끝난 거고, app.py의 주석에 적혀 있듯이 구글 크롬을 열고 "http://localhost:3000/"를 입력하시면 프로그램이 실행됩니다.
