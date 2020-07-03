export const is404 = (error) => {
    return isErrorWithResponseAndStatus(error) && 404 === error.response.status
}

export const is422 = (error) => {
    return isErrorWithResponseAndStatus(error) && 422 === error.response.status
}

const isErrorWithResponseAndStatus = (error) => {
    return error.response && error.response.status
}