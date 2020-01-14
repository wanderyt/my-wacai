import React, { useState } from 'react';

import JobStatus from './mockData.json';

const TestProgressBar = () => {
  const [jobStatus, setJobStatus] = useState(JobStatus);

  const styles = {
    width: "300px",
    height: "100px"
  };

  const {failedJob, inProgressJob} = JobStatus;
  const levels = [];

  const getLevels = (failedJob = [], inProgressJob = 100) => {
    if (failedJob.length > 0) {
      levels.push(`green ${failedJob[0] - 1}%`);
      failedJob.map((item) => {
        levels.push(`red ${item}%`);
      });
    }

  }

  const linearGradient = `linear-gradient: (${levels})`;
  return (
    <div className='TestProgressBar' style={linearGradient} />
  )
}