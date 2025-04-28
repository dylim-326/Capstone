// src/pages/Result.jsx
import React, { useLocation } from 'react';

function Result() {
  const location = useLocation();
  const { fileUrl, videoId } = location.state || {};

  return (
    <div>
      <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h2 style={{ margin: 0 }}>Detection Result</h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)'
      }}>
        <h3>파일 업로드가 완료되었습니다.</h3>
        <p>비디오 ID: {videoId}</p>
        <video controls width="600">
          <source src={`http://127.0.0.1:8000${fileUrl}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Result;
