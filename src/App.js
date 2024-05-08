import '@picocss/pico';
import React, { useState } from 'react';
import './styles/App.css'; // CSS 파일 임포트

function App() {

  const [address, setAddress] = useState('');
  const [addrObj, setAddrObj] = useState(null);


  // 주소 입력 시 세움터 로그인하고 주소 검색해주는 함수
  let handleAddressSearch = () => {
    console.log(address);

    sendPostRequest(address).then(() => {
      const addrData = localStorage.getItem('addrObj');
      if (addrData) {
        setAddrObj(JSON.parse(addrData));
      }
    });
  };


  return (
    <div className="background-image" style={{ backgroundImage: "url('/Apart.webp')" }}>
      <div className="overlay">
        <nav className="container-fluid">
          <ul>
            <li><strong>부동산 검색 포털</strong></li>
          </ul>
          <ul>
            <li><a href="#">홈</a></li>
            <li><a href="#">문의하기</a></li>
            <li><a href="#" role="button">로그인</a></li>
          </ul>
        </nav>
        <main className="container">
          <section>
            <hgroup>
              <h2>아파트 및 토지 검색</h2>
              <h3>원하는 위치와 조건을 검색해 보세요.</h3>
            </hgroup>
            <p>아래 검색 창에 원하는 조건을 입력하고 검색 버튼을 클릭하세요.</p>
            <주소입력창 setAddress={setAddress} handleAddressSearch={handleAddressSearch} />
            <form action="#" method="get">
              <input type="text" id="search" name="search" placeholder="검색어 입력..." aria-label="검색어" required />
              <button type="submit">검색</button>
            </form>
            <h3>문서 보기</h3>
            <p>관련 문서를 PDF 형태로 확인할 수 있습니다.</p>
            {/* <PDFViewer src="sample.pdf" /> */}
          </section>
        </main>
      </div>
      <footer className="container">
        <small><a href="#">개인정보처리방침</a> • <a href="#">이용약관</a></small>
      </footer>
    </div>
  );
}

function 주소입력창({ setAddress, handleAddressSearch }) {
  return (
    <div>

      <form action="#" method="get">
        <input type="text" id="search" name="search" placeholder="검색어 입력..." aria-label="검색어" required />
        <button type="submit">검색</button>
      </form>
      <Form.Label htmlFor="inputAddress">주소를 입력하세요</Form.Label>
      <Form.Control
        type="text"
        id="inputAddress"
        aria-describedby="addressHelpBlock"
        placeholder="주소를 입력하고 '주소검색' 버튼을 누르세요."
        style={{ width: '60%', margin: '0 auto' }}
        onChange={(e) => setAddress(e.target.value)} // 입력 값에 따라 주소 상태 업데이트
      />
      <Button variant="outline-dark" onClick={() => handleAddressSearch()}>주소검색</Button>
    </div>
  );
}

export default App;
