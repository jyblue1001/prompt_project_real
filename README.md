아래의 유튜브 비디오를 참고해서 웹페이지를 만들었습니다.
https://www.youtube.com/watch?v=d1DKT2xk_dM

유튜브 해당 코드의 깃허브 리포지포리
https://github.com/JayMehtaUK/image-classifier/tree/main



제 깃허브를 clone해서 VScode에서 사용하시면 되시고,
구체적인 방법은,

1. 제 깃허브 리포지토리를 본인의 컴퓨터의 VScode에서 clone하고,

2. 파이썬 가상환경을 만들어주시고,(해도 되고 안해도 되긴 해요)

3. 터미널을 키시고 아래에 나와있는 pip를 설치해주세요.
pip install -r requirements.txt (아마 이 pip는 다 설치가 안될 수도 있는데 상관없고, 되는데 까지만 설치해도 프로그램이 실행 돼요)
pip install Flask
pip install keras
pip install rmn

4. 위의 pip 설치가 다 끝나고 나면, 다시 터미널에 "python app.py"를 입력해서 실행하면,

5. 아래와 같은 문구들이 뜰텐데 알아서 설치가 됩니다.
pretrained_ckpt does not exists!
deploy.prototxt.txt does not exists!
res10_300x300_ssd_iter_140000.caffemodel does not exists!

6. 위의 설치까지 끝나면 진짜 다 끝난 거고, app.py의 주석에 적혀 있듯이 구글 크롬을 열고 "http://localhost:3000/"를 입력하시면 프로그램이 실행됩니다.
