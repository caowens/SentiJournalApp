import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, ChartBarSquareIcon } from "@heroicons/react/24/solid";

const chartConfig = {
type: "line",
height: 240,
series: [
    {
    name: "Sentiment",
    data: [-1, 0, 1, 1, -1, 0, -1, 1, 0],
    },
],
options: {
    chart: {
    toolbar: {
        show: true,
    },
    },
    title: {
    show: "",
    },
    dataLabels: {
    enabled: false,
    },
    colors: ["#020617"],
    stroke: {
    lineCap: "round",
    curve: "smooth",
    },
    markers: {
    size: 0,
    },
    xaxis: {
    axisTicks: {
        show: false,
    },
    axisBorder: {
        show: false,
    },
    labels: {
        style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
        },
    },
    categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    },
    yaxis: {
    labels: {
        style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
        },
    },
    },
    grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
        lines: {
        show: true,
        },
    },
    padding: {
        top: 5,
        right: 20,
    },
    },
    fill: {
    opacity: 0.8,
    },
    tooltip: {
    theme: "dark",
    },
},
};

export default function Analysis() {
    return (
        <div className="chart-spacing">
            <Card>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <ChartBarIcon className="h-6 w-6" />
                </div>
                <div>
                <Typography variant="h6" color="blue-gray">
                    Sentiment Analysis Line Chart
                </Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="max-w-sm font-normal"
                >
                    A visualization of the sentiments of your entries. 1 means positive. 0 means neutral. -1 means negative.
                </Typography>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
                <Chart {...chartConfig} />
            </CardBody>
            </Card>
        </div>
    );
}