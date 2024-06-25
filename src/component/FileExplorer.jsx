import React, { useReducer, useState } from 'react';
import Data from '../Data';
import { fileReducer } from './Reduser/FReducer';
import FTree from './FTree';
import FViewer from './FViewer';
import './FExplorer.css';

const FileExplorer = () => {
  const [state, dispatch] = useReducer(fileReducer, Data);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="file-explorer">
      <div className="file-tree">
        {state ? (
          <FTree
            node={state}
            dispatch={dispatch}
            onSelectFile={handleSelectFile}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="file-viewer">
        {selectedFile ? (
          <FViewer file={selectedFile} />
        ) : (
          <div className='head'></div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
