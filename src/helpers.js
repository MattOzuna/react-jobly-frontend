const mapJobsIds = (jobs) => {
  let response = {};
  for (let job of jobs) {
    let id = job.id;
    response = { ...response, [id]: id };
  }
  return response
};

export { mapJobsIds };
