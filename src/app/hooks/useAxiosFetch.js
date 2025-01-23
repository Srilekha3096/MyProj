import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useAxiosFetch = (dataUrl, header) => {
    console.log("NEW DATA!!!", dataUrl, header);
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, header, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response?.data);
                    setIsError(null);
                }
            } catch (error) {
                if (isMounted) {
                    setIsError(error.message);
                    setData([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData(dataUrl);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [dataUrl]);

    return { data, isError, isLoading };
};

export default (useAxiosFetch);
