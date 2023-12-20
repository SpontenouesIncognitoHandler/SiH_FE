import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Hidden,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  CardActions,
  Button,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Kpi from "../Commons/Kpi";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

// const logs = [
//   {
//     LineId: 843,
//     Date: "18-10-2015",
//     Time: "18:04:57,443",
//     Level: "INFO",
//     Process: "IPC Server handler 14 on 62270",
//     Component: "org.apache.hadoop.mapred.TaskAttemptListenerImpl",
//     Content:
//       "Progress of TaskAttempt attempt_1445144423722_0020_m_000007_0 is : 0.3707891",
//     EventId: "E80",
//     EventTemplate: "Progress of TaskAttempt attempt_<*> is : <*>.<*>",
//   },
//   {
//     LineId: 844,
//     Date: "18-10-2015",
//     Time: "18:04:59,771",
//     Level: "INFO",
//     Process: "IPC Server handler 0 on 62270",
//     Component: "org.apache.hadoop.mapred.TaskAttemptListenerImpl",
//     Content:
//       "Progress of TaskAttempt attempt_1445144423722_0020_m_000001_0 is : 0.37551183",
//     EventId: "E80",
//     EventTemplate: "Progress of TaskAttempt attempt_<*> is : <*>.<*>",
//   },
//   {
//     LineId: 845,
//     Date: "18-10-2015",
//     Time: "18:04:59,787",
//     Level: "INFO",
//     Process: "IPC Server handler 10 on 62270",
//     Component: "org.apache.hadoop.mapred.TaskAttemptListenerImpl",
//     Content:
//       "Progress of TaskAttempt attempt_1445144423722_0020_m_000002_0 is : 0.38137424",
//     EventId: "E80",
//     EventTemplate: "Progress of TaskAttempt attempt_<*> is : <*>.<*>",
//   },
//   {
//     LineId: 846,
//     Date: "18-10-2015",
//     Time: "18:05:02,802",
//     Level: "INFO",
//     Process: "IPC Server handler 10 on 62270",
//     Component: "org.apache.hadoop.mapred.TaskAttemptListenerImpl",
//     Content:
//       "Progress of TaskAttempt attempt_1445144423722_0020_m_000001_0 is : 0.37551183",
//     EventId: "E80",
//     EventTemplate: "Progress of TaskAttempt attempt_<*> is : <*>.<*>",
//   },
//   {
//     LineId: 847,
//     Date: "18-10-2015",
//     Time: "18:05:02,818",
//     Level: "INFO",
//     Process: "IPC Server handler 4 on 62270",
//     Component: "org.apache.hadoop.mapred.TaskAttemptListenerImpl",
//     Content:
//       "Progress of TaskAttempt attempt_1445144423722_0020_m_000002_0 is : 0.38137424",
//     EventId: "E80",
//     EventTemplate: "Progress of TaskAttempt attempt_<*> is : <*>.<*>",
//   },
//   {
//     LineId: 848,
//     Date: "18-10-2015",
//     Time: "18:05:27,570",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Address change detected. Old: msra-sa-41/10.190.173.170:9000 New: msra-sa-41:9000",
//     EventId: "E10",
//     EventTemplate: "Address change detected. Old: <*>/<*>:<*> New: <*>:<*>",
//   },
//   {
//     LineId: 849,
//     Date: "18-10-2015",
//     Time: "18:05:27,570",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.hdfs.LeaseRenewer",
//     Content:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_1537864556_1] for 30 seconds.  Will retry shortly ...",
//     EventId: "E44",
//     EventTemplate:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_<*>_<*>] for <*> seconds.  Will retry shortly ...",
//   },
//   {
//     LineId: 850,
//     Date: "18-10-2015",
//     Time: "18:05:28,570",
//     Level: "c",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Address change detected. Old: msra-sa-41/10.190.173.170:9000 New: msra-sa-41:9000",
//     EventId: "E10",
//     EventTemplate: "Address change detected. Old: <*>/<*>:<*> New: <*>:<*>",
//   },
//   {
//     LineId: 851,
//     Date: "18-10-2015",
//     Time: "18:05:28,570",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.hdfs.LeaseRenewer",
//     Content:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_1537864556_1] for 31 seconds.  Will retry shortly ...",
//     EventId: "E44",
//     EventTemplate:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_<*>_<*>] for <*> seconds.  Will retry shortly ...",
//   },
//   {
//     LineId: 852,
//     Date: "18-10-2015",
//     Time: "18:05:29,570",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Address change detected. Old: msra-sa-41/10.190.173.170:9000 New: msra-sa-41:9000",
//     EventId: "E10",
//     EventTemplate: "Address change detected. Old: <*>/<*>:<*> New: <*>:<*>",
//   },
//   {
//     LineId: 853,
//     Date: "18-10-2015",
//     Time: "18:05:29,570",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.hdfs.LeaseRenewer",
//     Content:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_1537864556_1] for 32 seconds.  Will retry shortly ...",
//     EventId: "E44",
//     EventTemplate:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_<*>_<*>] for <*> seconds.  Will retry shortly ...",
//   },
//   {
//     LineId: 1978,
//     Date: "18-10-2015",
//     Time: "18:10:48,545",
//     Level: "ERROR",
//     Process: "RMCommunicator Allocator",
//     Component: "org.apache.hadoop.mapreduce.v2.app.rm.RMContainerAllocator",
//     Content: "ERROR IN CONTACTING RM.",
//     EventId: "E38",
//     EventTemplate: "ERROR IN CONTACTING RM.",
//   },
//   {
//     LineId: 1979,
//     Date: "18-10-2015",
//     Time: "18:10:49,139",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Address change detected. Old: msra-sa-41/10.190.173.170:9000 New: msra-sa-41:9000",
//     EventId: "E10",
//     EventTemplate: "Address change detected. Old: <*>/<*>:<*> New: <*>:<*>",
//   },
//   {
//     LineId: 1980,
//     Date: "18-10-2015",
//     Time: "18:10:49,139",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.hdfs.LeaseRenewer",
//     Content:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_1537864556_1] for 351 seconds.  Will retry shortly ...",
//     EventId: "E44",
//     EventTemplate:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_<*>_<*>] for <*> seconds.  Will retry shortly ...",
//   },
//   {
//     LineId: 1981,
//     Date: "18-10-2015",
//     Time: "18:10:49,545",
//     Level: "WARN",
//     Process: "RMCommunicator Allocator",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Address change detected. Old: msra-sa-41/10.190.173.170:8030 New: msra-sa-41:8030",
//     EventId: "E10",
//     EventTemplate: "Address change detected. Old: <*>/<*>:<*> New: <*>:<*>",
//   },
//   {
//     LineId: 1982,
//     Date: "18-10-2015",
//     Time: "18:10:50,155",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Address change detected. Old: msra-sa-41/10.190.173.170:9000 New: msra-sa-41:9000",
//     EventId: "E10",
//     EventTemplate: "Address change detected. Old: <*>/<*>:<*> New: <*>:<*>",
//   },
//   {
//     LineId: 1983,
//     Date: "18-10-2015",
//     Time: "18:10:50,155",
//     Level: "WARN",
//     Process: "LeaseRenewer:msrabi@msra-sa-41:9000",
//     Component: "org.apache.hadoop.hdfs.LeaseRenewer",
//     Content:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_1537864556_1] for 352 seconds.  Will retry shortly ...",
//     EventId: "E44",
//     EventTemplate:
//       "Failed to renew lease for [DFSClient_NONMAPREDUCE_<*>_<*>] for <*> seconds.  Will retry shortly ...",
//   },
//   {
//     LineId: 1984,
//     Date: "18-10-2015",
//     Time: "18:10:50,545",
//     Level: "INFO",
//     Process: "RMCommunicator Allocator",
//     Component: "org.apache.hadoop.ipc.Client",
//     Content:
//       "Retrying connect to server: msra-sa-41:8030. Already tried 0 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)",
//     EventId: "E91",
//     EventTemplate:
//       "Retrying connect to server: <*>:<*>. Already tried <*> time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=<*>, sleepTime=<*> MILLISECONDS)",
//   },
//   {
//     LineId: 1985,
//     Date: "18-10-2015",
//     Time: "18:10:50,545",
//     Level: "ERROR",
//     Process: "RMCommunicator Allocator",
//     Component: "org.apache.hadoop.mapreduce.v2.app.rm.RMContainerAllocator",
//     Content: "ERROR IN CONTACTING RM.",
//     EventId: "E38",
//     EventTemplate: "ERROR IN CONTACTING RM.",
//   },
// ];

