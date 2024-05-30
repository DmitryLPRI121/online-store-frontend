export const copyCurrentUrlToClipboard = (): void => {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL успешно скопирована в буфер обмена!');
        }).catch(err => {
            console.error(err);
        });
    } else {
        console.error('Clipboard API not supported');
    }
};