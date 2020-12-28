import React, { useCallback, useMemo, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined } from '@ant-design/icons'
import DashboardPage from "../pages/Dashboard/Dashboard";

import './style.css';
import Main from "../pages/Main";

const { Sider, Content, Header } = Layout;

const AppLayout = () => {

    const [collapsed, setCollapsed ] = useState(false);

    const toggle = useCallback(
        () => {
            setCollapsed(!collapsed);
        },[collapsed]
    ) 

    const MenuIcon = useMemo(() => {
        const componentProps = { className: 'trigger' , onClick: toggle }
        return collapsed ? <MenuUnfoldOutlined {...componentProps} /> : <MenuFoldOutlined {...componentProps} />
    },[collapsed, toggle])

  return (
    <>
      <Layout style={{ minHeight: "100%" }}>
        <Sider style={{ minHeight: "100%" }} trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
              pi
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header  style={{ padding: 0 }}>
            {MenuIcon}
          </Header>
          <Content>
            <Router>
                <Switch>
                    <Route exact={true}  path="/" component={DashboardPage} />
                    <Route path="/main" component={Main} />
                </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
