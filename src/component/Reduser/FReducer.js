import { v4 as uuidv4 } from 'uuid';

export const fileReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_FILE_OR_FOLDER':
      return createFileOrFolder(state, action.payload);
    case 'RENAME_FILE_OR_FOLDER':
      return renameFileOrFolder(state, action.payload);
    case 'DELETE_FILE_OR_FOLDER':
      return deleteFileOrFolder(state, action.payload);
    default:
      return state;
  }
};

const createFileOrFolder = (state, { parentId, name, isFolder }) => {
  const newState = JSON.parse(JSON.stringify(state));
  const node = findNodeById(newState, parentId);
  if (node) {
    node.children.push({
      id: uuidv4(),
      name,
      isFolder,
      children: isFolder ? [] : null
    });
  }
  return newState;
};

const renameFileOrFolder = (state, { id, newName }) => {
  const newState = JSON.parse(JSON.stringify(state));
  const node = findNodeById(newState, id);
  if (node) {
    node.name = newName;
  }
  return newState;
};

const deleteFileOrFolder = (state, { id }) => {
  const newState = JSON.parse(JSON.stringify(state));
  const parent = findParentById(newState, id);
  if (parent) {
    parent.children = parent.children.filter(child => child.id !== id);
  }
  return newState;
};

const findNodeById = (node, id) => {
  if (node.id === id) {
    return node;
  }
  if (node.children) {
    for (let child of node.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const findParentById = (node, id) => {
  if (node.children) {
    for (let child of node.children) {
      if (child.id === id) {
        return node;
      }
      const found = findParentById(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};
