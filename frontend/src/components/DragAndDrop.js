import React, {Component} from 'react'

class DragAndDrop extends Component {
    labelDefaultText = 'Choose a file';
    dropRef = React.createRef();
    dragCounter = 0;

    state = {
        drag: false,
        label: this.labelDefaultText,
        dropped: false,
        droppedFiles: new FormData()
    }

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({drag: true});
        }
    }
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;

        if (this.dragCounter === 0) {
            this.setState({drag: false})
        }
    }
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false});

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.saveSelectedFiles(e.dataTransfer.files);
            this.dragCounter = 0;
        }
    }

    handleChange = (event) => {
        let files = event.target.files;

        this.saveSelectedFiles(files);
    }

    saveSelectedFiles = (files) => {
        let fileCount = files.length,
            fileList = new FormData();

        if (fileCount > 1) {
            this.setState({
                label: fileCount + ' files selected',
                dropped: true
            } );
        } else {
            this.setState({
                label: files.item(0).name,
                dropped: true
            });
        }

        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.append(files[i].name, files[i])
        }

        this.setState({droppedFiles: fileList});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch(
            'http://localhost:8000',
            {
                method: 'POST',
                body: this.state.droppedFiles
            }
        ).then(
            this.setState({label: this.labelDefaultText, dropped: false})
        )
    }

    componentDidMount() {
        let box = this.dropRef.current;
        box.addEventListener('dragenter', this.handleDragIn);
        box.addEventListener('dragleave', this.handleDragOut);
        box.addEventListener('dragover', this.handleDrag);
        box.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        let box = this.dropRef.current;
        box.removeEventListener('dragenter', this.handleDragIn);
        box.removeEventListener('dragleave', this.handleDragOut);
        box.removeEventListener('dragover', this.handleDrag);
        box.removeEventListener('drop', this.handleDrop);
    }

    render() {
        return (
            <form className={'draganddrop--box' + (this.state.drag ? ' is-dragover' : '')} method={'post'} action={''} encType={'multipart/form-data'} ref={this.dropRef} onSubmit={this.handleSubmit}>
                <div className={'draganddrop--box__input'}>
                    <img src={'img/upload-solid.svg'} className={'draganddrop--box__icon'} alt={'upload icon'} />
                    <input type="file" className={'draganddrop--box__file'} name={'files[]'} id={'file'} multiple={''} onChange={this.handleChange}/>
                    <label htmlFor={'file'} className={'draganddrop--box__label'}>{this.state.label}</label>{this.state.dropped === false && <span className={'draganddrop--box__text'}>or drag it here</span>}
                    <button className={'draganddrop--box__submit'} type={"submit"}>Upload</button>
                </div>
                <div className={'draganddrop--box__uploading'}>Uploading...</div>
                <div className={'draganddrop--box__error'}>Error!</div>
            </form>
        )
    }
}

export default DragAndDrop