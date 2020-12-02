import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  timeline: {
    border: "1px solid black",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Timeline(props) {
  const classes = useStyles();

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //TODO add loading spinner

  //TODO Create a custom hook to handle fetch
  // -> https://www.robinwieruch.de/react-hooks-fetch-data

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/records`)
      .then((res) => res.json())
      .then(
        (res) => {
          setRecords(res.results);
          setIsLoading(false);
        },
        (error) => {
          throw new Error("Error during records initialization fetch :", error);
          // TODO Display image in place of component using missing datas
          setIsLoading(false);
        }
      );
    //TODO add error processing and !!!! timeout handling !!!!
  }, []);

  return (
    <>
      {isLoading ? <p>Loading</p> : <p>Not loading</p>}
      <VerticalTimeline className={classes.timeline}>
        {records
          .filter(
            (record) =>
              record.activities.filter((activity) =>
                props.filter.includes(activity)
              ).length
          )
          .map((record) => {
            return (
              <VerticalTimelineElement
                key={record.id}
                className="vertical-timeline-element--school"
                date={record.date}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                //TODO use common avatar in view and filter
                icon={
                  <Avatar
                    src={`${process.env.PUBLIC_URL}/images/skills/${record.activitiesName}.png`}
                    alt={record.activitiesName}
                  />
                }
              >
                <h3 className="vertical-timeline-element-title">
                  {record.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {record.subtitle}
                </h4>
                <p>{record.desc} </p>
              </VerticalTimelineElement>
            );
          })}
      </VerticalTimeline>
    </>
  );
}

export default Timeline;
