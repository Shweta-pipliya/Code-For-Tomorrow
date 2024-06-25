import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

const FileTree = ({ node, dispatch, onSelectFile }) => {
  const [expanded, setExpanded] = useState(true);

  if (!node) {
    return null;
  }

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCreateFile = () => {
    const name = prompt('Enter file name');
    if (name) {
      dispatch({
        type: 'CREATE_FILE_OR_FOLDER',
        payload: { parentId: node.id, name, isFolder: false }
      });
    }
  };

  const handleCreateFolder = () => {
    const name = prompt('Enter folder name');
    if (name) {
      dispatch({
        type: 'CREATE_FILE_OR_FOLDER',
        payload: { parentId: node.id, name, isFolder: true }
      });
    }
  };

  const handleRename = () => {
    const newName = prompt('Enter new name', node.name);
    if (newName) {
      dispatch({
        type: 'RENAME_FILE_OR_FOLDER',
        payload: { id: node.id, newName }
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch({
        type: 'DELETE_FILE_OR_FOLDER',
        payload: { id: node.id }
      });
    }
  };

  return (
    <div>
      <div className="file-tree-item">
        {node.isFolder ? (
          expanded ? (
            <FaFolderOpen onClick={handleToggle} />
          ) : (
            <FaFolder onClick={handleToggle} />
          )
        ) : (
          <FaFile />
        )}
        <span onClick={() => onSelectFile(node)}>{node.name}</span>
        {node.isFolder && (
          <>
            <button onClick={handleCreateFile}>New File</button>
            <button onClick={handleCreateFolder}>New Folder</button>
          </>
        )}
        <button onClick={handleRename}>Rename</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {node.children && expanded && (
        <div className="file-tree-children">
          {node.children.map(child => (
            <FileTree
              key={child.id}
              node={child}
              dispatch={dispatch}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTree;
