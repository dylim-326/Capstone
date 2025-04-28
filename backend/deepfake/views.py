# views.py
import os
import cv2
import face_recognition
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from .models import Video
from django.views.decorators.csrf import csrf_exempt
from .models import PreprocessedFrame  # 꼭 위쪽에서 import 돼야 함


@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES['file']:
        # 1. 파일 저장
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_url = fs.url(filename)

        # 2. DB에 저장
        video = Video(video_file=uploaded_file)
        video.save()

        # 3. 전처리 코드 시작!! 🔥


        video_path = fs.path(filename)
        cap = cv2.VideoCapture(video_path)

        frame_count = 0
        saved_frame_count = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            frame_count += 1

            # 얼굴 검출
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_locations = face_recognition.face_locations(rgb_frame)

            if face_locations:
                for (top, right, bottom, left) in face_locations:
                    face = frame[top:bottom, left:right]

                    # 너무 작은 얼굴 잘리는 경우 대비
                    if face.size == 0:
                        continue

                    face = cv2.resize(face, (112, 112))

                    # 저장 경로
                    frame_folder = os.path.join('media', 'frames')
                    os.makedirs(frame_folder, exist_ok=True)
                    saved_frame_path = os.path.join(frame_folder, f'{video.id}_{saved_frame_count}.jpg')
                    cv2.imwrite(saved_frame_path, face)

                    # DB에 저장 (상대경로만 저장)
                    PreprocessedFrame.objects.create(
                        video=video,
                        frame_image=os.path.relpath(saved_frame_path, 'media')
                    )

                    saved_frame_count += 1

        cap.release()

        # 4. 프레임 수 체크
        if saved_frame_count < 100:
            # 프레임이 너무 적으면 해당 비디오와 프레임 삭제
            video.delete()
            return JsonResponse({'error': 'Less than 100 face frames detected. Upload failed.'}, status=400)


        # 5. 결과 반환
        return JsonResponse({'file_url': file_url, 'video_id': video.id})

    return JsonResponse({'error': 'No file uploaded'}, status=400)
