import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

import firebaseStorageBucket from './firebase-config';
import {
    LoginStart,
    LoginSuccess,
    LoginFailure,
    LogOut
} from './context/AuthActions';

export const logInCall = async (userCredentials, dispatch) => {
    dispatch(LoginStart());
    try {
        const response = await axios.post("/auth/login", userCredentials);
        dispatch(LoginSuccess(response.data));
    } catch (error) {
        dispatch(LoginFailure(error));
    }
};

export const logOutCall = async (dispatch) => {
    dispatch(LogOut());
};

export const uploadFileWithProgress = (file, folder, fileName, setProgress) => {
    return new Promise((resolve, reject) => {

        const storageRef = ref(
            firebaseStorageBucket,
            `/${folder}/${fileName}`
        );

        const normalise = (value) => ((value - (-10)) * 100) / (100 - (-10));

        const upload = uploadBytesResumable(storageRef, file);
        upload.on(
            'state_change',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(normalise(Math.round(progress)-10));
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const url = await getDownloadURL(storageRef);
                    resolve(url);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

export const deleteFile = (filePath) => {
    const imageRef = ref(firebaseStorageBucket, filePath);
    return deleteObject(imageRef);
};
