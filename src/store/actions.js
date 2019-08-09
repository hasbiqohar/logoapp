import Process from '../helpers/Process';

export const drawImage = (imageName, image) => {
    return dispatch => {
        Process.createImageData(image)
            .then((result) => {
                let data = result;
                let name = imageName.toUpperCase();
                dispatch({
                    type : name + '_DATA',
                    payload : {
                        url : image,
                        data : data
                    }
                })
            });
        
    }
}