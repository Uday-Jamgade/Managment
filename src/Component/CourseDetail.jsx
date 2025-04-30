import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {
    const {id} = useParams()
    console.log(id);
    
  return (
    <div>
      hello :{id}
    </div>
  )
}

export default CourseDetail
