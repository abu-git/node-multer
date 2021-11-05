import { useState } from 'react'

function App() {
  const [fileData, setFileData] = useState()

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0])
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    //Handle File Data from state before sending
    const data = new FormData()

    data.append('image', fileData)

    fetch('http://localhost:5000/single', {
      method: 'POST',
      body: data,
    })
    .then((result) => {
      console.log('File Sent successfully')
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <h1>React App File Uploading</h1>
      <form onSubmit={onSubmitHandler}>
        <input type='file' onChange={fileChangeHandler} />
        <br />
        <br />
        <button type='submit'>Submit File to Backend</button>
      </form>
    </div>
  );
}

export default App;
