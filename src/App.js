import React, { Component } from 'react';
import VariantEditor from './VariantEditor.js';
import './App.css';

// Set up Fontawesome image font
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
// Export icons to library for whole app
library.add(faCodeBranch)
library.add(faPlusCircle)

class App extends Component {
  constructor(props) {
    super(props);
    const mss = ['V', 'P', 'editor', 'S', 'Copt']
    const units = {26: [{witnesses: ['V'],
                         reading: "bla26"},
                        {witnesses: ['P', 'S'],
                         reading: "bla"}
                     ],
                   27:  [{witnesses: ['V'],
                         reading: "bla27"},
                        {witnesses: ['P', 'S'],
                         reading: "bla"}
                     ],
                   28:  [{witnesses: ['V'],
                         reading: "bla28"},
                        {witnesses: ['P', 'S'],
                         reading: "bla"}
                     ]
                   }
    this.state = {
        appTitle: "Variant Editor",
        mss: mss,
        units: units,
        doctitle: 'My Document',
        myref: '1:1'
    }
  }
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <a className="navbar-brand" href="https://iscott.blog">
                <FontAwesomeIcon icon="code-branch" /> {this.state.appTitle}</a>
            <span className="doctitle">{this.state.doctitle}</span>
            <span className="docref">{this.state.myref}</span>
        </nav>
        <VariantEditor
            mss={this.state.mss}
            units={this.state.units}
        />
      </div>
    );
  }
}

export default App;
