export async function fileToByteArray(file) {
    if (typeof file.arrayBuffer !== 'function') {
        return file;
    }
    const buffer = await file.arrayBuffer();
    let byteArray = new Int8Array(buffer);
    byteArray = Array.from(byteArray);
    return byteArray;
}