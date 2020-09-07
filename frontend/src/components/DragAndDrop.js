import React, {Component} from 'react'

class DragAndDrop extends Component {
    state = {
        drag: false,
        label: 'Choose a file',
        dropped: false,
        droppedFiles: new FormData()
    }

    dropRef = React.createRef();
    dragCounter = 0;

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
            let fileCount = e.dataTransfer.files.length,
                files = e.dataTransfer.files,
                fileList = new FormData();

            if (fileCount > 1) {
                this.setState({
                    label: fileCount + ' files selected',
                    dropped: true
                } );
            } else {
                this.setState({
                    label: e.dataTransfer.files.item(0).name,
                    dropped: true
                });
            }

            for (var i = 0; i < files.length; i++) {
                if (!files[i].name) return
                fileList.append(files[i].name, files[i])
            }

            this.setState({droppedFiles: fileList});
            this.dragCounter = 0;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch(
            'http://localhost:8000',
            {
                method: 'POST',
                body: this.state.droppedFiles
            }
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
                    <input type="file" className={'draganddrop--box__file'} name={'files[]'} id={'file'} multiple={''}/>
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