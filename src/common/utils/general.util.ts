export function dd(...args: any[]) {
    for (const arg of args) {
        console.dir(arg, { depth: null, colors: true });
    }
    process.exit(1);
}