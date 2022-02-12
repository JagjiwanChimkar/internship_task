import './App.css';
import { useRef, useState } from 'react';
import ProgressBar from "./ProgressBar";
import axiosInstance from "./axios"

function App() {
  const fileInput = useRef(null);
  const uploadedFiles= useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([])
  const [progress, setProgress] = useState();

  function upload(e){
    
    
    console.log(e.target.files);
    const files=e.target.files;
    setSelectedFiles(e.target.files)

    const formData=new FormData();
    formData.append('img',files[0]);

    axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: data => {
        setProgress(Math.round((100 * data.loaded) / data.total));
        let fileSize=(data.loaded / (1024*1024)).toFixed(2) + " MB";

        if(data.loaded === data.total){
          console.log("uploaded");
          const fileName=selectedFiles[0].name;
          
          setProgress();
          uploadedFiles.current.insertAdjacentHTML("afterbegin",
            `<li class="row">
            <div class="content upload">
              <i class="fas fa-file-alt"></i>
              <div class="details">
                <span class="name">${fileName} • Uploaded</span>
                <span class="size">${fileSize}</span>
              </div>
            </div>
            <i class="fas fa-check"></i>
          </li>`
          )
          
        }
      },
    })
    
  }

  return (
    <div className="wrapper">
    <header>File Uploader JavaScript</header>
    <form onClick={()=>fileInput.current.click()}>
      <input className="file-input" 
        type="file" 
        name="file"
        ref={fileInput}
        onChange={(e)=>upload(e)} hidden/>
      <i className="fas fa-cloud-upload-alt"></i>
      <p>Browse File to Upload</p>
    </form>
    <section className="progress-area">
       {progress && <ProgressBar name={selectedFiles[0].name} fileLoaded={progress}/>}
    </section>
    <section className="uploaded-area" ref={uploadedFiles}></section>
  </div>
  );
}

export default App;
