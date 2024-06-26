export function genPaths(len: number) {
    const paths = [];

    for (let i = 0; i < len; i++) {
        const path = `m/44'/501'/${i}'/0'`;
        paths.push(path);
    }

    return paths;
}
