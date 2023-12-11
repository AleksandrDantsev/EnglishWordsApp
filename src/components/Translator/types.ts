export type Phonetik = {
    text: string;
    audio: string;
    sourceUrl: string;
    license?: {
        name?: string;
        url?: string;
    }
}

export type ArrayApiWord = {
    word: string;
    phonetics: Phonetik;
    phonetic: string;
    meanings: any[];
    sourceUrls: string[];
    license?: {
        name?: string;
        url?: string;
    }
}
