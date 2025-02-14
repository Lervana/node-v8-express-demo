class FilesStorage {
  constructor() {
    this.files = [];
  }

  addFileSync(name, content) {
    const fileToAdd = { name, content: content };
    this.files.push(fileToAdd);
  }

  getFileSync(name) {
    let content = null;

    if (this.files && this.files.length > 0)
      this.files.forEach(file => {
        if (file.name === name) {
          content = file.content;
        }
      });

    return content;
  }

  hasFileSync(fileName) {
    let result = false;
    this.files.forEach(({ name }) => {
      if (fileName === name) result = true;
    });

    return result;
  }

  removeFileSync(fileName) {
    let index = null;

    this.files.forEach(({ name }, i) => {
      if (fileName === name) index = i;
    });

    if (index > -1) {
      this.files.splice(index, 1);
      return true;
    }

    return false;
  }
}

const filesStorage = new FilesStorage();
exports.filesStorage = filesStorage;
exports.FilesStorage = FilesStorage;
