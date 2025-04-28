// src/pages/Result.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, result } = location.state || {};

  const handleGoHome = () => {
    navigate('/');
  };

  if (!file || !result) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>⚠️ 파일 또는 결과 데이터가 전달되지 않았습니다.</h2>
        <button
          onClick={handleGoHome}
          style={{
            marginTop: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🏠 홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 상단바 */}
      <div style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{ margin: 0 }}>DE-fake it</h2>
        <button
          onClick={handleGoHome}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          🏠 Home
        </button>
      </div>

      {/* 결과 화면 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)',
        textAlign: 'center',
      }}>
        <video
          width="720"
          height="405"
          controls
          style={{ border: '1px solid lightgray', borderRadius: '10px' }}
        >
          <source src={URL.createObjectURL(file)} type={file.type} />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>

        <div style={{ marginTop: '40px' }}>
          <h1 style={{ color: 'red', fontSize: '2.5rem' }}>
            {result.confidence}% {result.result}!
          </h1>
          <p style={{ marginTop: '25px', fontSize: '1.3rem', lineHeight: '1.8' }}>
            {result.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
