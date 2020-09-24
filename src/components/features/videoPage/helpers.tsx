
export const handleConnectionSuccess = () => {
    console.log(`addIceCandidate success.`);
};

export const setSessionDescriptionError = (error: Error) => {
    console.log(`Failed to create session description: ${error.toString()}.`);
}

export const setDescriptionSuccess = (functionName: any) => {
    console.log(`${functionName} complete.`);
}

export const handleConnectionFailure = (error: Error) => {
    console.log(`failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

export const handleLocalMediaStreamError = (error: Error) => {
    console.log(`handleLocalMediaStreamError error: ${error.toString()}.`);
}