from flask import Flask, render_template, request  # 필요한 모듈 가져오기
import cv2  # 이미지 처리를 위한 OpenCV 라이브러리 가져오기
from rmn import RMN  # 감정 감지를 위한 RMN 모델 가져오기

app = Flask(__name__)  # Flask 애플리케이션 인스턴스 생성
m = RMN()  # 감정 감지를 위해 RMN 모델 인스턴스화

@app.route('/', methods=['GET'])  # 루트 URL에 대한 GET 요청을 처리하기 위한 라우트 정의
def hello_world():
    return render_template('index.html')  # 루트 URL이 GET 방식으로 접근될 때 HTML 템플릿 렌더링

@app.route('/', methods=['POST'])  # 루트 URL에 대한 POST 요청을 처리하기 위한 라우트 정의
def predict():
    imagefile = request.files['imagefile']  # 요청에서 업로드된 이미지 파일 가져오기
    image_path = "./images/" + imagefile.filename  # 업로드된 이미지를 저장할 파일 경로 생성
    imagefile.save(image_path)  # 업로드된 이미지를 지정된 파일 경로에 저장

    image = cv2.imread(image_path)  # OpenCV를 사용하여 저장된 이미지 읽기
    assert image is not None  # 이미지가 성공적으로 읽혔는지 확인

    results = m.detect_emotion_for_single_frame(image)  # RMN 모델을 사용하여 이미지에서 감정 감지 수행

    # 결과 처리
    emotion_scores = {}  # 감정 점수를 저장할 딕셔너리 생성
    for result in results:  # 결과에서 감지된 감정 반복
        emotion = result['emo_label']  # 결과에서 감정 레이블 가져오기
        score = result['emo_proba'] * 100  # 감정 확률을 백분율로 변환
        if emotion not in emotion_scores or score > emotion_scores[emotion]:  # 감정 점수가 기존 점수보다 높은지 확인
            emotion_scores[emotion] = score  # 딕셔너리에 감정 점수 업데이트

    # 결과 문자열 생성
    result_str = ""  # 결과를 저장할 빈 문자열 초기화
    for emotion, score in emotion_scores.items():  # 딕셔너리에서 감정 점수 반복
        result_str += f"{emotion}: {score:.2f}%\n"  # 감정과 점수를 형식화하고 결과 문자열에 추가

    return render_template('index.html', prediction=result_str)  # 예측 결과와 함께 HTML 템플릿 렌더링

if __name__ == '__main__':  # 스크립트가 직접 실행되었는지 확인
    app.run(port=3000, debug=True)  # 디버그 모드에서 포트 3000에서 Flask 애플리케이션 실행

# 구글 크롬 열고 "http://localhost:3000/" 입력하시면 돼요
