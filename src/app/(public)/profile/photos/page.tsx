"use client"
import React, { useEffect, useState } from 'react'; 
import 'reactjs-popup/dist/index.css'; 
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'react-bootstrap';

interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function Page() {
  const [photos, setPhotos] = useState([] as Photos[]);
  const [pageno, setPageno] = useState(1);

  useEffect(() => {
    fetchData(pageno);
  }, [pageno]);

  const fetchData = async (pageNo: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageNo}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1;
    setPageno(selectedPage);
  };
 
  return (
    <Container>
      <h1 className='text-center mt-5 mb-4  fw-bold'>Photos</h1>
      <div className='d-flex justify-content-center mb-4'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={10}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item active"
          previousClassName="page-link"
          nextClassName="page-link"
          previousLinkClassName="page-item"
          nextLinkClassName="page-item"
        />
      </div>
      <Row>
        {photos.map((photo, index) => (
          <Col md={3} key={photo.id}>
            <div className='card mb-4'>
              <img src={photo.url} alt="photos" className='card-img-top img-fluid' />
              <div className='card-body'>
                <h5 className='card-title'>Photo {photo.id}</h5>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Page;