const logTypesChartData = [
  {
    id: "info",
    label: "Info",
    value: 6,
    color: "hsl(210, 70%, 50%)",
  },
  {
    id: "warning",
    label: "Warning",
    value: 10,
    color: "hsl(40, 70%, 50%)",
  },
  {
    id: "error",
    label: "Error",
    value: 2,
    color: "hsl(0, 70%, 50%)",
  },
];

const MyLogTypesChart = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "info",
        },
        id: "dots",
      },
      {
        match: {
          id: "warning",
        },
        id: "dots",
      },
      {
        match: {
          id: "error",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

const cpuUsageData = [
  {
    id: "Week 1",
    color: "hsl(24, 70%, 50%)",
    data: [
      { x: "Monday", y: 70 },
      { x: "Tuesday", y: 65 },
      { x: "Wednesday", y: 75 },
      { x: "Thursday", y: 60 },
      { x: "Friday", y: 80 },
      { x: "Saturday", y: 85 },
      { x: "Sunday", y: 55 },
    ],
  },
  {
    id: "Week 2",
    color: "hsl(120, 70%, 50%)",
    data: [
      { x: "Monday", y: 60 },
      { x: "Tuesday", y: 55 },
      { x: "Wednesday", y: 65 },
      { x: "Thursday", y: 70 },
      { x: "Friday", y: 75 },
      { x: "Saturday", y: 80 },
      { x: "Sunday", y: 85 },
    ],
  },
];

const MyCpuUsageLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Day of the Week",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "CPU Usage (%)",
      legendOffset: -50,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

function Dashboard(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://e74a-14-139-208-67.ngrok-free.app/api/linux/", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        const jsonData = response.data.data;
        const parsedLogs = jsonData.map((jsonString) => JSON.parse(jsonString));

        console.log(parsedLogs);
        setLogs(parsedLogs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  function getColorByLogLevel(level) {
    switch (level) {
      case "INFO":
        return "#beebca";
      case "WARN":
        return "#feed79";
      case "ERROR":
        return "#ffb1ce";
      default:
        return "white";
    }
  }

  const handleFullScreenClick = (chartId) => {
    const chartElement = document.getElementById(chartId);

    if (chartElement) {
      if (!isFullScreen) {
        if (chartElement.requestFullscreen) {
          chartElement.requestFullscreen();
        } else if (chartElement.mozRequestFullScreen) {
          chartElement.mozRequestFullScreen();
        } else if (chartElement.webkitRequestFullscreen) {
          chartElement.webkitRequestFullscreen();
        } else if (chartElement.msRequestFullscreen) {
          chartElement.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      setIsFullScreen(!isFullScreen);
    }
  };
  const handleDownloadClick = (chartId) => {
    const chartElement = document.getElementById(chartId);
    console.log(chartElement);
    if (chartElement) {
      const svg = chartElement.querySelector("svg");
      console.log(svg);
      if (svg) {
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svg);
        if (
          !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
        ) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns="http://www.w3.org/2000/svg"'
          );
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
          );
        }
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        const url =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        const link = document.createElement("a");
        link.download = `${chartId}.svg`;
        link.href = url;
        link.click();
      }
    }
  };

  const convertToTimestamp = (datetimeStr) => {
    const year = parseInt(datetimeStr.substring(0, 4), 10);
    const month = parseInt(datetimeStr.substring(4, 6), 10) - 1;
    const day = parseInt(datetimeStr.substring(6, 8), 10);
    const hour = parseInt(datetimeStr.substring(8, 10), 10);
    const minute = parseInt(datetimeStr.substring(10, 12), 10);
    const second = parseInt(datetimeStr.substring(12), 10);

    const date = new Date(year, month, day, hour, minute, second);

    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const widthValues = screenWidth < 968 ? "80%" : "95%";

  return (
    <div style={{ width: widthValues }}>
      <div style={{ display: "flex", height: "auto" }}>
        <Sidebar collapsed={!collapsed} style={{ height: "auto" }}>
          <Menu style={{ marginTop: "30px" }}>
            <MenuItem>
              <List>
                <ListItem button onClick={toggleSidebar}>
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary="Collapse" />
                </ListItem>
              </List>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard" />}>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </List>
            </MenuItem>
          </Menu>
        </Sidebar>

        <Grid
          container
          spacing={1.5}
          justifyContent="center"
          style={{ padding: "4%" }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Kpi title="Total Logs" value="8,347" description="This Month" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Kpi title="CPU Usage" value="23.7% ￪" description="This Month" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Kpi title="Server Load" value="7.33% ￪" description="This Month" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Kpi
              title="Memory Usage"
              value="3.25% ￪"
              description="This Month"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                minWidth: 275,
                marginBottom: "24px",
                boxShadow: "none",
                border: "1px solid #f5f5f5",
              }}
              id="log-types-chart"
            >
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f5f5f5",
                }}
              >
                <Typography variant="h7" component="h7">
                  Log Types Chart
                </Typography>
                <div>
                  <IconButton
                    color="#f75733"
                    onClick={() => handleDownloadClick("log-types-chart")}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    color="#f75733"
                    onClick={() => handleFullScreenClick("log-types-chart")}
                  >
                    {isFullScreen ? <CloseIcon /> : <FullscreenIcon />}
                  </IconButton>
                </div>
              </CardContent>
              <div style={{ height: "400px" }}>
                <MyLogTypesChart data={logTypesChartData} />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                minWidth: 275,
                marginBottom: "24px",
                boxShadow: "none",
                border: "1px solid #f5f5f5",
              }}
              id="cpu-usage-chart"
            >
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f5f5f5",
                }}
              >
                <Typography variant="h7" component="h7">
                  CPU Usage Chart
                </Typography>
                <div>
                  <IconButton
                    color="#f75733"
                    onClick={() => handleDownloadClick("cpu-usage-chart")}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    color="#f75733"
                    onClick={() => handleFullScreenClick("cpu-usage-chart")}
                  >
                    {isFullScreen ? <CloseIcon /> : <FullscreenIcon />}
                  </IconButton>
                </div>
              </CardContent>
              <div style={{ height: "400px" }}>
                <MyCpuUsageLine data={cpuUsageData} />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <br />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <TableContainer component={Paper}>
                <Table
                  aria-label="simple table"
                  style={{ border: "1px solid #f5f5f5" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Log ID</TableCell>
                      <TableCell align="right">Message ID</TableCell>
                      <TableCell align="right">Timesatmp</TableCell>
                      <TableCell align="right">Priority</TableCell>
                      <TableCell align="right">Syslog Identifier</TableCell>
                      <TableCell align="right">Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.map((log, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        style={{ background: getColorByLogLevel(log.Level) }}
                      >
                        <TableCell component="th" scope="row">
                          {log._PID}
                        </TableCell>
                        <TableCell align="right">{log.MESSAGE_ID}</TableCell>
                        <TableCell align="right">
                          {
                            convertToTimestamp(log._SOURCE_REALTIME_TIMESTAMP)
                              .time
                          }
                        </TableCell>
                        <TableCell align="right">{log.PRIORITY}</TableCell>
                        <TableCell align="right">
                          {log.SYSLOG_IDENTIFIER}
                        </TableCell>
                        <TableCell align="right">{log.MESSAGE}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <br />
          </Grid>
        </Grid>
        <br />
      </div>
    </div>
  );
}

export default Dashboard;
