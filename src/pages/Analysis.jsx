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
      const categories = journalEntries.map((entry) => entry.editedDate).reverse();
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
            decimalsInFloat: 3,
          },
        },
      };
      setChartConfig(newChartConfig);
    };

    fetchChartData();
  }, []);

  return (
    <div className="analysis-container">
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
                negative sentiment. If the sentiment is closer to 0, then it is
                a more neutral sentiment.
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>

      <div className="learn-more">
        <Typography className="learn-more-text">Learn More</Typography>
        {/* Chevron Down Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      <div className="about-analysis">
        <Card className="mt-6 w-96 about-analysis-card">
          <CardBody className="about-analysis-card-body">
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white about-analysis-icon">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Tracking Sentiment Trends
            </Typography>
            <Typography>
              The "Analysis" page in SentiJournal offers users a powerful tool
              to visualize the emotional trajectory of their journal entries
              over time. Through the integration of advanced sentiment analysis
              techniques, SentiJournal provides users with insights into the
              sentiments expressed within their journal entries.
            </Typography>
            <br></br>
            <Typography variant="h6" color="blue-gray">
              Understanding the Sentiment Analysis Graph
            </Typography>
            <Typography>
              <br></br>
              The sentiment analysis graph presents a comprehensive overview of
              the user's emotional journey as documented in their journal
              entries. Here's how it works:
              <br></br>
              <br></br>
              1. <b>Timeline Axis</b>: The horizontal axis represents time, with
              each data point corresponding to a specific journal entry and its
              associated timestamp. Users can navigate through their journal
              entries chronologically, allowing them to reflect on past
              experiences and emotions.
              <br></br>
              <br></br>
              2. <b>Sentiment Score Axis</b>: The vertical axis quantifies the
              sentiment score of each journal entry, derived through the&nbsp;
              <a
                href="https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english?text=I+don%27t+like+you.+I+hate+you"
                target="_blank"
              >
                DistilBERT-base-uncased text classification model, fine-tuned on
                the SST-2 dataset
              </a>
              . The sentiment score provides a numerical representation of the
              emotional tone expressed within the entry, ranging from highly
              negative to highly positive.
              <br></br>
              <br></br>
              3. <b>Line Graph Representation</b>: The sentiment analysis graph
              is visualized as a line graph, with each point on the graph
              representing the sentiment score of a particular journal entry.
              The trendline connecting these points illustrates the overall
              sentiment trajectory over time.
              <br></br>
            </Typography>
            <br></br>
            <Typography variant="h6" color="blue-gray">
              Key Features and Benefits
            </Typography>
            <br></br>
            <Typography>
              <ul>
                <li>
                  <b>Insightful Reflection</b>: The sentiment analysis graph
                  empowers users to reflect on their emotional experiences and
                  identify recurring themes or significant events that influence
                  their sentiments over time.
                </li>
                <br></br>
                <li>
                  <b>Tracking Emotional Well-being</b>: By tracking changes in
                  sentiment trends, users can gain valuable insights into their
                  emotional well-being, recognize patterns of positivity or
                  negativity, and take proactive steps to maintain mental and
                  emotional balance.
                </li>
                <br></br>
                <li>
                  <b>Goal Setting and Progress Monitoring</b>: SentiJournal
                  enables users to set emotional well-being goals and monitor
                  their progress through the sentiment analysis graph. Tracking
                  improvements or setbacks in sentiment trends encourages users
                  to cultivate positive habits and coping strategies.
                </li>
              </ul>
            </Typography>
            <br></br>
            <Typography variant="h6" color="blue-gray">
              Conclusion
            </Typography>
            <br></br>
            <Typography>
              The sentiment analysis graph by SentiJournal serves as a dynamic
              tool for self-awareness, personal growth, and emotional
              resilience. By harnessing the power of sentiment analysis, users
              can navigate their emotional landscapes with clarity,
              understanding, and intentionality.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
