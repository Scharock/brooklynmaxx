import React, {Component} from 'react'

class DragAndDrop extends Component {
    state = {
        drag: false
    }

    render() {
        return (
            <form className={'draganddrop--box'} method={'post'} action={''} encType={'multipart/form-data'}>
                <div className={'draganddrop--box__input'}>
                    <img src={'img/upload-solid.svg'} className={'draganddrop--box__icon'} />
                    <input type="file" className={'draganddrop--box__file'} name={'files[]'} id={'file'} data-multiple-caption="{count} files selected" multiple={''}/>
                    <label for={'file'} className={'draganddrop--box__label'}>Choose a file</label><span className={'draganddrop--box__text'}>or drag it here</span>
                    <button className={'draganddrop--box__submit'} type={"submit"}>Upload</button>
                </div>
                <div className={'draganddrop--box__uploading'}>Uploading...</div>
                <div className={'draganddrop--box__error'}>Error!</div>
            </form>
        )
    }
}

export default DragAndDrop