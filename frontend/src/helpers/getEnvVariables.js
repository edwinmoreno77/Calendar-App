


export const getEnvVariables = () => {


    // import.meta.env;

    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,//TO DO BUILD
        // ...import.meta.env,
    }
}