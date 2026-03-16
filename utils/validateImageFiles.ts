export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function validateImageFiles(files: File[]) {
    if (!files.length) {
        throw new Error("No files provided");
    }

    for (const file of files) {
        if (!file.type.startsWith("image/")) {
            throw new Error(`Invalid file type: ${file.name}`);
        }

        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File too large: ${file.name}`);
        }
    }
}