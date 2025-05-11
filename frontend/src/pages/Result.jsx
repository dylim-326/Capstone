import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    fileUrl,
    result,
    confidence,
    explanation
  } = location.state || {};

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      {/* 상단바 - 로고 클릭 시 홈 이동 + 홈 버튼 */}
      <div style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2
          onClick={handleGoHome}
          style={{ margin: 0, cursor: 'pointer' }}
        >
          DE-fake it
        </h2>

        <button
          onClick={handleGoHome}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#ffffff22'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          🏠 Home
        </button>
      </div>

      {/* 결과 본문 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        gap: '20px'
      }}>
        {/* 업로드한 영상 재생 */}
        <video controls width="600">
          <source src={`http://127.0.0.1:8000${fileUrl}`} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>

        {/* 딥페이크 탐지 결과 */}
        <div style={{
          marginTop: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '600px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>딥페이크 판별 결과</h3>
          <p><strong>결과:</strong> {result}</p>
          <p><strong>신뢰도:</strong> {confidence}%</p>
          <p><strong>설명:</strong> {explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
