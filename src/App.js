import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader'
import fire from './fire'

class App extends Component {

  constructor(){
    super();
    this.state={
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    }
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fire.storage().ref("lintang_foto") // nama folder di firebase
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render(){
    return(
      <div>
        <form>
          <FileUploader
            accept='*' name='avatar'
            randomizeFilename
            storageRef={
              fire.storage().ref('lintang_foto')
            }
            onUploadStart = {this.handleUploadStart}
            onUploadError = {this.handleUploadError}
            onUploadSuccess = {this.handleUploadSuccess}
            onProgress = {this.handleProgress}
          />
        </form>
        <p>Process: {this.state.progress}%</p>
        <img src={this.state.avatarURL} alt=''
        style={{width:'40%', height:'40%'}}/>
      </div>
    )
  }
}

export default App;