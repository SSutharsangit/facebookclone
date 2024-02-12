
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Cover() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center ">
      <img
        src="https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt='cover'
        className="img-fluid rounded-bottom object-fit-cover"
        style={{ width: '75vw', maxHeight: '60vh'}}
      />
    </div>

    <div className=' coverphoto d-flex justify-content-between align-items-center mx-auto  position-relative'  style={{ width: '75vw',top:"-55px" }}>

    <div className='d-flex align-items-center justify-content-between gap-2 '>
    <img
        src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt='profile'
        className="rounded-circle object-fit-cover border border-light border-5 object-fit-md-cover"
        width={"220px"}
        height={"220px"}
        // style={{ width: '20vw' }}
      />
      
    <div>
    <div className='fs-4 fw-bold'>Suthu Sutharsan</div>
  <div className='fw-bolder'>(Suthu)</div>
  <div className='fw-bold'>1.3M friends</div>
    </div>
    </div>

    <div className='d-flex align-items-start gap-2'>
    <div>
    <button className='btn btn-primary'> <AddIcon/>ADD  TO STORY</button>
    </div>
    <div className='d-flex flex-column align-items-end gap-2 '>
    <button className='btn btn-secondary'> <EditIcon/>EDIT PROFILE</button>
    <button className='btn btn-secondary'><KeyboardArrowDownIcon/> </button>
    </div>
    </div>
  
    </div>
    <div className="container " style={{ backgroundColor: "gray", width: '75vw', maxHeight: '60vh'}}>
  <hr  className="m-2" style={{ height: '1px' }} />
</div>
  
    </>
  )
}

export default Cover