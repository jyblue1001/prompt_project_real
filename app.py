from flask import Flask, render_template, request  # 필요한 모듈 가져오기
import cv2  # 이미지 처리를 위한 OpenCV 라이브러리 가져오기
from rmn import RMN  # 감정 감지를 위한 RMN 모델 가져오기


app = Flask(__name__)  # Flask 애플리케이션 인스턴스 생성
m = RMN()  # 감정 감지를 위해 RMN 모델 인스턴스화

@app.route('/', methods=['GET'])  # 루트 URL에 대한 GET 요청을 처리하기 위한 라우트 정의
def hello_world():
    return render_template('index2.html')  # 루트 URL이 GET 방식으로 접근될 때 HTML 템플릿 렌더링

@app.route('/', methods=['POST'])  # 루트 URL에 대한 POST 요청을 처리하기 위한 라우트 정의
def predict():
    print("predict function called")
    imagefile = request.files['imagefile']  # 요청에서 업로드된 이미지 파일 가져오기
    image_path = "./images/" + imagefile.filename  # 업로드된 이미지를 저장할 파일 경로 생성
    imagefile.save(image_path)  # 업로드된 이미지를 지정된 파일 경로에 저장s

    image = cv2.imread(image_path)  # OpenCV를 사용하여 저장된 이미지 읽기
    assert image is not None  # 이미지가 성공적으로 읽혔는지 확인

    print("image has been passed on")

    results = m.detect_emotion_for_single_frame(image)  # RMN 모델을 사용하여 이미지에서 감정 감지 수행

    # 결과 처리
    max_emotion = None  # 최고 확률 감정 초기화
    max_score = -1  # 최고 확률 초기화
    for result in results:  # 결과에서 감지된 감정 반복
        emotion = result['emo_label']  # 결과에서 감정 레이블 가져오기
        score = result['emo_proba'] * 100  # 감정 확률을 백분율로 변환
        if score > max_score:  # 현재 감정의 확률이 최고 확률보다 높은지 확인
            max_emotion = emotion  # 최고 확률 감정 업데이트
            max_score = score  # 최고 확률 업데이트

    print("calaculation done")

    # 결과 문자열 생성
    result_str = f"{max_emotion}: {max_score:.2f}%\n" if max_emotion else "감정이 감지되지 않았습니다"
    
    print("now passing the result to the html file")
    print(len(result_str))

    print(f"result_str value: {result_str}")

    # return render_template('index.html', prediction=result_str)

    return result_str

if __name__ == '__main__':  # 스크립트가 직접 실행되었는지 확인
    app.run(port=3000, debug=True)  # 디버그 모드에서 포트 3000에서 Flask 애플리케이션 실행


# 구글 크롬 열고 "http://localhost:3000/" 입력하시면 돼요