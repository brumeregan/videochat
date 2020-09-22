import React from 'react';
import { useTranslation } from 'react-i18next';
import {handleConnectionSuccess,
     setSessionDescriptionError,
      setDescriptionSuccess,
       handleConnectionFailure} from './helpers'

export enum ICEEvents {
    CANDIDATE = 'icecandidate',
    CONNECTIONSTATECHANGE = 'iceconnectionstatechange',
    ADDSTREAM = 'addstream'
}

export const VideoPage = () => {
    const {t} = useTranslation();
    const mediaStreamConstraints = {
        video: true,
    };

    const localVideo = React.useRef<HTMLVideoElement>(null);
    const remoteVideo = React.useRef<HTMLVideoElement>(null);

    const localPeerConnection = React.useRef<RTCPeerConnection>();
    const remotePeerConnection = React.useRef<RTCPeerConnection>();

    const localStream = React.useRef<MediaStream>();

    // TODO: maybe to move all this to some controller function?
    const handleConnection = (event: RTCPeerConnectionIceEvent) => {
        console.log({event})
        const iceCandidate = event.candidate as RTCIceCandidateInit;  // TODO: add appropriate type!

        
        if (iceCandidate !== null) {
          const newIceCandidate = new RTCIceCandidate(iceCandidate);

          if(remotePeerConnection.current) {
            remotePeerConnection.current.addIceCandidate(newIceCandidate)
            .then(() => {
              handleConnectionSuccess();
            }).catch((error: Error) => {
              handleConnectionFailure(error);
            });
          }
        }
      }

      const createdAnswer = (description: RTCSessionDescriptionInit) => {
        remotePeerConnection.current!.setLocalDescription(description)
          .then(() => {
            console.log('add local description to remote one')
          }).catch(setSessionDescriptionError);
      
        localPeerConnection.current!.setRemoteDescription(description)
          .then(() => {
            setDescriptionSuccess('setRemoteDescription');
          }).catch(setSessionDescriptionError);
      }

    const callHandler = () => {
        localPeerConnection.current = new RTCPeerConnection();
        remotePeerConnection.current = new RTCPeerConnection();

        localPeerConnection.current.addEventListener(ICEEvents.CANDIDATE, handleConnection);
        localPeerConnection.current.addEventListener(
            ICEEvents.CONNECTIONSTATECHANGE, () => {
                console.log('localPeerConnection changed')
            });


        remotePeerConnection.current.addEventListener(ICEEvents.CANDIDATE, handleConnection);
        remotePeerConnection.current.addEventListener(
            ICEEvents.CONNECTIONSTATECHANGE, () => {
                console.log('remotePeerConnection changed')
            });

        remotePeerConnection.current.addEventListener(ICEEvents.ADDSTREAM, (event: any) => {
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = event.stream;
            } 
        });

           if(localStream.current) {
            const tracks = localStream.current.getTracks();
            // TODO: find appropriate method to replace addStream
            localPeerConnection.current.addTrack(tracks[0], localStream.current);
           }

        localPeerConnection.current.createOffer({
            offerToReceiveVideo: true,
          })
        .then((description: RTCSessionDescriptionInit) => {

            localPeerConnection.current!.setLocalDescription(description)
            .then(() => {
                console.log('successfully set local description')
            }).catch((error: Error) => console.log('error', error));

            remotePeerConnection.current!.setRemoteDescription(description)
                .then(() => {
                    console.log('successfully set remote description')
                }).catch((error: Error) => console.log('error', error));

            remotePeerConnection.current!.createAnswer()
                .then(createdAnswer)
                .catch((error: Error) => console.log('error', error));

            }).catch((error: Error) => console.log('description error', error));
    }

    const gotLocalMediaStream = (mediaStream: MediaStream) => {
        if(localVideo.current) {
            localVideo.current.srcObject = mediaStream;
            localStream.current = mediaStream;
        }
    }

    const handleLocalMediaStreamError = (error: Error) => {
        console.log(`handleLocalMediaStreamError error: ${error.toString()}.`);
    }

    React.useEffect(() => {
        navigator.mediaDevices
        .getUserMedia(mediaStreamConstraints)
        .then(gotLocalMediaStream)
        .catch(handleLocalMediaStreamError);
    }, [mediaStreamConstraints]);

    return (
        <div>
            <video autoPlay={true} ref={localVideo} />
            <video autoPlay={true} ref={remoteVideo} />

            <div>
                <button id="callButton" onClick={callHandler}>{t('call_button')}</button>
                <button id="hangupButton">{t('hangup_button')}</button>
            </div>
        </div>
    )
}