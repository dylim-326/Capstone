// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDetect = () => {
    if (!file) {
      alert("파일을 선택해주세요!");
      return;
    }
    navigate('/result', { state: { file } });
  };

  return (
    <div>
      {/* 상단바 */}
      <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h2 style={{ margin: 0 }}>Deepfake Detector</h2>
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
          {/* 설명 문구 */}
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
              style={{ width: '100%', marginBottom: '30px', fontSize: '1rem' }}
            />
            <br />
            <button
              onClick={handleDetect}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1.1rem'
              }}
            >
              Detect Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
