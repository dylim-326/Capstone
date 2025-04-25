# How to use

### Code Structure
1. def average_frame_count(i) - Select the frame with 150 frames and more (각 영상의 프레임 수 확인 후 150 프레임 이상인 프레임만 선별)
2. def frame_extract(path) - To extract frame from video (비디오 파일에서 프레임 추출)
3. def create_face_videos(path_list,out_dir) - Process the frames (프레임에서 추출된 얼굴을 새로운 영상으로 저장)
4. def run_job(language, output_dir) - Main function include 1,2,3 (위에 1,2,3 함수들 포함하는 메인 함수)
5. parallel processing process - 병렬 처리 프로세스


### How to use
1. preprocessing 폴더 다운로드(input 폴더 3개 영상도 확인하기)
2. preprocessing.py 안에 input과 output 파일 경로 수정 (주석으로 표시해둠)
3. preprocessing.py 코드 실행
4. output 폴더에 아래와 같이 3개의 사진이 저장되면 ok

<img width="355" alt="image" src="https://github.com/user-attachments/assets/3025ff6f-0065-4dd4-a8a3-02dbcf2231b8" />

### Environment
conda 가상환경 사용 (Python 3.8.18 )

설치한 라이브러리 
```bash
pip3 install cmake
pip3 install dlib
pip3 install face_recognition
pip3 install opencv-python
pip3 install tqdm
pip3 install torch torchvision torchaudio
```


* 이외에 추가로 필요한 것은 설치

Model Github Link : https://github.com/abhijithjadhav/Deepfake_detection_using_deep_learning?tab=readme-ov-file
