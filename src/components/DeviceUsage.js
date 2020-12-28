import React, { useCallback, useMemo } from "react";
import { Card, Row, Col, Progress, Space, Typography } from "antd";
import Thermometer from "react-thermometer-component";
const { Text } = Typography;
import "./DeviceUsage.css";

const DeviceUsage = (props) => {
  const { data } = props;

  const getMemoryUsage = useCallback(() => {
    if (data.mem) {
      return (data?.mem?.used / data.mem.total) * 100;
    } else {
      return 0;
    }
  }, [data]);

  const getFileUsage = useMemo(() => {
    let totalSize = 0;
    let usedSize = 0;
    let percent = 0;
    if (data.fsSize) {
      let item = data.fsSize.find((a) => a.mount === "/");
      totalSize = item.size;
      usedSize = item.used;
      percent = (item.used / item.size) * 100;
    }
    return {
      totalSize,
      usedSize,
      percent,
    };
  }, [data]);

  const calculateStrokeColor = (value) => {
    if (parseInt(value) >= 90) {
      return "#ff0000";
    } else if (parseInt(value) >= 75) {
      return "#aa4400";
    } else {
      return "";
    }
  };

  const convertByteToGB = (value) => {
    return (value / 1024 / 1024 / 1024).toFixed(2);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col md={8}>
          <Card
            size="small"
            bodyStyle={{ height: "174px" }}
            title="CPU Temperature"
          >
            <div className="center">
              <Thermometer
                theme="light"
                value={data.cpuTemperature?.main}
                format="°C"
                size="small"
                height="100"
              />
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card size="small" title="CPU Usage" bodyStyle={{ height: "174px" }}>
            <div className="center">
              <Progress
                status="normal"
                type="dashboard"
                percent={parseInt(data?.currentLoad?.currentload || 0)}
              />
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card size="small" title="Memory Usage">
            <div className="center">
              <Space direction="vertical" align="center">
                <Progress
                  status="normal"
                  strokeColor={calculateStrokeColor(getMemoryUsage())}
                  type="dashboard"
                  percent={parseInt(getMemoryUsage())}
                  size="small"
                />
                <Space>
                  {convertByteToGB(data?.mem?.used)}/
                  {convertByteToGB(data?.mem?.total)}GB
                </Space>
              </Space>
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card size="small" title="StorageUsage">
            <div className="center">
              <Space direction="vertical" align="center">
                <Progress
                  status="normal"
                  strokeColor={calculateStrokeColor(getFileUsage.percent)}
                  type="dashboard"
                  percent={parseInt(getFileUsage.percent)}
                  size="small"
                />
                <Space>
                  {convertByteToGB(getFileUsage.usedSize)}/
                  {convertByteToGB(getFileUsage.totalSize)}GB
                </Space>
              </Space>
            </div>
          </Card>
        </Col>
        {(
          <Col md={8}>
            <Card
              loading={!data ? true : !data.networkStats ? true : false}
              size="small"
              bodyStyle={{ height: "174px" }}
              title={
                "Network Stats - "
              }
            >
              <div className="center">
                <Space direction="vertical" align="center">
                  Transmit
                  <Space>
                    <Text strong>
                      {(data.networkStats &&
                        (data.networkStats[0]?.rx_sec / 1024).toFixed(2)) ||
                        0}
                    </Text>
                    Kbyte/s
                  </Space>
                  Receive
                  <Space>
                    <Text strong>
                      {(data.networkStats &&
                        (data.networkStats[0]?.tx_sec / 1024).toFixed(2)) ||
                        0}
                    </Text>{" "}
                    Kbyte/s
                  </Space>
                </Space>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default DeviceUsage;
