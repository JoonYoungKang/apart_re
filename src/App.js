import React from 'react';
import '@picocss/pico';
import SearchBar from './components/SearchBar';
import PDFViewer from './components/PDFViewer';
import './styles/App.css'; // CSS 파일 임포트

function Portpolio() {
  // 주소 상태를 관리하는 useState
  const [address, setAddress] = useState('');
  const [addrObj, setAddrObj] = useState(null);
  const [addrkey, setAddrkey] = useState("");

  const [dongObj, setDongObj] = useState(null);
  const [dongkey, setDongkey] = useState("");

  const [hoObj, setHoObj] = useState(null);
  const [hokey, setHokey] = useState(null);

  const [pdfHex, setpdfHex] = useState("");
  
  
  let printConsole = () => {
    var pdfHex = localStorage.getItem('pdfHex');
    setpdfHex(pdfHex);
    <PdfViewer hexString={pdfHex} />
    console.log(JSON.stringify(addrObj));
    console.log(JSON.stringify(addrkey));
    console.log(JSON.stringify(hokey));
  }


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
    <div className="App">
      <div className="black-nav">
        <div>건축물대장발급</div>
      </div>

      <div style={{ marginTop: "20px" }}></div>

      {/* 주소 업데이트 함수를 주소입력창에 전달 */}
      <주소입력창 setAddress={setAddress} handleAddressSearch={handleAddressSearch} />
      {addrObj && <주소선택창 addrObj={addrObj} addrkey={addrkey} setAddrkey={setAddrkey} setDongObj={setDongObj} />}
      {dongObj && <동선택창 dongObj={dongObj} dongkey={dongkey} setDongkey={setDongkey} setHoObj={setHoObj}/>}
      {hoObj && <호선택창 hoObj={hoObj} hokey={hokey} setHokey={setHokey} setpdfHex={setpdfHex} />}

      <button onClick={() => printConsole()}>주소 잘 입력됬나 확인</button>
      {pdfHex && <PdfViewer hexString={pdfHex} />}


    </div>
  );
}



function App() {

  
  const [address, setAddress] = useState('');
  const [addrObj, setAddrObj] = useState(null);
  const [addrkey, setAddrkey] = useState("");

  const [dongObj, setDongObj] = useState(null);
  const [dongkey, setDongkey] = useState("");

  const [hoObj, setHoObj] = useState(null);
  const [hokey, setHokey] = useState(null);

  const [pdfHex, setpdfHex] = useState("");
  
  
  let printConsole = () => {
    var pdfHex = localStorage.getItem('pdfHex');
    setpdfHex(pdfHex);
    <PdfViewer hexString={pdfHex} />
    console.log(JSON.stringify(addrObj));
    console.log(JSON.stringify(addrkey));
    console.log(JSON.stringify(hokey));
  }


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
            <SearchBar />
            <h3>문서 보기</h3>
            <p>관련 문서를 PDF 형태로 확인할 수 있습니다.</p>
            <PDFViewer src="sample.pdf" />
          </section>
        </main>
      </div>
      <footer className="container">
        <small><a href="#">개인정보처리방침</a> • <a href="#">이용약관</a></small>
      </footer>
    </div>
  );
}

export default App;
