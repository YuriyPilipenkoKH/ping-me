
function capitalize(str: string | undefined): string {
    if (!str) {
        return ''; // or throw an error, depending on your use case
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export default capitalize
