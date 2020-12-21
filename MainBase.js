import React, {useState, useEffect} from 'react'
import {app} from '../Base/Base'
import image from '../img/b6.jpg'

const db = app.firestore()

function MainBase() {


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

  const [uploads, setUploads] = useState([])


  


  const imageUpload = async (e) => {
    const File = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(File.name)
    console.log(File)


    await fileRef.put(File)
    setFileUrl(await fileRef.getDownloadURL())

  }



  const uploadData = async () => {
    await db.collection('images')
      .doc()
      .set({
        name: name,
        email: email,
        avatar: await fileUrl
      })
  }



  //to get the data


  const getData = async () => {
    await db.collection('images')
      .onSnapshot((snapshot) => {
        const item = []
        snapshot.forEach(doc => {
          item.push(doc.data())
        })
        setUploads(item)

      })
  }

  useEffect(() => {
    getData()

  }, []);

  console.log(fileUrl, uploads, name, email)





     






  return (
     <>
      <center>
      <div>
          <h3>MY GALLERY</h3>
        </div>
        <div style={{ display: 'flex ', flexDirection: 'column', width: '300px' }}>





          <input type='text' value={name} onChange={(e) => {
            setName(e.target.value)
          }} name='name' placeholder='name' />


          <input type='text' value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} type='text' name='email' placeholder='email' />


          <input onChange = {imageUpload}
        
            type='file'
        />
          <div
            style={{ width: '4px', marginTop: '10px', color: 'red', height: '30px' }}>
            <button style={{ backgroundColor: 'coral', height: '30px', color: 'white', borderRadius: '7px', outline: 'none' }} 
               onClick = {uploadData}
 
                 >SUBMIT</button>
          </div>
        </div>
      </center>

      <center>

       {
           uploads.map((post)=>(
            <div key = {post.id} className = 'card_shape' style = {{margin : '200px'}}> 
            <div className = 'card_shapecontent'>
              <div>
                <img  src = {post.avatar} /> 
              </div>
   
              <div>
                {post.name}
              </div>
   
              <div>
                {post.email}
              </div>
             
            </div>
            </div>
           ))


       }










      </center>












     </>
  )
}

export default MainBase
