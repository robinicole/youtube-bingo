export function extractIdFromURl(url: string)
{
    if(url.match('http://(www.)?youtube|youtu\.be')){
        return url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
    }
}

const test = "hello"