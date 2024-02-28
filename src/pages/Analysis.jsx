import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { fetchJournalEntries } from "../components/EntriesList";

export default function Analysis() {
  const [chartConfig, setChartConfig] = useState({
    type: "line",
    height: 340,
    series: [
      {
        name: "Sentiment",
        data: [],
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
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const journalEntries = await fetchJournalEntries(); // Fetch journal entries here
      const categories = journalEntries.map((entry) => entry.creationDate);
      const data = journalEntries.map((entry) => {
        // Adjust score based on sentiment label
        const score =
          entry.sentiment.label === "NEGATIVE"
            ? -entry.sentiment.score
            : entry.sentiment.score;
        return score;
      });
      const newChartConfig = {
        ...chartConfig,
        series: [{ name: "Sentiment", data }],
        options: {
          ...chartConfig.options,
          xaxis: {
            ...chartConfig.options.xaxis,
            categories,
          },
          yaxis: {
            min: -1,
            max: 1,
          },
        },
      };
      setChartConfig(newChartConfig);
    };

    fetchChartData();
  }, []);

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
              A visualization of the sentiments of your entries. A positive
              score represents a positive sentiment. A negative score means a
              negative sentiment. If the sentiment is closer to 0, then it is a
              more neutral sentiment.
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
