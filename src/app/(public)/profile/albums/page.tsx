"use client"
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

interface Albums {
  userId: number,
  id: number,
  title: string
}

interface Photos {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

function AlbumsPage() {
  const [albums, setAlbums] = useState([] as Albums[]);
  const [photos, setPhotos] = useState([] as Photos[]);
  const [pageno, setPageno] = useState(1);
  const [albumId, setAlbumId] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchData(pageno);
  }, [pageno]);

  useEffect(() => {
    fetchPhotos(albumId);
  }, [albumId]);

  const fetchData = async (pageNo: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${pageNo}`);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1;
    setPageno(selectedPage);
  };

  const fetchPhotos = async (albumId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const popup = async (albumId: number) => {
    setAlbumId(albumId);
    setModalShow(true);
  };

  return (
    <Container>
      <h1 className='text-center mt-5 mb-4  fw-bold'>Albums</h1>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
      <Row>
        {albums.map((album) => (
          <Col md={6} key={album.id}>
            <Card className='mb-3' onClick={() => { popup(album.id) }}>
              <Card.Body>
                <Card.Title className='fw-bold' style={{ color: 'blue' }}>Album {album.id}</Card.Title>
                <Card.Text>{album.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold text-primary'>Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {photos.map(photo => (
              <Col md={3} className='mb-3' key={photo.id}>
                <img src={photo.url} alt={photo.title} className='img-fluid' />
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AlbumsPage;
