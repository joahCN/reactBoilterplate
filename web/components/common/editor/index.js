import React from "react"
import {
    convertToRaw,
    CompositeDecorator,
    ContentState,
    Editor,
    EditorState,
    RichUtils
} from 'draft-js';

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    componentWillMount() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET","http://localhost:3000/config/initialData.json?"+Math.random(), true);
        xhr.responseType = "arraybuffer";

        xhr.onreadystatechange = function (oEvent) {
            if(xhr.readyState == xhr.DONE) {
                var arrayBuffer = xhr.response; // Note: not oReq.responseText
                if (arrayBuffer) {
                    var byteArray = new Uint8Array(arrayBuffer);
                    let result =  byteArray.reduce((result, i)=>{
                        return result+String.fromCharCode(i);
                    }, "");
                    console.log(result);
                    // for (var i = 0; i < byteArray.byteLength; i++) {
                    //     console.log(byteArray[i]);
                    // }
                }
            }
        };
        xhr.onerror = function(error) {
            console.log(error);
        };
        // xhr.send(null);

    }

    selectFile(event) {
        this.file = event.target.files[0];
        let filename = this.file.name;
        if(/\.(jpg|jpeg|png)$/.test(filename)) {
            let reader = new FileReader();
            reader.onload = () =>{
                console.log("reading success");
                this.setState({
                    imgUrl: reader.result
                });
            };
            reader.readAsDataURL(this.file);
        }

    }

    uploadFile() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:3000/upload", true);

        xhr.onreadystatechange = function (oEvent) {
            if(xhr.readyState == xhr.DONE) {

            }
        };
        xhr.onerror = function(error) {
            console.log(error);
        };

        let formData = new FormData();
        formData.append("file", this.file, this.file.name);

        // xhr.send(this.file);
        xhr.send(formData);
    }

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <input type="file" name="file" onChange={::this.selectFile}/>
                <img src={this.state.imgUrl}/>
                <button onClick={::this.uploadFile}>upload</button>
            </div>
        );
    }
}
