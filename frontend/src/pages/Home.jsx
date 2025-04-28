// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 가짜 서버 응답 (Mock Response)
  const mockResponse = {
    result: "Fake",
    confidence: 87.2,
    explanation: "눈 깜박임이 비정상적이고, 입 모양과 소리가 어긋납니다."
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDetect = async () => {
    if (!file) {
      alert("⚠️ 파일을 선택해주세요!");
      return;
    }

<<<<<<< HEAD:frontend/src/pages/Home.jsx
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Django로 POST 요청 보내기
      const response = await fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // 서버에서 반환한 결과
        navigate('/result', { state: { fileUrl: data.file_url, videoId: data.video_id } });
      } else {
        alert('파일 업로드 실패');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('파일 업로드 중 오류 발생');
=======
    setLoading(true);
    setError("");

    try {
      // 가짜 fetch 요청 시뮬레이션
      const fakeFetch = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => mockResponse
          });
        }, 1500); // 1.5초 대기
      });

      const response = await fakeFetch;

      if (!response.ok) {
        throw new Error('서버 응답 실패');
      }

      const data = await response.json();

      navigate('/result', { state: { file, result: data } });

    } catch (e) {
      setError("서버 요청 중 오류 발생");
    } finally {
      setLoading(false);
>>>>>>> 78f4850bd37aaa2476c864f3724104331b0c3655:src/pages/Home.jsx
    }
  };

  return (
    <div>
      {/* 상단바 */}
      <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h2 style={{ margin: 0 }}>DE-fake it</h2>
      </div>

      {/* 중앙 정렬 레이아웃 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '100px',
          alignItems: 'center',
          paddingTop: '40px'
        }}>
          {/* 설명 */}
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '20px' }}>
              단순 판별은 그만,<br />“왜” 그런지도 함께 확인하세요!
            </h1>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              AI가 딥페이크 여부와<br />그 근거를 함께 보여줍니다.
            </p>
          </div>

          {/* 업로드 박스 */}
          <div style={{
            border: '1px solid lightgray',
            padding: '60px',
            borderRadius: '12px',
            minWidth: '520px',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}>
            <input
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileChange}
              disabled={loading}
              style={{ width: '100%', marginBottom: '30px', fontSize: '1rem' }}
            />
            <br />
            <button
              onClick={handleDetect}
              disabled={loading}
              style={{
                backgroundColor: loading ? 'gray' : '#007bff',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1.1rem'
              }}
            >
              {loading ? "분석 중..." : "Detect Now"}
            </button>

            {/* 에러 메시지 표시 */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
