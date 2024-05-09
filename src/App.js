import '@picocss/pico';
import React, { useState } from 'react';
import './styles/App.css'; // CSS 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PdfViewer from './pdfViewers.js';
import { sendPostRequest, sendPostRequest1, sendPostRequest2, sendPostRequest3 } from './request.js';

function App() {

  const [address, setAddress] = useState('');
  const [addrObj, setAddrObj] = useState(null);
  const [addrkey, setAddrkey] = useState("");

  const [dongObj, setDongObj] = useState(null);
  const [dongkey, setDongkey] = useState("");

  const [hoObj, setHoObj] = useState(null);
  const [hokey, setHokey] = useState(null);

  const [pdfHex, setpdfHex] = useState("");

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
            {addrObj && <주소선택창 addrObj={addrObj} addrkey={addrkey} setAddrkey={setAddrkey} setDongObj={setDongObj} />}
            {dongObj && <동선택창 dongObj={dongObj} dongkey={dongkey} setDongkey={setDongkey} setHoObj={setHoObj}/>}
            {hoObj && <호선택창 hoObj={hoObj} hokey={hokey} setHokey={setHokey} setpdfHex={setpdfHex} />}
            <h3>문서 보기</h3>
            <p>관련 문서를 PDF 형태로 확인할 수 있습니다.</p>
            {pdfHex && <PdfViewer hexString={pdfHex} />}
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
        <input type="text" id="search" name="search" placeholder="주소를 입력하고 '주소검색' 버튼을 누르세요." aria-label="검색어" required
         onChange={(e) => setAddress(e.target.value)} // 입력 값에 따라 주소 상태 업데이트 
        />
        <button type="submit" onClick={() => handleAddressSearch()}>검색</button>
      </form>
    </div>
  );
}

function 주소선택창({ addrObj, addrkey, setAddrkey, setDongObj }) {


  const handleChange = (event) => {
    console.log(event.target.value);
    setAddrkey(event.target.value); // 선택된 항목의 value로 addrkey 상태 업데이트
  };

  return (
    <>
      <Form.Select aria-label="Default select example" style={{ width: '60%', margin: '0 auto' }}
        onChange={handleChange}>
        <option value="">원하는주소를 선택하세요</option>
        {addrObj.hits.hits.map((item, index) => (
          <option key={index} value={item._source.mgmUpperBldrgstPk}>{item._source.jibunAddr}</option>
        ))}
      </Form.Select>
      {addrkey && <button type="submit" onClick={() => { sendPostRequest1(addrkey).then(() => {
          const dongData = localStorage.getItem('dongObj');
          if (dongData) {
            setDongObj(JSON.parse(dongData));
          }
        })
      }}>동검색</button>}
    </>

  );
}

function 동선택창({ dongObj, dongkey, setDongkey, setHoObj }) {


  const handleChange = (event) => {
    console.log(event.target.value);
    setDongkey(event.target.value); // 선택된 항목의 value로 dongkey 상태 업데이트
  };

  return (
    <>
      <Form.Select aria-label="Default select example" style={{ width: '60%', margin: '0 auto' }}
        onChange={handleChange}>
        <option value="">원하는동을 선택하세요</option>
        {dongObj.hits.hits.map((item, index) => (
          <option key={index} value={JSON.stringify(item)}>{item._source.dongNm}</option>
        ))}
      </Form.Select>
      {dongkey && <button type="submit" onClick={() => {sendPostRequest2(dongkey).then(() => {
          const hoData = localStorage.getItem('hoObj');
          if (hoData) {
            setHoObj(JSON.parse(hoData));
          }
        })
      }}>호검색</button>}
    </>

  );
}

function 호선택창({ hoObj, hokey, setHokey, setpdfHex }) {


  const handleChange = (event) => {
    console.log(event.target.value);
    setHokey(event.target.value); // 선택된 항목의 value로 hokey 상태 업데이트
  };

  return (
    <>
      <Form.Select aria-label="Default select example" style={{ width: '60%', margin: '0 auto' }}
        onChange={handleChange}>
        <option value="">원하는호를 선택하세요</option>
        {hoObj.findExposList.map((item, index) => (
          <option key={index} value={JSON.stringify(item)}>{item.hoNm}</option>
        ))}
      </Form.Select>
      {hokey && <button type="submit" onClick={() => { sendPostRequest3(hokey).then(() => {
          const pdfHex = localStorage.getItem('pdfHex');
          setpdfHex(pdfHex);
        })
      }}>발급</button>}
    </>

  );
}

export default App;
