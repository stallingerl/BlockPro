// To Do: Create setters/getters für receivedPubKey und receivedSignatures

export let receivedPubKeys: string[] = []
export let receivedSignatures: string[] = []

// s is sharedObject
type GenericObject = { [key: string]: any };
export const s:GenericObject = {};

export const clearPubKeys = () => {
    receivedPubKeys = [];
}

export const clearSignatures = () => {
    receivedSignatures = [];
}