import React, { useEffect, useState } from 'react';
import DeviceInfo from '../../components/DeviceInfo';
import DeviceUsage  from '../../components/DeviceUsage'
import { appfetch } from '../../utils';

const DashboardPage = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        const timerId = setInterval(getCurrenLoad, 2500);
        console.log(timerId)
        return () => {
            clearInterval(timerId);
        }
    },[])

    const getCurrenLoad = () => {
        appfetch('currentLoad').then(result => {
            setData(result)
        })
    }

    return (
        <> 
            <DeviceInfo />
            <div className="content">
                <DeviceUsage data={data} />
            </div>
        </>
    )
}

export default DashboardPage;