import React, {Component} from 'react';
import DragAndDrop from "./components/DragAndDrop";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>Image uploader</h1>
                    <DragAndDrop></DragAndDrop>
                </div>
            </div>
        )
    };
}

export default App;
