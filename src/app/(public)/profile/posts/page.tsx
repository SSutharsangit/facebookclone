"use client"
import React, { useEffect, useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';
import 'reactjs-popup/dist/index.css'; 
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comments {
  postId: number;
  body: string;
}

function Page() {
  const [posts, setPosts] = useState([] as Posts[]);
  const [pageno, setPageno] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState([] as Comments[]);

  useEffect(() => {
    fetchData(pageno);
  }, [pageno]);

  const fetchData = async (pageNo: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNo}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1;
    setPageno(selectedPage);
  };

  const fetchComments = async (postId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const popup = (id: number) => {
    setSelectedPostId(id);
    fetchComments(id);
    setModalShow(true);
  };

  return (
    <div>
    
      <h1 className='text-center mt-5 mb-4  fw-bold'>Posts</h1>
      <div style={{ marginLeft: "20vw" }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={10}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination  justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item active"
          previousClassName="page-link"
          nextClassName="page-link"
          previousLinkClassName="page-item"
          nextLinkClassName="page-item"
        />
      </div>
      <div className='container' style={{ width: '75vw', maxHeight: '60vh' }}>
        {posts.map((post, index) => (
          <div className="card my-3" style={{ width: "60vw" }} key={post.id}>
            <div className="card-body" onClick={() => popup(post.id)}>
              <h5 className="card-title d-flex align-items-center justify-content-between">
                <div className="d-flex gap-1 align-items-center justify-content-between">
                  <div>
                    <img
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="cover"
                      className='rounded-circle object-fit-cover'
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                  <div>
                    <div>Sutharsan </div>
                    <div className="d-flex align-items-center">
                      January 14 at 11:27 AM.
                      <div><PublicIcon /></div>
                    </div>
                  </div>
                </div>
                <MoreHorizIcon />
              </h5>
              <h6 className="">{post.title} <span className=" fw-bold" style={{ color: "blue" }}>PostID{post.id}</span> </h6>
              <p className="card-text">{post.body}</p>
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="postphoto"
                style={{ width: "55vw", height: "55vh", objectFit: "cover" }}
                className='rounded'
              />
            </div>

            <hr className=" mb-2" style={{ height: '1px' }} />

            <div className='d-flex justify-content-around'>
              <button type="button" className="btn btn-light d-flex align-items-center gap-1" >
                <div><ThumbUpAltIcon /></div>
                <div>Like</div>
              </button>
              <button type="button" className="btn btn-light d-flex align-items-center gap-1" onClick={() => popup(post.id)}>
                <div><ModeCommentIcon /></div>
                <div>Comment</div>
              </button>
              <button type="button" className="btn btn-light d-flex align-items-center gap-1">
                <div><ReplyIcon /></div>
                <div> Share</div>
              </button>
            </div>

            <hr className="mt-2" style={{ height: '1px' }} />
          </div>
        ))}
      </div>

    
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className=' fw-bold text-primary'>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.map(comment => (
            <div key={comment.postId}>
              <p>{comment.body}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => setModalShow(false)}>Close</button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Page;
