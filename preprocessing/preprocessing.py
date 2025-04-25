# 1. To get the average frame count and select the frame with 150 frames and more  - 각 영상의 프레임 수 확인 후 150 프레임 이상인 프레임만 선별
import json
import glob
import numpy as np
import cv2
import copy
def average_frame_count(i):
  input_path = f'/Users/jiyeong/Desktop/컴공 캡스톤/PolyGlotFake/preprocessing/{i}/*.mp4'  #Input file path, 입력 파일 경로 - 파일 경로 수정!!
  video_files = glob.glob(input_path)
  frame_count = []
  video_list = []
  short_frame=[]
  for video_file in video_files:
    cap = cv2.VideoCapture(video_file)
    if(int(cap.get(cv2.CAP_PROP_FRAME_COUNT))<150):
      short_frame.append(video_file)
      #video_files.remove(video_file) # 삭제 대신 리스트에 추가하여 목록 관리
      continue
    video_list.append(video_file) # 프레임 150 이상인 영상들
    frame_count.append(int(cap.get(cv2.CAP_PROP_FRAME_COUNT)))
  # print("frames" , frame_count)
  print(i)
  print("Total number of videos: " , len(frame_count))
  print('Average frame per video:',np.mean(frame_count))
  print('Short frame video:',len(short_frame))
  # print("Short frame video list:",short_frame)
  return video_list



# 2. to extract frame from video - 비디오 파일에서 프레임 추출
def frame_extract(path):
  vidObj = cv2.VideoCapture(path)
  success = 1
  while success:
      success, image = vidObj.read()
      if success:
          yield image

# 3. process the frames - 프레임에서 추출된 얼굴을 새로운 영상으로 저장
import torch
import torchvision
from torchvision import transforms
from torch.utils.data import DataLoader
from torch.utils.data.dataset import Dataset
import os
import numpy as np
import cv2
import matplotlib.pyplot as plt
import face_recognition
from tqdm.autonotebook import tqdm
def create_face_videos(path_list,out_dir):
  already_present_count =  glob.glob(out_dir+'*.mp4')
  print("No of videos already present " , len(already_present_count))

  for path in tqdm(path_list):
    print(path)
    out_path = os.path.join(out_dir,path.split('/')[-1])
    print(out_path)
    file_exists = glob.glob(out_path)
    print(file_exists)
    if(len(file_exists) != 0): 
      print("File Already exists: " , out_path)
      continue

    frames = []
    flag = 0
    face_all = []
    frames1 = []
    out = cv2.VideoWriter(out_path,cv2.VideoWriter_fourcc('M','J','P','G'), 30, (112,112))
    for idx,frame in enumerate(frame_extract(path)):
      #if(idx % 3 == 0):
      if(idx <= 150):
        frames.append(frame)
        if(len(frames) == 4):
          faces = face_recognition.batch_face_locations(frames) 
          for i,face in enumerate(faces):
            if(len(face) != 0):
              top,right,bottom,left = face[0]
            try:
              out.write(cv2.resize(frames[i][top:bottom,left:right,:],(112,112)))
            except:
              pass
          frames = []
    try:
      del top,right,bottom,left
    except:
      pass
    out.release()

# main function (include 1,2, 3 function) - 위에 1,2,3 함수들 포함하는 메인 함수
def run_job(language, output_dir):
    video_files = average_frame_count(language)
    create_face_videos(video_files, output_dir)

# parallel processing process - 병렬 처리 프로세스
from multiprocessing import Process  
if __name__ == '__main__':
    output_path = "/Users/jiyeong/Desktop/컴공 캡스톤/PolyGlotFake/preprocessing/output"    # Output file path - 목적지 파일 경로 , 파일 경로 수정!!

    p1 = Process(target=run_job, args=('input1', output_path))    # Input file path, 입력 파일 경로 - 파일 경로 수정!!
    p2 = Process(target=run_job, args=('input2', output_path))   # Input file path, 입력 파일 경로 - 파일 경로 수정!!
    p3 = Process(target=run_job, args=('input3', output_path))   # Input file path, 입력 파일 경로 - 파일 경로 수정!!

    p1.start()
    p2.start()
    p3.start()

    p1.join()
    p2.join()
    p3.join()
