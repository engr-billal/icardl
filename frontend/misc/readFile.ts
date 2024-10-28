function readFile(file: File, setLink: (link: string) => void) {
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      setLink(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
}

export default readFile;
