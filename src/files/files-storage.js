class FilesStorage {
  constructor() {
    this.files = [];
  }

  addFileSync(name, content) {
    this.files.push({ name, content });
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
}

const filesStorage = new FilesStorage();
module.exports = filesStorage;
