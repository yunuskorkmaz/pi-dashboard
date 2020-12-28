import React, { useEffect, useState } from "react";
import { PageHeader, Descriptions } from "antd";
import { appfetch, uptimeConvert } from "../utils";
// import moment from 'moment';
const DeviceInfo = () => {
  const [data, setData] = useState({});
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    appfetch("info")
      .then((response) => {
        setData(response);
        setUptime(response.time.uptime)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
      <>
    <PageHeader title={"OrangePi"}>
      <Descriptions column={2}>
          <Descriptions.Item label="İşlemci">
            {data.cpu?.manufacturer} {data.cpu?.brand} - {data.cpu?.speed} GHz -{" "}
            {data.cpu?.cores} Core
          </Descriptions.Item>
          <Descriptions.Item label="OS">
            {data.osInfo?.distro} - {data.osInfo?.kernel}
          </Descriptions.Item>
          <Descriptions.Item label="Uptime">{ uptimeConvert(uptime) }</Descriptions.Item>
      </Descriptions>
    </PageHeader>
    </>
  );
};

export default DeviceInfo;
